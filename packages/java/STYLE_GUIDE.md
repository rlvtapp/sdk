# Relevate Java SDK style guide

Package: `app.relevate.sdk`.

## Namespaced client

Operations are grouped by the first OpenAPI tag, falling back to a stable path resource. Use `client.contacts().get(input)`. Direct methods remain on `Client` for migration. This package was generated with `SdkClientStyle.Namespaced`.

## Pagination

A declared safe cursor or offset/limit contract adds `{operation}Pages(input)`, a lazy `Iterable` of the operation's normal response type. It reuses the ordinary operation for every page. Cursor inputs may be string query, header, or required path parameters; path cursors require an initial value under OpenAPI. Offset/page inputs remain optional integer query parameters. Body continuations stay explicit rather than being guessed.

## Media and streaming

Non-JSON success responses are returned as `byte[]`; non-JSON request bodies accept `byte[]`. A `text/event-stream` operation returns `Stream<String>` containing event data lines. Close that stream when finished.
