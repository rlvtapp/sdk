/* eslint-disable no-alert, no-console */

import type { Options, RequestResult, ResponseResult } from '../../.kaji/client.js'
import type { CreateOptions, CreateResponses } from '../../models/sends/Create.js'
import { client, resolveResponse } from '../../.kaji/client.js'

/**
 * {@link /v1/email/sends}
 */
export function create<ThrowOnError extends boolean = true>(
  options: Options<CreateOptions, ThrowOnError>,
): Promise<ResponseResult<RequestResult<CreateResponses, ThrowOnError>, ThrowOnError>> {
  const { client: request = client, ...config } = options
  const throwOnError = (config.throwOnError ?? true) as ThrowOnError

  return resolveResponse(
    request({
      method: 'POST',
      url: '/v1/email/sends',
      security: [[{ id: 'bearerAuth', type: 'http', scheme: 'bearer' }], [{ id: 'xApiKey', type: 'apiKey', name: 'x-api-key', in: 'header' }]],
      ...config,
      throwOnError,
    }) as Promise<RequestResult<CreateResponses, ThrowOnError>>,
    throwOnError,
  )
}
