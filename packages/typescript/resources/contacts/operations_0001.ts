import type { ClientInstance } from '../../.poolster/client.js'
import { listEmailContacts } from '../../clients/contacts/listEmailContacts.js'
import { createEmailContact } from '../../clients/contacts/createEmailContact.js'
import { queryEmailContacts } from '../../clients/contacts/queryEmailContacts.js'
import { deleteEmailContact } from '../../clients/contacts/deleteEmailContact.js'
import { getEmailContact } from '../../clients/contacts/getEmailContact.js'
import { updateEmailContact } from '../../clients/contacts/updateEmailContact.js'
import { listEmailSegments } from '../../clients/contacts/listEmailSegments.js'
import { getEmailSegment } from '../../clients/contacts/getEmailSegment.js'

export class ContactsClientOperations0001 {
  readonly listEmail: typeof listEmailContacts
  readonly createEmail: typeof createEmailContact
  readonly queryEmail: typeof queryEmailContacts
  readonly deleteEmail: typeof deleteEmailContact
  readonly getEmail: typeof getEmailContact
  readonly updateEmail: typeof updateEmailContact
  readonly listEmailSegments: typeof listEmailSegments
  readonly getEmailSegment: typeof getEmailSegment

  constructor(client: ClientInstance) {
    this.listEmail = ((options: Parameters<typeof listEmailContacts>[0]) => listEmailContacts({ ...options, client })) as typeof listEmailContacts
    this.createEmail = ((options: Parameters<typeof createEmailContact>[0]) => createEmailContact({ ...options, client })) as typeof createEmailContact
    this.queryEmail = ((options: Parameters<typeof queryEmailContacts>[0]) => queryEmailContacts({ ...options, client })) as typeof queryEmailContacts
    this.deleteEmail = ((options: Parameters<typeof deleteEmailContact>[0]) => deleteEmailContact({ ...options, client })) as typeof deleteEmailContact
    this.getEmail = ((options: Parameters<typeof getEmailContact>[0]) => getEmailContact({ ...options, client })) as typeof getEmailContact
    this.updateEmail = ((options: Parameters<typeof updateEmailContact>[0]) => updateEmailContact({ ...options, client })) as typeof updateEmailContact
    this.listEmailSegments = ((options: Parameters<typeof listEmailSegments>[0]) => listEmailSegments({ ...options, client })) as typeof listEmailSegments
    this.getEmailSegment = ((options: Parameters<typeof getEmailSegment>[0]) => getEmailSegment({ ...options, client })) as typeof getEmailSegment
  }
}
