import { spawnSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import path from 'node:path';
import { readFileSync, writeFileSync, readdirSync, existsSync } from 'node:fs';
const root = fileURLToPath(new URL('../', import.meta.url));
const existingManifest = JSON.parse(readFileSync(path.join(root, 'packages/typescript/package.json'), 'utf8'));
const cli = path.join(root, 'node_modules/@relevate/kaji/bin/kaji.cjs');
{
  const result = spawnSync(process.execPath, [cli, 'generate', '--config', 'kaji.json'], { cwd: root, stdio: 'inherit' });
  if (result.error) throw result.error;
  if (result.status !== 0) process.exit(result.status ?? 1);
  // Kaji 0.4.0 sanitizes Go module paths; keep the importable repository URL.
  // Keep these packaging corrections here so regeneration stays reproducible.
  writeFileSync(path.join(root, 'packages/go/go.mod'), `module github.com/rlvtapp/sdk/packages/go\n\ngo 1.22\n`);
  const manifestPath = path.join(root, 'packages/typescript/package.json');
  const manifest = JSON.parse(readFileSync(manifestPath, 'utf8'));
  manifest.devDependencies = { ...manifest.devDependencies, ...existingManifest.devDependencies, typescript: '5.9.3' };
  // Faker models live one directory above the helper output.
  const fakerPath = path.join(root, 'packages/typescript/fixtures/faker.ts');
  writeFileSync(fakerPath, readFileSync(fakerPath, 'utf8').replace("from './models'", "from '../models'"));
  // Kaji 0.4.0 emits array object callbacks as blocks; wrap the object expression.
  let fixtureSource = readFileSync(fakerPath, 'utf8');
  const marker = '() => {';
  let search = 0;
  while ((search = fixtureSource.indexOf(marker, search)) !== -1) {
    const start = search + marker.length - 1;
    let depth = 0, quote = null, escaped = false, end = start;
    for (; end < fixtureSource.length; end++) {
      const ch = fixtureSource[end];
      if (quote) {
        if (escaped) escaped = false;
        else if (ch === '\\') escaped = true;
        else if (ch === quote) quote = null;
      } else if (ch === '"' || ch === "'") quote = ch;
      else if (ch === '{') depth++;
      else if (ch === '}' && --depth === 0) break;
    }
    fixtureSource = fixtureSource.slice(0, start) + '(' + fixtureSource.slice(start, end + 1) + ')' + fixtureSource.slice(end + 1);
    search = start + 1;
  }
  writeFileSync(fakerPath, fixtureSource);
  // Share Kaji's contract-derived HTTP fixtures with in-process MSW tests.
  const responses = new Map();
  for (const fixture of readdirSync(path.join(root, 'packages/mock-server/fixtures'))) {
    if (!fixture.endsWith('.yaml')) continue;
    const content = readFileSync(path.join(root, 'packages/mock-server/fixtures', fixture), 'utf8');
    if (!content.includes('# Default happy-path response')) continue;
    const operation = content.match(/Source operation: (.+)/)?.[1];
    const status = Number(content.match(/  status: (\d+)/)?.[1]);
    const json = content.match(/  json_body: '(.*)'/)?.[1]?.replaceAll("''", "'");
    responses.set(operation, { status, body: json === undefined ? undefined : JSON.parse(json) });
  }
  const spec = JSON.parse(readFileSync(path.join(root, 'specs/openapi.json'), 'utf8'));
  const handlers = [];
  for (const [route, operations] of Object.entries(spec.paths)) {
    for (const [method, operation] of Object.entries(operations)) {
      if (!operation.operationId) continue;
      const response = responses.get(operation.operationId);
      if (!response) throw new Error(`Missing contract mock for ${operation.operationId}`);
      const url = '*' + route.replace(/\{([^}]+)\}/g, ':$1');
      const body = response.body === undefined ? `new HttpResponse(null, { status: ${response.status} })` : `HttpResponse.json(${JSON.stringify(response.body)}, { status: ${response.status} })`;
      handlers.push(`  http.${method}(${JSON.stringify(url)}, () => ${body}),`);
    }
  }
  writeFileSync(path.join(root, 'packages/typescript/mocks/msw.ts'), "// Generated from Kaji contract mock fixtures.\nimport { http, HttpResponse } from 'msw';\nexport const handlers = [\n" + handlers.join('\n') + '\n];\n');
  // Operation response unions can collide with named response schemas.
  const models = path.join(root, 'packages/typescript/models');
  for (const entry of readdirSync(models, { recursive: true })) {
    if (!entry.endsWith('.ts') || !entry.includes('/')) continue;
    const file = path.join(models, entry);
    const content = readFileSync(file, 'utf8');
    const corrected = content.replace(/export type (\w+Response) =/g, (declaration, name) =>
      content.includes(`import type { ${name} }`) ? `export type ${name}Union =` : declaration);
    if (corrected !== content) writeFileSync(file, corrected);
  }
  // Framework integrations stay optional for core SDK consumers.
  delete manifest.dependencies?.['@tanstack/react-query'];
  delete manifest.dependencies?.['@tanstack/vue-query'];
  delete manifest.dependencies?.['msw'];
  delete manifest.dependencies?.['@faker-js/faker'];
  if (manifest.dependencies && !Object.keys(manifest.dependencies).length) delete manifest.dependencies;
  for (const entry of ['react-query', 'vue-query']) {
    writeFileSync(path.join(root, 'packages/typescript', entry, 'index.ts'), `export * from './${entry}.js'\n`);
  }
  // A send-query operation generates useQuery, so alias TanStack imports.
  for (const framework of ['react', 'vue']) {
    const file = path.join(root, `packages/typescript/${framework}-query/${framework}-query.ts`);
    let hooks = readFileSync(file, 'utf8')
      .replace('import { useMutation, useQuery }', 'import { useMutation as useTanstackMutation, useQuery as useTanstackQuery }')
      .replaceAll('return useMutation(', 'return useTanstackMutation(')
      .replaceAll('return useQuery(', 'return useTanstackQuery(');
    if (framework === 'vue') {
      hooks = `import type { UseQueryReturnType, UseMutationReturnType } from '@tanstack/vue-query';\n` + hooks;
      hooks = hooks.replace(/export function (\w+)\(options: Parameters<typeof (\w+)>\[0\]\) \{/g,
        (_, name, operation) => `export function ${name}(options: Parameters<typeof ${operation}>[0]): UseQueryReturnType<Awaited<ReturnType<typeof ${operation}>>, Error> {`);
      hooks = hooks.replace(/export function (\w+)\(\) \{ return useTanstackMutation\(\{ mutationFn: \(options: Parameters<typeof (\w+)>\[0\]\)/g,
        (_, name, operation) => `export function ${name}(): UseMutationReturnType<Awaited<ReturnType<typeof ${operation}>>, Error, Parameters<typeof ${operation}>[0], unknown> { return useTanstackMutation({ mutationFn: (options: Parameters<typeof ${operation}>[0])`);
    }
    writeFileSync(file, hooks);
  }
  // Emit Node-compatible ESM specifiers throughout the published package.
  const tsRoot = path.join(root, 'packages/typescript');
  for (const entry of readdirSync(tsRoot, { recursive: true })) {
    if (!entry.endsWith('.ts') || entry.startsWith('dist/')) continue;
    const file = path.join(tsRoot, entry);
    const source = readFileSync(file, 'utf8');
    const esm = source.replace(/(from\s+['"])(\.[^'"]+)(['"])/g, (match, before, specifier, after) => {
      if (specifier.endsWith('.js')) return match;
      const target = path.resolve(path.dirname(file), specifier);
      return before + specifier + (existsSync(target + '.ts') ? '.js' : '/index.js') + after;
    });
    writeFileSync(file, esm);
  }
  manifest.exports['.'] = { types: './dist/index.d.ts', import: './dist/index.js' };
  manifest.peerDependencies = { '@tanstack/react-query': '^5.0.0', '@tanstack/vue-query': '^5.0.0', react: '^18.0.0 || ^19.0.0', vue: '^3.0.0', msw: '^2.0.0', '@faker-js/faker': '^10.6.0' };
  manifest.peerDependenciesMeta = Object.fromEntries(Object.keys(manifest.peerDependencies).map(name => [name, { optional: true }]));
  for (const entry of ['react-query', 'vue-query']) {
    manifest.exports[`./${entry}`] = { types: `./dist/${entry}/index.d.ts`, import: `./dist/${entry}/index.js` };
  }
  for (const [entry, file] of [['mocks', 'msw'], ['fixtures', 'faker']]) {
    manifest.exports[`./${entry}`] = { types: `./dist/${entry}/${file}.d.ts`, import: `./dist/${entry}/${file}.js` };
  }
  manifest.exports['./cypress'] = { default: './dist/cypress/api.cy.js' };
  manifest.repository = { type: 'git', url: 'https://github.com/rlvtapp/sdk.git', directory: 'packages/typescript' };
  writeFileSync(manifestPath, JSON.stringify(manifest, null, 2) + '\n');
}
