import { poolsterJsonRefs } from '../_poolster_json_refs.js'
/* eslint-disable no-alert, no-console */

import type { Options, RequestResult, ResponseResult } from '../../.poolster/client.js'
import type { SendEmailInboxMessageOptions, SendEmailInboxMessageResponses } from '../../models/inboxes/SendEmailInboxMessage.js'
import { client, resolveResponse } from '../../.poolster/client.js'

/**
 * {@link /email/inboxes/:inbox_id/messages}
 */
export function sendEmailInboxMessage<ThrowOnError extends boolean = true>(
  options: Options<SendEmailInboxMessageOptions, ThrowOnError>,
): Promise<ResponseResult<RequestResult<SendEmailInboxMessageResponses, ThrowOnError>, ThrowOnError>> {
  const { client: request = client, ...config } = options
  const throwOnError = (config.throwOnError ?? true) as ThrowOnError

  return resolveResponse(
    request({
      method: 'POST',
      url: '/email/inboxes/{inbox_id}/messages',
      security: [[{ id: 'bearerAuth', type: 'http', scheme: 'bearer' }], [{ id: 'xApiKey', type: 'apiKey', name: 'x-api-key', in: 'header' }]],
      jsonPlan: { lossless: false, refs: poolsterJsonRefs, requests: {"application/json":{"nullable":false,"ref":"InboxMessage"}}, responses: {"202":{},"401":{"application/json":{"nullable":false,"ref":"ErrorResponse"}},"404":{"application/json":{"nullable":false,"ref":"ErrorResponse"}},"409":{"application/json":{"nullable":false,"ref":"ErrorResponse"}},"422":{"application/json":{"nullable":false,"ref":"ErrorResponse"}},"429":{"application/json":{"nullable":false,"ref":"ErrorResponse"}},"503":{"application/json":{"nullable":false,"ref":"ErrorResponse"}}} },
      ...config,
      throwOnError,
    }) as Promise<RequestResult<SendEmailInboxMessageResponses, ThrowOnError>>,
    throwOnError,
  )
}
