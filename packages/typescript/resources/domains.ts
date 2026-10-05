import type { ClientInstance } from '../.kaji/client.js'
import { DomainsClientOperations0001 } from './domains/operations_0001.js'

export interface DomainsClient extends DomainsClientOperations0001 {}

export class DomainsClient {
  constructor(client: ClientInstance) {
    Object.assign(this, new DomainsClientOperations0001(client))
  }
}
