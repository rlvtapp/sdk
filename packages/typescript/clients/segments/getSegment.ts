/* eslint-disable no-alert, no-console */

import type { Options, RequestResult, ResponseResult } from '../../.kaji/client.js'
import type { GetSegmentOptions, GetSegmentResponses } from '../../models/segments/GetSegment.js'
import { client, resolveResponse } from '../../.kaji/client.js'

/**
 * {@link /v1/email/segments/:id}
 */
export function getSegment<ThrowOnError extends boolean = true>(
  options: Options<GetSegmentOptions, ThrowOnError>,
): Promise<ResponseResult<RequestResult<GetSegmentResponses, ThrowOnError>, ThrowOnError>> {
  const { client: request = client, ...config } = options
  const throwOnError = (config.throwOnError ?? true) as ThrowOnError

  return resolveResponse(
    request({
      method: 'GET',
      url: '/v1/email/segments/{id}',
      security: [[{ id: 'bearerAuth', type: 'http', scheme: 'bearer' }], [{ id: 'xApiKey', type: 'apiKey', name: 'x-api-key', in: 'header' }]],
      ...config,
      throwOnError,
    }) as Promise<RequestResult<GetSegmentResponses, ThrowOnError>>,
    throwOnError,
  )
}
