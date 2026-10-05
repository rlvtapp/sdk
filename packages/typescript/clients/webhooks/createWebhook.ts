/* eslint-disable no-alert, no-console */

import type { Options, RequestResult, ResponseResult } from '../../.kaji/client.js'
import type { CreateWebhookOptions, CreateWebhookResponses } from '../../models/webhooks/CreateWebhook.js'
import { client, resolveResponse } from '../../.kaji/client.js'

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
      ...config,
      throwOnError,
    }) as Promise<RequestResult<CreateWebhookResponses, ThrowOnError>>,
    throwOnError,
  )
}
