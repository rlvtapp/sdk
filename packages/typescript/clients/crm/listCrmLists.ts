/* eslint-disable no-alert, no-console */

import type { Options, RequestResult, ResponseResult } from '../../.kaji/client.js'
import type { ListCrmListsOptions, ListCrmListsResponses } from '../../models/crm/ListCrmLists.js'
import { client, resolveResponse } from '../../.kaji/client.js'

/**
 * {@link /v1/crm/lists}
 */
export function listCrmLists<ThrowOnError extends boolean = true>(
  options: Options<ListCrmListsOptions, ThrowOnError>,
): Promise<ResponseResult<RequestResult<ListCrmListsResponses, ThrowOnError>, ThrowOnError>> {
  const { client: request = client, ...config } = options
  const throwOnError = (config.throwOnError ?? true) as ThrowOnError

  return resolveResponse(
    request({
      method: 'GET',
      url: '/v1/crm/lists',
      security: [[{ id: 'bearerAuth', type: 'http', scheme: 'bearer' }], [{ id: 'xApiKey', type: 'apiKey', name: 'x-api-key', in: 'header' }]],
      ...config,
      throwOnError,
    }) as Promise<RequestResult<ListCrmListsResponses, ThrowOnError>>,
    throwOnError,
  )
}
