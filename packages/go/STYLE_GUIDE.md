# Relevate Go SDK styles

Kaji supports two stable client surfaces:

- `SdkClientStyle::Flat`: `client.GetContact(ctx, input)`
- `SdkClientStyle::Namespaced`: `client.Contacts.Get(ctx, input)`

The namespaced surface is initialized by `NewClient` and delegates to the same typed operation methods, so both styles can coexist during migration.

```go
client, err := NewClient(ClientConfig{BaseURL: "https://api.example.com"})
if err != nil { panic(err) }
contact, err := client.Contacts.Get(ctx, &GetContactRequest{})
_ = contact
_ = err
```
