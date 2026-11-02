import { poolsterJsonRefs } from '../_poolster_json_refs.js'
/* eslint-disable no-alert, no-console */

import type { Options, RequestResult, ResponseResult } from '../../.poolster/client.js'
import type { ListEmailWebhooksOptions, ListEmailWebhooksResponses } from '../../models/webhooks/ListEmailWebhooks.js'
import { client, resolveResponse } from '../../.poolster/client.js'

/**
 * {@link /email/webhooks}
 */
export function listEmailWebhooks<ThrowOnError extends boolean = true>(
  options: Options<ListEmailWebhooksOptions, ThrowOnError>,
): Promise<ResponseResult<RequestResult<ListEmailWebhooksResponses, ThrowOnError>, ThrowOnError>> {
  const { client: request = client, ...config } = options
  const throwOnError = (config.throwOnError ?? true) as ThrowOnError

  return resolveResponse(
    request({
      method: 'GET',
      url: '/email/webhooks',
      security: [[{ id: 'bearerAuth', type: 'http', scheme: 'bearer' }], [{ id: 'xApiKey', type: 'apiKey', name: 'x-api-key', in: 'header' }]],
      jsonPlan: { lossless: false, refs: poolsterJsonRefs, requests: {}, responses: {"200":{"application/json":{"nullable":false,"ref":"WebhookListResponse"}},"401":{"application/json":{"nullable":false,"ref":"ErrorResponse"}},"503":{"application/json":{"nullable":false,"ref":"ErrorResponse"}}} },
      ...config,
      throwOnError,
    }) as Promise<RequestResult<ListEmailWebhooksResponses, ThrowOnError>>,
    throwOnError,
  )
}
