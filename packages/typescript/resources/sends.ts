import type { ClientInstance } from '../.kaji/client.js'
import { SendsClientOperations0001 } from './sends/operations_0001.js'

export interface SendsClient extends SendsClientOperations0001 {}

export class SendsClient {
  constructor(client: ClientInstance) {
    Object.assign(this, new SendsClientOperations0001(client))
  }
}
