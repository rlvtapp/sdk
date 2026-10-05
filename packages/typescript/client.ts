import type { ClientConfig, ClientInstance } from './.kaji/client.js'
import { createClient } from './.kaji/client.js'
import { AuthCheckClient } from './resources/authCheck.js'
import { ContactsClient } from './resources/contacts.js'
import { CrmClient } from './resources/crm.js'
import { DomainsClient } from './resources/domains.js'
import { EventsClient } from './resources/events.js'
import { InboundClient } from './resources/inbound.js'
import { SegmentsClient } from './resources/segments.js'
import { SenderIdentitiesClient } from './resources/senderIdentities.js'
import { SendsClient } from './resources/sends.js'
import { WebhooksClient } from './resources/webhooks.js'

export class Relevate {
  /** Configured request transport for direct operations and generated framework hooks. */
  readonly transport: ClientInstance
  readonly authCheck: AuthCheckClient
  readonly contacts: ContactsClient
  readonly crm: CrmClient
  readonly domains: DomainsClient
  readonly events: EventsClient
  readonly inbound: InboundClient
  readonly segments: SegmentsClient
  readonly senderIdentities: SenderIdentitiesClient
  readonly sends: SendsClient
  readonly webhooks: WebhooksClient

  constructor(config: ClientConfig = {}) {
    this.transport = createClient(config)
    this.authCheck = new AuthCheckClient(this.transport)
    this.contacts = new ContactsClient(this.transport)
    this.crm = new CrmClient(this.transport)
    this.domains = new DomainsClient(this.transport)
    this.events = new EventsClient(this.transport)
    this.inbound = new InboundClient(this.transport)
    this.segments = new SegmentsClient(this.transport)
    this.senderIdentities = new SenderIdentitiesClient(this.transport)
    this.sends = new SendsClient(this.transport)
    this.webhooks = new WebhooksClient(this.transport)
  }
}
