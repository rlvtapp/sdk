import type { ClientInstance } from '../../.kaji/client.js'
import { listSenderIdentities } from '../../clients/senderIdentities/listSenderIdentities.js'
import { getSenderIdentity } from '../../clients/senderIdentities/getSenderIdentity.js'

export class SenderIdentitiesClientOperations0001 {
  readonly list: typeof listSenderIdentities
  readonly getSenderIdentity: typeof getSenderIdentity

  constructor(client: ClientInstance) {
    this.list = ((options: Parameters<typeof listSenderIdentities>[0]) => listSenderIdentities({ ...options, client })) as typeof listSenderIdentities
    this.getSenderIdentity = ((options: Parameters<typeof getSenderIdentity>[0]) => getSenderIdentity({ ...options, client })) as typeof getSenderIdentity
  }
}
