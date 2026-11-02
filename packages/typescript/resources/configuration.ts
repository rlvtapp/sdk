import type { ClientInstance } from '../.poolster/client.js'
import { ConfigurationClientOperations0001 } from './configuration/operations_0001.js'

export interface ConfigurationClient extends ConfigurationClientOperations0001 {}

export class ConfigurationClient {
  constructor(client: ClientInstance) {
    Object.assign(this, new ConfigurationClientOperations0001(client))
  }
}
