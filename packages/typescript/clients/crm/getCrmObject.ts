/* eslint-disable no-alert, no-console */

import type { Options, RequestResult, ResponseResult } from '../../.kaji/client.js'
import type { GetCrmObjectOptions, GetCrmObjectResponses } from '../../models/crm/GetCrmObject.js'
import { client, resolveResponse } from '../../.kaji/client.js'

/**
 * {@link /v1/crm/objects/:object}
 */
export function getCrmObject<ThrowOnError extends boolean = true>(
  options: Options<GetCrmObjectOptions, ThrowOnError>,
): Promise<ResponseResult<RequestResult<GetCrmObjectResponses, ThrowOnError>, ThrowOnError>> {
  const { client: request = client, ...config } = options
  const throwOnError = (config.throwOnError ?? true) as ThrowOnError

  return resolveResponse(
    request({
      method: 'GET',
      url: '/v1/crm/objects/{object}',
      security: [[{ id: 'bearerAuth', type: 'http', scheme: 'bearer' }], [{ id: 'xApiKey', type: 'apiKey', name: 'x-api-key', in: 'header' }]],
      ...config,
      throwOnError,
    }) as Promise<RequestResult<GetCrmObjectResponses, ThrowOnError>>,
    throwOnError,
  )
}
