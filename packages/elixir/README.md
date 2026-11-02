# relevate-sdk

Generated Elixir SDK for Relevate. This release selected the **namespaced** client style.

```elixir
{:ok, client} = RelevateSdk.client(base_url: "https://api.example.com", api_key: System.get_env("API_KEY"))
```

## Flat client

```elixir
{:ok, result} = RelevateSdk.API.list_crm_lists(client)
```

## Namespaced client

```elixir
{:ok, result} = RelevateSdk.Resources.CRM.list_crm_lists(client)
```

The namespaced example applies to packages generated with `SdkClientStyle::Namespaced`; direct `RelevateSdk.API` functions remain available in that mode. The client uses Finch, returns `{:ok, value}` on successful HTTP responses, and returns `{:error, reason}` for transport or non-2xx API errors. See [STYLE_GUIDE.md](STYLE_GUIDE.md) for selection guidance.

## Customer middleware

```elixir
customer_header = fn request, next ->
  request = %{request | headers: [{"x-customer", "example"} | request.headers]}
  case next.(request) do
    {:ok, response} -> {:ok, response} # inspect or replace a Finch.Response
    {:error, reason} -> {:error, reason} # inspect, recover, or propagate
  end
end
{:ok, client} = RelevateSdk.client(
  base_url: "https://api.example.com", middleware: [customer_header])
```

The first middleware is outermost; requests run forward and responses return backward. Layers receive encoded `Finch.Request` values and can return `{:ok, %Finch.Response{}}` without invoking `next`. Optional `transport: fn request, options -> ... end` replaces execution; the default uses the configured Finch pool. Middleware executes once per SDK retry attempt, so avoid independently replaying unsafe requests. Status/decoding classification happens afterwards; lifecycle callbacks are separate notifications.

SSE uses an independent `stream_transport: fn request, options, accumulator, callback -> ... end` returning Finch-compatible stream results and delivering `{:status, code}`, `{:headers, headers}`, and `{:data, binary}` through `callback`. Buffered middleware does not process SSE frames. Decorate that callback to transform events, retaining cancellation/task lifetime behavior.
