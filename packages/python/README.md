# relevate-sdk

Generated Python SDK for Relevate. This package uses the `namespaced` client style. Kaji can emit direct flat operations or resource namespaces; the direct methods remain available in either mode.

```python
from relevate_sdk import Client

client = Client("https://api.example.com", api_key="…")
client.contacts.get(contact_id="contact_123")
```
