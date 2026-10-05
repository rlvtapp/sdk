/* eslint-disable no-alert, no-console */

import type { Options, RequestResult, ResponseResult } from '../../.kaji/client.js'
import type { ListCrmObjectsOptions, ListCrmObjectsResponses } from '../../models/crm/ListCrmObjects.js'
import { client, resolveResponse } from '../../.kaji/client.js'

/**
 * {@link /v1/crm/objects}
 */
export function listCrmObjects<ThrowOnError extends boolean = true>(
  options: Options<ListCrmObjectsOptions, ThrowOnError>,
): Promise<ResponseResult<RequestResult<ListCrmObjectsResponses, ThrowOnError>, ThrowOnError>> {
  const { client: request = client, ...config } = options
  const throwOnError = (config.throwOnError ?? true) as ThrowOnError

  return resolveResponse(
    request({
      method: 'GET',
      url: '/v1/crm/objects',
      security: [[{ id: 'bearerAuth', type: 'http', scheme: 'bearer' }], [{ id: 'xApiKey', type: 'apiKey', name: 'x-api-key', in: 'header' }]],
      ...config,
      throwOnError,
    }) as Promise<RequestResult<ListCrmObjectsResponses, ThrowOnError>>,
    throwOnError,
  )
}
