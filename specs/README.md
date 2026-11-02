# Public API contract snapshot

`openapi.json` contains the combined public Relevate CRM, Email and Schedule contract.
The public API exposes this document at `GET /openapi.json`.

Import an updated JSON document with:

```sh
npm run spec:import -- /path/to/openapi.json
npm run generate
```

Generation is reproducible from the committed snapshot, the Poolster recipe,
and the locked generator dependency. CI does not fetch a live specification.

Snapshot refreshed from https://relevate-email-delivery.fly.dev/openapi.json on 2026-11-02. It includes 154 operations and the `EmailTemplate` schema with nested `variables`.
