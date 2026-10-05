import type { ClientInstance } from '../../.kaji/client.js'
import { listWebhooks } from '../../clients/webhooks/listWebhooks.js'
import { createWebhook } from '../../clients/webhooks/createWebhook.js'
import { deleteWebhook } from '../../clients/webhooks/deleteWebhook.js'
import { updateWebhook } from '../../clients/webhooks/updateWebhook.js'
import { listDeliveries } from '../../clients/webhooks/listDeliveries.js'

export class WebhooksClientOperations0001 {
  readonly list: typeof listWebhooks
  readonly create: typeof createWebhook
  readonly delete: typeof deleteWebhook
  readonly update: typeof updateWebhook
  readonly listDeliveries: typeof listDeliveries

  constructor(client: ClientInstance) {
    this.list = ((options: Parameters<typeof listWebhooks>[0]) => listWebhooks({ ...options, client })) as typeof listWebhooks
    this.create = ((options: Parameters<typeof createWebhook>[0]) => createWebhook({ ...options, client })) as typeof createWebhook
    this.delete = ((options: Parameters<typeof deleteWebhook>[0]) => deleteWebhook({ ...options, client })) as typeof deleteWebhook
    this.update = ((options: Parameters<typeof updateWebhook>[0]) => updateWebhook({ ...options, client })) as typeof updateWebhook
    this.listDeliveries = ((options: Parameters<typeof listDeliveries>[0]) => listDeliveries({ ...options, client })) as typeof listDeliveries
  }
}
