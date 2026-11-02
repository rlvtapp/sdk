import type { ClientInstance } from '../.poolster/client.js'
import { TemplatesClientOperations0001 } from './templates/operations_0001.js'

export interface TemplatesClient extends TemplatesClientOperations0001 {}

export class TemplatesClient {
  constructor(client: ClientInstance) {
    Object.assign(this, new TemplatesClientOperations0001(client))
  }
}
