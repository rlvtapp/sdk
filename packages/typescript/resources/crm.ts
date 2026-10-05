import type { ClientInstance } from '../.kaji/client.js'
import { CrmClientOperations0001 } from './crm/operations_0001.js'

export interface CrmClient extends CrmClientOperations0001 {}

export class CrmClient {
  constructor(client: ClientInstance) {
    Object.assign(this, new CrmClientOperations0001(client))
  }
}
