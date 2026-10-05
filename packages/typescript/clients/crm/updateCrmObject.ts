/* eslint-disable no-alert, no-console */

import type { Options, RequestResult, ResponseResult } from '../../.kaji/client.js'
import type { UpdateCrmObjectOptions, UpdateCrmObjectResponses } from '../../models/crm/UpdateCrmObject.js'
import { client, resolveResponse } from '../../.kaji/client.js'

/**
 * {@link /v1/crm/objects/:object}
 */
export function updateCrmObject<ThrowOnError extends boolean = true>(
  options: Options<UpdateCrmObjectOptions, ThrowOnError>,
): Promise<ResponseResult<RequestResult<UpdateCrmObjectResponses, ThrowOnError>, ThrowOnError>> {
  const { client: request = client, ...config } = options
  const throwOnError = (config.throwOnError ?? true) as ThrowOnError

  return resolveResponse(
    request({
      method: 'PATCH',
      url: '/v1/crm/objects/{object}',
      security: [[{ id: 'bearerAuth', type: 'http', scheme: 'bearer' }], [{ id: 'xApiKey', type: 'apiKey', name: 'x-api-key', in: 'header' }]],
      ...config,
      throwOnError,
    }) as Promise<RequestResult<UpdateCrmObjectResponses, ThrowOnError>>,
    throwOnError,
  )
}
