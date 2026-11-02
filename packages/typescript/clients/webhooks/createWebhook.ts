import { poolsterJsonRefs } from '../_poolster_json_refs.js'
/* eslint-disable no-alert, no-console */

import type { Options, RequestResult, ResponseResult } from '../../.poolster/client.js'
import type { CreateWebhookOptions, CreateWebhookResponses } from '../../models/webhooks/CreateWebhook.js'
import { client, resolveResponse } from '../../.poolster/client.js'

/**
 * {@link /v1/email/webhooks}
 */
export function createWebhook<ThrowOnError extends boolean = true>(
  options: Options<CreateWebhookOptions, ThrowOnError>,
): Promise<ResponseResult<RequestResult<CreateWebhookResponses, ThrowOnError>, ThrowOnError>> {
  const { client: request = client, ...config } = options
  const throwOnError = (config.throwOnError ?? true) as ThrowOnError

  return resolveResponse(
    request({
      method: 'POST',
      url: '/v1/email/webhooks',
      security: [[{ id: 'bearerAuth', type: 'http', scheme: 'bearer' }], [{ id: 'xApiKey', type: 'apiKey', name: 'x-api-key', in: 'header' }]],
      jsonPlan: { lossless: false, refs: poolsterJsonRefs, requests: {"application/json":{"nullable":false,"ref":"HookCreate"}}, responses: {"200":{"application/json":{"nullable":false,"ref":"CreateWebhookResponse"}},"401":{"application/json":{"nullable":false,"ref":"ErrorResponse"}},"422":{"application/json":{"nullable":false,"ref":"ErrorResponse"}},"503":{"application/json":{"nullable":false,"ref":"ErrorResponse"}}} },
      ...config,
      throwOnError,
    }) as Promise<RequestResult<CreateWebhookResponses, ThrowOnError>>,
    throwOnError,
  )
}
