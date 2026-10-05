/* eslint-disable no-alert, no-console */

import type { Options, RequestResult, ResponseResult } from '../../.kaji/client.js'
import type { DeleteWebhookOptions, DeleteWebhookResponses } from '../../models/webhooks/DeleteWebhook.js'
import { client, resolveResponse } from '../../.kaji/client.js'

/**
 * {@link /v1/email/webhooks/:webhook_id}
 */
export function deleteWebhook<ThrowOnError extends boolean = true>(
  options: Options<DeleteWebhookOptions, ThrowOnError>,
): Promise<ResponseResult<RequestResult<DeleteWebhookResponses, ThrowOnError>, ThrowOnError>> {
  const { client: request = client, ...config } = options
  const throwOnError = (config.throwOnError ?? true) as ThrowOnError

  return resolveResponse(
    request({
      method: 'DELETE',
      url: '/v1/email/webhooks/{webhook_id}',
      security: [[{ id: 'bearerAuth', type: 'http', scheme: 'bearer' }], [{ id: 'xApiKey', type: 'apiKey', name: 'x-api-key', in: 'header' }]],
      ...config,
      throwOnError,
    }) as Promise<RequestResult<DeleteWebhookResponses, ThrowOnError>>,
    throwOnError,
  )
}
