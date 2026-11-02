import type { ClientInstance } from '../.poolster/client.js'
import { ScheduleClientOperations0001 } from './schedule/operations_0001.js'

export interface ScheduleClient extends ScheduleClientOperations0001 {}

export class ScheduleClient {
  constructor(client: ClientInstance) {
    Object.assign(this, new ScheduleClientOperations0001(client))
  }
}
