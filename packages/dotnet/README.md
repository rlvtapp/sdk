# Relevate.Sdk

Generated .NET 8 client for Relevate. This release selected the **namespaced** client style.

```csharp
using Poolster.RelevateSdk;

var client = new PoolsterClient(httpClient, new PoolsterClientOptions
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
await client.CRM.ListCrmListsAsync(/* typed arguments */);
```

The namespaced example applies to packages generated with `SdkClientStyle::Namespaced`; direct `PoolsterClient` methods remain available in that mode. See [STYLE_GUIDE.md](STYLE_GUIDE.md) for selection guidance.

## Runtime customization

Inject an `HttpClient` with a customer `DelegatingHandler`:

```csharp
sealed class CustomerPolicy : DelegatingHandler
{
    protected override async Task<HttpResponseMessage> SendAsync(
        HttpRequestMessage request, CancellationToken cancellationToken)
    {
        request.Headers.TryAddWithoutValidation("X-Customer", "customer-a");
        var response = await base.SendAsync(request, cancellationToken);
        response.Headers.TryAddWithoutValidation("X-Customer-Policy", "applied");
        return response;
    }
}

// Inside application setup:
var handler = new CustomerPolicy { InnerHandler = new HttpClientHandler() };
var httpClient = new HttpClient(handler);
// Pass httpClient to the PoolsterClient constructor shown above.
```

The handler can replace request URI, method and content before forwarding;
replace response status/content after forwarding; catch and translate transport
errors; or return a synthetic response without calling `base.SendAsync`. Preserve
cancellation and dispose any discarded response/content. Observer hooks do not
return replacement messages. The handler sees each transport attempt, including
SDK retries. Keep rewrites repeatable and preserve stream ownership when handling
streaming responses. Reuse the configured client for the application's lifetime.
