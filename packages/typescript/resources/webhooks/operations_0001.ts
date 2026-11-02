import type { ClientInstance } from '../../.poolster/client.js'
import { listEmailWebhooks } from '../../clients/webhooks/listEmailWebhooks.js'
import { createEmailWebhook } from '../../clients/webhooks/createEmailWebhook.js'
import { deleteEmailWebhook } from '../../clients/webhooks/deleteEmailWebhook.js'
import { updateEmailWebhook } from '../../clients/webhooks/updateEmailWebhook.js'
import { listEmailWebhookDeliveries } from '../../clients/webhooks/listEmailWebhookDeliveries.js'
import { replayEmailWebhookDelivery } from '../../clients/webhooks/replayEmailWebhookDelivery.js'
import { replayEmailWebhookRange } from '../../clients/webhooks/replayEmailWebhookRange.js'
import { rotateEmailWebhookSecret } from '../../clients/webhooks/rotateEmailWebhookSecret.js'

export class WebhooksClientOperations0001 {
  readonly listEmail: typeof listEmailWebhooks
  readonly createEmail: typeof createEmailWebhook
  readonly deleteEmail: typeof deleteEmailWebhook
  readonly updateEmail: typeof updateEmailWebhook
  readonly listEmailWebhookDeliveries: typeof listEmailWebhookDeliveries
  readonly replayEmailWebhookDelivery: typeof replayEmailWebhookDelivery
  readonly replayEmailWebhookRange: typeof replayEmailWebhookRange
  readonly rotateEmailWebhookSecret: typeof rotateEmailWebhookSecret

  constructor(client: ClientInstance) {
    this.listEmail = ((options: Parameters<typeof listEmailWebhooks>[0]) => listEmailWebhooks({ ...options, client })) as typeof listEmailWebhooks
    this.createEmail = ((options: Parameters<typeof createEmailWebhook>[0]) => createEmailWebhook({ ...options, client })) as typeof createEmailWebhook
    this.deleteEmail = ((options: Parameters<typeof deleteEmailWebhook>[0]) => deleteEmailWebhook({ ...options, client })) as typeof deleteEmailWebhook
    this.updateEmail = ((options: Parameters<typeof updateEmailWebhook>[0]) => updateEmailWebhook({ ...options, client })) as typeof updateEmailWebhook
    this.listEmailWebhookDeliveries = ((options: Parameters<typeof listEmailWebhookDeliveries>[0]) => listEmailWebhookDeliveries({ ...options, client })) as typeof listEmailWebhookDeliveries
    this.replayEmailWebhookDelivery = ((options: Parameters<typeof replayEmailWebhookDelivery>[0]) => replayEmailWebhookDelivery({ ...options, client })) as typeof replayEmailWebhookDelivery
    this.replayEmailWebhookRange = ((options: Parameters<typeof replayEmailWebhookRange>[0]) => replayEmailWebhookRange({ ...options, client })) as typeof replayEmailWebhookRange
    this.rotateEmailWebhookSecret = ((options: Parameters<typeof rotateEmailWebhookSecret>[0]) => rotateEmailWebhookSecret({ ...options, client })) as typeof rotateEmailWebhookSecret
  }
}
