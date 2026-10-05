# relevate-sdk

Generated Java 17+ SDK for Relevate. See [STYLE_GUIDE.md](STYLE_GUIDE.md) for the selected public API.

```java
import app.relevate.sdk.Client;
import app.relevate.sdk.ClientConfig;

var client = new Client(new ClientConfig("https://api.example.com", System.getenv("API_KEY")));
client.contacts().get(new Client.GetContactRequest(id));
```

The package supports both Gradle (`build.gradle`) and Maven (`pom.xml`).
