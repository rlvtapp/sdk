/* eslint-disable no-alert, no-console */

import type { Options, RequestResult, ResponseResult } from '../../.kaji/client.js'
import type { GetInboundOptions, GetInboundResponses } from '../../models/inbound/GetInbound.js'
import { client, resolveResponse } from '../../.kaji/client.js'

/**
 * {@link /v1/email/inbound/:message_id}
 */
export function getInbound<ThrowOnError extends boolean = true>(
  options: Options<GetInboundOptions, ThrowOnError>,
): Promise<ResponseResult<RequestResult<GetInboundResponses, ThrowOnError>, ThrowOnError>> {
  const { client: request = client, ...config } = options
  const throwOnError = (config.throwOnError ?? true) as ThrowOnError

  return resolveResponse(
    request({
      method: 'GET',
      url: '/v1/email/inbound/{message_id}',
      security: [[{ id: 'bearerAuth', type: 'http', scheme: 'bearer' }], [{ id: 'xApiKey', type: 'apiKey', name: 'x-api-key', in: 'header' }]],
      ...config,
      throwOnError,
    }) as Promise<RequestResult<GetInboundResponses, ThrowOnError>>,
    throwOnError,
  )
}
