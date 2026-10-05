import type { ClientInstance } from '../.kaji/client.js'
import { AuthCheckClientOperations0001 } from './authCheck/operations_0001.js'

export interface AuthCheckClient extends AuthCheckClientOperations0001 {}

export class AuthCheckClient {
  constructor(client: ClientInstance) {
    Object.assign(this, new AuthCheckClientOperations0001(client))
  }
}
