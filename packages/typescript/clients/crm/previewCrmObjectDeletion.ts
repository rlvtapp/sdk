/* eslint-disable no-alert, no-console */

import type { Options, RequestResult, ResponseResult } from '../../.kaji/client.js'
import type { PreviewCrmObjectDeletionOptions, PreviewCrmObjectDeletionResponses } from '../../models/crm/PreviewCrmObjectDeletion.js'
import { client, resolveResponse } from '../../.kaji/client.js'

/**
 * {@link /v1/crm/objects/:object/deletion-preview}
 */
export function previewCrmObjectDeletion<ThrowOnError extends boolean = true>(
  options: Options<PreviewCrmObjectDeletionOptions, ThrowOnError>,
): Promise<ResponseResult<RequestResult<PreviewCrmObjectDeletionResponses, ThrowOnError>, ThrowOnError>> {
  const { client: request = client, ...config } = options
  const throwOnError = (config.throwOnError ?? true) as ThrowOnError

  return resolveResponse(
    request({
      method: 'GET',
      url: '/v1/crm/objects/{object}/deletion-preview',
      security: [[{ id: 'bearerAuth', type: 'http', scheme: 'bearer' }], [{ id: 'xApiKey', type: 'apiKey', name: 'x-api-key', in: 'header' }]],
      ...config,
      throwOnError,
    }) as Promise<RequestResult<PreviewCrmObjectDeletionResponses, ThrowOnError>>,
    throwOnError,
  )
}
