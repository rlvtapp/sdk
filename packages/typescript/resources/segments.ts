import type { ClientInstance } from '../.kaji/client.js'
import { SegmentsClientOperations0001 } from './segments/operations_0001.js'

export interface SegmentsClient extends SegmentsClientOperations0001 {}

export class SegmentsClient {
  constructor(client: ClientInstance) {
    Object.assign(this, new SegmentsClientOperations0001(client))
  }
}
