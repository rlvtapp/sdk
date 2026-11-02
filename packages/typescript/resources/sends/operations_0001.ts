import type { ClientInstance } from '../../.poolster/client.js'
import { sendEmail } from '../../clients/sends/sendEmail.js'
import { sendEmailBatch } from '../../clients/sends/sendEmailBatch.js'
import { queryEmails } from '../../clients/sends/queryEmails.js'
import { cancelEmail } from '../../clients/sends/cancelEmail.js'
import { getEmail } from '../../clients/sends/getEmail.js'
import { rescheduleEmail } from '../../clients/sends/rescheduleEmail.js'
import { listEmailEvents } from '../../clients/sends/listEmailEvents.js'
import { listEmailRecipientEvents } from '../../clients/sends/listEmailRecipientEvents.js'

export class SendsClientOperations0001 {
  readonly sendEmail: typeof sendEmail
  readonly sendEmailBatch: typeof sendEmailBatch
  readonly queryEmails: typeof queryEmails
  readonly cancelEmail: typeof cancelEmail
  readonly getEmail: typeof getEmail
  readonly rescheduleEmail: typeof rescheduleEmail
  readonly listEmailEvents: typeof listEmailEvents
  readonly listEmailRecipientEvents: typeof listEmailRecipientEvents

  constructor(client: ClientInstance) {
    this.sendEmail = ((options: Parameters<typeof sendEmail>[0]) => sendEmail({ ...options, client })) as typeof sendEmail
    this.sendEmailBatch = ((options: Parameters<typeof sendEmailBatch>[0]) => sendEmailBatch({ ...options, client })) as typeof sendEmailBatch
    this.queryEmails = ((options: Parameters<typeof queryEmails>[0]) => queryEmails({ ...options, client })) as typeof queryEmails
    this.cancelEmail = ((options: Parameters<typeof cancelEmail>[0]) => cancelEmail({ ...options, client })) as typeof cancelEmail
    this.getEmail = ((options: Parameters<typeof getEmail>[0]) => getEmail({ ...options, client })) as typeof getEmail
    this.rescheduleEmail = ((options: Parameters<typeof rescheduleEmail>[0]) => rescheduleEmail({ ...options, client })) as typeof rescheduleEmail
    this.listEmailEvents = ((options: Parameters<typeof listEmailEvents>[0]) => listEmailEvents({ ...options, client })) as typeof listEmailEvents
    this.listEmailRecipientEvents = ((options: Parameters<typeof listEmailRecipientEvents>[0]) => listEmailRecipientEvents({ ...options, client })) as typeof listEmailRecipientEvents
  }
}
