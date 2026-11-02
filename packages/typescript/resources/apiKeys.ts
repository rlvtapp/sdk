import type { ClientInstance } from '../.poolster/client.js'
import { ApiKeysClientOperations0001 } from './apiKeys/operations_0001.js'

export interface ApiKeysClient extends ApiKeysClientOperations0001 {}

export class ApiKeysClient {
  constructor(client: ClientInstance) {
    Object.assign(this, new ApiKeysClientOperations0001(client))
  }
}
