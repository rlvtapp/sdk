import type { ClientInstance } from '../.kaji/client.js'
import { EventsClientOperations0001 } from './events/operations_0001.js'

export interface EventsClient extends EventsClientOperations0001 {}

export class EventsClient {
  constructor(client: ClientInstance) {
    Object.assign(this, new EventsClientOperations0001(client))
  }
}
