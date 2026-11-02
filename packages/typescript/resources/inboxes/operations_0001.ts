import type { ClientInstance } from '../../.poolster/client.js'
import { getEmailAttachment } from '../../clients/inboxes/getEmailAttachment.js'
import { forwardEmailInbound } from '../../clients/inboxes/forwardEmailInbound.js'
import { replyToEmailInbound } from '../../clients/inboxes/replyToEmailInbound.js'
import { listEmailInboxes } from '../../clients/inboxes/listEmailInboxes.js'
import { createEmailInbox } from '../../clients/inboxes/createEmailInbox.js'
import { listProvidedEmailDomains } from '../../clients/inboxes/listProvidedEmailDomains.js'
import { disableEmailInbox } from '../../clients/inboxes/disableEmailInbox.js'
import { getEmailInbox } from '../../clients/inboxes/getEmailInbox.js'
import { sendEmailInboxMessage } from '../../clients/inboxes/sendEmailInboxMessage.js'
import { listEmailThreads } from '../../clients/inboxes/listEmailThreads.js'
import { listEmailLabels } from '../../clients/inboxes/listEmailLabels.js'
import { createEmailLabel } from '../../clients/inboxes/createEmailLabel.js'
import { deleteEmailLabel } from '../../clients/inboxes/deleteEmailLabel.js'
import { getEmailThread } from '../../clients/inboxes/getEmailThread.js'
import { updateEmailThread } from '../../clients/inboxes/updateEmailThread.js'
import { addEmailThreadNote } from '../../clients/inboxes/addEmailThreadNote.js'
import { markEmailThreadRead } from '../../clients/inboxes/markEmailThreadRead.js'

export class InboxesClientOperations0001 {
  readonly getEmailAttachment: typeof getEmailAttachment
  readonly forwardEmailInbound: typeof forwardEmailInbound
  readonly replyToEmailInbound: typeof replyToEmailInbound
  readonly listEmail: typeof listEmailInboxes
  readonly createEmailInbox: typeof createEmailInbox
  readonly listProvidedEmailDomains: typeof listProvidedEmailDomains
  readonly disableEmailInbox: typeof disableEmailInbox
  readonly getEmailInbox: typeof getEmailInbox
  readonly sendEmailInboxMessage: typeof sendEmailInboxMessage
  readonly listEmailThreads: typeof listEmailThreads
  readonly listEmailLabels: typeof listEmailLabels
  readonly createEmailLabel: typeof createEmailLabel
  readonly deleteEmailLabel: typeof deleteEmailLabel
  readonly getEmailThread: typeof getEmailThread
  readonly updateEmailThread: typeof updateEmailThread
  readonly addEmailThreadNote: typeof addEmailThreadNote
  readonly markEmailThreadRead: typeof markEmailThreadRead

  constructor(client: ClientInstance) {
    this.getEmailAttachment = ((options: Parameters<typeof getEmailAttachment>[0]) => getEmailAttachment({ ...options, client })) as typeof getEmailAttachment
    this.forwardEmailInbound = ((options: Parameters<typeof forwardEmailInbound>[0]) => forwardEmailInbound({ ...options, client })) as typeof forwardEmailInbound
    this.replyToEmailInbound = ((options: Parameters<typeof replyToEmailInbound>[0]) => replyToEmailInbound({ ...options, client })) as typeof replyToEmailInbound
    this.listEmail = ((options: Parameters<typeof listEmailInboxes>[0]) => listEmailInboxes({ ...options, client })) as typeof listEmailInboxes
    this.createEmailInbox = ((options: Parameters<typeof createEmailInbox>[0]) => createEmailInbox({ ...options, client })) as typeof createEmailInbox
    this.listProvidedEmailDomains = ((options: Parameters<typeof listProvidedEmailDomains>[0]) => listProvidedEmailDomains({ ...options, client })) as typeof listProvidedEmailDomains
    this.disableEmailInbox = ((options: Parameters<typeof disableEmailInbox>[0]) => disableEmailInbox({ ...options, client })) as typeof disableEmailInbox
    this.getEmailInbox = ((options: Parameters<typeof getEmailInbox>[0]) => getEmailInbox({ ...options, client })) as typeof getEmailInbox
    this.sendEmailInboxMessage = ((options: Parameters<typeof sendEmailInboxMessage>[0]) => sendEmailInboxMessage({ ...options, client })) as typeof sendEmailInboxMessage
    this.listEmailThreads = ((options: Parameters<typeof listEmailThreads>[0]) => listEmailThreads({ ...options, client })) as typeof listEmailThreads
    this.listEmailLabels = ((options: Parameters<typeof listEmailLabels>[0]) => listEmailLabels({ ...options, client })) as typeof listEmailLabels
    this.createEmailLabel = ((options: Parameters<typeof createEmailLabel>[0]) => createEmailLabel({ ...options, client })) as typeof createEmailLabel
    this.deleteEmailLabel = ((options: Parameters<typeof deleteEmailLabel>[0]) => deleteEmailLabel({ ...options, client })) as typeof deleteEmailLabel
    this.getEmailThread = ((options: Parameters<typeof getEmailThread>[0]) => getEmailThread({ ...options, client })) as typeof getEmailThread
    this.updateEmailThread = ((options: Parameters<typeof updateEmailThread>[0]) => updateEmailThread({ ...options, client })) as typeof updateEmailThread
    this.addEmailThreadNote = ((options: Parameters<typeof addEmailThreadNote>[0]) => addEmailThreadNote({ ...options, client })) as typeof addEmailThreadNote
    this.markEmailThreadRead = ((options: Parameters<typeof markEmailThreadRead>[0]) => markEmailThreadRead({ ...options, client })) as typeof markEmailThreadRead
  }
}
