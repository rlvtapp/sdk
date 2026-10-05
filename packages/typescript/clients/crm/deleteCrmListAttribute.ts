/* eslint-disable no-alert, no-console */

import type { Options, RequestResult, ResponseResult } from '../../.kaji/client.js'
import type { DeleteCrmListAttributeOptions, DeleteCrmListAttributeResponses } from '../../models/crm/DeleteCrmListAttribute.js'
import { client, resolveResponse } from '../../.kaji/client.js'

/**
 * {@link /v1/crm/lists/:list/attributes/:attribute}
 */
export function deleteCrmListAttribute<ThrowOnError extends boolean = true>(
  options: Options<DeleteCrmListAttributeOptions, ThrowOnError>,
): Promise<ResponseResult<RequestResult<DeleteCrmListAttributeResponses, ThrowOnError>, ThrowOnError>> {
  const { client: request = client, ...config } = options
  const throwOnError = (config.throwOnError ?? true) as ThrowOnError

  return resolveResponse(
    request({
      method: 'DELETE',
      url: '/v1/crm/lists/{list}/attributes/{attribute}',
      security: [[{ id: 'bearerAuth', type: 'http', scheme: 'bearer' }], [{ id: 'xApiKey', type: 'apiKey', name: 'x-api-key', in: 'header' }]],
      ...config,
      throwOnError,
    }) as Promise<RequestResult<DeleteCrmListAttributeResponses, ThrowOnError>>,
    throwOnError,
  )
}
