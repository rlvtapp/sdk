/* eslint-disable no-alert, no-console */

import type { Options, RequestResult, ResponseResult } from '../../.kaji/client.js'
import type { QueryOptions, QueryResponses } from '../../models/sends/Query.js'
import { client, resolveResponse } from '../../.kaji/client.js'

/**
 * {@link /v1/email/sends/query}
 */
export function query<ThrowOnError extends boolean = true>(
  options: Options<QueryOptions, ThrowOnError>,
): Promise<ResponseResult<RequestResult<QueryResponses, ThrowOnError>, ThrowOnError>> {
  const { client: request = client, ...config } = options
  const throwOnError = (config.throwOnError ?? true) as ThrowOnError

  return resolveResponse(
    request({
      method: 'POST',
      url: '/v1/email/sends/query',
      security: [[{ id: 'bearerAuth', type: 'http', scheme: 'bearer' }], [{ id: 'xApiKey', type: 'apiKey', name: 'x-api-key', in: 'header' }]],
      ...config,
      throwOnError,
    }) as Promise<RequestResult<QueryResponses, ThrowOnError>>,
    throwOnError,
  )
}
