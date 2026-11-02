# relevate-sdk

Generated Java 17+ SDK for Relevate. See [STYLE_GUIDE.md](STYLE_GUIDE.md) for the selected public API.

```java
import app.relevate.sdk.Client;
import app.relevate.sdk.ClientConfig;

var client = new Client(new ClientConfig("https://api.example.com", System.getenv("API_KEY")));
client.contacts().get(new Client.GetContactRequest(id));
```

The package supports both Gradle (`build.gradle`) and Maven (`pom.xml`).

## Runtime customization

Supply a customer-owned `java.net.http.HttpClient` in `ClientConfig`:

```java
var config = new ClientConfig(
    "https://api.example.com", System.getenv("API_KEY"),
    "Authorization", "Bearer", java.util.Map.of(), customerHttpClient,
    java.time.Duration.ofSeconds(30), RetryConfig.defaults(), null);
var client = new Client(config);
```

`customerHttpClient` can be a delegating `HttpClient` subclass. Implement its
abstract methods, forward client configuration and both `sendAsync` overloads,
and wrap `send(request, bodyHandler)` (the path used by this SDK). Rebuild an
immutable request with `HttpRequest.newBuilder(request, (name, value) -> true)`
to change headers, method, URI or body before forwarding. Return a replacement
`HttpResponse<T>` to rewrite a response or short circuit, preserving the supplied
body handler's `T` representation. Catch and translate transport failures while
preserving interruption. Observer hooks do not return replacement requests or
responses. The decorator sees each transport attempt, including SDK retries;
keep rewrites repeatable and avoid consuming streaming bodies during inspection.
