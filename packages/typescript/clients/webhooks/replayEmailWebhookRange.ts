import { poolsterJsonRefs } from '../_poolster_json_refs.js'
/* eslint-disable no-alert, no-console */

import type { Options, RequestResult, ResponseResult } from '../../.poolster/client.js'
import type { ReplayEmailWebhookRangeOptions, ReplayEmailWebhookRangeResponses } from '../../models/webhooks/ReplayEmailWebhookRange.js'
import { client, resolveResponse } from '../../.poolster/client.js'

/**
 * {@link /email/webhooks/:webhook_id/replay}
 */
export function replayEmailWebhookRange<ThrowOnError extends boolean = true>(
  options: Options<ReplayEmailWebhookRangeOptions, ThrowOnError>,
): Promise<ResponseResult<RequestResult<ReplayEmailWebhookRangeResponses, ThrowOnError>, ThrowOnError>> {
  const { client: request = client, ...config } = options
  const throwOnError = (config.throwOnError ?? true) as ThrowOnError

  return resolveResponse(
    request({
      method: 'POST',
      url: '/email/webhooks/{webhook_id}/replay',
      security: [[{ id: 'bearerAuth', type: 'http', scheme: 'bearer' }], [{ id: 'xApiKey', type: 'apiKey', name: 'x-api-key', in: 'header' }]],
      jsonPlan: { lossless: false, refs: poolsterJsonRefs, requests: {"application/json":{"nullable":false,"ref":"ReplayRange"}}, responses: {"200":{},"401":{"application/json":{"nullable":false,"ref":"ErrorResponse"}},"404":{"application/json":{"nullable":false,"ref":"ErrorResponse"}},"409":{"application/json":{"nullable":false,"ref":"ErrorResponse"}},"422":{"application/json":{"nullable":false,"ref":"ErrorResponse"}},"503":{"application/json":{"nullable":false,"ref":"ErrorResponse"}}} },
      ...config,
      throwOnError,
    }) as Promise<RequestResult<ReplayEmailWebhookRangeResponses, ThrowOnError>>,
    throwOnError,
  )
}
