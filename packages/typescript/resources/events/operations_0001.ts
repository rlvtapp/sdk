import type { ClientInstance } from '../../.kaji/client.js'
import { track } from '../../clients/events/track.js'

export class EventsClientOperations0001 {
  readonly track: typeof track

  constructor(client: ClientInstance) {
    this.track = ((options: Parameters<typeof track>[0]) => track({ ...options, client })) as typeof track
  }
}
