# Relevate.Sdk

Generated .NET 8 client for Relevate. This release selected the **namespaced** client style.

```csharp
using Kaji.RelevateSdk;

var client = new KajiClient(httpClient, new KajiClientOptions
{
    BaseUrl = "https://api.example.com",
    ApiKey = Environment.GetEnvironmentVariable("API_KEY"),
});
```

## Flat client

```csharp
await client.ListCrmListsAsync(/* typed arguments */);
```

## Namespaced client

```csharp
await client.AuthCheck.ListCrmListsAsync(/* typed arguments */);
```

The namespaced example applies to packages generated with `SdkClientStyle::Namespaced`; direct `KajiClient` methods remain available in that mode. See [STYLE_GUIDE.md](STYLE_GUIDE.md) for selection guidance.
