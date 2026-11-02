# Relevate SDK

Official [Relevate](https://relevate.app) SDKs: one package per language
containing both CRM and Email, generated with
[Poolster](https://github.com/rlvtapp/poolster) from the shared Rust API contract.

The TypeScript SDK is published to npm as `@relevate/sdk@0.2.0`. The other
ecosystem packages remain development outputs at version 0.2.0.

```sh
npm install @relevate/sdk
```

## Published templates

SDK 0.2.0 includes the live template API. Create and publish a template in the
platform, then send it by ID or alias with nested variables:

```ts
await sdk.sends.sendEmail({
  headers: { 'Idempotency-Key': 'order-A-1' },
  body: {
    to: 'customer@example.com',
    template: {
      id: 'order-shipped', // Published template ID or alias from the platform.
      // version: 1,       // Optional: pin a published revision.
      variables: { order: { number: 'A-1', total: 42 } },
    },
  },
})
```

The platform template can use `{{order.number}}` and `{{order.total}}`. The
backend validates declared variables and uses template defaults. Pass `from`
when the template has no sender. Omit inline `subject`, `html` and `text` for a
template send. Relevate currently takes the template's subject rather than
supporting Resend's subject override behavior.

This refresh follows the current unversioned API paths (for example,
`/email/emails`) and descriptive operation IDs (`sends.sendEmail`, replacing
`sends.create`). Set `Relevate-Version` in client headers to pin an API date.
The shared contract also exposes template listing, creation, updating, rendering,
publishing, duplication and deletion, plus the current Schedule API.

## Generate

Use Node.js 22 or newer:

```sh
npm ci
npm run generate
npm run check
npm run build:typescript
npm run check:typescript
```

`poolster.json` generates all nine languages from `specs/openapi.json`, with no
product filters. Every SDK contains all 154 CRM, Email and Schedule operations. Poolster
0.5.0-alpha.4 is pinned in the root lockfile; TypeScript 5.9.3 is pinned in the repository development dependencies.

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
curl --fail --silent --show-error "$RELEVATE_API_URL/openapi.json" \
  --output /tmp/relevate-openapi.json
npm run spec:import -- /tmp/relevate-openapi.json
npm run generate
```

Set `RELEVATE_API_URL` to your Relevate API origin. CI uses the committed
snapshot so generation does not depend on a changing live API.

## Generated output and validation

Commit generated code for review. `scripts/generate.mjs` generates in a clean
staging directory using Poolster 0.5.0-alpha.4, then applies the maintained npm
manifest overlay from `scripts/typescript-package.json`. Do not edit generated
packages directly. Generation bookkeeping under `packages/.poolster` records
machine-specific paths and is ignored; the runtime and package release metadata
inside each SDK are tracked.

CI checks deterministic regeneration, coverage of both products, TypeScript
builds, Go compilation, and Python distribution builds. Other languages need
ecosystem build and runtime validation before release.

## Releases

The TypeScript SDK publishes to npm as `@relevate/sdk`. Versions are selected
by `poolster.json` (`openapi.version` and TypeScript `release.version`), then
regenerated into the native package manifest and delivery metadata. Other
language packages are generated and validated but their registry publishing is
not configured by the npm workflow.

After merging a checked version, push `typescript-vVERSION`. The
`poolster-sdk-release.yml` workflow regenerates and tests that exact tag without
publishing credentials, retains the checked package, then waits for the protected
`release` environment before publishing through npm OIDC. A manual dispatch with
the same existing tag retries a release; existing versions succeed only when the
packed artifact integrity matches. Stable versions use `latest`, prereleases use
`next`. The workflow also verifies installation from public npm.

Configure npm trusted publishing for package `@relevate/sdk`, GitHub organization
`rlvtapp`, repository `sdk`, workflow filename `poolster-sdk-release.yml`, and
environment `release`. Allow direct publish. A new package requires an initial
maintainer publication to establish ownership before this trust can be configured.
No long-lived npm token is required by the workflow.

### Generate CI/CD files

```sh
npm run sdk:ci:preview             # inspect proposed files without writing
npm run generate -- --ci          # regenerate SDKs and stage CI/CD setup
npm run generate -- --ci --dry-run
npm run sdk:ci:sync               # refresh an existing scaffold
```

These commands use Poolster's `sdk init`/`sdk sync` with the pinned generator and
stage destination helpers, SDK checks, Release Please, and publishing workflows
under `.poolster/sdk-repository-setup/`. They also emit a source generation
workflow. Review setup before installing it: the repository's maintained npm
release workflow includes its combined contract and runtime checks. Scaffolding
refuses to overwrite edited files; merge intentional updates manually. App
credentials, registry trust, and GitHub environment protection require account
configuration, rather than generated files.

Go releases require subdirectory tags such as `packages/go/v0.1.0`.
Swift generation is deferred for now.

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
`/_poolster/health` and `/_poolster/requests`. Contract-owned `x-poolster-mock` scenarios
can describe conditional responses; the production snapshot currently has no
custom scenarios. Neither mock implements persistent CRM or delivery behavior.
Fixtures demonstrate contract shapes and are not guaranteed semantically valid
business records.

The generated Cypress scaffold requires real parameter values, request bodies,
and assertions before use. Run it only against a mock or test environment.
Cypress is a development dependency; its browser binary is not installed in CI.

Run `npm run check:mocks` after building to validate MSW success/error handling,
Faker object-array fixtures, and native mock requests through the SDK. Poolster emits native MSW handlers and Faker fixtures; the checks cover seeded
fixture generation, response decoding, errors and the native HTTP mock.
