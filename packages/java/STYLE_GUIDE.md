# Relevate Java SDK style guide

Package: `app.relevate.sdk`.

## Namespaced client

Operations are grouped by the first OpenAPI tag, falling back to a stable path resource. Use `client.contacts().get(input)`. Direct methods remain on `Client` for migration. This package was generated with `SdkClientStyle.Namespaced`.

## Pagination

A declared safe cursor or offset/limit contract adds `{operation}Pages(input)`, a lazy `Iterable` of the operation's normal response type. It reuses the ordinary operation for every page. Cursor inputs may be string query, header, or required path parameters; path cursors require an initial value under OpenAPI. Legacy offset/page inputs use optional direct integer query parameters; referenced integer control schemas do not receive helpers. declared `type: page` also accepts required integer query inputs and validates `outputs.results` against the response schema. Omitted pages default to 1 and offsets to 0; explicit zero is preserved. Results-based helpers stop on empty or short arrays, guard integer overflow, and reject negative inputs or nonpositive limits. Cursor and same-origin URL helpers stop on repeated continuations. Every helper stops after 10,000 pages. JSONPath field/array selectors and RFC 6901 pointers are supported. Body continuations stay explicit rather than being guessed.

## Media and streaming

Non-JSON success responses are returned as `byte[]`; non-JSON request bodies accept `byte[]`. A `text/event-stream` operation returns `Stream<String>` containing complete event data payloads (multiline data fields are joined with a newline; metadata and comments are ignored). Close that stream when finished.
