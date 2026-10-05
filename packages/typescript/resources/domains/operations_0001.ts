import type { ClientInstance } from '../../.kaji/client.js'
import { listDomains } from '../../clients/domains/listDomains.js'
import { getDomain } from '../../clients/domains/getDomain.js'

export class DomainsClientOperations0001 {
  readonly list: typeof listDomains
  readonly get: typeof getDomain

  constructor(client: ClientInstance) {
    this.list = ((options: Parameters<typeof listDomains>[0]) => listDomains({ ...options, client })) as typeof listDomains
    this.get = ((options: Parameters<typeof getDomain>[0]) => getDomain({ ...options, client })) as typeof getDomain
  }
}
