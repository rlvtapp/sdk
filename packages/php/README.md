# Relevate PHP SDK

Generated PHP 8.2+ SDK. See [STYLE_GUIDE.md](STYLE_GUIDE.md) for the selected public API.

```php
use Relevate\Sdk\Client;
```

```php
$client = new Client($httpClient, 'https://api.example.com', getenv('API_KEY'));
$contact = $client->contacts()->get($id);
```

## Runtime customization

Wrap the injected PSR-18 client to apply customer request and response policy:

```php
$policyClient = new class($httpClient) implements \Psr\Http\Client\ClientInterface {
    public function __construct(private \Psr\Http\Client\ClientInterface $next) {}
    public function sendRequest(\Psr\Http\Message\RequestInterface $request): \Psr\Http\Message\ResponseInterface {
        $request = $request->withHeader('X-Customer', 'customer-a');
        $response = $this->next->sendRequest($request);
        return $response->withHeader('X-Customer-Policy', 'applied');
    }
};
$client = new Client($policyClient, 'https://api.example.com', getenv('API_KEY'));
```

PSR-7 `withUri`, `withMethod` and `withBody` create replacement requests; return a
replacement response to rewrite its status/body or short circuit with a cached
PSR-7 response. Catch transport exceptions when translating customer errors,
preserving the PSR-18 exception interfaces for transport failures. Observer
callbacks do not return replacement messages. The decorator runs for each SDK
transport attempt, including retries. Preserve stream positions or replace the
stream when reading bodies; live SSE behavior depends on the chosen PSR-18 client.

## Pagination

Declared page-number operations expose `<operation>Pages(...)` as a lazy Generator, including resource facades. Values are complete response pages. Optional page controls start at 1; explicit 0 is preserved. Empty results or a page shorter than a positive limit terminate iteration. Required JSON body controls are copied without mutating the caller. Iteration is bounded to 10,000 pages with integer overflow checks. Invalid page declarations appear in `.poolster/pagination-diagnostics.json`. Existing cursor, offset/limit and same-origin URL continuation helpers retain their target-specific controls.
