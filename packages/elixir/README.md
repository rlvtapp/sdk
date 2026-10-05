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
{:ok, result} = RelevateSdk.Resources.AuthCheck.list_crm_lists(client)
```

The namespaced example applies to packages generated with `SdkClientStyle::Namespaced`; direct `RelevateSdk.API` functions remain available in that mode. The client uses Finch, returns `{:ok, value}` on successful HTTP responses, and returns `{:error, reason}` for transport or non-2xx API errors. See [STYLE_GUIDE.md](STYLE_GUIDE.md) for selection guidance.
