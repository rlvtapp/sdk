/* eslint-disable no-alert, no-console */

import type { Options, RequestResult, ResponseResult } from '../../.kaji/client.js'
import type { ListWebhooksOptions, ListWebhooksResponses } from '../../models/webhooks/ListWebhooks.js'
import { client, resolveResponse } from '../../.kaji/client.js'

/**
 * {@link /v1/email/webhooks}
 */
export function listWebhooks<ThrowOnError extends boolean = true>(
  options: Options<ListWebhooksOptions, ThrowOnError>,
): Promise<ResponseResult<RequestResult<ListWebhooksResponses, ThrowOnError>, ThrowOnError>> {
  const { client: request = client, ...config } = options
  const throwOnError = (config.throwOnError ?? true) as ThrowOnError

  return resolveResponse(
    request({
      method: 'GET',
      url: '/v1/email/webhooks',
      security: [[{ id: 'bearerAuth', type: 'http', scheme: 'bearer' }], [{ id: 'xApiKey', type: 'apiKey', name: 'x-api-key', in: 'header' }]],
      ...config,
      throwOnError,
    }) as Promise<RequestResult<ListWebhooksResponses, ThrowOnError>>,
    throwOnError,
  )
}
