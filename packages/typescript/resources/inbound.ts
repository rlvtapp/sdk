import type { ClientInstance } from '../.kaji/client.js'
import { InboundClientOperations0001 } from './inbound/operations_0001.js'

export interface InboundClient extends InboundClientOperations0001 {}

export class InboundClient {
  constructor(client: ClientInstance) {
    Object.assign(this, new InboundClientOperations0001(client))
  }
}
