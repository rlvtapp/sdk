import { poolsterJsonRefs } from '../_poolster_json_refs.js'
/* eslint-disable no-alert, no-console */

import type { Options, RequestResult, ResponseResult } from '../../.poolster/client.js'
import type { DeleteEmailWebhookOptions, DeleteEmailWebhookResponses } from '../../models/webhooks/DeleteEmailWebhook.js'
import { client, resolveResponse } from '../../.poolster/client.js'

/**
 * {@link /email/webhooks/:webhook_id}
 */
export function deleteEmailWebhook<ThrowOnError extends boolean = true>(
  options: Options<DeleteEmailWebhookOptions, ThrowOnError>,
): Promise<ResponseResult<RequestResult<DeleteEmailWebhookResponses, ThrowOnError>, ThrowOnError>> {
  const { client: request = client, ...config } = options
  const throwOnError = (config.throwOnError ?? true) as ThrowOnError

  return resolveResponse(
    request({
      method: 'DELETE',
      url: '/email/webhooks/{webhook_id}',
      security: [[{ id: 'bearerAuth', type: 'http', scheme: 'bearer' }], [{ id: 'xApiKey', type: 'apiKey', name: 'x-api-key', in: 'header' }]],
      jsonPlan: { lossless: false, refs: poolsterJsonRefs, requests: {}, responses: {"204":{},"401":{"application/json":{"nullable":false,"ref":"ErrorResponse"}},"404":{"application/json":{"nullable":false,"ref":"ErrorResponse"}},"503":{"application/json":{"nullable":false,"ref":"ErrorResponse"}}} },
      ...config,
      throwOnError,
    }) as Promise<RequestResult<DeleteEmailWebhookResponses, ThrowOnError>>,
    throwOnError,
  )
}
