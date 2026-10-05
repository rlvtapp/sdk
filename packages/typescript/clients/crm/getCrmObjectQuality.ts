/* eslint-disable no-alert, no-console */

import type { Options, RequestResult, ResponseResult } from '../../.kaji/client.js'
import type { GetCrmObjectQualityOptions, GetCrmObjectQualityResponses } from '../../models/crm/GetCrmObjectQuality.js'
import { client, resolveResponse } from '../../.kaji/client.js'

/**
 * {@link /v1/crm/objects/:object/quality}
 */
export function getCrmObjectQuality<ThrowOnError extends boolean = true>(
  options: Options<GetCrmObjectQualityOptions, ThrowOnError>,
): Promise<ResponseResult<RequestResult<GetCrmObjectQualityResponses, ThrowOnError>, ThrowOnError>> {
  const { client: request = client, ...config } = options
  const throwOnError = (config.throwOnError ?? true) as ThrowOnError

  return resolveResponse(
    request({
      method: 'GET',
      url: '/v1/crm/objects/{object}/quality',
      security: [[{ id: 'bearerAuth', type: 'http', scheme: 'bearer' }], [{ id: 'xApiKey', type: 'apiKey', name: 'x-api-key', in: 'header' }]],
      ...config,
      throwOnError,
    }) as Promise<RequestResult<GetCrmObjectQualityResponses, ThrowOnError>>,
    throwOnError,
  )
}
