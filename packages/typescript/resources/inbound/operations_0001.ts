import type { ClientInstance } from '../../.poolster/client.js'
import { listEmailInbound } from '../../clients/inbound/listEmailInbound.js'
import { getEmailInbound } from '../../clients/inbound/getEmailInbound.js'

export class InboundClientOperations0001 {
  readonly listEmail: typeof listEmailInbound
  readonly getEmail: typeof getEmailInbound

  constructor(client: ClientInstance) {
    this.listEmail = ((options: Parameters<typeof listEmailInbound>[0]) => listEmailInbound({ ...options, client })) as typeof listEmailInbound
    this.getEmail = ((options: Parameters<typeof getEmailInbound>[0]) => getEmailInbound({ ...options, client })) as typeof getEmailInbound
  }
}
