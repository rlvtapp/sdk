import { poolsterJsonRefs } from '../_poolster_json_refs.js'
/* eslint-disable no-alert, no-console */

import type { Options, RequestResult, ResponseResult } from '../../.poolster/client.js'
import type { CreateEmailInboxOptions, CreateEmailInboxResponses } from '../../models/inboxes/CreateEmailInbox.js'
import { client, resolveResponse } from '../../.poolster/client.js'

/**
 * {@link /email/inboxes}
 */
export function createEmailInbox<ThrowOnError extends boolean = true>(
  options: Options<CreateEmailInboxOptions, ThrowOnError>,
): Promise<ResponseResult<RequestResult<CreateEmailInboxResponses, ThrowOnError>, ThrowOnError>> {
  const { client: request = client, ...config } = options
  const throwOnError = (config.throwOnError ?? true) as ThrowOnError

  return resolveResponse(
    request({
      method: 'POST',
      url: '/email/inboxes',
      security: [[{ id: 'bearerAuth', type: 'http', scheme: 'bearer' }], [{ id: 'xApiKey', type: 'apiKey', name: 'x-api-key', in: 'header' }]],
      jsonPlan: { lossless: false, refs: poolsterJsonRefs, requests: {"application/json":{"nullable":false,"ref":"CreateInbox"}}, responses: {"201":{"application/json":{"nullable":false,"ref":"InboxResponse"}},"401":{"application/json":{"nullable":false,"ref":"ErrorResponse"}},"409":{"application/json":{"nullable":false,"ref":"ErrorResponse"}},"422":{"application/json":{"nullable":false,"ref":"ErrorResponse"}},"429":{"application/json":{"nullable":false,"ref":"ErrorResponse"}},"503":{"application/json":{"nullable":false,"ref":"ErrorResponse"}}} },
      ...config,
      throwOnError,
    }) as Promise<RequestResult<CreateEmailInboxResponses, ThrowOnError>>,
    throwOnError,
  )
}
