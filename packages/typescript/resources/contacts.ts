import type { ClientInstance } from '../.kaji/client.js'
import { ContactsClientOperations0001 } from './contacts/operations_0001.js'

export interface ContactsClient extends ContactsClientOperations0001 {}

export class ContactsClient {
  constructor(client: ClientInstance) {
    Object.assign(this, new ContactsClientOperations0001(client))
  }
}
