import type { ClientInstance } from '../../.kaji/client.js'
import { create } from '../../clients/sends/create.js'
import { query } from '../../clients/sends/query.js'
import { cancel } from '../../clients/sends/cancel.js'
import { get } from '../../clients/sends/get.js'

export class SendsClientOperations0001 {
  readonly create: typeof create
  readonly query: typeof query
  readonly cancel: typeof cancel
  readonly get: typeof get

  constructor(client: ClientInstance) {
    this.create = ((options: Parameters<typeof create>[0]) => create({ ...options, client })) as typeof create
    this.query = ((options: Parameters<typeof query>[0]) => query({ ...options, client })) as typeof query
    this.cancel = ((options: Parameters<typeof cancel>[0]) => cancel({ ...options, client })) as typeof cancel
    this.get = ((options: Parameters<typeof get>[0]) => get({ ...options, client })) as typeof get
  }
}
