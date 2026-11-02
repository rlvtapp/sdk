import { poolsterJsonRefs } from '../_poolster_json_refs.js'
/* eslint-disable no-alert, no-console */

import type { Options, RequestResult, ResponseResult } from '../../.poolster/client.js'
import type { ReplayEmailWebhookDeliveryOptions, ReplayEmailWebhookDeliveryResponses } from '../../models/webhooks/ReplayEmailWebhookDelivery.js'
import { client, resolveResponse } from '../../.poolster/client.js'

/**
 * {@link /email/webhooks/:webhook_id/deliveries/:delivery_id/replay}
 */
export function replayEmailWebhookDelivery<ThrowOnError extends boolean = true>(
  options: Options<ReplayEmailWebhookDeliveryOptions, ThrowOnError>,
): Promise<ResponseResult<RequestResult<ReplayEmailWebhookDeliveryResponses, ThrowOnError>, ThrowOnError>> {
  const { client: request = client, ...config } = options
  const throwOnError = (config.throwOnError ?? true) as ThrowOnError

  return resolveResponse(
    request({
      method: 'POST',
      url: '/email/webhooks/{webhook_id}/deliveries/{delivery_id}/replay',
      security: [[{ id: 'bearerAuth', type: 'http', scheme: 'bearer' }], [{ id: 'xApiKey', type: 'apiKey', name: 'x-api-key', in: 'header' }]],
      jsonPlan: { lossless: false, refs: poolsterJsonRefs, requests: {}, responses: {"200":{},"401":{"application/json":{"nullable":false,"ref":"ErrorResponse"}},"404":{"application/json":{"nullable":false,"ref":"ErrorResponse"}},"409":{"application/json":{"nullable":false,"ref":"ErrorResponse"}},"503":{"application/json":{"nullable":false,"ref":"ErrorResponse"}}} },
      ...config,
      throwOnError,
    }) as Promise<RequestResult<ReplayEmailWebhookDeliveryResponses, ThrowOnError>>,
    throwOnError,
  )
}
