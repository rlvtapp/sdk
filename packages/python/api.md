# Relevate Python API reference

Direct methods remain available on both flat and namespaced clients.

## `list_crm_lists`

`GET /v1/crm/lists`

```python
Client.list_crm_lists(self, *, limit: int | None = None, after: str | None = None, object_id: str | None = None) -> CrmListsPage
```

- Response `200`: Success; data contains the result and paginated reads include page.limit and page.next_cursor.
- Response `400`: Invalid values or definition
- Response `401`: API key missing or invalid
- Response `403`: CRM permission required or workspace CRM disabled
- Response `404`: Not found in this workspace or parent object disabled
- Response `409`: Duplicate entry, archived record, or enabled workflow dependency
- Response `413`: Request body too large
- Response `415`: Unsupported content type
- Response `503`: Storage temporarily unavailable

## `create_crm_list`

`POST /v1/crm/lists`

```python
Client.create_crm_list(self, *, body: CrmCreateList) -> CrmListResponse
```

- Response `201`: Created
- Response `400`: Invalid values or definition
- Response `401`: API key missing or invalid
- Response `403`: CRM permission required or workspace CRM disabled
- Response `404`: Not found in this workspace or parent object disabled
- Response `409`: Duplicate entry, archived record, or enabled workflow dependency
- Response `413`: Request body too large
- Response `415`: Unsupported content type
- Response `503`: Storage temporarily unavailable

## `delete_crm_list`

`DELETE /v1/crm/lists/{list}`

```python
Client.delete_crm_list(self, *, list: str) -> CrmListDeletionResponse
```

- Response `200`: Success; data contains the result and paginated reads include page.limit and page.next_cursor.
- Response `400`: Invalid values or definition
- Response `401`: API key missing or invalid
- Response `403`: CRM permission required or workspace CRM disabled
- Response `404`: Not found in this workspace or parent object disabled
- Response `409`: Duplicate entry, archived record, or enabled workflow dependency
- Response `413`: Request body too large
- Response `415`: Unsupported content type
- Response `503`: Storage temporarily unavailable

## `get_crm_list`

`GET /v1/crm/lists/{list}`

```python
Client.get_crm_list(self, *, list: str) -> CrmListResponse
```

- Response `200`: Success; data contains the result and paginated reads include page.limit and page.next_cursor.
- Response `400`: Invalid values or definition
- Response `401`: API key missing or invalid
- Response `403`: CRM permission required or workspace CRM disabled
- Response `404`: Not found in this workspace or parent object disabled
- Response `409`: Duplicate entry, archived record, or enabled workflow dependency
- Response `413`: Request body too large
- Response `415`: Unsupported content type
- Response `503`: Storage temporarily unavailable

## `update_crm_list`

`PATCH /v1/crm/lists/{list}`

```python
Client.update_crm_list(self, *, list: str, body: CrmUpdateList) -> CrmListResponse
```

- Response `200`: Success; data contains the result and paginated reads include page.limit and page.next_cursor.
- Response `400`: Invalid values or definition
- Response `401`: API key missing or invalid
- Response `403`: CRM permission required or workspace CRM disabled
- Response `404`: Not found in this workspace or parent object disabled
- Response `409`: Duplicate entry, archived record, or enabled workflow dependency
- Response `413`: Request body too large
- Response `415`: Unsupported content type
- Response `503`: Storage temporarily unavailable

## `list_crm_list_attributes`

`GET /v1/crm/lists/{list}/attributes`

```python
Client.list_crm_list_attributes(self, *, list: str) -> CrmMetadataAttributesResponse
```

- Response `200`: Success
- Response `400`: Invalid request
- Response `401`: Missing or invalid API key
- Response `403`: Required CRM permission unavailable
- Response `404`: Resource unavailable in this workspace
- Response `409`: Conflict with existing data or dependencies
- Response `413`: Request body too large
- Response `415`: Unsupported content type
- Response `503`: Storage temporarily unavailable

## `create_crm_list_attribute`

`POST /v1/crm/lists/{list}/attributes`

```python
Client.create_crm_list_attribute(self, *, list: str, body: CrmAttributeCreate) -> CrmMetadataAttributeResponse
```

- Response `201`: Success
- Response `400`: Invalid request
- Response `401`: Missing or invalid API key
- Response `403`: Required CRM permission unavailable
- Response `404`: Resource unavailable in this workspace
- Response `409`: Conflict with existing data or dependencies
- Response `413`: Request body too large
- Response `415`: Unsupported content type
- Response `503`: Storage temporarily unavailable

## `delete_crm_list_attribute`

`DELETE /v1/crm/lists/{list}/attributes/{attribute}`

```python
Client.delete_crm_list_attribute(self, *, list: str, attribute: str) -> CrmMetadataDeleted
```

- Response `200`: Success
- Response `400`: Invalid request
- Response `401`: Missing or invalid API key
- Response `403`: Required CRM permission unavailable
- Response `404`: Resource unavailable in this workspace
- Response `409`: Conflict with existing data or dependencies
- Response `413`: Request body too large
- Response `415`: Unsupported content type
- Response `503`: Storage temporarily unavailable

## `update_crm_list_attribute`

`PATCH /v1/crm/lists/{list}/attributes/{attribute}`

```python
Client.update_crm_list_attribute(self, *, list: str, attribute: str, body: CrmAttributePatch) -> CrmMetadataAttributeResponse
```

- Response `200`: Success
- Response `400`: Invalid request
- Response `401`: Missing or invalid API key
- Response `403`: Required CRM permission unavailable
- Response `404`: Resource unavailable in this workspace
- Response `409`: Conflict with existing data or dependencies
- Response `413`: Request body too large
- Response `415`: Unsupported content type
- Response `503`: Storage temporarily unavailable

## `list_crm_list_entries`

`GET /v1/crm/lists/{list}/entries`

```python
Client.list_crm_list_entries(self, *, list: str, limit: int | None = None, after: str | None = None) -> CrmListEntriesPage
```

- Response `200`: Success; data contains the result and paginated reads include page.limit and page.next_cursor.
- Response `400`: Invalid values or definition
- Response `401`: API key missing or invalid
- Response `403`: CRM permission required or workspace CRM disabled
- Response `404`: Not found in this workspace or parent object disabled
- Response `409`: Duplicate entry, archived record, or enabled workflow dependency
- Response `413`: Request body too large
- Response `415`: Unsupported content type
- Response `503`: Storage temporarily unavailable

## `create_crm_list_entry`

`POST /v1/crm/lists/{list}/entries`

```python
Client.create_crm_list_entry(self, *, list: str, body: CrmCreateListEntry) -> CrmListEntryResponse
```

- Response `201`: Created
- Response `400`: Invalid values or definition
- Response `401`: API key missing or invalid
- Response `403`: CRM permission required or workspace CRM disabled
- Response `404`: Not found in this workspace or parent object disabled
- Response `409`: Duplicate entry, archived record, or enabled workflow dependency
- Response `413`: Request body too large
- Response `415`: Unsupported content type
- Response `503`: Storage temporarily unavailable

## `delete_crm_list_entry`

`DELETE /v1/crm/lists/{list}/entries/{entry}`

```python
Client.delete_crm_list_entry(self, *, list: str, entry: str) -> CrmListDeletionResponse
```

- Response `200`: Success; data contains the result and paginated reads include page.limit and page.next_cursor.
- Response `400`: Invalid values or definition
- Response `401`: API key missing or invalid
- Response `403`: CRM permission required or workspace CRM disabled
- Response `404`: Not found in this workspace or parent object disabled
- Response `409`: Duplicate entry, archived record, or enabled workflow dependency
- Response `413`: Request body too large
- Response `415`: Unsupported content type
- Response `503`: Storage temporarily unavailable

## `get_crm_list_entry`

`GET /v1/crm/lists/{list}/entries/{entry}`

```python
Client.get_crm_list_entry(self, *, list: str, entry: str) -> CrmListEntryResponse
```

- Response `200`: Success; data contains the result and paginated reads include page.limit and page.next_cursor.
- Response `400`: Invalid values or definition
- Response `401`: API key missing or invalid
- Response `403`: CRM permission required or workspace CRM disabled
- Response `404`: Not found in this workspace or parent object disabled
- Response `409`: Duplicate entry, archived record, or enabled workflow dependency
- Response `413`: Request body too large
- Response `415`: Unsupported content type
- Response `503`: Storage temporarily unavailable

## `update_crm_list_entry`

`PATCH /v1/crm/lists/{list}/entries/{entry}`

```python
Client.update_crm_list_entry(self, *, list: str, entry: str, body: CrmUpdateListEntry) -> CrmListEntryResponse
```

- Response `200`: Success; data contains the result and paginated reads include page.limit and page.next_cursor.
- Response `400`: Invalid values or definition
- Response `401`: API key missing or invalid
- Response `403`: CRM permission required or workspace CRM disabled
- Response `404`: Not found in this workspace or parent object disabled
- Response `409`: Duplicate entry, archived record, or enabled workflow dependency
- Response `413`: Request body too large
- Response `415`: Unsupported content type
- Response `503`: Storage temporarily unavailable

## `delete_crm_note`

`DELETE /v1/crm/notes/{note_id}`

```python
Client.delete_crm_note(self, *, note_id: str) -> dict[str, Any]
```

- Response `200`: Successful operation
- Response `400`: Operation rejected or unavailable
- Response `401`: Operation rejected or unavailable
- Response `403`: Operation rejected or unavailable
- Response `404`: Operation rejected or unavailable
- Response `409`: Operation rejected or unavailable
- Response `413`: Request body too large
- Response `415`: Unsupported content type
- Response `503`: Operation rejected or unavailable

## `get_crm_note`

`GET /v1/crm/notes/{note_id}`

```python
Client.get_crm_note(self, *, note_id: str) -> dict[str, Any]
```

- Response `200`: Successful operation
- Response `400`: Operation rejected or unavailable
- Response `401`: Operation rejected or unavailable
- Response `403`: Operation rejected or unavailable
- Response `404`: Operation rejected or unavailable
- Response `409`: Operation rejected or unavailable
- Response `413`: Request body too large
- Response `415`: Unsupported content type
- Response `503`: Operation rejected or unavailable

## `update_crm_note`

`PATCH /v1/crm/notes/{note_id}`

```python
Client.update_crm_note(self, *, note_id: str, body: CrmNoteWrite) -> dict[str, Any]
```

- Response `200`: Successful operation
- Response `400`: Operation rejected or unavailable
- Response `401`: Operation rejected or unavailable
- Response `403`: Operation rejected or unavailable
- Response `404`: Operation rejected or unavailable
- Response `409`: Operation rejected or unavailable
- Response `413`: Request body too large
- Response `415`: Unsupported content type
- Response `503`: Operation rejected or unavailable

## `list_crm_objects`

`GET /v1/crm/objects`

```python
Client.list_crm_objects(self, *, limit: int | None = None, after: str | None = None, include_disabled: bool | None = None) -> dict[str, Any]
```

- Response `200`: Object page
- Response `400`: Invalid request
- Response `401`: Invalid API key
- Response `403`: CRM read permission required
- Response `404`: Resource unavailable in this workspace
- Response `409`: Conflict with existing data or dependencies
- Response `413`: Request body too large
- Response `415`: Unsupported content type
- Response `503`: Storage temporarily unavailable

## `create_crm_object`

`POST /v1/crm/objects`

```python
Client.create_crm_object(self, *, body: CrmObjectCreate) -> CrmMetadataObjectResponse
```

- Response `201`: Success
- Response `400`: Invalid request
- Response `401`: Missing or invalid API key
- Response `403`: Required CRM permission unavailable
- Response `404`: Resource unavailable in this workspace
- Response `409`: Conflict with existing data or dependencies
- Response `413`: Request body too large
- Response `415`: Unsupported content type
- Response `503`: Storage temporarily unavailable

## `delete_crm_object`

`DELETE /v1/crm/objects/{object}`

```python
Client.delete_crm_object(self, *, object: str, body: CrmObjectDelete) -> CrmMetadataDeleted
```

- Response `200`: Success
- Response `400`: Invalid request
- Response `401`: Missing or invalid API key
- Response `403`: Required CRM permission unavailable
- Response `404`: Resource unavailable in this workspace
- Response `409`: Conflict with existing data or dependencies
- Response `413`: Request body too large
- Response `415`: Unsupported content type
- Response `503`: Storage temporarily unavailable

## `get_crm_object`

`GET /v1/crm/objects/{object}`

```python
Client.get_crm_object(self, *, object: str) -> dict[str, Any]
```

- Response `200`: Object and attributes
- Response `400`: Invalid request
- Response `401`: Invalid API key
- Response `403`: CRM read permission required
- Response `404`: Object unavailable
- Response `409`: Conflict with existing data or dependencies
- Response `413`: Request body too large
- Response `415`: Unsupported content type
- Response `503`: Storage temporarily unavailable

## `update_crm_object`

`PATCH /v1/crm/objects/{object}`

```python
Client.update_crm_object(self, *, object: str, body: CrmObjectPatch) -> CrmMetadataObjectResponse
```

- Response `200`: Success
- Response `400`: Invalid request
- Response `401`: Missing or invalid API key
- Response `403`: Required CRM permission unavailable
- Response `404`: Resource unavailable in this workspace
- Response `409`: Conflict with existing data or dependencies
- Response `413`: Request body too large
- Response `415`: Unsupported content type
- Response `503`: Storage temporarily unavailable

## `list_crm_object_attributes`

`GET /v1/crm/objects/{object}/attributes`

```python
Client.list_crm_object_attributes(self, *, object: str) -> CrmMetadataAttributesResponse
```

- Response `200`: Success
- Response `400`: Invalid request
- Response `401`: Missing or invalid API key
- Response `403`: Required CRM permission unavailable
- Response `404`: Resource unavailable in this workspace
- Response `409`: Conflict with existing data or dependencies
- Response `413`: Request body too large
- Response `415`: Unsupported content type
- Response `503`: Storage temporarily unavailable

## `create_crm_object_attribute`

`POST /v1/crm/objects/{object}/attributes`

```python
Client.create_crm_object_attribute(self, *, object: str, body: CrmAttributeCreate) -> CrmMetadataAttributeResponse
```

- Response `201`: Success
- Response `400`: Invalid request
- Response `401`: Missing or invalid API key
- Response `403`: Required CRM permission unavailable
- Response `404`: Resource unavailable in this workspace
- Response `409`: Conflict with existing data or dependencies
- Response `413`: Request body too large
- Response `415`: Unsupported content type
- Response `503`: Storage temporarily unavailable

## `delete_crm_object_attribute`

`DELETE /v1/crm/objects/{object}/attributes/{attribute}`

```python
Client.delete_crm_object_attribute(self, *, object: str, attribute: str) -> CrmMetadataDeleted
```

- Response `200`: Success
- Response `400`: Invalid request
- Response `401`: Missing or invalid API key
- Response `403`: Required CRM permission unavailable
- Response `404`: Resource unavailable in this workspace
- Response `409`: Conflict with existing data or dependencies
- Response `413`: Request body too large
- Response `415`: Unsupported content type
- Response `503`: Storage temporarily unavailable

## `update_crm_object_attribute`

`PATCH /v1/crm/objects/{object}/attributes/{attribute}`

```python
Client.update_crm_object_attribute(self, *, object: str, attribute: str, body: CrmAttributePatch) -> CrmMetadataAttributeResponse
```

- Response `200`: Success
- Response `400`: Invalid request
- Response `401`: Missing or invalid API key
- Response `403`: Required CRM permission unavailable
- Response `404`: Resource unavailable in this workspace
- Response `409`: Conflict with existing data or dependencies
- Response `413`: Request body too large
- Response `415`: Unsupported content type
- Response `503`: Storage temporarily unavailable

## `preview_crm_object_deletion`

`GET /v1/crm/objects/{object}/deletion-preview`

```python
Client.preview_crm_object_deletion(self, *, object: str) -> CrmObjectDeletionPreview
```

- Response `200`: Success
- Response `400`: Invalid request
- Response `401`: Missing or invalid API key
- Response `403`: Required CRM permission unavailable
- Response `404`: Resource unavailable in this workspace
- Response `409`: Conflict with existing data or dependencies
- Response `413`: Request body too large
- Response `415`: Unsupported content type
- Response `503`: Storage temporarily unavailable

## `get_crm_object_quality`

`GET /v1/crm/objects/{object}/quality`

```python
Client.get_crm_object_quality(self, *, object: str, limit: int | None = None, after: str | None = None, include_archived: bool | None = None) -> CrmQualityResponse
```

- Response `200`: Full-source summary and paginated actionable records; source limit 10000
- Response `400`: Invalid request
- Response `401`: Missing or invalid API key
- Response `403`: Required CRM permission unavailable
- Response `404`: Resource unavailable in this workspace
- Response `409`: Conflict with existing data or dependencies
- Response `413`: Request body too large
- Response `415`: Unsupported content type
- Response `503`: Storage temporarily unavailable

## `list_crm_records`

`GET /v1/crm/objects/{object}/records`

```python
Client.list_crm_records(self, *, object: str, limit: int | None = None, after: str | None = None, external_id: str | None = None, include_archived: bool | None = None) -> dict[str, Any]
```

- Response `200`: Successful operation
- Response `400`: Invalid request or field values
- Response `401`: Missing or invalid API key
- Response `403`: Required CRM permission unavailable
- Response `404`: Resource unavailable
- Response `409`: External identity conflict or archived record
- Response `413`: Request body too large
- Response `415`: Unsupported content type
- Response `503`: Storage temporarily unavailable

## `create_crm_record`

`POST /v1/crm/objects/{object}/records`

```python
Client.create_crm_record(self, *, object: str, body: CrmRecordCreate) -> CrmRecordResponse
```

- Response `201`: Successful operation
- Response `400`: Invalid request or field values
- Response `401`: Missing or invalid API key
- Response `403`: Required CRM permission unavailable
- Response `404`: Resource unavailable
- Response `409`: External identity conflict or archived record
- Response `413`: Request body too large
- Response `415`: Unsupported content type
- Response `503`: Storage temporarily unavailable

## `upsert_crm_record`

`POST /v1/crm/objects/{object}/records/upsert`

```python
Client.upsert_crm_record(self, *, object: str, body: CrmUpsert) -> CrmRecordResponse
```

- Response `200`: Successful operation
- Response `201`: Successful operation
- Response `400`: Invalid request or field values
- Response `401`: Missing or invalid API key
- Response `403`: Required CRM permission unavailable
- Response `404`: Resource unavailable
- Response `409`: External identity conflict or archived record
- Response `413`: Request body too large
- Response `415`: Unsupported content type
- Response `503`: Storage temporarily unavailable

## `archive_crm_record`

`DELETE /v1/crm/records/{record_id}`

```python
Client.archive_crm_record(self, *, record_id: str) -> CrmRecordResponse
```

- Response `200`: Successful operation
- Response `400`: Invalid request or field values
- Response `401`: Missing or invalid API key
- Response `403`: Required CRM permission unavailable
- Response `404`: Resource unavailable
- Response `409`: External identity conflict or archived record
- Response `413`: Request body too large
- Response `415`: Unsupported content type
- Response `503`: Storage temporarily unavailable

## `get_crm_record`

`GET /v1/crm/records/{record_id}`

```python
Client.get_crm_record(self, *, record_id: str) -> CrmRecordResponse
```

- Response `200`: Successful operation
- Response `400`: Invalid request or field values
- Response `401`: Missing or invalid API key
- Response `403`: Required CRM permission unavailable
- Response `404`: Resource unavailable
- Response `409`: External identity conflict or archived record
- Response `413`: Request body too large
- Response `415`: Unsupported content type
- Response `503`: Storage temporarily unavailable

## `update_crm_record`

`PATCH /v1/crm/records/{record_id}`

```python
Client.update_crm_record(self, *, record_id: str, body: CrmRecordPatch) -> CrmRecordResponse
```

- Response `200`: Successful operation
- Response `400`: Invalid request or field values
- Response `401`: Missing or invalid API key
- Response `403`: Required CRM permission unavailable
- Response `404`: Resource unavailable
- Response `409`: External identity conflict or archived record
- Response `413`: Request body too large
- Response `415`: Unsupported content type
- Response `503`: Storage temporarily unavailable

## `list_crm_activities`

`GET /v1/crm/records/{record_id}/activities`

```python
Client.list_crm_activities(self, *, record_id: str, limit: int | None = None, after: str | None = None) -> dict[str, Any]
```

- Response `200`: Successful operation
- Response `400`: Operation rejected or unavailable
- Response `401`: Operation rejected or unavailable
- Response `403`: Operation rejected or unavailable
- Response `404`: Operation rejected or unavailable
- Response `409`: Operation rejected or unavailable
- Response `413`: Request body too large
- Response `415`: Unsupported content type
- Response `503`: Operation rejected or unavailable

## `list_crm_notes`

`GET /v1/crm/records/{record_id}/notes`

```python
Client.list_crm_notes(self, *, record_id: str, limit: int | None = None, after: str | None = None) -> dict[str, Any]
```

- Response `200`: Successful operation
- Response `400`: Operation rejected or unavailable
- Response `401`: Operation rejected or unavailable
- Response `403`: Operation rejected or unavailable
- Response `404`: Operation rejected or unavailable
- Response `409`: Operation rejected or unavailable
- Response `413`: Request body too large
- Response `415`: Unsupported content type
- Response `503`: Operation rejected or unavailable

## `create_crm_note`

`POST /v1/crm/records/{record_id}/notes`

```python
Client.create_crm_note(self, *, record_id: str, body: CrmNoteWrite) -> dict[str, Any]
```

- Response `201`: Successful operation
- Response `400`: Operation rejected or unavailable
- Response `401`: Operation rejected or unavailable
- Response `403`: Operation rejected or unavailable
- Response `404`: Operation rejected or unavailable
- Response `409`: Operation rejected or unavailable
- Response `413`: Request body too large
- Response `415`: Unsupported content type
- Response `503`: Operation rejected or unavailable

## `list_crm_tasks`

`GET /v1/crm/records/{record_id}/tasks`

```python
Client.list_crm_tasks(self, *, record_id: str, limit: int | None = None, after: str | None = None) -> dict[str, Any]
```

- Response `200`: Successful operation
- Response `400`: Operation rejected or unavailable
- Response `401`: Operation rejected or unavailable
- Response `403`: Operation rejected or unavailable
- Response `404`: Operation rejected or unavailable
- Response `409`: Operation rejected or unavailable
- Response `413`: Request body too large
- Response `415`: Unsupported content type
- Response `503`: Operation rejected or unavailable

## `create_crm_task`

`POST /v1/crm/records/{record_id}/tasks`

```python
Client.create_crm_task(self, *, record_id: str, body: CrmTaskCreate) -> dict[str, Any]
```

- Response `201`: Successful operation
- Response `400`: Operation rejected or unavailable
- Response `401`: Operation rejected or unavailable
- Response `403`: Operation rejected or unavailable
- Response `404`: Operation rejected or unavailable
- Response `409`: Operation rejected or unavailable
- Response `413`: Request body too large
- Response `415`: Unsupported content type
- Response `503`: Operation rejected or unavailable

## `delete_crm_task`

`DELETE /v1/crm/tasks/{task_id}`

```python
Client.delete_crm_task(self, *, task_id: str) -> dict[str, Any]
```

- Response `200`: Successful operation
- Response `400`: Operation rejected or unavailable
- Response `401`: Operation rejected or unavailable
- Response `403`: Operation rejected or unavailable
- Response `404`: Operation rejected or unavailable
- Response `409`: Operation rejected or unavailable
- Response `413`: Request body too large
- Response `415`: Unsupported content type
- Response `503`: Operation rejected or unavailable

## `get_crm_task`

`GET /v1/crm/tasks/{task_id}`

```python
Client.get_crm_task(self, *, task_id: str) -> dict[str, Any]
```

- Response `200`: Successful operation
- Response `400`: Operation rejected or unavailable
- Response `401`: Operation rejected or unavailable
- Response `403`: Operation rejected or unavailable
- Response `404`: Operation rejected or unavailable
- Response `409`: Operation rejected or unavailable
- Response `413`: Request body too large
- Response `415`: Unsupported content type
- Response `503`: Operation rejected or unavailable

## `update_crm_task`

`PATCH /v1/crm/tasks/{task_id}`

```python
Client.update_crm_task(self, *, task_id: str, body: CrmTaskPatch) -> dict[str, Any]
```

- Response `200`: Successful operation
- Response `400`: Operation rejected or unavailable
- Response `401`: Operation rejected or unavailable
- Response `403`: Operation rejected or unavailable
- Response `404`: Operation rejected or unavailable
- Response `409`: Operation rejected or unavailable
- Response `413`: Request body too large
- Response `415`: Unsupported content type
- Response `503`: Operation rejected or unavailable

## `auth_check`

`GET /v1/email/auth-check`

```python
Client.auth_check(self) -> AuthCheckResponse
```

- Response `200`: The API key is valid for reading this Email project.
- Response `401`: Missing, invalid, expired or environment-mismatched API key.
- Response `403`: The key lacks email:read or project scope.
- Response `503`: Authentication storage is temporarily unavailable.

## `list_contacts`

`GET /v1/email/contacts`

```python
Client.list_contacts(self, *, limit: int | None = None) -> ContactListResponse
```

- Response `200`: A bounded list of contacts.
- Response `401`: Missing or invalid API key.
- Response `503`: Storage unavailable.

## `create_contact`

`POST /v1/email/contacts`

```python
Client.create_contact(self, *, body: CreateContact) -> ContactResponse
```

- Response `201`: A contact was created or merged by normalized email.
- Response `401`: Missing or invalid API key.
- Response `422`: The contact input is invalid.
- Response `503`: Storage unavailable.

## `query_contacts`

`POST /v1/email/contacts/query`

```python
Client.query_contacts(self, *, body: ContactQuery) -> ContactQueryResponse
```

- Response `200`: A filtered, bounded page of contacts.
- Response `401`: Missing or invalid API key.
- Response `422`: The filter or page is invalid.
- Response `503`: Storage unavailable.

## `get_contact`

`GET /v1/email/contacts/{id}`

```python
Client.get_contact(self, *, id: str) -> ContactResponse
```

- Response `200`: A contact.
- Response `401`: Missing or invalid API key.
- Response `404`: Contact not found.
- Response `503`: Storage unavailable.

## `update_contact`

`PATCH /v1/email/contacts/{id}`

```python
Client.update_contact(self, *, id: str, body: UpdateContact) -> ContactResponse
```

- Response `200`: The updated contact. Address, consent, blocking and suppression are not publicly mutable.
- Response `401`: Missing or invalid API key.
- Response `404`: Contact not found.
- Response `422`: The contact patch is invalid.
- Response `503`: Storage unavailable.

## `list_domains`

`GET /v1/email/domains`

```python
Client.list_domains(self, *, limit: int | None = None) -> DomainListResponse
```

- Response `200`: Verified sending domains.
- Response `401`: Missing or invalid API key.
- Response `503`: Storage unavailable.

## `get_domain`

`GET /v1/email/domains/{id}`

```python
Client.get_domain(self, *, id: str) -> DomainResponse
```

- Response `200`: A verified sending domain.
- Response `401`: Missing or invalid API key.
- Response `404`: Domain not found.
- Response `503`: Storage unavailable.

## `track`

`POST /v1/email/events`

```python
Client.track(self, *, body: TrackEventRequest) -> EventResponse
```

- Response `202`: The event was durably recorded.
- Response `401`: Missing or invalid API key.
- Response `403`: The key cannot write events for this Email project.
- Response `409`: The idempotency key was reused with different input.
- Response `422`: The event is invalid.
- Response `503`: Event storage is temporarily unavailable.

## `list_inbound`

`GET /v1/email/inbound`

```python
Client.list_inbound(self, *, limit: int | None = None) -> InboundListResponse
```

- Response `200`: Safely parsed inbound messages. Raw MIME is never exposed.
- Response `401`: Missing or invalid API key.
- Response `422`: The page is invalid.
- Response `503`: Storage unavailable.

## `get_inbound`

`GET /v1/email/inbound/{message_id}`

```python
Client.get_inbound(self, *, message_id: str) -> InboundResponse
```

- Response `200`: A safely parsed inbound message.
- Response `401`: Missing or invalid API key.
- Response `404`: Inbound message not found.
- Response `503`: Storage unavailable.

## `list_segments`

`GET /v1/email/segments`

```python
Client.list_segments(self, *, limit: int | None = None) -> SegmentListResponse
```

- Response `200`: Existing segment definitions. Segment mutation remains dashboard-owned.
- Response `401`: Missing or invalid API key.
- Response `503`: Storage unavailable.

## `get_segment`

`GET /v1/email/segments/{id}`

```python
Client.get_segment(self, *, id: str) -> SegmentResponse
```

- Response `200`: A segment definition.
- Response `401`: Missing or invalid API key.
- Response `404`: Segment not found.
- Response `503`: Storage unavailable.

## `list_sender_identities`

`GET /v1/email/sender-identities`

```python
Client.list_sender_identities(self, *, limit: int | None = None) -> SenderIdentityListResponse
```

- Response `200`: Active and pending sender identities.
- Response `401`: Missing or invalid API key.
- Response `503`: Storage unavailable.

## `get_sender_identity`

`GET /v1/email/sender-identities/{id}`

```python
Client.get_sender_identity(self, *, id: str) -> SenderIdentityResponse
```

- Response `200`: A sender identity.
- Response `401`: Missing or invalid API key.
- Response `404`: Sender identity not found.
- Response `503`: Storage unavailable.

## `create`

`POST /v1/email/sends`

```python
Client.create(self, *, body: SendRequest) -> SendResponse
```

- Response `202`: The send was accepted for durable processing.
- Response `401`: Missing or invalid API key.
- Response `403`: The key cannot send for this Email project.
- Response `409`: The request key was reused with different input.
- Response `422`: The request is invalid.
- Response `429`: The current sending allowance has been reached.
- Response `503`: Email storage is temporarily unavailable.

## `query`

`POST /v1/email/sends/query`

```python
Client.query(self, *, body: SendQuery) -> None
```

- Response `200`: A bounded page of accepted sends.
- Response `401`: Missing or invalid API key.
- Response `403`: The key cannot read this Email project.
- Response `422`: The query is invalid.
- Response `503`: Email storage is temporarily unavailable.

## `cancel`

`DELETE /v1/email/sends/{send_id}`

```python
Client.cancel(self, *, send_id: str) -> SendResponse
```

- Response `200`: The send was cancelled before transport submission.
- Response `401`: Missing or invalid API key.
- Response `403`: The key cannot send for this Email project.
- Response `404`: The send does not exist.
- Response `409`: The send can no longer be cancelled.
- Response `503`: Email storage is temporarily unavailable.

## `get`

`GET /v1/email/sends/{send_id}`

```python
Client.get(self, *, send_id: str) -> SendResponse
```

- Response `200`: The durable send and recipient states.
- Response `401`: Missing or invalid API key.
- Response `403`: The key cannot read this Email project.
- Response `404`: The send does not exist.
- Response `503`: Email storage is temporarily unavailable.

## `list_webhooks`

`GET /v1/email/webhooks`

```python
Client.list_webhooks(self) -> WebhookListResponse
```

- Response `200`: Webhook subscriptions.
- Response `401`: Missing or invalid API key.
- Response `503`: Storage unavailable.

## `create_webhook`

`POST /v1/email/webhooks`

```python
Client.create_webhook(self, *, body: HookCreate) -> CreateWebhookResponse
```

- Response `200`: Webhook created. The signing secret is returned only once.
- Response `401`: Missing or invalid API key.
- Response `422`: The HTTPS URL or event types are invalid.
- Response `503`: Storage unavailable.

## `delete_webhook`

`DELETE /v1/email/webhooks/{webhook_id}`

```python
Client.delete_webhook(self, *, webhook_id: str) -> None
```

- Response `204`: Webhook deleted.
- Response `401`: Missing or invalid API key.
- Response `404`: Webhook not found.
- Response `503`: Storage unavailable.

## `update_webhook`

`PATCH /v1/email/webhooks/{webhook_id}`

```python
Client.update_webhook(self, *, webhook_id: str, body: HookUpdate) -> WebhookResponse
```

- Response `200`: Updated webhook subscription.
- Response `401`: Missing or invalid API key.
- Response `404`: Webhook not found.
- Response `422`: The webhook patch is invalid.
- Response `503`: Storage unavailable.

## `list_deliveries`

`GET /v1/email/webhooks/{webhook_id}/deliveries`

```python
Client.list_deliveries(self, *, webhook_id: str, limit: int | None = None) -> WebhookDeliveryListResponse
```

- Response `200`: Webhook delivery attempts and payloads.
- Response `401`: Missing or invalid API key.
- Response `422`: The page is invalid.
- Response `503`: Storage unavailable.

