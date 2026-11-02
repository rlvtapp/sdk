import { poolsterJsonRefs } from '../_poolster_json_refs.js'
/* eslint-disable no-alert, no-console */

import type { Options, RequestResult, ResponseResult } from '../../.poolster/client.js'
import type { UpdateWebhookOptions, UpdateWebhookResponses } from '../../models/webhooks/UpdateWebhook.js'
import { client, resolveResponse } from '../../.poolster/client.js'

/**
 * {@link /v1/email/webhooks/:webhook_id}
 */
export function updateWebhook<ThrowOnError extends boolean = true>(
  options: Options<UpdateWebhookOptions, ThrowOnError>,
): Promise<ResponseResult<RequestResult<UpdateWebhookResponses, ThrowOnError>, ThrowOnError>> {
  const { client: request = client, ...config } = options
  const throwOnError = (config.throwOnError ?? true) as ThrowOnError

  return resolveResponse(
    request({
      method: 'PATCH',
      url: '/v1/email/webhooks/{webhook_id}',
      security: [[{ id: 'bearerAuth', type: 'http', scheme: 'bearer' }], [{ id: 'xApiKey', type: 'apiKey', name: 'x-api-key', in: 'header' }]],
      jsonPlan: { lossless: false, refs: poolsterJsonRefs, requests: {"application/json":{"nullable":false,"ref":"HookUpdate"}}, responses: {"200":{"application/json":{"nullable":false,"ref":"WebhookResponse"}},"401":{"application/json":{"nullable":false,"ref":"ErrorResponse"}},"404":{"application/json":{"nullable":false,"ref":"ErrorResponse"}},"422":{"application/json":{"nullable":false,"ref":"ErrorResponse"}},"503":{"application/json":{"nullable":false,"ref":"ErrorResponse"}}} },
      ...config,
      throwOnError,
    }) as Promise<RequestResult<UpdateWebhookResponses, ThrowOnError>>,
    throwOnError,
  )
}
