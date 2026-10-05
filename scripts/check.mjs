import assert from 'node:assert/strict';
import { readFileSync, existsSync } from 'node:fs';
const root = new URL('../', import.meta.url);
const read = path => JSON.parse(readFileSync(new URL(path, root), 'utf8'));
const spec = read('specs/openapi.json');
const languages = ['typescript', 'python', 'go', 'rust', 'java', 'dotnet', 'php', 'elixir', 'ruby'];
const manifests = { typescript: 'package.json', python: 'pyproject.toml', go: 'go.mod', rust: 'Cargo.toml', java: 'pom.xml', php: 'composer.json', elixir: 'mix.exs', ruby: null, dotnet: null };
const methods = new Set(['get', 'post', 'put', 'patch', 'delete', 'head', 'options', 'trace']);
const ids = new Set();
for (const [path, item] of Object.entries(spec.paths)) {
  assert.match(path, /^\/v1\/(crm|email)\//, `Unexpected public route: ${path}`);
  for (const [method, operation] of Object.entries(item)) {
    if (!methods.has(method)) continue;
    assert.ok(operation.operationId, `${method} ${path} needs an operationId`);
    assert.ok(!ids.has(operation.operationId), `Duplicate operationId: ${operation.operationId}`);
    ids.add(operation.operationId);
  }
}
const recipe = read('kaji.json');
assert.equal(recipe.output.path, './packages');
assert.equal(recipe.openapi.input, './specs/openapi.json');
assert.equal(recipe.openapi.paths, undefined, 'Combined SDK must include the entire contract');
assert.deepEqual(recipe.packages.filter(pkg => pkg.language !== 'mock').map(pkg => pkg.language).sort(), [...languages].sort());
for (const pkg of recipe.packages) {
  assert.ok(existsSync(new URL(`packages/${pkg.path}/README.md`, root)), `Missing ${pkg.path}`);
  const manifest = manifests[pkg.language];
  if (manifest) assert.ok(existsSync(new URL(`packages/${pkg.path}/${manifest}`, root)), `Missing ${manifest}`);
}
const lock = read('packages/.kaji/generation.lock.json');
const expected = Object.entries(spec.paths).flatMap(([path, item]) => Object.keys(item)
  .filter(method => methods.has(method)).map(method => `${method.toUpperCase()} ${path}`));
assert.deepEqual([...lock.api.operations].sort(), expected.sort(), 'Combined SDK is missing operations');
for (const product of ['crm', 'email']) {
  assert.ok(lock.api.operations.some(operation => operation.includes(`/v1/${product}/`)));
}
console.log(`Combined CRM and Email contract: ${ids.size} operations, ${languages.length} SDK packages plus shared mock server`);
const ts = read('packages/typescript/package.json');
for (const entry of ['react-query', 'vue-query']) {
  assert.ok(ts.exports[`./${entry}`]);
  assert.equal(ts.peerDependenciesMeta[`@tanstack/${entry}`].optional, true);
  assert.equal(ts.dependencies?.[`@tanstack/${entry}`], undefined);
}
assert.ok(recipe.packages.some(pkg => pkg.language === 'mock'));
for (const entry of ['mocks', 'fixtures', 'cypress']) assert.ok(ts.exports[`./${entry}`]);
for (const dependency of ['msw', '@faker-js/faker']) {
  assert.equal(ts.peerDependenciesMeta[dependency].optional, true);
  assert.equal(ts.dependencies?.[dependency], undefined);
}
