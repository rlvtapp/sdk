/* eslint-disable no-alert, no-console */

import type { Options, RequestResult, ResponseResult } from '../../.kaji/client.js'
import type { ListDeliveriesOptions, ListDeliveriesResponses } from '../../models/webhooks/ListDeliveries.js'
import { client, resolveResponse } from '../../.kaji/client.js'

/**
 * {@link /v1/email/webhooks/:webhook_id/deliveries}
 */
export function listDeliveries<ThrowOnError extends boolean = true>(
  options: Options<ListDeliveriesOptions, ThrowOnError>,
): Promise<ResponseResult<RequestResult<ListDeliveriesResponses, ThrowOnError>, ThrowOnError>> {
  const { client: request = client, ...config } = options
  const throwOnError = (config.throwOnError ?? true) as ThrowOnError

  return resolveResponse(
    request({
      method: 'GET',
      url: '/v1/email/webhooks/{webhook_id}/deliveries',
      security: [[{ id: 'bearerAuth', type: 'http', scheme: 'bearer' }], [{ id: 'xApiKey', type: 'apiKey', name: 'x-api-key', in: 'header' }]],
      ...config,
      throwOnError,
    }) as Promise<RequestResult<ListDeliveriesResponses, ThrowOnError>>,
    throwOnError,
  )
}
