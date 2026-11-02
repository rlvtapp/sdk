import assert from 'node:assert/strict';
import { spawn } from 'node:child_process';
import { createServer } from 'node:net';
import { once } from 'node:events';
import { fileURLToPath } from 'node:url';
import { setupServer } from 'msw/node';
import { http, HttpResponse } from 'msw';
import { Relevate } from '../packages/typescript/dist/index.js';
import { handlers } from '../packages/typescript/dist/mocks/msw.js';
import { seedPoolsterFixtures, createCrmListResponse } from '../packages/typescript/dist/fixtures/faker.js';
assert.equal(handlers.length, 66);
seedPoolsterFixtures(1);
const fixture = createCrmListResponse();
assert.ok(fixture.attributes.length && typeof fixture.attributes[0] === 'object');
const server = setupServer(...handlers);
server.listen({ onUnhandledRequest: 'error' });
// This inline response has no required properties; supply meaningful data to exercise decoding.
server.use(http.get('*/v1/crm/objects', () => HttpResponse.json({ data: [{ id: 'object-test', name: 'Test', slug: 'test' }] })));
try {
  const sdk = new Relevate({ baseUrl: 'http://mock.example', apiKey: 'test', retry: false });
  const objects = await sdk.crm.listCrmObjects({});
  assert.ok(Array.isArray(objects.data));
  const sends = await sdk.sends.create({ body: {} });
  assert.equal(typeof sends.send_id, 'string');
  const response = await fetch('http://mock.example/v1/email/sends', { method: 'POST' });
  assert.equal(response.status, 202);
  server.use(http.get('*/v1/crm/objects', () => HttpResponse.json({ code: 'rate_limited', message: 'Try later' }, { status: 429 })));
  await assert.rejects(sdk.crm.listCrmObjects({}), error => error.status === 429);
  server.resetHandlers();
  assert.deepEqual(await sdk.crm.listCrmObjects({}), {});
} finally {
  server.close();
}
// Verify the shared native mock over real HTTP, including its request log.
const portProbe = createServer();
portProbe.listen(0, '127.0.0.1');
await once(portProbe, 'listening');
const port = portProbe.address().port;
await new Promise(resolve => portProbe.close(resolve));
const root = fileURLToPath(new URL('../', import.meta.url));
const child = spawn(process.execPath, [root + 'node_modules/poolster/bin/poolster.cjs', 'mock', 'serve', 'specs/openapi.json', '--port', String(port)], { cwd: root, stdio: 'ignore' });
const origin = `http://127.0.0.1:${port}`;
try {
  let ready = false;
  for (let attempt = 0; attempt < 100; attempt++) {
    if (child.exitCode !== null) throw new Error('Native mock exited before startup');
    try { ready = (await fetch(origin + '/_poolster/health')).ok; } catch {}
    if (ready) break;
    await new Promise(resolve => setTimeout(resolve, 100));
  }
  assert.ok(ready, 'Native mock did not start');
  const sdk = new Relevate({ baseUrl: origin, apiKey: 'test', retry: false });
  assert.ok(Array.isArray((await sdk.crm.listCrmObjects({})).data));
  assert.equal(typeof (await sdk.sends.create({ body: {} })).send_id, 'string');
  const log = await (await fetch(origin + '/_poolster/requests')).json();
  assert.match(JSON.stringify(log), /listCrmObjects/);
} finally {
  child.kill();
  if (child.exitCode === null) await once(child, 'exit');
}
console.log('MSW happy paths/errors, Faker object arrays, and native mock HTTP passed.');
