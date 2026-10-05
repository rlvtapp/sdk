# Relevate Python SDK styles

Kaji supports two stable client surfaces:

- `SdkClientStyle::Flat`: `client.get_contact(contact_id=...)`
- `SdkClientStyle::Namespaced`: `client.contacts.get(contact_id=...)`

The namespaced attributes are initialized by `Client` and delegate to the same typed direct operations, so both styles can coexist during migration.

```python
from relevate_sdk import Client

client = Client("https://api.example.com", api_key="…")
contact = client.contacts.get(contact_id="contact_123")
```
