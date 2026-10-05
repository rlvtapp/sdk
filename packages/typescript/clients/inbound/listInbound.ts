/* eslint-disable no-alert, no-console */

import type { Options, RequestResult, ResponseResult } from '../../.kaji/client.js'
import type { ListInboundOptions, ListInboundResponses } from '../../models/inbound/ListInbound.js'
import { client, resolveResponse } from '../../.kaji/client.js'

/**
 * {@link /v1/email/inbound}
 */
export function listInbound<ThrowOnError extends boolean = true>(
  options: Options<ListInboundOptions, ThrowOnError>,
): Promise<ResponseResult<RequestResult<ListInboundResponses, ThrowOnError>, ThrowOnError>> {
  const { client: request = client, ...config } = options
  const throwOnError = (config.throwOnError ?? true) as ThrowOnError

  return resolveResponse(
    request({
      method: 'GET',
      url: '/v1/email/inbound',
      security: [[{ id: 'bearerAuth', type: 'http', scheme: 'bearer' }], [{ id: 'xApiKey', type: 'apiKey', name: 'x-api-key', in: 'header' }]],
      ...config,
      throwOnError,
    }) as Promise<RequestResult<ListInboundResponses, ThrowOnError>>,
    throwOnError,
  )
}
