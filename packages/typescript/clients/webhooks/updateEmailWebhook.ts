import { poolsterJsonRefs } from '../_poolster_json_refs.js'
/* eslint-disable no-alert, no-console */

import type { Options, RequestResult, ResponseResult } from '../../.poolster/client.js'
import type { UpdateEmailWebhookOptions, UpdateEmailWebhookResponses } from '../../models/webhooks/UpdateEmailWebhook.js'
import { client, resolveResponse } from '../../.poolster/client.js'

/**
 * {@link /email/webhooks/:webhook_id}
 */
export function updateEmailWebhook<ThrowOnError extends boolean = true>(
  options: Options<UpdateEmailWebhookOptions, ThrowOnError>,
): Promise<ResponseResult<RequestResult<UpdateEmailWebhookResponses, ThrowOnError>, ThrowOnError>> {
  const { client: request = client, ...config } = options
  const throwOnError = (config.throwOnError ?? true) as ThrowOnError

  return resolveResponse(
    request({
      method: 'PATCH',
      url: '/email/webhooks/{webhook_id}',
      security: [[{ id: 'bearerAuth', type: 'http', scheme: 'bearer' }], [{ id: 'xApiKey', type: 'apiKey', name: 'x-api-key', in: 'header' }]],
      jsonPlan: { lossless: false, refs: poolsterJsonRefs, requests: {"application/json":{"nullable":false,"ref":"HookUpdate"}}, responses: {"200":{"application/json":{"nullable":false,"ref":"WebhookResponse"}},"401":{"application/json":{"nullable":false,"ref":"ErrorResponse"}},"404":{"application/json":{"nullable":false,"ref":"ErrorResponse"}},"422":{"application/json":{"nullable":false,"ref":"ErrorResponse"}},"503":{"application/json":{"nullable":false,"ref":"ErrorResponse"}}} },
      ...config,
      throwOnError,
    }) as Promise<RequestResult<UpdateEmailWebhookResponses, ThrowOnError>>,
    throwOnError,
  )
}
