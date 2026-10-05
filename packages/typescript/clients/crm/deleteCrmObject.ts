/* eslint-disable no-alert, no-console */

import type { Options, RequestResult, ResponseResult } from '../../.kaji/client.js'
import type { DeleteCrmObjectOptions, DeleteCrmObjectResponses } from '../../models/crm/DeleteCrmObject.js'
import { client, resolveResponse } from '../../.kaji/client.js'

/**
 * {@link /v1/crm/objects/:object}
 */
export function deleteCrmObject<ThrowOnError extends boolean = true>(
  options: Options<DeleteCrmObjectOptions, ThrowOnError>,
): Promise<ResponseResult<RequestResult<DeleteCrmObjectResponses, ThrowOnError>, ThrowOnError>> {
  const { client: request = client, ...config } = options
  const throwOnError = (config.throwOnError ?? true) as ThrowOnError

  return resolveResponse(
    request({
      method: 'DELETE',
      url: '/v1/crm/objects/{object}',
      security: [[{ id: 'bearerAuth', type: 'http', scheme: 'bearer' }], [{ id: 'xApiKey', type: 'apiKey', name: 'x-api-key', in: 'header' }]],
      ...config,
      throwOnError,
    }) as Promise<RequestResult<DeleteCrmObjectResponses, ThrowOnError>>,
    throwOnError,
  )
}
