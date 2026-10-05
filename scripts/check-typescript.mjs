import assert from 'node:assert/strict';
import { cpSync, mkdtempSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import path from 'node:path';
import { spawnSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';
const sdk = fileURLToPath(new URL('../packages/typescript/', import.meta.url));
// Check real package exports, rather than importing source files directly.
const integrations = spawnSync(process.execPath, ['--input-type=module', '-e', `
  import assert from 'node:assert/strict';
  import { Relevate } from '@relevate/sdk';
  import * as react from '@relevate/sdk/react-query';
  import * as vue from '@relevate/sdk/vue-query';
  import { handlers } from '@relevate/sdk/mocks';
  import { createContact } from '@relevate/sdk/fixtures';
  assert.equal(handlers.length, 66);
  assert.equal(typeof createContact().id, 'string');
  assert.equal(typeof Relevate, 'function');
  for (const helpers of [react, vue]) {
    assert.equal(typeof helpers.useListCrmObjects, 'function');
    assert.equal(typeof helpers.useCreate, 'function');
    assert.deepEqual(helpers.listCrmObjectsQueryKey({}), ['listCrmObjects', {}]);
  }
`], { cwd: sdk, encoding: 'utf8' });
assert.equal(integrations.status, 0, integrations.stderr);
// Core must also load with no framework dependencies installed.
const isolated = mkdtempSync(path.join(tmpdir(), 'relevate-core-'));
try {
  cpSync(path.join(sdk, 'package.json'), path.join(isolated, 'package.json'));
  cpSync(path.join(sdk, 'dist'), path.join(isolated, 'dist'), { recursive: true });
  const core = spawnSync(process.execPath, ['--input-type=module', '-e', `
    import assert from 'node:assert/strict';
    import { Relevate } from '@relevate/sdk';
    const sdk = new Relevate({ baseUrl: 'https://example.com' });
    assert.ok(sdk.crm && sdk.sends && sdk.contacts);
  `], { cwd: isolated, encoding: 'utf8' });
  assert.equal(core.status, 0, core.stderr);
} finally {
  rmSync(isolated, { recursive: true, force: true });
}
console.log('Core SDK loads without frameworks; React and Vue package exports work.');
