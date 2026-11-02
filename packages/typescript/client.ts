import type { ClientConfig, ClientInstance } from './.poolster/client.js'
import { createClient } from './.poolster/client.js'
import { ApiKeysClient } from './resources/apiKeys.js'
import { ConfigurationClient } from './resources/configuration.js'
import { ContactsClient } from './resources/contacts.js'
import { CrmClient } from './resources/crm.js'
import { EventsClient } from './resources/events.js'
import { InboundClient } from './resources/inbound.js'
import { InboxesClient } from './resources/inboxes.js'
import { ScheduleClient } from './resources/schedule.js'
import { SendsClient } from './resources/sends.js'
import { SuppressionsClient } from './resources/suppressions.js'
import { TemplatesClient } from './resources/templates.js'
import { UsageClient } from './resources/usage.js'
import { WebhooksClient } from './resources/webhooks.js'

export class Relevate {
  /** Configured request transport for direct operations and generated framework hooks. */
  readonly transport: ClientInstance
  readonly apiKeys: ApiKeysClient
  readonly configuration: ConfigurationClient
  readonly contacts: ContactsClient
  readonly crm: CrmClient
  readonly events: EventsClient
  readonly inbound: InboundClient
  readonly inboxes: InboxesClient
  readonly schedule: ScheduleClient
  readonly sends: SendsClient
  readonly suppressions: SuppressionsClient
  readonly templates: TemplatesClient
  readonly usage: UsageClient
  readonly webhooks: WebhooksClient

  constructor(config: ClientConfig = {}) {
    this.transport = createClient(config)
    this.apiKeys = new ApiKeysClient(this.transport)
    this.configuration = new ConfigurationClient(this.transport)
    this.contacts = new ContactsClient(this.transport)
    this.crm = new CrmClient(this.transport)
    this.events = new EventsClient(this.transport)
    this.inbound = new InboundClient(this.transport)
    this.inboxes = new InboxesClient(this.transport)
    this.schedule = new ScheduleClient(this.transport)
    this.sends = new SendsClient(this.transport)
    this.suppressions = new SuppressionsClient(this.transport)
    this.templates = new TemplatesClient(this.transport)
    this.usage = new UsageClient(this.transport)
    this.webhooks = new WebhooksClient(this.transport)
  }
}
