import type { ClientInstance } from '../../.kaji/client.js'
import { listInbound } from '../../clients/inbound/listInbound.js'
import { getInbound } from '../../clients/inbound/getInbound.js'

export class InboundClientOperations0001 {
  readonly list: typeof listInbound
  readonly get: typeof getInbound

  constructor(client: ClientInstance) {
    this.list = ((options: Parameters<typeof listInbound>[0]) => listInbound({ ...options, client })) as typeof listInbound
    this.get = ((options: Parameters<typeof getInbound>[0]) => getInbound({ ...options, client })) as typeof getInbound
  }
}
