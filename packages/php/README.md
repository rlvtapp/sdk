# Relevate PHP SDK

Generated PHP 8.2+ SDK. See [STYLE_GUIDE.md](STYLE_GUIDE.md) for the selected public API.

```php
use Relevate\Sdk\Client;
```

```php
$client = new Client($httpClient, 'https://api.example.com', getenv('API_KEY'));
$contact = $client->contacts()->get($id);
```
