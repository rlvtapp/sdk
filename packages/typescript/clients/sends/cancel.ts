/* eslint-disable no-alert, no-console */

import type { Options, RequestResult, ResponseResult } from '../../.kaji/client.js'
import type { CancelOptions, CancelResponses } from '../../models/sends/Cancel.js'
import { client, resolveResponse } from '../../.kaji/client.js'

/**
 * {@link /v1/email/sends/:send_id}
 */
export function cancel<ThrowOnError extends boolean = true>(
  options: Options<CancelOptions, ThrowOnError>,
): Promise<ResponseResult<RequestResult<CancelResponses, ThrowOnError>, ThrowOnError>> {
  const { client: request = client, ...config } = options
  const throwOnError = (config.throwOnError ?? true) as ThrowOnError

  return resolveResponse(
    request({
      method: 'DELETE',
      url: '/v1/email/sends/{send_id}',
      security: [[{ id: 'bearerAuth', type: 'http', scheme: 'bearer' }], [{ id: 'xApiKey', type: 'apiKey', name: 'x-api-key', in: 'header' }]],
      ...config,
      throwOnError,
    }) as Promise<RequestResult<CancelResponses, ThrowOnError>>,
    throwOnError,
  )
}
