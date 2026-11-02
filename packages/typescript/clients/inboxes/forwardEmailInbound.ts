import { poolsterJsonRefs } from '../_poolster_json_refs.js'
/* eslint-disable no-alert, no-console */

import type { Options, RequestResult, ResponseResult } from '../../.poolster/client.js'
import type { ForwardEmailInboundOptions, ForwardEmailInboundResponses } from '../../models/inboxes/ForwardEmailInbound.js'
import { client, resolveResponse } from '../../.poolster/client.js'

/**
 * {@link /email/inbound/:message_id/forward}
 */
export function forwardEmailInbound<ThrowOnError extends boolean = true>(
  options: Options<ForwardEmailInboundOptions, ThrowOnError>,
): Promise<ResponseResult<RequestResult<ForwardEmailInboundResponses, ThrowOnError>, ThrowOnError>> {
  const { client: request = client, ...config } = options
  const throwOnError = (config.throwOnError ?? true) as ThrowOnError

  return resolveResponse(
    request({
      method: 'POST',
      url: '/email/inbound/{message_id}/forward',
      security: [[{ id: 'bearerAuth', type: 'http', scheme: 'bearer' }], [{ id: 'xApiKey', type: 'apiKey', name: 'x-api-key', in: 'header' }]],
      jsonPlan: { lossless: false, refs: poolsterJsonRefs, requests: {"application/json":{"nullable":false,"ref":"ForwardRequest"}}, responses: {"202":{},"401":{"application/json":{"nullable":false,"ref":"ErrorResponse"}},"404":{"application/json":{"nullable":false,"ref":"ErrorResponse"}},"409":{"application/json":{"nullable":false,"ref":"ErrorResponse"}},"422":{"application/json":{"nullable":false,"ref":"ErrorResponse"}},"429":{"application/json":{"nullable":false,"ref":"ErrorResponse"}},"503":{"application/json":{"nullable":false,"ref":"ErrorResponse"}}} },
      ...config,
      throwOnError,
    }) as Promise<RequestResult<ForwardEmailInboundResponses, ThrowOnError>>,
    throwOnError,
  )
}
