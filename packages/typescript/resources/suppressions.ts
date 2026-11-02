import type { ClientInstance } from '../.poolster/client.js'
import { SuppressionsClientOperations0001 } from './suppressions/operations_0001.js'

export interface SuppressionsClient extends SuppressionsClientOperations0001 {}

export class SuppressionsClient {
  constructor(client: ClientInstance) {
    Object.assign(this, new SuppressionsClientOperations0001(client))
  }
}
