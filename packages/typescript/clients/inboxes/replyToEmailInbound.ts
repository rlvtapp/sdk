import { poolsterJsonRefs } from '../_poolster_json_refs.js'
/* eslint-disable no-alert, no-console */

import type { Options, RequestResult, ResponseResult } from '../../.poolster/client.js'
import type { ReplyToEmailInboundOptions, ReplyToEmailInboundResponses } from '../../models/inboxes/ReplyToEmailInbound.js'
import { client, resolveResponse } from '../../.poolster/client.js'

/**
 * {@link /email/inbound/:message_id/reply}
 */
export function replyToEmailInbound<ThrowOnError extends boolean = true>(
  options: Options<ReplyToEmailInboundOptions, ThrowOnError>,
): Promise<ResponseResult<RequestResult<ReplyToEmailInboundResponses, ThrowOnError>, ThrowOnError>> {
  const { client: request = client, ...config } = options
  const throwOnError = (config.throwOnError ?? true) as ThrowOnError

  return resolveResponse(
    request({
      method: 'POST',
      url: '/email/inbound/{message_id}/reply',
      security: [[{ id: 'bearerAuth', type: 'http', scheme: 'bearer' }], [{ id: 'xApiKey', type: 'apiKey', name: 'x-api-key', in: 'header' }]],
      jsonPlan: { lossless: false, refs: poolsterJsonRefs, requests: {"application/json":{"nullable":false,"ref":"ReplyRequest"}}, responses: {"202":{},"401":{"application/json":{"nullable":false,"ref":"ErrorResponse"}},"404":{"application/json":{"nullable":false,"ref":"ErrorResponse"}},"409":{"application/json":{"nullable":false,"ref":"ErrorResponse"}},"422":{"application/json":{"nullable":false,"ref":"ErrorResponse"}},"429":{"application/json":{"nullable":false,"ref":"ErrorResponse"}},"503":{"application/json":{"nullable":false,"ref":"ErrorResponse"}}} },
      ...config,
      throwOnError,
    }) as Promise<RequestResult<ReplyToEmailInboundResponses, ThrowOnError>>,
    throwOnError,
  )
}
