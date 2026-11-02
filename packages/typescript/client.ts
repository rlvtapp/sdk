import type { ClientConfig, ClientInstance } from './.poolster/client.js'
import { createClient } from './.poolster/client.js'
import { ConfigurationClient } from './resources/configuration.js'
import { ContactsClient } from './resources/contacts.js'
import { CrmClient } from './resources/crm.js'
import { EventsClient } from './resources/events.js'
import { InboundClient } from './resources/inbound.js'
import { SendsClient } from './resources/sends.js'
import { WebhooksClient } from './resources/webhooks.js'

export class Relevate {
  /** Configured request transport for direct operations and generated framework hooks. */
  readonly transport: ClientInstance
  readonly configuration: ConfigurationClient
  readonly contacts: ContactsClient
  readonly crm: CrmClient
  readonly events: EventsClient
  readonly inbound: InboundClient
  readonly sends: SendsClient
  readonly webhooks: WebhooksClient

  constructor(config: ClientConfig = {}) {
    this.transport = createClient(config)
    this.configuration = new ConfigurationClient(this.transport)
    this.contacts = new ContactsClient(this.transport)
    this.crm = new CrmClient(this.transport)
    this.events = new EventsClient(this.transport)
    this.inbound = new InboundClient(this.transport)
    this.sends = new SendsClient(this.transport)
    this.webhooks = new WebhooksClient(this.transport)
  }
}
