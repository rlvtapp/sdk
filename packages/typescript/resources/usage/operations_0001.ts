import type { ClientInstance } from '../../.poolster/client.js'
import { getEmailUsage } from '../../clients/usage/getEmailUsage.js'

export class UsageClientOperations0001 {
  readonly getEmail: typeof getEmailUsage

  constructor(client: ClientInstance) {
    this.getEmail = ((options: Parameters<typeof getEmailUsage>[0]) => getEmailUsage({ ...options, client })) as typeof getEmailUsage
  }
}
