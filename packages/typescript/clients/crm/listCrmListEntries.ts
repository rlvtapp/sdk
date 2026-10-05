/* eslint-disable no-alert, no-console */

import type { Options, RequestResult, ResponseResult } from '../../.kaji/client.js'
import type { ListCrmListEntriesOptions, ListCrmListEntriesResponses } from '../../models/crm/ListCrmListEntries.js'
import { client, resolveResponse } from '../../.kaji/client.js'

/**
 * {@link /v1/crm/lists/:list/entries}
 */
export function listCrmListEntries<ThrowOnError extends boolean = true>(
  options: Options<ListCrmListEntriesOptions, ThrowOnError>,
): Promise<ResponseResult<RequestResult<ListCrmListEntriesResponses, ThrowOnError>, ThrowOnError>> {
  const { client: request = client, ...config } = options
  const throwOnError = (config.throwOnError ?? true) as ThrowOnError

  return resolveResponse(
    request({
      method: 'GET',
      url: '/v1/crm/lists/{list}/entries',
      security: [[{ id: 'bearerAuth', type: 'http', scheme: 'bearer' }], [{ id: 'xApiKey', type: 'apiKey', name: 'x-api-key', in: 'header' }]],
      ...config,
      throwOnError,
    }) as Promise<RequestResult<ListCrmListEntriesResponses, ThrowOnError>>,
    throwOnError,
  )
}
