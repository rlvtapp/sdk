import type { ClientInstance } from '../.poolster/client.js'
import { UsageClientOperations0001 } from './usage/operations_0001.js'

export interface UsageClient extends UsageClientOperations0001 {}

export class UsageClient {
  constructor(client: ClientInstance) {
    Object.assign(this, new UsageClientOperations0001(client))
  }
}
