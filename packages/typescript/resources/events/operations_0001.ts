import type { ClientInstance } from '../../.poolster/client.js'
import { trackEmailEvent } from '../../clients/events/trackEmailEvent.js'

export class EventsClientOperations0001 {
  readonly trackEmail: typeof trackEmailEvent

  constructor(client: ClientInstance) {
    this.trackEmail = ((options: Parameters<typeof trackEmailEvent>[0]) => trackEmailEvent({ ...options, client })) as typeof trackEmailEvent
  }
}
