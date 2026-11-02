# .NET SDK style guide

This generated package selected the **namespaced** client layout. Both layouts retain the same models, authentication options, cancellation support, and typed return values.

## Flat

Use the direct operation methods when a compact client is preferable.

```csharp
using Poolster.RelevateSdk;

var client = new PoolsterClient(httpClient, options);
await client.ListCrmListsAsync(/* typed arguments */);
```

## Namespaced

Use resource properties to make a larger API easier to navigate. Poolster uses the first OpenAPI tag; if none is present, it derives the first useful path segment while skipping `v#`, `api`, and `email`.

```csharp
using Poolster.RelevateSdk;

var client = new PoolsterClient(httpClient, options);
await client.CRM.ListCrmListsAsync(/* typed arguments */);
```

## Pagination

Declared `type: page` and `type: offsetLimit` integer query inputs expose `OperationPagesAsync` on `PoolsterClient`. Page inputs default to 1 and offsets to 0 when omitted; explicit zero is preserved. Helpers yield normal response pages, stop on empty or short result arrays, check cancellation, guard overflow, and stop after 10,000 pages. Results selectors use the shared validated JSONPath or RFC 6901 pointer subset. Page/offset helpers require direct int32/int64 integer query schemas; unsupported locations, references, required nullable controls, and control-name collisions produce generation errors. Declared URL pagination supports absolute same-origin continuation URLs with loop detection; helpers require buffered JSON responses. Direct operation methods remain available.

## Media and streaming

Non-JSON success responses are returned as `byte[]`; non-JSON request bodies accept `byte[]`. A `text/event-stream` operation returns `IAsyncEnumerable<string>` containing complete event data payloads (multiline data fields are joined with a newline; metadata and comments are ignored).

Select the layout during generation with `SdkClientStyle::Flat` or `SdkClientStyle::Namespaced`. The original direct `PoolsterClient` methods remain available when the namespaced façade is selected.
