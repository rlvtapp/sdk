# Elixir SDK style guide

This generated package selected the **namespaced** layout. Both options use the same normal `RelevateSdk.Client` value, Finch transport, and typed direct API functions.

## Flat

Use direct functions from the API module.

```elixir
{:ok, client} = RelevateSdk.client(base_url: "https://api.example.com")
{:ok, result} = RelevateSdk.API.list_crm_lists(client)
```

## Namespaced

Use resource modules to navigate larger APIs. Kaji uses the first OpenAPI tag; when tags are absent it derives the first useful path segment, skipping `v#`, `api`, and `email`.

```elixir
{:ok, client} = RelevateSdk.client(base_url: "https://api.example.com")
{:ok, result} = RelevateSdk.Resources.AuthCheck.list_crm_lists(client)
```

Select the layout during generation with `SdkClientStyle::Flat` or `SdkClientStyle::Namespaced`. Namespaced packages keep the direct `RelevateSdk.API` functions too.
