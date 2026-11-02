import type { ClientInstance } from '../.poolster/client.js'
import { InboxesClientOperations0001 } from './inboxes/operations_0001.js'

export interface InboxesClient extends InboxesClientOperations0001 {}

export class InboxesClient {
  constructor(client: ClientInstance) {
    Object.assign(this, new InboxesClientOperations0001(client))
  }
}
