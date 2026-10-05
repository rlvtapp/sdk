import type { ClientInstance } from '../../.kaji/client.js'
import { listContacts } from '../../clients/contacts/listContacts.js'
import { createContact } from '../../clients/contacts/createContact.js'
import { queryContacts } from '../../clients/contacts/queryContacts.js'
import { getContact } from '../../clients/contacts/getContact.js'
import { updateContact } from '../../clients/contacts/updateContact.js'

export class ContactsClientOperations0001 {
  readonly list: typeof listContacts
  readonly create: typeof createContact
  readonly query: typeof queryContacts
  readonly get: typeof getContact
  readonly update: typeof updateContact

  constructor(client: ClientInstance) {
    this.list = ((options: Parameters<typeof listContacts>[0]) => listContacts({ ...options, client })) as typeof listContacts
    this.create = ((options: Parameters<typeof createContact>[0]) => createContact({ ...options, client })) as typeof createContact
    this.query = ((options: Parameters<typeof queryContacts>[0]) => queryContacts({ ...options, client })) as typeof queryContacts
    this.get = ((options: Parameters<typeof getContact>[0]) => getContact({ ...options, client })) as typeof getContact
    this.update = ((options: Parameters<typeof updateContact>[0]) => updateContact({ ...options, client })) as typeof updateContact
  }
}
