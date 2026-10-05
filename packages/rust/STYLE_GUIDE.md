# Relevate Rust SDK style guide

Call operations through resource accessors, such as `client.contacts().list().await`. Direct operation methods are also exposed on `Client`.

Operations with path, query, or header parameters accept typed request structs. Supply parameter values rather than a completed URL; the client escapes path segments and serializes query values. Request bodies are passed separately.
