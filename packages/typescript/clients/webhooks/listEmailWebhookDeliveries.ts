import { poolsterJsonRefs } from '../_poolster_json_refs.js'
/* eslint-disable no-alert, no-console */

import type { Options, RequestResult, ResponseResult } from '../../.poolster/client.js'
import type { ListEmailWebhookDeliveriesOptions, ListEmailWebhookDeliveriesResponses } from '../../models/webhooks/ListEmailWebhookDeliveries.js'
import { client, resolveResponse } from '../../.poolster/client.js'

/**
 * {@link /email/webhooks/:webhook_id/deliveries}
 */
export function listEmailWebhookDeliveries<ThrowOnError extends boolean = true>(
  options: Options<ListEmailWebhookDeliveriesOptions, ThrowOnError>,
): Promise<ResponseResult<RequestResult<ListEmailWebhookDeliveriesResponses, ThrowOnError>, ThrowOnError>> {
  const { client: request = client, ...config } = options
  const throwOnError = (config.throwOnError ?? true) as ThrowOnError

  return resolveResponse(
    request({
      method: 'GET',
      url: '/email/webhooks/{webhook_id}/deliveries',
      security: [[{ id: 'bearerAuth', type: 'http', scheme: 'bearer' }], [{ id: 'xApiKey', type: 'apiKey', name: 'x-api-key', in: 'header' }]],
      jsonPlan: { lossless: false, refs: poolsterJsonRefs, requests: {}, responses: {"200":{"application/json":{"nullable":false,"ref":"WebhookDeliveryListResponse"}},"401":{"application/json":{"nullable":false,"ref":"ErrorResponse"}},"422":{"application/json":{"nullable":false,"ref":"ErrorResponse"}},"503":{"application/json":{"nullable":false,"ref":"ErrorResponse"}}} },
      ...config,
      throwOnError,
    }) as Promise<RequestResult<ListEmailWebhookDeliveriesResponses, ThrowOnError>>,
    throwOnError,
  )
}
