/* eslint-disable no-alert, no-console */

import type { Options, RequestResult, ResponseResult } from '../../.kaji/client.js'
import type { DeleteCrmListOptions, DeleteCrmListResponses } from '../../models/crm/DeleteCrmList.js'
import { client, resolveResponse } from '../../.kaji/client.js'

/**
 * {@link /v1/crm/lists/:list}
 */
export function deleteCrmList<ThrowOnError extends boolean = true>(
  options: Options<DeleteCrmListOptions, ThrowOnError>,
): Promise<ResponseResult<RequestResult<DeleteCrmListResponses, ThrowOnError>, ThrowOnError>> {
  const { client: request = client, ...config } = options
  const throwOnError = (config.throwOnError ?? true) as ThrowOnError

  return resolveResponse(
    request({
      method: 'DELETE',
      url: '/v1/crm/lists/{list}',
      security: [[{ id: 'bearerAuth', type: 'http', scheme: 'bearer' }], [{ id: 'xApiKey', type: 'apiKey', name: 'x-api-key', in: 'header' }]],
      ...config,
      throwOnError,
    }) as Promise<RequestResult<DeleteCrmListResponses, ThrowOnError>>,
    throwOnError,
  )
}
