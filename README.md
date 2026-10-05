# Relevate SDK

Official [Relevate](https://relevate.app) SDKs: one package per language
containing both CRM and Email, generated with
[Kaji](https://github.com/rlvtapp/kaji) from the shared Rust API contract.

The nine initial development packages are version 0.1.0. No registry releases
have been published by this setup.

## Generate

Use Node.js 22 or newer:

```sh
npm ci
npm run generate
npm run check
npm run build:typescript
npm run check:typescript
```

`kaji.json` generates all nine languages from `specs/openapi.json`, with no
product filters. Every SDK contains all 66 CRM and Email operations. Kaji
0.4.0 is pinned in the root lockfile; TypeScript 5.9.3 is pinned in its workspace.

## Packages

| Language | Directory | Package identity |
| --- | --- | --- |
| TypeScript (Fetch) | `packages/typescript/` | `@relevate/sdk` |
| Python | `packages/python/` | `relevate-sdk` |
| Go | `packages/go/` | `github.com/rlvtapp/sdk/packages/go` |
| Rust | `packages/rust/` | `relevate-sdk` |
| Java | `packages/java/` | `app.relevate.sdk` |
| .NET | `packages/dotnet/` | `Relevate.Sdk` |
| PHP | `packages/php/` | `relevate/sdk` |
| Elixir | `packages/elixir/` | `relevate_sdk` |
| Ruby | `packages/ruby/` | `relevate_sdk` |

Read each package's README and STYLE_GUIDE for its native API and build
instructions. Resource namespaces follow the OpenAPI tags. The TypeScript
client is named `Relevate`; the current tags expose CRM operations through
`client.crm` and Email operations through resources such as `client.sends`,
`client.contacts`, and `client.webhooks`.

Configure the service base URL and the appropriate CRM or Email key. A
combined SDK includes both APIs; credentials still need permissions for the
operation being called.

## API source

`specs/openapi.json` is a committed snapshot of the combined public OpenAPI
3.1 document. The public Relevate API contract is the source of truth.
To refresh the snapshot, download the public API contract and import it:

```sh
curl --fail --silent --show-error "$RELEVATE_API_URL/v1/openapi.json" \
  --output /tmp/relevate-openapi.json
npm run spec:import -- /tmp/relevate-openapi.json
npm run generate
```

Set `RELEVATE_API_URL` to your Relevate API origin. CI uses the committed
snapshot so generation does not depend on a changing live API.

## Generated output and validation

Commit generated code for review. Machine-specific `.kaji` metadata is ignored
because it records absolute source paths. Durable customizations belong in the
contract, recipe, or generation tooling.

`scripts/generate.mjs` applies packaging corrections for Kaji 0.4.0: valid Go
module URLs and distinct TypeScript
operation-union names when they collide with response schemas.

CI checks deterministic regeneration, coverage of both products, TypeScript
builds, Go compilation, and Python distribution builds. Other languages need
ecosystem build and runtime validation before release.

## Releases

All languages initially share the SDK version in `kaji.json` under
`openapi.version`. Registry publishing is not configured yet. Before release,
validate every published target, finalize metadata and licensing, and set up
registry credentials or trusted publishing.

Go releases require subdirectory tags such as `packages/go/v0.1.0`. Swift generation is deferred for now.

## TypeScript framework integrations

The TypeScript package includes separate TanStack React Query and Vue Query
exports. The core SDK does not require either framework. Install the chosen
integration and its framework in your application:

```sh
npm install @relevate/sdk @tanstack/react-query react
# Or: npm install @relevate/sdk @tanstack/vue-query vue
```

Use the hooks inside the framework's configured query provider:

```ts
import { Relevate } from '@relevate/sdk'
import { useListCrmObjects } from '@relevate/sdk/react-query'
// Vue applications use '@relevate/sdk/vue-query'.

const sdk = new Relevate({ baseUrl: 'https://your-api.example' })
// Configure the client's credentials for your application.
// Inside a React component or Vue setup function:
const result = useListCrmObjects({ client: sdk.transport })
```

Frameworks and TanStack packages are optional peer dependencies. Generation
also corrects hook-name collisions and Vue declaration annotations, and adds
Node-compatible ESM specifiers. Package export checks confirm the core SDK
loads without frameworks and both integrations resolve after compilation.

## Mocking and fixtures

The SDK includes optional testing layers for both CRM and Email:

| Layer | Location / export | Purpose |
| --- | --- | --- |
| MSW | `@relevate/sdk/mocks` | In-process request interception with contract-derived success bodies and statuses |
| Faker | `@relevate/sdk/fixtures` | Schema-shaped fixture factories |
| Cypress | `@relevate/sdk/cypress` | API smoke-test scaffold for a configured test server |
| Shared HTTP mock | `packages/mock-server/` | Docker mock usable by every SDK language |
| Native HTTP mock | `npm run mock` | Local mock with dynamic responses and a request log, without Docker |

Install `msw` or `@faker-js/faker` in your test project when importing those
optional exports. Framework and mock dependencies are optional peers; all
TypeScript development dependencies live in its npm workspace package.

### In-process tests

```ts
import { setupServer } from 'msw/node'
import { http, HttpResponse, delay } from 'msw'
import { handlers } from '@relevate/sdk/mocks'
import { createContact } from '@relevate/sdk/fixtures'

const server = setupServer(...handlers)
server.listen({ onUnhandledRequest: 'error' })
const contact = createContact()

// Override selected endpoints for errors or latency.
server.use(http.get('*/v1/email/contacts', async () => {
  await delay(100)
  return HttpResponse.json({ code: 'rate_limited', message: 'Try later' }, {
    status: 429,
    headers: { 'Retry-After': '1' },
  })
}))
// Reset after each test; close the server after the suite.
server.resetHandlers()
server.close()
```

For browser development use MSW's `setupWorker` from `msw/browser` and generate
its service worker in your app's public directory. The same handlers work with
any SDK base URL.

### Shared HTTP mock

```sh
npm run mock
# Or:
cd packages/mock-server
docker compose up --build
```

Point any SDK at `http://127.0.0.1:4010`. The native server exposes
`/_kaji/health` and `/_kaji/requests`. Contract-owned `x-kaji-mock` scenarios
can describe conditional responses; the production snapshot currently has no
custom scenarios. Neither mock implements persistent CRM or delivery behavior.
Fixtures demonstrate contract shapes and are not guaranteed semantically valid
business records.

The generated Cypress scaffold requires real parameter values, request bodies,
and assertions before use. Run it only against a mock or test environment.
Cypress is a development dependency; its browser binary is not installed in CI.

Run `npm run check:mocks` after building to validate MSW success/error handling,
Faker object-array fixtures, and native mock requests through the SDK. Generation
reuses Kaji's HTTP fixtures for MSW and corrects the Faker import path and
object-array callback syntax in the currently pinned generator.
