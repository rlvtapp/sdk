import type { ClientInstance } from '../../.poolster/client.js'
import { listEmailApiKeys } from '../../clients/apiKeys/listEmailApiKeys.js'
import { createEmailApiKey } from '../../clients/apiKeys/createEmailApiKey.js'
import { revokeEmailApiKey } from '../../clients/apiKeys/revokeEmailApiKey.js'

export class ApiKeysClientOperations0001 {
  readonly listEmail: typeof listEmailApiKeys
  readonly createEmail: typeof createEmailApiKey
  readonly revokeEmail: typeof revokeEmailApiKey

  constructor(client: ClientInstance) {
    this.listEmail = ((options: Parameters<typeof listEmailApiKeys>[0]) => listEmailApiKeys({ ...options, client })) as typeof listEmailApiKeys
    this.createEmail = ((options: Parameters<typeof createEmailApiKey>[0]) => createEmailApiKey({ ...options, client })) as typeof createEmailApiKey
    this.revokeEmail = ((options: Parameters<typeof revokeEmailApiKey>[0]) => revokeEmailApiKey({ ...options, client })) as typeof revokeEmailApiKey
  }
}
