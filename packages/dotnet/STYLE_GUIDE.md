# .NET SDK style guide

This generated package selected the **namespaced** client layout. Both layouts retain the same models, authentication options, cancellation support, and typed return values.

## Flat

Use the direct operation methods when a compact client is preferable.

```csharp
using Kaji.RelevateSdk;

var client = new KajiClient(httpClient, options);
await client.ListCrmListsAsync(/* typed arguments */);
```

## Namespaced

Use resource properties to make a larger API easier to navigate. Kaji uses the first OpenAPI tag; if none is present, it derives the first useful path segment while skipping `v#`, `api`, and `email`.

```csharp
using Kaji.RelevateSdk;

var client = new KajiClient(httpClient, options);
await client.AuthCheck.ListCrmListsAsync(/* typed arguments */);
```

## Media and streaming

Non-JSON success responses are returned as `byte[]`; non-JSON request bodies accept `byte[]`. A `text/event-stream` operation returns `IAsyncEnumerable<string>` containing event data lines.

Select the layout during generation with `SdkClientStyle::Flat` or `SdkClientStyle::Namespaced`. The original direct `KajiClient` methods remain available when the namespaced façade is selected.
