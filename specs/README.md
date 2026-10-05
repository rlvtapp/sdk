# Public API contract snapshot

`openapi.json` contains the combined public Relevate CRM and Email contract.
The public API exposes this document at `GET /v1/openapi.json`.

Import an updated JSON document with:

```sh
npm run spec:import -- /path/to/openapi.json
npm run generate
```

Generation is reproducible from the committed snapshot, the Kaji recipe,
and the locked generator dependency. CI does not fetch a live specification.
