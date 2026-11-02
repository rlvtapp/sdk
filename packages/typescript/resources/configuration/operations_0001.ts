import type { ClientInstance } from '../../.poolster/client.js'
import { authCheck } from '../../clients/configuration/authCheck.js'
import { listDomains } from '../../clients/configuration/listDomains.js'
import { getDomain } from '../../clients/configuration/getDomain.js'
import { listSenderIdentities } from '../../clients/configuration/listSenderIdentities.js'
import { getSenderIdentity } from '../../clients/configuration/getSenderIdentity.js'

export class ConfigurationClientOperations0001 {
  readonly authCheck: typeof authCheck
  readonly listDomains: typeof listDomains
  readonly getDomain: typeof getDomain
  readonly listSenderIdentities: typeof listSenderIdentities
  readonly getSenderIdentity: typeof getSenderIdentity

  constructor(client: ClientInstance) {
    this.authCheck = ((options: Parameters<typeof authCheck>[0]) => authCheck({ ...options, client })) as typeof authCheck
    this.listDomains = ((options: Parameters<typeof listDomains>[0]) => listDomains({ ...options, client })) as typeof listDomains
    this.getDomain = ((options: Parameters<typeof getDomain>[0]) => getDomain({ ...options, client })) as typeof getDomain
    this.listSenderIdentities = ((options: Parameters<typeof listSenderIdentities>[0]) => listSenderIdentities({ ...options, client })) as typeof listSenderIdentities
    this.getSenderIdentity = ((options: Parameters<typeof getSenderIdentity>[0]) => getSenderIdentity({ ...options, client })) as typeof getSenderIdentity
  }
}
