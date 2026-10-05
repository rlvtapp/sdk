import type { ClientInstance } from '../.kaji/client.js'
import { WebhooksClientOperations0001 } from './webhooks/operations_0001.js'

export interface WebhooksClient extends WebhooksClientOperations0001 {}

export class WebhooksClient {
  constructor(client: ClientInstance) {
    Object.assign(this, new WebhooksClientOperations0001(client))
  }
}
