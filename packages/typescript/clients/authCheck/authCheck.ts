/* eslint-disable no-alert, no-console */

import type { Options, RequestResult, ResponseResult } from '../../.kaji/client.js'
import type { AuthCheckOptions, AuthCheckResponses } from '../../models/authCheck/AuthCheck.js'
import { client, resolveResponse } from '../../.kaji/client.js'

/**
 * {@link /v1/email/auth-check}
 */
export function authCheck<ThrowOnError extends boolean = true>(
  options: Options<AuthCheckOptions, ThrowOnError>,
): Promise<ResponseResult<RequestResult<AuthCheckResponses, ThrowOnError>, ThrowOnError>> {
  const { client: request = client, ...config } = options
  const throwOnError = (config.throwOnError ?? true) as ThrowOnError

  return resolveResponse(
    request({
      method: 'GET',
      url: '/v1/email/auth-check',
      security: [[{ id: 'bearerAuth', type: 'http', scheme: 'bearer' }], [{ id: 'xApiKey', type: 'apiKey', name: 'x-api-key', in: 'header' }]],
      ...config,
      throwOnError,
    }) as Promise<RequestResult<AuthCheckResponses, ThrowOnError>>,
    throwOnError,
  )
}
