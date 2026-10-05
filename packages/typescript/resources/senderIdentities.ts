import type { ClientInstance } from '../.kaji/client.js'
import { SenderIdentitiesClientOperations0001 } from './senderIdentities/operations_0001.js'

export interface SenderIdentitiesClient extends SenderIdentitiesClientOperations0001 {}

export class SenderIdentitiesClient {
  constructor(client: ClientInstance) {
    Object.assign(this, new SenderIdentitiesClientOperations0001(client))
  }
}
