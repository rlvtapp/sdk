import type { ClientInstance } from '../../.poolster/client.js'
import { listEmailSuppressions } from '../../clients/suppressions/listEmailSuppressions.js'
import { createEmailSuppression } from '../../clients/suppressions/createEmailSuppression.js'
import { createEmailSuppressionBatch } from '../../clients/suppressions/createEmailSuppressionBatch.js'
import { deleteEmailSuppression } from '../../clients/suppressions/deleteEmailSuppression.js'
import { getEmailSuppression } from '../../clients/suppressions/getEmailSuppression.js'

export class SuppressionsClientOperations0001 {
  readonly listEmail: typeof listEmailSuppressions
  readonly createEmail: typeof createEmailSuppression
  readonly createEmailSuppressionBatch: typeof createEmailSuppressionBatch
  readonly deleteEmail: typeof deleteEmailSuppression
  readonly getEmail: typeof getEmailSuppression

  constructor(client: ClientInstance) {
    this.listEmail = ((options: Parameters<typeof listEmailSuppressions>[0]) => listEmailSuppressions({ ...options, client })) as typeof listEmailSuppressions
    this.createEmail = ((options: Parameters<typeof createEmailSuppression>[0]) => createEmailSuppression({ ...options, client })) as typeof createEmailSuppression
    this.createEmailSuppressionBatch = ((options: Parameters<typeof createEmailSuppressionBatch>[0]) => createEmailSuppressionBatch({ ...options, client })) as typeof createEmailSuppressionBatch
    this.deleteEmail = ((options: Parameters<typeof deleteEmailSuppression>[0]) => deleteEmailSuppression({ ...options, client })) as typeof deleteEmailSuppression
    this.getEmail = ((options: Parameters<typeof getEmailSuppression>[0]) => getEmailSuppression({ ...options, client })) as typeof getEmailSuppression
  }
}
