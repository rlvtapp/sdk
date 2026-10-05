# Relevate PHP SDK style guide

Namespace: `Relevate\Sdk`.

## Namespaced client

Operations are grouped by their first OpenAPI tag, falling back to the stable path resource. Use `$client->contacts()->get($id)`. Direct methods remain available on `Client` for migration.

The generator was invoked with `SdkClientStyle::Namespaced`.

## Streaming

Operations declared as `text/event-stream` return a PSR-7 `StreamInterface`. Kaji does not buffer, decode, or reconnect this stream: PSR-18 does not guarantee that every client implementation exposes a live socket. Choose a stream-capable PSR-18 client when live SSE delivery is required, and implement event decoding/reconnection (including any `Last-Event-ID` policy) in the application.
