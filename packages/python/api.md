# Relevate Python API reference

Direct methods remain available on both flat and namespaced clients.

## `list_crm_lists`

`GET /crm/lists`

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

`POST /crm/lists`

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

`DELETE /crm/lists/{list}`

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

`GET /crm/lists/{list}`

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

`PATCH /crm/lists/{list}`

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

`GET /crm/lists/{list}/attributes`

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

`POST /crm/lists/{list}/attributes`

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

`DELETE /crm/lists/{list}/attributes/{attribute}`

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

`PATCH /crm/lists/{list}/attributes/{attribute}`

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

`GET /crm/lists/{list}/entries`

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

`POST /crm/lists/{list}/entries`

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

`DELETE /crm/lists/{list}/entries/{entry}`

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

`GET /crm/lists/{list}/entries/{entry}`

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

`PATCH /crm/lists/{list}/entries/{entry}`

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

`DELETE /crm/notes/{note_id}`

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

`GET /crm/notes/{note_id}`

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

`PATCH /crm/notes/{note_id}`

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

`GET /crm/objects`

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

`POST /crm/objects`

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

`DELETE /crm/objects/{object}`

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

`GET /crm/objects/{object}`

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

`PATCH /crm/objects/{object}`

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

`GET /crm/objects/{object}/attributes`

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

`POST /crm/objects/{object}/attributes`

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

`DELETE /crm/objects/{object}/attributes/{attribute}`

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

`PATCH /crm/objects/{object}/attributes/{attribute}`

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

`GET /crm/objects/{object}/deletion-preview`

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

`GET /crm/objects/{object}/quality`

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

`GET /crm/objects/{object}/records`

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

`POST /crm/objects/{object}/records`

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

`POST /crm/objects/{object}/records/upsert`

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

`DELETE /crm/records/{record_id}`

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

`GET /crm/records/{record_id}`

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

`PATCH /crm/records/{record_id}`

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

`GET /crm/records/{record_id}/activities`

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

`GET /crm/records/{record_id}/notes`

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

`POST /crm/records/{record_id}/notes`

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

`GET /crm/records/{record_id}/tasks`

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

`POST /crm/records/{record_id}/tasks`

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

`DELETE /crm/tasks/{task_id}`

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

`GET /crm/tasks/{task_id}`

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

`PATCH /crm/tasks/{task_id}`

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

## `list_email_api_keys`

`GET /email/api-keys`

```python
Client.list_email_api_keys(self) -> None
```

- Response `200`: The project's Email API keys, without their secrets.
- Response `401`: Missing or invalid API key.
- Response `403`: The key can't manage keys.
- Response `503`: Storage unavailable.

## `create_email_api_key`

`POST /email/api-keys`

```python
Client.create_email_api_key(self, *, body: CreateApiKeyRequest) -> None
```

- Response `201`: The new key, with its `secret` shown this once.
- Response `401`: Missing or invalid API key.
- Response `403`: The key can't manage keys.
- Response `409`: The project already has the most keys it can.
- Response `422`: The name, scope or expiry doesn't fit.
- Response `503`: Storage unavailable.

## `revoke_email_api_key`

`DELETE /email/api-keys/{id}`

```python
Client.revoke_email_api_key(self, *, id: str) -> None
```

- Response `200`: The key was revoked.
- Response `401`: Missing or invalid API key.
- Response `403`: The key can't manage keys.
- Response `404`: Not one of this project's Email keys.
- Response `503`: Storage unavailable.

## `get_email_attachment`

`GET /email/attachments/{attachment_id}`

```python
Client.get_email_attachment(self, *, attachment_id: str) -> AttachmentResponse
```

- Response `200`: The file's details and a download link valid for 10 minutes.
- Response `401`: Missing or invalid API key.
- Response `404`: Attachment not found.
- Response `409`: The message is quarantined; release it before downloading its files.
- Response `503`: Storage unavailable.

## `check_email_auth`

`GET /email/auth-check`

```python
Client.check_email_auth(self) -> AuthCheckResponse
```

- Response `200`: The API key is valid for reading this Email project.
- Response `401`: Missing, invalid, expired or environment-mismatched API key.
- Response `403`: The key lacks email:read or project scope.
- Response `503`: Authentication storage is temporarily unavailable.

## `list_email_contacts`

`GET /email/contacts`

```python
Client.list_email_contacts(self, *, limit: int | None = None) -> ContactListResponse
```

- Response `200`: A bounded list of contacts.
- Response `401`: Missing or invalid API key.
- Response `503`: Storage unavailable.

## `create_email_contact`

`POST /email/contacts`

```python
Client.create_email_contact(self, *, body: CreateContact) -> ContactResponse
```

- Response `201`: A contact was created or merged by normalized email.
- Response `401`: Missing or invalid API key.
- Response `422`: The contact input is invalid, or the address is a temporary inbox (`disposable_email`) or looks mistyped (`mistyped_email`, with a suggestion in the message).
- Response `503`: Storage unavailable.

## `query_email_contacts`

`POST /email/contacts/query`

```python
Client.query_email_contacts(self, *, body: ContactQuery) -> ContactQueryResponse
```

- Response `200`: A filtered, bounded page of contacts.
- Response `401`: Missing or invalid API key.
- Response `422`: The filter or page is invalid.
- Response `503`: Storage unavailable.

## `delete_email_contact`

`DELETE /email/contacts/{id}`

```python
Client.delete_email_contact(self, *, id: str) -> None
```

- Response `200`: The contact was deleted.
- Response `401`: Missing or invalid API key.
- Response `404`: Contact not found.
- Response `503`: Storage unavailable.

## `get_email_contact`

`GET /email/contacts/{id}`

```python
Client.get_email_contact(self, *, id: str) -> ContactResponse
```

- Response `200`: A contact.
- Response `401`: Missing or invalid API key.
- Response `404`: Contact not found.
- Response `503`: Storage unavailable.

## `update_email_contact`

`PATCH /email/contacts/{id}`

```python
Client.update_email_contact(self, *, id: str, body: UpdateContact) -> ContactResponse
```

- Response `200`: The updated contact. Address, consent, blocking and suppression are not publicly mutable.
- Response `401`: Missing or invalid API key.
- Response `404`: Contact not found.
- Response `422`: The contact patch is invalid.
- Response `503`: Storage unavailable.

## `list_email_domains`

`GET /email/domains`

```python
Client.list_email_domains(self, *, limit: int | None = None) -> DomainListResponse
```

- Response `200`: Verified sending domains.
- Response `401`: Missing or invalid API key.
- Response `503`: Storage unavailable.

## `create_email_domain`

`POST /email/domains`

```python
Client.create_email_domain(self, *, body: CreateDomainRequest) -> DomainSetupResponse
```

- Response `201`: The domain was added. Publish its records, then verify it.
- Response `401`: Missing or invalid API key.
- Response `403`: The key cannot manage this Email project's domains.
- Response `409`: This project already has the domain.
- Response `422`: The name is not a usable domain.
- Response `503`: Domain setup is temporarily unavailable.

## `delete_email_domain`

`DELETE /email/domains/{id}`

```python
Client.delete_email_domain(self, *, id: str) -> DeletedDomainResponse
```

- Response `200`: The domain was removed.
- Response `401`: Missing or invalid API key.
- Response `403`: The key cannot manage this Email project's domains.
- Response `404`: Domain not found.
- Response `409`: Sender identities still use this domain; remove them first.
- Response `503`: Storage unavailable.

## `get_email_domain`

`GET /email/domains/{id}`

```python
Client.get_email_domain(self, *, id: str) -> DomainResponse
```

- Response `200`: A verified sending domain.
- Response `401`: Missing or invalid API key.
- Response `404`: Domain not found.
- Response `503`: Storage unavailable.

## `verify_email_domain`

`POST /email/domains/{id}/verify`

```python
Client.verify_email_domain(self, *, id: str) -> DomainSetupResponse
```

- Response `200`: The domain's status and each record's result after checking DNS.
- Response `401`: Missing or invalid API key.
- Response `403`: The key cannot manage this Email project's domains.
- Response `404`: Domain not found.
- Response `409`: Another verified owner controls this domain or a related one, or the domain changed during the check.
- Response `429`: The domain was checked moments ago; `Retry-After` says when to try again.
- Response `503`: DNS or storage is temporarily unavailable.

## `send_email`

`POST /email/emails`

```python
Client.send_email(self, *, idempotency_key: str | None | None = None, body: SendEmailRequest) -> SendResponse
```

- Response `202`: The email was accepted for durable processing.
- Response `401`: Missing or invalid API key.
- Response `403`: The key cannot send for this Email project.
- Response `409`: The Idempotency-Key was reused with a different body.
- Response `422`: The request is invalid, or `from` isn't an address on one of the project's verified domains.
- Response `429`: The current sending allowance has been reached. `Retry-After` says when to try again; `RateLimit-Limit`, `RateLimit-Remaining` and `RateLimit-Reset` come with every accepted send too.
- Response `503`: Email storage is temporarily unavailable.

## `send_email_batch`

`POST /email/emails/batch`

```python
Client.send_email_batch(self, *, idempotency_key: str | None | None = None, body: BatchSendRequest) -> BatchSendResponse
```

- Response `200`: Every item was tried; each has its own status. Retry with the same Idempotency-Key to resend only the failed items.
- Response `401`: Missing or invalid API key.
- Response `403`: The key cannot send for this Email project.
- Response `422`: The batch is empty or has more than 100 items.

## `query_emails`

`POST /email/emails/query`

```python
Client.query_emails(self, *, body: SendQuery) -> None
```

- Response `200`: A bounded page of accepted sends.
- Response `401`: Missing or invalid API key.
- Response `403`: The key cannot read this Email project.
- Response `422`: The query is invalid.
- Response `503`: Email storage is temporarily unavailable.

## `cancel_email`

`DELETE /email/emails/{email_id}`

```python
Client.cancel_email(self, *, email_id: str) -> SendResponse
```

- Response `200`: The send was cancelled before transport submission.
- Response `401`: Missing or invalid API key.
- Response `403`: The key cannot send for this Email project.
- Response `404`: The send does not exist.
- Response `409`: The send can no longer be cancelled.
- Response `503`: Email storage is temporarily unavailable.

## `get_email`

`GET /email/emails/{email_id}`

```python
Client.get_email(self, *, email_id: str) -> SendResponse
```

- Response `200`: The durable send and recipient states.
- Response `401`: Missing or invalid API key.
- Response `403`: The key cannot read this Email project.
- Response `404`: The send does not exist.
- Response `503`: Email storage is temporarily unavailable.

## `reschedule_email`

`PATCH /email/emails/{email_id}`

```python
Client.reschedule_email(self, *, email_id: str, body: RescheduleRequest) -> SendResponse
```

- Response `200`: The send's new time.
- Response `401`: Missing or invalid API key.
- Response `403`: The key cannot send for this Email project.
- Response `404`: The send does not exist.
- Response `409`: The send isn't waiting for a scheduled time any more.
- Response `422`: The time is in the past or too far ahead.

## `list_email_events`

`GET /email/emails/{email_id}/events`

```python
Client.list_email_events(self, *, email_id: str, limit: int | None = None, after: str | None = None) -> SendEventsResponse
```

- Response `200`: Delivered, deferred, bounced (`permanently_failed`), complained, suppressed, opened and clicked events for every recipient, oldest first, with the names and IDs webhooks use. Pass `next_cursor` as `after` while `has_more` is true.
- Response `401`: Missing or invalid API key.
- Response `403`: The key cannot read this Email project.
- Response `404`: The send does not exist.
- Response `422`: The page size or cursor is invalid.
- Response `503`: Email storage is temporarily unavailable.

## `list_email_recipient_events`

`GET /email/emails/{email_id}/recipients/{recipient_send_id}/events`

```python
Client.list_email_recipient_events(self, *, email_id: str, recipient_send_id: str, limit: int | None = None, after: str | None = None) -> SendEventsResponse
```

- Response `200`: This recipient's events, oldest first. Pass `next_cursor` as `after` while `has_more` is true.
- Response `401`: Missing or invalid API key.
- Response `403`: The key cannot read this Email project.
- Response `404`: The send does not exist, or the recipient is not part of it.
- Response `422`: The page size or cursor is invalid.
- Response `503`: Email storage is temporarily unavailable.

## `track_email_event`

`POST /email/events`

```python
Client.track_email_event(self, *, body: TrackEventRequest) -> EventResponse
```

- Response `202`: The event was durably recorded.
- Response `401`: Missing or invalid API key.
- Response `403`: The key cannot write events for this Email project.
- Response `409`: The idempotency key was reused with different input.
- Response `422`: The event is invalid.
- Response `503`: Event storage is temporarily unavailable.

## `list_email_inbound`

`GET /email/inbound`

```python
Client.list_email_inbound(self, *, limit: int | None = None) -> InboundListResponse
```

- Response `200`: Safely parsed inbound messages, newest first. Raw MIME is never exposed. Quarantined messages that were not released have no body and no files.
- Response `401`: Missing or invalid API key.
- Response `422`: The page is invalid.
- Response `503`: Storage unavailable.

## `get_email_inbound`

`GET /email/inbound/{message_id}`

```python
Client.get_email_inbound(self, *, message_id: str) -> InboundResponse
```

- Response `200`: A safely parsed inbound message. A quarantined message that was not released has no body and no files.
- Response `401`: Missing or invalid API key.
- Response `404`: Inbound message not found.
- Response `503`: Storage unavailable.

## `forward_email_inbound`

`POST /email/inbound/{message_id}/forward`

```python
Client.forward_email_inbound(self, *, message_id: str, body: ForwardRequest) -> None
```

- Response `202`: The forward was accepted and recorded in the message's thread.
- Response `401`: Missing or invalid API key.
- Response `404`: Message not found.
- Response `409`: The message is quarantined, the inbox is disabled, or the request key was reused.
- Response `422`: The forward is invalid.
- Response `429`: The sending allowance has been reached.
- Response `503`: Storage unavailable.

## `reply_to_email_inbound`

`POST /email/inbound/{message_id}/reply`

```python
Client.reply_to_email_inbound(self, *, message_id: str, body: ReplyRequest) -> None
```

- Response `202`: The reply was accepted into the message's thread.
- Response `401`: Missing or invalid API key.
- Response `404`: Message not found.
- Response `409`: The message is quarantined, the inbox is disabled, or the request key was reused.
- Response `422`: The reply is invalid or there is no address to reply to.
- Response `429`: The sending allowance has been reached.
- Response `503`: Storage unavailable.

## `list_email_inboxes`

`GET /email/inboxes`

```python
Client.list_email_inboxes(self, *, limit: int | None = None, after: str | None = None, reference: str | None = None) -> InboxListResponse
```

- Response `200`: Inboxes, newest first. `next` is the cursor for the following page.
- Response `401`: Missing or invalid API key.
- Response `422`: The page is invalid.
- Response `503`: Storage unavailable.

## `create_email_inbox`

`POST /email/inboxes`

```python
Client.create_email_inbox(self, *, body: CreateInbox) -> InboxResponse
```

- Response `201`: The inbox was created and receives mail immediately.
- Response `401`: Missing or invalid API key.
- Response `409`: The address is already an inbox.
- Response `422`: The address is invalid, its domain is not verified (for receiving, unless the inbox receives by forwarding), or forwarding is not available.
- Response `429`: The project has reached its inbox limit.
- Response `503`: Storage unavailable.

## `list_provided_email_domains`

`GET /email/inboxes/provided-domains`

```python
Client.list_provided_email_domains(self) -> None
```

- Response `200`: Available Relevate-provided address domains

## `disable_email_inbox`

`DELETE /email/inboxes/{inbox_id}`

```python
Client.disable_email_inbox(self, *, inbox_id: str) -> None
```

- Response `204`: The inbox stops receiving mail. Its threads stay readable.
- Response `401`: Missing or invalid API key.
- Response `404`: Inbox not found.
- Response `503`: Storage unavailable.

## `get_email_inbox`

`GET /email/inboxes/{inbox_id}`

```python
Client.get_email_inbox(self, *, inbox_id: str) -> InboxResponse
```

- Response `200`: The inbox.
- Response `401`: Missing or invalid API key.
- Response `404`: Inbox not found.
- Response `503`: Storage unavailable.

## `send_email_inbox_message`

`POST /email/inboxes/{inbox_id}/messages`

```python
Client.send_email_inbox_message(self, *, inbox_id: str, body: InboxMessage) -> None
```

- Response `202`: The message was accepted and starts a new thread. The response includes `thread_id`.
- Response `401`: Missing or invalid API key.
- Response `404`: Inbox not found.
- Response `409`: The inbox is disabled, or the request key was reused with different input.
- Response `422`: The message is invalid or the inbox cannot send.
- Response `429`: The sending allowance has been reached.
- Response `503`: Storage unavailable.

## `list_email_threads`

`GET /email/inboxes/{inbox_id}/threads`

```python
Client.list_email_threads(self, *, inbox_id: str, limit: int | None = None, after: str | None = None, status: str | None = None, label: str | None = None, assigned_agent: str | None = None, assigned_user_id: str | None = None, unassigned: bool | None = None, unread: bool | None = None, q: str | None = None) -> ThreadListResponse
```

- Response `200`: Threads, most recent activity first.
- Response `401`: Missing or invalid API key.
- Response `404`: Inbox not found.
- Response `422`: The page is invalid.
- Response `503`: Storage unavailable.

## `list_email_labels`

`GET /email/labels`

```python
Client.list_email_labels(self) -> None
```

- Response `200`: The project's labels, by name.
- Response `401`: Missing or invalid API key.
- Response `503`: Storage unavailable.

## `create_email_label`

`POST /email/labels`

```python
Client.create_email_label(self, *, body: LabelInput) -> None
```

- Response `201`: The label was created.
- Response `401`: Missing or invalid API key.
- Response `409`: A label with this name exists.
- Response `422`: The name or color is invalid.
- Response `503`: Storage unavailable.

## `delete_email_label`

`DELETE /email/labels/{label_id}`

```python
Client.delete_email_label(self, *, label_id: str) -> None
```

- Response `204`: The label was removed from every thread and deleted.
- Response `401`: Missing or invalid API key.
- Response `404`: Label not found.
- Response `503`: Storage unavailable.

## `list_email_segments`

`GET /email/segments`

```python
Client.list_email_segments(self, *, limit: int | None = None) -> SegmentListResponse
```

- Response `200`: Existing segment definitions. Segment mutation remains dashboard-owned.
- Response `401`: Missing or invalid API key.
- Response `503`: Storage unavailable.

## `get_email_segment`

`GET /email/segments/{id}`

```python
Client.get_email_segment(self, *, id: str) -> SegmentResponse
```

- Response `200`: A segment definition.
- Response `401`: Missing or invalid API key.
- Response `404`: Segment not found.
- Response `503`: Storage unavailable.

## `list_email_sender_identities`

`GET /email/sender-identities`

```python
Client.list_email_sender_identities(self, *, limit: int | None = None) -> SenderIdentityListResponse
```

- Response `200`: Active and pending sender identities.
- Response `401`: Missing or invalid API key.
- Response `503`: Storage unavailable.

## `get_email_sender_identity`

`GET /email/sender-identities/{id}`

```python
Client.get_email_sender_identity(self, *, id: str) -> SenderIdentityResponse
```

- Response `200`: A sender identity.
- Response `401`: Missing or invalid API key.
- Response `404`: Sender identity not found.
- Response `503`: Storage unavailable.

## `list_email_suppressions`

`GET /email/suppressions`

```python
Client.list_email_suppressions(self, *, limit: int | None = None, offset: int | None = None, reason: str | None = None, scope: str | None = None, address: str | None = None, status: str | None = None) -> SuppressionListResponse
```

- Response `200`: A page of suppressions, active ones unless `status` says otherwise.
- Response `401`: Missing or invalid API key.
- Response `403`: The key cannot read this Email project.
- Response `422`: A filter or the page is invalid.
- Response `503`: Storage unavailable.

## `create_email_suppression`

`POST /email/suppressions`

```python
Client.create_email_suppression(self, *, body: NewSuppression) -> SuppressionResponse
```

- Response `200`: The address was already suppressed for that scope.
- Response `201`: The address is now suppressed.
- Response `401`: Missing or invalid API key.
- Response `403`: The key needs email:send for this Email project.
- Response `422`: The address, reason, scope or note is invalid. Only `manual` reasons can be added.
- Response `503`: Storage unavailable.

## `create_email_suppression_batch`

`POST /email/suppressions/batch`

```python
Client.create_email_suppression_batch(self, *, body: SuppressionBatchRequest) -> SuppressionBatchResponse
```

- Response `200`: One result per item, in request order: `created`, `exists` or `invalid` with an error.
- Response `401`: Missing or invalid API key.
- Response `403`: The key needs email:send for this Email project.
- Response `422`: The batch is empty or has more than 1000 items.
- Response `503`: Storage unavailable; nothing was added.

## `delete_email_suppression`

`DELETE /email/suppressions/{address}`

```python
Client.delete_email_suppression(self, *, address: str) -> SuppressionRemovalResponse
```

- Response `200`: The manual suppressions were released; `still_suppressed` says whether anything else still blocks the address.
- Response `401`: Missing or invalid API key.
- Response `403`: The key needs email:send for this Email project.
- Response `404`: The address isn't suppressed.
- Response `409`: Only a bounce, complaint, block or the recipient's unsubscribe suppresses the address; those can't be removed (`suppression_not_removable`).
- Response `422`: The address is invalid.
- Response `503`: Storage unavailable.

## `get_email_suppression`

`GET /email/suppressions/{address}`

```python
Client.get_email_suppression(self, *, address: str) -> SuppressionResponse
```

- Response `200`: The active suppression for the address.
- Response `401`: Missing or invalid API key.
- Response `403`: The key cannot read this Email project.
- Response `404`: The address isn't suppressed.
- Response `422`: The address is invalid.
- Response `503`: Storage unavailable.

## `list_email_templates`

`GET /email/templates`

```python
Client.list_email_templates(self) -> None
```

- Response `200`: Published templates, current versions only.
- Response `401`: Missing or invalid API key.
- Response `403`: The key cannot read this Email project.

## `create_email_template`

`POST /email/templates`

```python
Client.create_email_template(self, *, body: CreateTemplateRequest) -> None
```

- Response `201`: The new draft.
- Response `401`: Missing or invalid API key.
- Response `403`: The key cannot send from this Email project.
- Response `409`: Another template already uses that alias.
- Response `422`: A field doesn't fit, or the sender isn't in this project.

## `delete_email_template`

`DELETE /email/templates/{template}`

```python
Client.delete_email_template(self, *, template: str) -> None
```

- Response `200`: Deleted, or archived when it was ever published (`archived: true`).
- Response `404`: No template has that alias or id.
- Response `409`: Something still uses this draft.

## `get_email_template`

`GET /email/templates/{template}`

```python
Client.get_email_template(self, *, template: str, version: int | None = None, draft: bool | None = None) -> None
```

- Response `200`: The template's published version, or its draft with `draft=true`.
- Response `404`: No template has that alias or id.
- Response `409`: The template has no published version.
- Response `422`: `draft` and `version` were both given.

## `update_email_template`

`PATCH /email/templates/{template}`

```python
Client.update_email_template(self, *, template: str, body: UpdateTemplateRequest) -> None
```

- Response `200`: The changed draft.
- Response `404`: No template has that alias or id.
- Response `409`: Another template already uses that alias, or someone is editing the design while new HTML would replace it.
- Response `422`: A field doesn't fit, or the sender isn't in this project.

## `duplicate_email_template`

`POST /email/templates/{template}/duplicate`

```python
Client.duplicate_email_template(self, *, template: str, body: None | DuplicateTemplateRequest | None = None) -> None
```

- Response `201`: The new draft.
- Response `401`: Missing or invalid API key.
- Response `403`: The key cannot send from this Email project.
- Response `404`: No such template.
- Response `409`: Another template already uses that alias.
- Response `422`: The name or alias doesn't fit.

## `publish_email_template`

`POST /email/templates/{template}/publish`

```python
Client.publish_email_template(self, *, template: str) -> None
```

- Response `200`: The published version, and whether this publish created it.
- Response `404`: No template has that alias or id.
- Response `422`: The draft can't be sent yet; the message says why.

## `render_email_template`

`POST /email/templates/{template}/render`

```python
Client.render_email_template(self, *, template: str, body: RenderRequest) -> None
```

- Response `200`: The finished subject, HTML and text.
- Response `404`: No template has that alias or id.
- Response `409`: The template has no published version.
- Response `422`: A variable is missing, unknown or the wrong type; `details` names each one.

## `get_email_thread`

`GET /email/threads/{thread_id}`

```python
Client.get_email_thread(self, *, thread_id: str, limit: int | None = None, before: str | None = None) -> ThreadResponse
```

- Response `200`: The thread with its most recent received and sent messages, oldest first within the page. Pass `next_cursor` as `before` to read earlier messages while `has_more` is true. Quarantined messages that were not released have no body and no files.
- Response `401`: Missing or invalid API key.
- Response `404`: Thread not found.
- Response `422`: The page size or cursor is invalid.
- Response `503`: Storage unavailable.

## `update_email_thread`

`PATCH /email/threads/{thread_id}`

```python
Client.update_email_thread(self, *, thread_id: str, body: ThreadUpdate) -> None
```

- Response `200`: The updated thread. Every change is recorded in its activity.
- Response `401`: Missing or invalid API key.
- Response `404`: Thread not found.
- Response `422`: The change is invalid, or a person or label is not in this project.
- Response `503`: Storage unavailable.

## `add_email_thread_note`

`POST /email/threads/{thread_id}/notes`

```python
Client.add_email_thread_note(self, *, thread_id: str, body: NoteInput) -> None
```

- Response `201`: The note was added to the thread.
- Response `401`: Missing or invalid API key.
- Response `404`: Thread not found.
- Response `422`: The note is empty or too long.
- Response `503`: Storage unavailable.

## `mark_email_thread_read`

`POST /email/threads/{thread_id}/read`

```python
Client.mark_email_thread_read(self, *, thread_id: str) -> None
```

- Response `204`: The thread is read until new mail arrives.
- Response `401`: Missing or invalid API key.
- Response `404`: Thread not found.
- Response `503`: Storage unavailable.

## `get_email_usage`

`GET /email/usage`

```python
Client.get_email_usage(self) -> None
```

- Response `200`: Current allowances and use. Counts are recipients accepted, as limits count them.
- Response `401`: Missing or invalid API key.
- Response `403`: The key isn't an Email key for a project.
- Response `503`: Storage unavailable.

## `list_email_webhooks`

`GET /email/webhooks`

```python
Client.list_email_webhooks(self) -> WebhookListResponse
```

- Response `200`: Webhook subscriptions.
- Response `401`: Missing or invalid API key.
- Response `503`: Storage unavailable.

## `create_email_webhook`

`POST /email/webhooks`

```python
Client.create_email_webhook(self, *, body: HookCreate) -> CreateWebhookResponse
```

- Response `200`: Webhook created. The signing secret is returned only once.
- Response `401`: Missing or invalid API key.
- Response `422`: The HTTPS URL or event types are invalid.
- Response `503`: Storage unavailable.

## `delete_email_webhook`

`DELETE /email/webhooks/{webhook_id}`

```python
Client.delete_email_webhook(self, *, webhook_id: str) -> None
```

- Response `204`: Webhook deleted.
- Response `401`: Missing or invalid API key.
- Response `404`: Webhook not found.
- Response `503`: Storage unavailable.

## `update_email_webhook`

`PATCH /email/webhooks/{webhook_id}`

```python
Client.update_email_webhook(self, *, webhook_id: str, body: HookUpdate) -> WebhookResponse
```

- Response `200`: Updated webhook subscription.
- Response `401`: Missing or invalid API key.
- Response `404`: Webhook not found.
- Response `422`: The webhook patch is invalid.
- Response `503`: Storage unavailable.

## `list_email_webhook_deliveries`

`GET /email/webhooks/{webhook_id}/deliveries`

```python
Client.list_email_webhook_deliveries(self, *, webhook_id: str, limit: int | None = None) -> WebhookDeliveryListResponse
```

- Response `200`: Webhook delivery attempts and payloads.
- Response `401`: Missing or invalid API key.
- Response `422`: The page is invalid.
- Response `503`: Storage unavailable.

## `replay_email_webhook_delivery`

`POST /email/webhooks/{webhook_id}/deliveries/{delivery_id}/replay`

```python
Client.replay_email_webhook_delivery(self, *, webhook_id: str, delivery_id: str) -> None
```

- Response `200`: Delivery re-queued with its original event identity.
- Response `401`: Missing or invalid API key.
- Response `404`: Webhook or delivery not found.
- Response `409`: The webhook is disabled or the delivery is still being attempted.
- Response `503`: Storage unavailable.

## `replay_email_webhook_range`

`POST /email/webhooks/{webhook_id}/replay`

```python
Client.replay_email_webhook_range(self, *, webhook_id: str, body: ReplayRange) -> None
```

- Response `200`: Finished deliveries recorded in the range were re-queued.
- Response `401`: Missing or invalid API key.
- Response `404`: Webhook not found.
- Response `409`: The webhook is disabled.
- Response `422`: The range is invalid or holds more than 1000 deliveries.
- Response `503`: Storage unavailable.

## `rotate_email_webhook_secret`

`POST /email/webhooks/{webhook_id}/rotate-secret`

```python
Client.rotate_email_webhook_secret(self, *, webhook_id: str) -> None
```

- Response `200`: New signing secret, returned only once. The previous secret stops signing immediately.
- Response `401`: Missing or invalid API key.
- Response `404`: Webhook not found.
- Response `503`: Storage or signing unavailable.

## `get_schedule_booking_page`

`GET /schedule/booking-pages/{workspace}/{event}`

```python
Client.get_schedule_booking_page(self, *, workspace: str, event: str, invite: str | None = None) -> SchedulePublicEvent
```

- Response `200`: Public event metadata and verified booking health
- Response `400`: Invalid link
- Response `404`: Unavailable link or private invitation
- Response `503`: Storage or provider verification unavailable

## `list_schedule_bookings`

`GET /schedule/bookings`

```python
Client.list_schedule_bookings(self, *, host_id: str | None = None, period: str | None = None, state: str | None = None, page: int | None = None) -> ScheduleHostBookingList
```

- Response `200`: Successful operation
- Response `400`: Invalid request, unauthorized scope/host, revision or uniqueness conflict, or unavailable storage
- Response `401`: Invalid request, unauthorized scope/host, revision or uniqueness conflict, or unavailable storage
- Response `403`: Invalid request, unauthorized scope/host, revision or uniqueness conflict, or unavailable storage
- Response `404`: Invalid request, unauthorized scope/host, revision or uniqueness conflict, or unavailable storage
- Response `409`: Invalid request, unauthorized scope/host, revision or uniqueness conflict, or unavailable storage
- Response `413`: Invalid request, unauthorized scope/host, revision or uniqueness conflict, or unavailable storage
- Response `415`: Invalid request, unauthorized scope/host, revision or uniqueness conflict, or unavailable storage
- Response `422`: Invalid request, unauthorized scope/host, revision or uniqueness conflict, or unavailable storage
- Response `503`: Invalid request, unauthorized scope/host, revision or uniqueness conflict, or unavailable storage

## `create_schedule_booking`

`POST /schedule/bookings`

```python
Client.create_schedule_booking(self, *, idempotency_key: str, body: SchedulePublicBookingCreate) -> SchedulePublicBookingCreated
```

- Response `200`: Confirmed standalone booking or processing calendar booking
- Response `400`: Invalid booking request
- Response `404`: Unavailable link or private invitation
- Response `409`: Time, capacity, invitation or idempotency conflict
- Response `503`: Provider, storage, or fulfillment unavailable

## `get_schedule_booking`

`GET /schedule/bookings/{id}`

```python
Client.get_schedule_booking(self, *, id: str) -> ScheduleHostBookingDetail | ScheduleManagedBookingResponse
```

- Response `200`: Successful operation
- Response `400`: Invalid request, unauthorized scope/host, revision or uniqueness conflict, or unavailable storage
- Response `401`: Invalid request, unauthorized scope/host, revision or uniqueness conflict, or unavailable storage
- Response `403`: Invalid request, unauthorized scope/host, revision or uniqueness conflict, or unavailable storage
- Response `404`: Invalid request, unauthorized scope/host, revision or uniqueness conflict, or unavailable storage
- Response `409`: Invalid request, unauthorized scope/host, revision or uniqueness conflict, or unavailable storage
- Response `413`: Invalid request, unauthorized scope/host, revision or uniqueness conflict, or unavailable storage
- Response `415`: Invalid request, unauthorized scope/host, revision or uniqueness conflict, or unavailable storage
- Response `422`: Invalid request, unauthorized scope/host, revision or uniqueness conflict, or unavailable storage
- Response `503`: Invalid request, unauthorized scope/host, revision or uniqueness conflict, or unavailable storage

## `mark_schedule_booking_attendance`

`POST /schedule/bookings/{id}/attendance`

```python
Client.mark_schedule_booking_attendance(self, *, id: str, body: ScheduleHostAttendanceInput) -> ScheduleHostAttendanceResult
```

- Response `200`: Successful operation
- Response `400`: Invalid request, unauthorized scope/host, revision or uniqueness conflict, or unavailable storage
- Response `401`: Invalid request, unauthorized scope/host, revision or uniqueness conflict, or unavailable storage
- Response `403`: Invalid request, unauthorized scope/host, revision or uniqueness conflict, or unavailable storage
- Response `404`: Invalid request, unauthorized scope/host, revision or uniqueness conflict, or unavailable storage
- Response `409`: Invalid request, unauthorized scope/host, revision or uniqueness conflict, or unavailable storage
- Response `413`: Invalid request, unauthorized scope/host, revision or uniqueness conflict, or unavailable storage
- Response `415`: Invalid request, unauthorized scope/host, revision or uniqueness conflict, or unavailable storage
- Response `422`: Invalid request, unauthorized scope/host, revision or uniqueness conflict, or unavailable storage
- Response `503`: Invalid request, unauthorized scope/host, revision or uniqueness conflict, or unavailable storage

## `cancel_schedule_booking`

`POST /schedule/bookings/{id}/cancel`

```python
Client.cancel_schedule_booking(self, *, id: str, body: ScheduleHostCancelInput) -> ScheduleHostCancelResult | ScheduleManagedCancelResponse
```

- Response `200`: Successful operation
- Response `400`: Invalid request, unauthorized scope/host, revision or uniqueness conflict, or unavailable storage
- Response `401`: Invalid request, unauthorized scope/host, revision or uniqueness conflict, or unavailable storage
- Response `403`: Invalid request, unauthorized scope/host, revision or uniqueness conflict, or unavailable storage
- Response `404`: Invalid request, unauthorized scope/host, revision or uniqueness conflict, or unavailable storage
- Response `409`: Invalid request, unauthorized scope/host, revision or uniqueness conflict, or unavailable storage
- Response `413`: Invalid request, unauthorized scope/host, revision or uniqueness conflict, or unavailable storage
- Response `415`: Invalid request, unauthorized scope/host, revision or uniqueness conflict, or unavailable storage
- Response `422`: Invalid request, unauthorized scope/host, revision or uniqueness conflict, or unavailable storage
- Response `503`: Invalid request, unauthorized scope/host, revision or uniqueness conflict, or unavailable storage

## `get_schedule_booking_feedback`

`GET /schedule/bookings/{id}/feedback`

```python
Client.get_schedule_booking_feedback(self, *, id: str) -> ScheduleFeedbackResponse
```

- Response `200`: Successful operation
- Response `400`: Invalid capability or request, stale revision, expired deadline, or unavailable booking storage
- Response `401`: Invalid capability or request, stale revision, expired deadline, or unavailable booking storage
- Response `404`: Invalid capability or request, stale revision, expired deadline, or unavailable booking storage
- Response `409`: Invalid capability or request, stale revision, expired deadline, or unavailable booking storage
- Response `422`: Invalid capability or request, stale revision, expired deadline, or unavailable booking storage
- Response `503`: Invalid capability or request, stale revision, expired deadline, or unavailable booking storage

## `rate_schedule_booking`

`POST /schedule/bookings/{id}/feedback`

```python
Client.rate_schedule_booking(self, *, id: str, body: ScheduleFeedbackInput) -> ScheduleFeedbackSavedResponse
```

- Response `200`: Successful operation
- Response `400`: Invalid capability or request, stale revision, expired deadline, or unavailable booking storage
- Response `401`: Invalid capability or request, stale revision, expired deadline, or unavailable booking storage
- Response `404`: Invalid capability or request, stale revision, expired deadline, or unavailable booking storage
- Response `409`: Invalid capability or request, stale revision, expired deadline, or unavailable booking storage
- Response `422`: Invalid capability or request, stale revision, expired deadline, or unavailable booking storage
- Response `503`: Invalid capability or request, stale revision, expired deadline, or unavailable booking storage

## `create_schedule_booking_management_link`

`POST /schedule/bookings/{id}/management-link`

```python
Client.create_schedule_booking_management_link(self, *, id: str) -> ScheduleHostManagementLink
```

- Response `200`: Successful operation
- Response `400`: Invalid request, unauthorized scope/host, revision or uniqueness conflict, or unavailable storage
- Response `401`: Invalid request, unauthorized scope/host, revision or uniqueness conflict, or unavailable storage
- Response `403`: Invalid request, unauthorized scope/host, revision or uniqueness conflict, or unavailable storage
- Response `404`: Invalid request, unauthorized scope/host, revision or uniqueness conflict, or unavailable storage
- Response `409`: Invalid request, unauthorized scope/host, revision or uniqueness conflict, or unavailable storage
- Response `413`: Invalid request, unauthorized scope/host, revision or uniqueness conflict, or unavailable storage
- Response `415`: Invalid request, unauthorized scope/host, revision or uniqueness conflict, or unavailable storage
- Response `422`: Invalid request, unauthorized scope/host, revision or uniqueness conflict, or unavailable storage
- Response `503`: Invalid request, unauthorized scope/host, revision or uniqueness conflict, or unavailable storage

## `reschedule_schedule_booking`

`POST /schedule/bookings/{id}/reschedule`

```python
Client.reschedule_schedule_booking(self, *, id: str, body: ScheduleManagedRescheduleInput) -> ScheduleManagedRescheduleResponse
```

- Response `200`: Successful operation
- Response `400`: Invalid capability or request, stale revision, expired deadline, or unavailable booking storage
- Response `401`: Invalid capability or request, stale revision, expired deadline, or unavailable booking storage
- Response `404`: Invalid capability or request, stale revision, expired deadline, or unavailable booking storage
- Response `409`: Invalid capability or request, stale revision, expired deadline, or unavailable booking storage
- Response `422`: Invalid capability or request, stale revision, expired deadline, or unavailable booking storage
- Response `503`: Invalid capability or request, stale revision, expired deadline, or unavailable booking storage

## `list_schedule_booking_slots`

`GET /schedule/bookings/{id}/slots`

```python
Client.list_schedule_booking_slots(self, *, id: str, date: str) -> ScheduleManagedSlotsResponse
```

- Response `200`: Successful operation
- Response `400`: Invalid capability or request, stale revision, expired deadline, or unavailable booking storage
- Response `401`: Invalid capability or request, stale revision, expired deadline, or unavailable booking storage
- Response `404`: Invalid capability or request, stale revision, expired deadline, or unavailable booking storage
- Response `409`: Invalid capability or request, stale revision, expired deadline, or unavailable booking storage
- Response `422`: Invalid capability or request, stale revision, expired deadline, or unavailable booking storage
- Response `503`: Invalid capability or request, stale revision, expired deadline, or unavailable booking storage

## `get_schedule_booking_status`

`GET /schedule/bookings/{id}/status`

```python
Client.get_schedule_booking_status(self, *, id: str, workspace: str, event: str) -> SchedulePublicBookingStatus
```

- Response `200`: Current booking status
- Response `400`: Invalid query
- Response `401`: Missing or invalid booking capability
- Response `409`: Booking not found
- Response `503`: Storage unavailable

## `list_schedule_event_types`

`GET /schedule/event-types`

```python
Client.list_schedule_event_types(self, *, host_id: str | None = None) -> ScheduleEventTypeList
```

- Response `200`: Successful operation
- Response `400`: Invalid request, unauthorized scope/host, revision or uniqueness conflict, or unavailable storage
- Response `401`: Invalid request, unauthorized scope/host, revision or uniqueness conflict, or unavailable storage
- Response `403`: Invalid request, unauthorized scope/host, revision or uniqueness conflict, or unavailable storage
- Response `404`: Invalid request, unauthorized scope/host, revision or uniqueness conflict, or unavailable storage
- Response `409`: Invalid request, unauthorized scope/host, revision or uniqueness conflict, or unavailable storage
- Response `413`: Invalid request, unauthorized scope/host, revision or uniqueness conflict, or unavailable storage
- Response `415`: Invalid request, unauthorized scope/host, revision or uniqueness conflict, or unavailable storage
- Response `422`: Invalid request, unauthorized scope/host, revision or uniqueness conflict, or unavailable storage
- Response `503`: Invalid request, unauthorized scope/host, revision or uniqueness conflict, or unavailable storage

## `create_schedule_event_type`

`POST /schedule/event-types`

```python
Client.create_schedule_event_type(self, *, body: ScheduleEventTypeCreate) -> ScheduleSaveResult
```

- Response `200`: Successful operation
- Response `400`: Invalid request, unauthorized scope/host, revision or uniqueness conflict, or unavailable storage
- Response `401`: Invalid request, unauthorized scope/host, revision or uniqueness conflict, or unavailable storage
- Response `403`: Invalid request, unauthorized scope/host, revision or uniqueness conflict, or unavailable storage
- Response `404`: Invalid request, unauthorized scope/host, revision or uniqueness conflict, or unavailable storage
- Response `409`: Invalid request, unauthorized scope/host, revision or uniqueness conflict, or unavailable storage
- Response `413`: Invalid request, unauthorized scope/host, revision or uniqueness conflict, or unavailable storage
- Response `415`: Invalid request, unauthorized scope/host, revision or uniqueness conflict, or unavailable storage
- Response `422`: Invalid request, unauthorized scope/host, revision or uniqueness conflict, or unavailable storage
- Response `503`: Invalid request, unauthorized scope/host, revision or uniqueness conflict, or unavailable storage

## `get_schedule_event_type`

`GET /schedule/event-types/{id}`

```python
Client.get_schedule_event_type(self, *, id: str) -> ScheduleEventTypeItem
```

- Response `200`: Successful operation
- Response `400`: Invalid request, unauthorized scope/host, revision or uniqueness conflict, or unavailable storage
- Response `401`: Invalid request, unauthorized scope/host, revision or uniqueness conflict, or unavailable storage
- Response `403`: Invalid request, unauthorized scope/host, revision or uniqueness conflict, or unavailable storage
- Response `404`: Invalid request, unauthorized scope/host, revision or uniqueness conflict, or unavailable storage
- Response `409`: Invalid request, unauthorized scope/host, revision or uniqueness conflict, or unavailable storage
- Response `413`: Invalid request, unauthorized scope/host, revision or uniqueness conflict, or unavailable storage
- Response `415`: Invalid request, unauthorized scope/host, revision or uniqueness conflict, or unavailable storage
- Response `422`: Invalid request, unauthorized scope/host, revision or uniqueness conflict, or unavailable storage
- Response `503`: Invalid request, unauthorized scope/host, revision or uniqueness conflict, or unavailable storage

## `replace_schedule_event_type`

`PUT /schedule/event-types/{id}`

```python
Client.replace_schedule_event_type(self, *, id: str, body: ScheduleEventTypeUpdate) -> ScheduleSaveResult
```

- Response `200`: Successful operation
- Response `400`: Invalid request, unauthorized scope/host, revision or uniqueness conflict, or unavailable storage
- Response `401`: Invalid request, unauthorized scope/host, revision or uniqueness conflict, or unavailable storage
- Response `403`: Invalid request, unauthorized scope/host, revision or uniqueness conflict, or unavailable storage
- Response `404`: Invalid request, unauthorized scope/host, revision or uniqueness conflict, or unavailable storage
- Response `409`: Invalid request, unauthorized scope/host, revision or uniqueness conflict, or unavailable storage
- Response `413`: Invalid request, unauthorized scope/host, revision or uniqueness conflict, or unavailable storage
- Response `415`: Invalid request, unauthorized scope/host, revision or uniqueness conflict, or unavailable storage
- Response `422`: Invalid request, unauthorized scope/host, revision or uniqueness conflict, or unavailable storage
- Response `503`: Invalid request, unauthorized scope/host, revision or uniqueness conflict, or unavailable storage

## `list_schedule_private_links`

`GET /schedule/event-types/{id}/private-links`

```python
Client.list_schedule_private_links(self, *, id: str) -> SchedulePrivateLinkList
```

- Response `200`: Successful operation
- Response `400`: Invalid request, unauthorized scope/host, revision or uniqueness conflict, or unavailable storage
- Response `401`: Invalid request, unauthorized scope/host, revision or uniqueness conflict, or unavailable storage
- Response `403`: Invalid request, unauthorized scope/host, revision or uniqueness conflict, or unavailable storage
- Response `404`: Invalid request, unauthorized scope/host, revision or uniqueness conflict, or unavailable storage
- Response `409`: Invalid request, unauthorized scope/host, revision or uniqueness conflict, or unavailable storage
- Response `413`: Invalid request, unauthorized scope/host, revision or uniqueness conflict, or unavailable storage
- Response `415`: Invalid request, unauthorized scope/host, revision or uniqueness conflict, or unavailable storage
- Response `422`: Invalid request, unauthorized scope/host, revision or uniqueness conflict, or unavailable storage
- Response `503`: Invalid request, unauthorized scope/host, revision or uniqueness conflict, or unavailable storage

## `issue_schedule_private_link`

`POST /schedule/event-types/{id}/private-links`

```python
Client.issue_schedule_private_link(self, *, id: str, body: SchedulePrivateLinkIssue) -> SchedulePrivateLinkIssued
```

- Response `200`: Successful operation
- Response `400`: Invalid request, unauthorized scope/host, revision or uniqueness conflict, or unavailable storage
- Response `401`: Invalid request, unauthorized scope/host, revision or uniqueness conflict, or unavailable storage
- Response `403`: Invalid request, unauthorized scope/host, revision or uniqueness conflict, or unavailable storage
- Response `404`: Invalid request, unauthorized scope/host, revision or uniqueness conflict, or unavailable storage
- Response `409`: Invalid request, unauthorized scope/host, revision or uniqueness conflict, or unavailable storage
- Response `413`: Invalid request, unauthorized scope/host, revision or uniqueness conflict, or unavailable storage
- Response `415`: Invalid request, unauthorized scope/host, revision or uniqueness conflict, or unavailable storage
- Response `422`: Invalid request, unauthorized scope/host, revision or uniqueness conflict, or unavailable storage
- Response `503`: Invalid request, unauthorized scope/host, revision or uniqueness conflict, or unavailable storage

## `revoke_schedule_private_link`

`DELETE /schedule/event-types/{id}/private-links/{link_id}`

```python
Client.revoke_schedule_private_link(self, *, id: str, link_id: str) -> SchedulePrivateLinkRevoked
```

- Response `200`: Successful operation
- Response `400`: Invalid request, unauthorized scope/host, revision or uniqueness conflict, or unavailable storage
- Response `401`: Invalid request, unauthorized scope/host, revision or uniqueness conflict, or unavailable storage
- Response `403`: Invalid request, unauthorized scope/host, revision or uniqueness conflict, or unavailable storage
- Response `404`: Invalid request, unauthorized scope/host, revision or uniqueness conflict, or unavailable storage
- Response `409`: Invalid request, unauthorized scope/host, revision or uniqueness conflict, or unavailable storage
- Response `413`: Invalid request, unauthorized scope/host, revision or uniqueness conflict, or unavailable storage
- Response `415`: Invalid request, unauthorized scope/host, revision or uniqueness conflict, or unavailable storage
- Response `422`: Invalid request, unauthorized scope/host, revision or uniqueness conflict, or unavailable storage
- Response `503`: Invalid request, unauthorized scope/host, revision or uniqueness conflict, or unavailable storage

## `get_schedule_host`

`GET /schedule/hosts/{actor}`

```python
Client.get_schedule_host(self, *, actor: str) -> ScheduleConfiguration
```

- Response `200`: Successful operation
- Response `400`: Invalid request, unauthorized scope/host, revision or uniqueness conflict, or unavailable storage
- Response `401`: Invalid request, unauthorized scope/host, revision or uniqueness conflict, or unavailable storage
- Response `403`: Invalid request, unauthorized scope/host, revision or uniqueness conflict, or unavailable storage
- Response `404`: Invalid request, unauthorized scope/host, revision or uniqueness conflict, or unavailable storage
- Response `409`: Invalid request, unauthorized scope/host, revision or uniqueness conflict, or unavailable storage
- Response `413`: Invalid request, unauthorized scope/host, revision or uniqueness conflict, or unavailable storage
- Response `415`: Invalid request, unauthorized scope/host, revision or uniqueness conflict, or unavailable storage
- Response `422`: Invalid request, unauthorized scope/host, revision or uniqueness conflict, or unavailable storage
- Response `503`: Invalid request, unauthorized scope/host, revision or uniqueness conflict, or unavailable storage

## `get_schedule_host_booking_limits`

`GET /schedule/hosts/{actor}/booking-limits`

```python
Client.get_schedule_host_booking_limits(self, *, actor: str) -> ScheduleHostCapacityPolicyRead
```

- Response `200`: Successful operation
- Response `400`: Invalid request, unauthorized scope/host, revision or uniqueness conflict, or unavailable storage
- Response `401`: Invalid request, unauthorized scope/host, revision or uniqueness conflict, or unavailable storage
- Response `403`: Invalid request, unauthorized scope/host, revision or uniqueness conflict, or unavailable storage
- Response `404`: Invalid request, unauthorized scope/host, revision or uniqueness conflict, or unavailable storage
- Response `409`: Invalid request, unauthorized scope/host, revision or uniqueness conflict, or unavailable storage
- Response `413`: Invalid request, unauthorized scope/host, revision or uniqueness conflict, or unavailable storage
- Response `415`: Invalid request, unauthorized scope/host, revision or uniqueness conflict, or unavailable storage
- Response `422`: Invalid request, unauthorized scope/host, revision or uniqueness conflict, or unavailable storage
- Response `503`: Invalid request, unauthorized scope/host, revision or uniqueness conflict, or unavailable storage

## `update_schedule_host_booking_limits`

`PUT /schedule/hosts/{actor}/booking-limits`

```python
Client.update_schedule_host_booking_limits(self, *, actor: str, body: ScheduleHostCapacityPolicyInput) -> ScheduleHostCapacityPolicy
```

- Response `200`: Successful operation
- Response `400`: Invalid request, unauthorized scope/host, revision or uniqueness conflict, or unavailable storage
- Response `401`: Invalid request, unauthorized scope/host, revision or uniqueness conflict, or unavailable storage
- Response `403`: Invalid request, unauthorized scope/host, revision or uniqueness conflict, or unavailable storage
- Response `404`: Invalid request, unauthorized scope/host, revision or uniqueness conflict, or unavailable storage
- Response `409`: Invalid request, unauthorized scope/host, revision or uniqueness conflict, or unavailable storage
- Response `413`: Invalid request, unauthorized scope/host, revision or uniqueness conflict, or unavailable storage
- Response `415`: Invalid request, unauthorized scope/host, revision or uniqueness conflict, or unavailable storage
- Response `422`: Invalid request, unauthorized scope/host, revision or uniqueness conflict, or unavailable storage
- Response `503`: Invalid request, unauthorized scope/host, revision or uniqueness conflict, or unavailable storage

## `get_schedule_host_insights`

`GET /schedule/hosts/{actor}/insights`

```python
Client.get_schedule_host_insights(self, *, actor: str, from_: str, to: str) -> ScheduleInsightReport
```

- Response `200`: Aggregate report
- Response `400`: Invalid or overlarge range
- Response `401`: Invalid API key
- Response `403`: Host not authorized
- Response `503`: Storage unavailable

## `export_schedule_host_insights_csv`

`GET /schedule/hosts/{actor}/insights/export`

```python
Client.export_schedule_host_insights_csv(self, *, actor: str, from_: str, to: str) -> str
```

- Response `200`: Aggregate CSV
- Response `400`: Invalid or overlarge range
- Response `401`: Invalid API key
- Response `403`: Host not authorized
- Response `503`: Storage unavailable

## `list_schedule_notification_history`

`GET /schedule/notification-history`

```python
Client.list_schedule_notification_history(self, *, booking_id: str) -> ScheduleNotificationHistoryResponse
```

- Response `200`: Notification history
- Response `400`: Invalid booking ID
- Response `401`: Invalid API key
- Response `403`: Missing Schedule booking_read scope
- Response `503`: Storage unavailable

## `list_schedule_notification_senders`

`GET /schedule/notification-senders`

```python
Client.list_schedule_notification_senders(self) -> ScheduleNotificationSenderListResponse
```

- Response `200`: Successful operation
- Response `400`: Invalid request, unauthorized scope, ineligible sender or unavailable storage
- Response `401`: Invalid request, unauthorized scope, ineligible sender or unavailable storage
- Response `403`: Invalid request, unauthorized scope, ineligible sender or unavailable storage
- Response `413`: Invalid request, unauthorized scope, ineligible sender or unavailable storage
- Response `415`: Invalid request, unauthorized scope, ineligible sender or unavailable storage
- Response `422`: Invalid request, unauthorized scope, ineligible sender or unavailable storage
- Response `503`: Invalid request, unauthorized scope, ineligible sender or unavailable storage

## `get_schedule_notification_settings`

`GET /schedule/notification-settings`

```python
Client.get_schedule_notification_settings(self) -> ScheduleNotificationSettingsResponse
```

- Response `200`: Successful operation
- Response `400`: Invalid request, unauthorized scope, ineligible sender or unavailable storage
- Response `401`: Invalid request, unauthorized scope, ineligible sender or unavailable storage
- Response `403`: Invalid request, unauthorized scope, ineligible sender or unavailable storage
- Response `413`: Invalid request, unauthorized scope, ineligible sender or unavailable storage
- Response `415`: Invalid request, unauthorized scope, ineligible sender or unavailable storage
- Response `422`: Invalid request, unauthorized scope, ineligible sender or unavailable storage
- Response `503`: Invalid request, unauthorized scope, ineligible sender or unavailable storage

## `save_schedule_notification_settings`

`PUT /schedule/notification-settings`

```python
Client.save_schedule_notification_settings(self, *, body: ScheduleNotificationSettingsInput) -> ScheduleNotificationSettingsResponse
```

- Response `200`: Successful operation
- Response `400`: Invalid request, unauthorized scope, ineligible sender or unavailable storage
- Response `401`: Invalid request, unauthorized scope, ineligible sender or unavailable storage
- Response `403`: Invalid request, unauthorized scope, ineligible sender or unavailable storage
- Response `413`: Invalid request, unauthorized scope, ineligible sender or unavailable storage
- Response `415`: Invalid request, unauthorized scope, ineligible sender or unavailable storage
- Response `422`: Invalid request, unauthorized scope, ineligible sender or unavailable storage
- Response `503`: Invalid request, unauthorized scope, ineligible sender or unavailable storage

## `list_schedule_schedules`

`GET /schedule/schedules`

```python
Client.list_schedule_schedules(self, *, host_id: str | None = None) -> ScheduleAvailabilityList
```

- Response `200`: Successful operation
- Response `400`: Invalid request, unauthorized scope/host, revision or uniqueness conflict, or unavailable storage
- Response `401`: Invalid request, unauthorized scope/host, revision or uniqueness conflict, or unavailable storage
- Response `403`: Invalid request, unauthorized scope/host, revision or uniqueness conflict, or unavailable storage
- Response `404`: Invalid request, unauthorized scope/host, revision or uniqueness conflict, or unavailable storage
- Response `409`: Invalid request, unauthorized scope/host, revision or uniqueness conflict, or unavailable storage
- Response `413`: Invalid request, unauthorized scope/host, revision or uniqueness conflict, or unavailable storage
- Response `415`: Invalid request, unauthorized scope/host, revision or uniqueness conflict, or unavailable storage
- Response `422`: Invalid request, unauthorized scope/host, revision or uniqueness conflict, or unavailable storage
- Response `503`: Invalid request, unauthorized scope/host, revision or uniqueness conflict, or unavailable storage

## `create_schedule_availability`

`POST /schedule/schedules`

```python
Client.create_schedule_availability(self, *, body: ScheduleAvailabilityCreate) -> ScheduleSaveResult
```

- Response `200`: Successful operation
- Response `400`: Invalid request, unauthorized scope/host, revision or uniqueness conflict, or unavailable storage
- Response `401`: Invalid request, unauthorized scope/host, revision or uniqueness conflict, or unavailable storage
- Response `403`: Invalid request, unauthorized scope/host, revision or uniqueness conflict, or unavailable storage
- Response `404`: Invalid request, unauthorized scope/host, revision or uniqueness conflict, or unavailable storage
- Response `409`: Invalid request, unauthorized scope/host, revision or uniqueness conflict, or unavailable storage
- Response `413`: Invalid request, unauthorized scope/host, revision or uniqueness conflict, or unavailable storage
- Response `415`: Invalid request, unauthorized scope/host, revision or uniqueness conflict, or unavailable storage
- Response `422`: Invalid request, unauthorized scope/host, revision or uniqueness conflict, or unavailable storage
- Response `503`: Invalid request, unauthorized scope/host, revision or uniqueness conflict, or unavailable storage

## `delete_schedule_availability`

`DELETE /schedule/schedules/{id}`

```python
Client.delete_schedule_availability(self, *, id: str, body: ScheduleAvailabilityDelete) -> ScheduleSaveResult
```

- Response `200`: Successful operation
- Response `400`: Invalid request, unauthorized scope/host, revision or uniqueness conflict, or unavailable storage
- Response `401`: Invalid request, unauthorized scope/host, revision or uniqueness conflict, or unavailable storage
- Response `403`: Invalid request, unauthorized scope/host, revision or uniqueness conflict, or unavailable storage
- Response `404`: Invalid request, unauthorized scope/host, revision or uniqueness conflict, or unavailable storage
- Response `409`: Invalid request, unauthorized scope/host, revision or uniqueness conflict, or unavailable storage
- Response `413`: Invalid request, unauthorized scope/host, revision or uniqueness conflict, or unavailable storage
- Response `415`: Invalid request, unauthorized scope/host, revision or uniqueness conflict, or unavailable storage
- Response `422`: Invalid request, unauthorized scope/host, revision or uniqueness conflict, or unavailable storage
- Response `503`: Invalid request, unauthorized scope/host, revision or uniqueness conflict, or unavailable storage

## `get_schedule_availability`

`GET /schedule/schedules/{id}`

```python
Client.get_schedule_availability(self, *, id: str) -> ScheduleAvailabilityItem
```

- Response `200`: Successful operation
- Response `400`: Invalid request, unauthorized scope/host, revision or uniqueness conflict, or unavailable storage
- Response `401`: Invalid request, unauthorized scope/host, revision or uniqueness conflict, or unavailable storage
- Response `403`: Invalid request, unauthorized scope/host, revision or uniqueness conflict, or unavailable storage
- Response `404`: Invalid request, unauthorized scope/host, revision or uniqueness conflict, or unavailable storage
- Response `409`: Invalid request, unauthorized scope/host, revision or uniqueness conflict, or unavailable storage
- Response `413`: Invalid request, unauthorized scope/host, revision or uniqueness conflict, or unavailable storage
- Response `415`: Invalid request, unauthorized scope/host, revision or uniqueness conflict, or unavailable storage
- Response `422`: Invalid request, unauthorized scope/host, revision or uniqueness conflict, or unavailable storage
- Response `503`: Invalid request, unauthorized scope/host, revision or uniqueness conflict, or unavailable storage

## `replace_schedule_availability`

`PUT /schedule/schedules/{id}`

```python
Client.replace_schedule_availability(self, *, id: str, body: ScheduleAvailabilityUpdate) -> ScheduleSaveResult
```

- Response `200`: Successful operation
- Response `400`: Invalid request, unauthorized scope/host, revision or uniqueness conflict, or unavailable storage
- Response `401`: Invalid request, unauthorized scope/host, revision or uniqueness conflict, or unavailable storage
- Response `403`: Invalid request, unauthorized scope/host, revision or uniqueness conflict, or unavailable storage
- Response `404`: Invalid request, unauthorized scope/host, revision or uniqueness conflict, or unavailable storage
- Response `409`: Invalid request, unauthorized scope/host, revision or uniqueness conflict, or unavailable storage
- Response `413`: Invalid request, unauthorized scope/host, revision or uniqueness conflict, or unavailable storage
- Response `415`: Invalid request, unauthorized scope/host, revision or uniqueness conflict, or unavailable storage
- Response `422`: Invalid request, unauthorized scope/host, revision or uniqueness conflict, or unavailable storage
- Response `503`: Invalid request, unauthorized scope/host, revision or uniqueness conflict, or unavailable storage

## `list_schedule_slots`

`GET /schedule/slots`

```python
Client.list_schedule_slots(self, *, workspace: str, event: str, date: str, timezone: str, invite: str | None = None) -> SchedulePublicSlots
```

- Response `200`: Verified UTC start instants
- Response `400`: Invalid query
- Response `404`: Unavailable link or private invitation
- Response `503`: Calendar, capacity, storage, or transition verification unavailable

## `diagnose_schedule_slot`

`POST /schedule/slots/diagnose`

```python
Client.diagnose_schedule_slot(self, *, body: ScheduleAvailabilityDiagnosticInput) -> ScheduleAvailabilityDiagnosticResponse
```

- Response `200`: Successful operation
- Response `400`: Invalid request, unauthorized scope/host, revision or uniqueness conflict, or unavailable storage
- Response `401`: Invalid request, unauthorized scope/host, revision or uniqueness conflict, or unavailable storage
- Response `403`: Invalid request, unauthorized scope/host, revision or uniqueness conflict, or unavailable storage
- Response `404`: Invalid request, unauthorized scope/host, revision or uniqueness conflict, or unavailable storage
- Response `409`: Invalid request, unauthorized scope/host, revision or uniqueness conflict, or unavailable storage
- Response `413`: Invalid request, unauthorized scope/host, revision or uniqueness conflict, or unavailable storage
- Response `415`: Invalid request, unauthorized scope/host, revision or uniqueness conflict, or unavailable storage
- Response `422`: Invalid request, unauthorized scope/host, revision or uniqueness conflict, or unavailable storage
- Response `503`: Invalid request, unauthorized scope/host, revision or uniqueness conflict, or unavailable storage

## `list_schedule_webhooks`

`GET /schedule/webhooks`

```python
Client.list_schedule_webhooks(self) -> ScheduleWebhookListResponse
```

- Response `200`: Successful operation
- Response `400`: Invalid request, unauthorized scope, disabled destination or unavailable storage
- Response `401`: Invalid request, unauthorized scope, disabled destination or unavailable storage
- Response `403`: Invalid request, unauthorized scope, disabled destination or unavailable storage
- Response `404`: Invalid request, unauthorized scope, disabled destination or unavailable storage
- Response `409`: Invalid request, unauthorized scope, disabled destination or unavailable storage
- Response `413`: Invalid request, unauthorized scope, disabled destination or unavailable storage
- Response `415`: Invalid request, unauthorized scope, disabled destination or unavailable storage
- Response `422`: Invalid request, unauthorized scope, disabled destination or unavailable storage
- Response `503`: Invalid request, unauthorized scope, disabled destination or unavailable storage

## `create_schedule_webhook`

`POST /schedule/webhooks`

```python
Client.create_schedule_webhook(self, *, body: ScheduleWebhookCreate) -> ScheduleWebhookCreateResponse
```

- Response `200`: Successful operation
- Response `400`: Invalid request, unauthorized scope, disabled destination or unavailable storage
- Response `401`: Invalid request, unauthorized scope, disabled destination or unavailable storage
- Response `403`: Invalid request, unauthorized scope, disabled destination or unavailable storage
- Response `404`: Invalid request, unauthorized scope, disabled destination or unavailable storage
- Response `409`: Invalid request, unauthorized scope, disabled destination or unavailable storage
- Response `413`: Invalid request, unauthorized scope, disabled destination or unavailable storage
- Response `415`: Invalid request, unauthorized scope, disabled destination or unavailable storage
- Response `422`: Invalid request, unauthorized scope, disabled destination or unavailable storage
- Response `503`: Invalid request, unauthorized scope, disabled destination or unavailable storage

## `update_schedule_webhook`

`PATCH /schedule/webhooks/{id}`

```python
Client.update_schedule_webhook(self, *, id: str, body: ScheduleWebhookUpdate) -> ScheduleWebhookResponse
```

- Response `200`: Successful operation
- Response `400`: Invalid request, unauthorized scope, disabled destination or unavailable storage
- Response `401`: Invalid request, unauthorized scope, disabled destination or unavailable storage
- Response `403`: Invalid request, unauthorized scope, disabled destination or unavailable storage
- Response `404`: Invalid request, unauthorized scope, disabled destination or unavailable storage
- Response `409`: Invalid request, unauthorized scope, disabled destination or unavailable storage
- Response `413`: Invalid request, unauthorized scope, disabled destination or unavailable storage
- Response `415`: Invalid request, unauthorized scope, disabled destination or unavailable storage
- Response `422`: Invalid request, unauthorized scope, disabled destination or unavailable storage
- Response `503`: Invalid request, unauthorized scope, disabled destination or unavailable storage

## `list_schedule_webhook_deliveries`

`GET /schedule/webhooks/{id}/deliveries`

```python
Client.list_schedule_webhook_deliveries(self, *, id: str) -> ScheduleWebhookDeliveryListResponse
```

- Response `200`: Successful operation
- Response `400`: Invalid request, unauthorized scope, disabled destination or unavailable storage
- Response `401`: Invalid request, unauthorized scope, disabled destination or unavailable storage
- Response `403`: Invalid request, unauthorized scope, disabled destination or unavailable storage
- Response `404`: Invalid request, unauthorized scope, disabled destination or unavailable storage
- Response `409`: Invalid request, unauthorized scope, disabled destination or unavailable storage
- Response `413`: Invalid request, unauthorized scope, disabled destination or unavailable storage
- Response `415`: Invalid request, unauthorized scope, disabled destination or unavailable storage
- Response `422`: Invalid request, unauthorized scope, disabled destination or unavailable storage
- Response `503`: Invalid request, unauthorized scope, disabled destination or unavailable storage

## `rotate_schedule_webhook_secret`

`POST /schedule/webhooks/{id}/rotate-secret`

```python
Client.rotate_schedule_webhook_secret(self, *, id: str) -> ScheduleWebhookRotateResponse
```

- Response `200`: Successful operation
- Response `400`: Invalid request, unauthorized scope, disabled destination or unavailable storage
- Response `401`: Invalid request, unauthorized scope, disabled destination or unavailable storage
- Response `403`: Invalid request, unauthorized scope, disabled destination or unavailable storage
- Response `404`: Invalid request, unauthorized scope, disabled destination or unavailable storage
- Response `409`: Invalid request, unauthorized scope, disabled destination or unavailable storage
- Response `413`: Invalid request, unauthorized scope, disabled destination or unavailable storage
- Response `415`: Invalid request, unauthorized scope, disabled destination or unavailable storage
- Response `422`: Invalid request, unauthorized scope, disabled destination or unavailable storage
- Response `503`: Invalid request, unauthorized scope, disabled destination or unavailable storage

## `list_schedule_workflows`

`GET /schedule/workflows`

```python
Client.list_schedule_workflows(self) -> ScheduleWorkflowListResponse
```

- Response `200`: Workflow configuration
- Response `400`: Invalid request, scope, workflow, revision, activation settings or storage
- Response `401`: Invalid request, scope, workflow, revision, activation settings or storage
- Response `403`: Invalid request, scope, workflow, revision, activation settings or storage
- Response `404`: Invalid request, scope, workflow, revision, activation settings or storage
- Response `409`: Invalid request, scope, workflow, revision, activation settings or storage
- Response `413`: Invalid request, scope, workflow, revision, activation settings or storage
- Response `422`: Invalid request, scope, workflow, revision, activation settings or storage
- Response `503`: Invalid request, scope, workflow, revision, activation settings or storage

## `get_schedule_workflow`

`GET /schedule/workflows/{id}`

```python
Client.get_schedule_workflow(self, *, id: str) -> ScheduleWorkflowResponse
```

- Response `200`: Workflow configuration
- Response `400`: Invalid request, scope, workflow, revision, activation settings or storage
- Response `401`: Invalid request, scope, workflow, revision, activation settings or storage
- Response `403`: Invalid request, scope, workflow, revision, activation settings or storage
- Response `404`: Invalid request, scope, workflow, revision, activation settings or storage
- Response `409`: Invalid request, scope, workflow, revision, activation settings or storage
- Response `413`: Invalid request, scope, workflow, revision, activation settings or storage
- Response `422`: Invalid request, scope, workflow, revision, activation settings or storage
- Response `503`: Invalid request, scope, workflow, revision, activation settings or storage

## `change_schedule_workflow_state`

`PUT /schedule/workflows/{id}/state`

```python
Client.change_schedule_workflow_state(self, *, id: str, body: ScheduleWorkflowStateInput) -> ScheduleWorkflowResponse
```

- Response `200`: Workflow configuration
- Response `400`: Invalid request, scope, workflow, revision, activation settings or storage
- Response `401`: Invalid request, scope, workflow, revision, activation settings or storage
- Response `403`: Invalid request, scope, workflow, revision, activation settings or storage
- Response `404`: Invalid request, scope, workflow, revision, activation settings or storage
- Response `409`: Invalid request, scope, workflow, revision, activation settings or storage
- Response `413`: Invalid request, scope, workflow, revision, activation settings or storage
- Response `422`: Invalid request, scope, workflow, revision, activation settings or storage
- Response `503`: Invalid request, scope, workflow, revision, activation settings or storage

