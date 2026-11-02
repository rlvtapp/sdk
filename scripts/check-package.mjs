import assert from 'node:assert/strict';
import { mkdtempSync, writeFileSync, rmSync, existsSync } from 'node:fs';
import { tmpdir } from 'node:os';
import path from 'node:path';
import { spawnSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';
const root = fileURLToPath(new URL('../', import.meta.url));
const stage = mkdtempSync(path.join(tmpdir(), 'relevate-package-check-'));
const npm = process.platform === 'win32' ? 'npm.cmd' : 'npm';
function run(program, args, cwd = root) {
  const result = spawnSync(program, args, { cwd, encoding: 'utf8' });
  assert.equal(result.status, 0, result.stderr || result.error?.message);
  return result.stdout;
}
try {
  const [packed] = JSON.parse(run(npm, ['pack', '--workspace', 'packages/typescript', '--ignore-scripts', '--json', '--pack-destination', stage]));
  assert.equal(packed.name, '@relevate/sdk');
  assert.ok(packed.files.some(file => file.path === 'dist/.poolster/client.js'));
  assert.ok(packed.files.some(file => file.path === 'dist/index.d.ts'));
  writeFileSync(path.join(stage, 'package.json'), JSON.stringify({ name: 'sdk-install-check', private: true }));
  run(npm, ['install', path.join(stage, packed.filename), '--ignore-scripts', '--no-audit', '--no-fund', '--registry=https://registry.npmjs.org'], stage);
  for (const framework of ['react', 'vue', '@tanstack/react-query', '@tanstack/vue-query']) {
    assert.equal(existsSync(path.join(stage, 'node_modules', framework)), false, `${framework} must stay optional`);
  }
  run(process.execPath, ['--input-type=module', '-e', "import { Relevate } from '@relevate/sdk'; const sdk = new Relevate({baseUrl:'https://example.com'}); if (!sdk.crm || !sdk.sends || !sdk.contacts) throw Error('Missing SDK resources');"], stage);
  console.log(`Packed ${packed.name}@${packed.version}: fresh npm install and core import passed without framework dependencies.`);
} finally {
  rmSync(stage, { recursive: true, force: true });
}
