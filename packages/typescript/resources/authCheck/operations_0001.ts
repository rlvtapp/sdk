import type { ClientInstance } from '../../.kaji/client.js'
import { authCheck } from '../../clients/authCheck/authCheck.js'

export class AuthCheckClientOperations0001 {
  readonly authCheck: typeof authCheck

  constructor(client: ClientInstance) {
    this.authCheck = ((options: Parameters<typeof authCheck>[0]) => authCheck({ ...options, client })) as typeof authCheck
  }
}
