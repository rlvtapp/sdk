import type { ClientInstance } from '../../.kaji/client.js'
import { listSegments } from '../../clients/segments/listSegments.js'
import { getSegment } from '../../clients/segments/getSegment.js'

export class SegmentsClientOperations0001 {
  readonly list: typeof listSegments
  readonly get: typeof getSegment

  constructor(client: ClientInstance) {
    this.list = ((options: Parameters<typeof listSegments>[0]) => listSegments({ ...options, client })) as typeof listSegments
    this.get = ((options: Parameters<typeof getSegment>[0]) => getSegment({ ...options, client })) as typeof getSegment
  }
}
