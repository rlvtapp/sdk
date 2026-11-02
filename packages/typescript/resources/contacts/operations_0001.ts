import type { ClientInstance } from '../../.poolster/client.js'
import { listContacts } from '../../clients/contacts/listContacts.js'
import { createContactOperation2 } from '../../clients/contacts/createContactOperation2.js'
import { queryContacts } from '../../clients/contacts/queryContacts.js'
import { getContact } from '../../clients/contacts/getContact.js'
import { updateContactOperation2 } from '../../clients/contacts/updateContactOperation2.js'
import { listSegments } from '../../clients/contacts/listSegments.js'
import { getSegment } from '../../clients/contacts/getSegment.js'

export class ContactsClientOperations0001 {
  readonly list: typeof listContacts
  readonly createContactOperation2: typeof createContactOperation2
  readonly query: typeof queryContacts
  readonly get: typeof getContact
  readonly updateContactOperation2: typeof updateContactOperation2
  readonly listSegments: typeof listSegments
  readonly getSegment: typeof getSegment

  constructor(client: ClientInstance) {
    this.list = ((options: Parameters<typeof listContacts>[0]) => listContacts({ ...options, client })) as typeof listContacts
    this.createContactOperation2 = ((options: Parameters<typeof createContactOperation2>[0]) => createContactOperation2({ ...options, client })) as typeof createContactOperation2
    this.query = ((options: Parameters<typeof queryContacts>[0]) => queryContacts({ ...options, client })) as typeof queryContacts
    this.get = ((options: Parameters<typeof getContact>[0]) => getContact({ ...options, client })) as typeof getContact
    this.updateContactOperation2 = ((options: Parameters<typeof updateContactOperation2>[0]) => updateContactOperation2({ ...options, client })) as typeof updateContactOperation2
    this.listSegments = ((options: Parameters<typeof listSegments>[0]) => listSegments({ ...options, client })) as typeof listSegments
    this.getSegment = ((options: Parameters<typeof getSegment>[0]) => getSegment({ ...options, client })) as typeof getSegment
  }
}
