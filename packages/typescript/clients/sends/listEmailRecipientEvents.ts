import { poolsterJsonRefs } from '../_poolster_json_refs.js'
/* eslint-disable no-alert, no-console */

import type { Options, RequestResult, ResponseResult } from '../../.poolster/client.js'
import type { ListEmailRecipientEventsOptions, ListEmailRecipientEventsResponses } from '../../models/sends/ListEmailRecipientEvents.js'
import { client, resolveResponse } from '../../.poolster/client.js'

/**
 * {@link /email/emails/:email_id/recipients/:recipient_send_id/events}
 */
export function listEmailRecipientEvents<ThrowOnError extends boolean = true>(
  options: Options<ListEmailRecipientEventsOptions, ThrowOnError>,
): Promise<ResponseResult<RequestResult<ListEmailRecipientEventsResponses, ThrowOnError>, ThrowOnError>> {
  const { client: request = client, ...config } = options
  const throwOnError = (config.throwOnError ?? true) as ThrowOnError

  return resolveResponse(
    request({
      method: 'GET',
      url: '/email/emails/{email_id}/recipients/{recipient_send_id}/events',
      security: [[{ id: 'bearerAuth', type: 'http', scheme: 'bearer' }], [{ id: 'xApiKey', type: 'apiKey', name: 'x-api-key', in: 'header' }]],
      jsonPlan: { lossless: false, refs: poolsterJsonRefs, requests: {}, responses: {"200":{"application/json":{"nullable":false,"ref":"SendEventsResponse"}},"401":{"application/json":{"nullable":false,"ref":"ErrorResponse"}},"403":{"application/json":{"nullable":false,"ref":"ErrorResponse"}},"404":{"application/json":{"nullable":false,"ref":"ErrorResponse"}},"422":{"application/json":{"nullable":false,"ref":"ErrorResponse"}},"503":{"application/json":{"nullable":false,"ref":"ErrorResponse"}}} },
      ...config,
      throwOnError,
    }) as Promise<RequestResult<ListEmailRecipientEventsResponses, ThrowOnError>>,
    throwOnError,
  )
}
