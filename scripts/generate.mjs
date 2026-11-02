import { spawnSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import path from 'node:path';
import { readFileSync, writeFileSync, mkdtempSync, cpSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
const root = fileURLToPath(new URL('../', import.meta.url));
const recipe = JSON.parse(readFileSync(path.join(root, 'poolster.json'), 'utf8'));
const stage = mkdtempSync(path.join(tmpdir(), 'relevate-generation-'));
try {
  // Generate into an empty directory: committed packaging overlays must not
  // masquerade as untouched generator-owned files. Author inputs stay in scripts/.
  const config = structuredClone(recipe);
  config.openapi.input = path.resolve(root, recipe.openapi.input);
  config.output.path = path.join(stage, 'packages');
  const configPath = path.join(stage, 'poolster.json');
  writeFileSync(configPath, JSON.stringify(config));
  const result = spawnSync(process.execPath, [path.join(root, 'node_modules/poolster/bin/poolster.cjs'), 'generate', '--config', configPath], { cwd: root, stdio: 'inherit' });
  if (result.error) throw result.error;
  if (result.status !== 0) throw Error('Poolster generation failed');
  const packageRoot = path.join(stage, 'packages');
  const manifestPath = path.join(packageRoot, 'typescript/package.json');
  const manifest = JSON.parse(readFileSync(manifestPath, 'utf8'));
  const overlay = JSON.parse(readFileSync(path.join(root, 'scripts/typescript-package.json'), 'utf8'));
  Object.assign(manifest, overlay);
  delete manifest.devDependencies; // Tooling belongs to the repository, not the published package.
  // New Poolster emits provider-aware imports and native fixtures; no source rewrites.
  writeFileSync(manifestPath, JSON.stringify(manifest, null, 2) + '\n');
  for (const entry of ['react-query', 'vue-query']) {
    writeFileSync(path.join(packageRoot, 'typescript', entry, 'index.ts'), `export * from './${entry}.js'\n`);
  }
  for (const pkg of recipe.packages) {
    const destination = path.resolve(root, recipe.output.path, pkg.path);
    const expectedRoot = path.resolve(root, 'packages') + path.sep;
    if (!destination.startsWith(expectedRoot)) throw Error('Generated package escapes packages/');
    rmSync(destination, { recursive: true, force: true });
    cpSync(path.join(packageRoot, pkg.path), destination, { recursive: true });
  }
  cpSync(path.join(packageRoot, '.poolster'), path.join(root, 'packages/.poolster'), { recursive: true });
} finally {
  rmSync(stage, { recursive: true, force: true });
}

if (process.argv.includes('--ci')) {
  const args = ['sdk', 'init', '--root', 'packages', '--config', 'poolster.json', '--repository', 'rlvtapp/sdk', '--poolster-version', '0.5.0-alpha.4'];
  if (process.argv.includes('--dry-run')) args.push('--dry-run');
  const result = spawnSync(process.execPath, [path.join(root, 'node_modules/poolster/bin/poolster.cjs'), ...args], { cwd: root, stdio: 'inherit' });
  if (result.error || result.status !== 0) throw Error('CI/CD scaffolding failed');
}
