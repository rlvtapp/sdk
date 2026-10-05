/* eslint-disable no-alert, no-console */

import type { Options, RequestResult, ResponseResult } from '../../.kaji/client.js'
import type { ListCrmListAttributesOptions, ListCrmListAttributesResponses } from '../../models/crm/ListCrmListAttributes.js'
import { client, resolveResponse } from '../../.kaji/client.js'

/**
 * {@link /v1/crm/lists/:list/attributes}
 */
export function listCrmListAttributes<ThrowOnError extends boolean = true>(
  options: Options<ListCrmListAttributesOptions, ThrowOnError>,
): Promise<ResponseResult<RequestResult<ListCrmListAttributesResponses, ThrowOnError>, ThrowOnError>> {
  const { client: request = client, ...config } = options
  const throwOnError = (config.throwOnError ?? true) as ThrowOnError

  return resolveResponse(
    request({
      method: 'GET',
      url: '/v1/crm/lists/{list}/attributes',
      security: [[{ id: 'bearerAuth', type: 'http', scheme: 'bearer' }], [{ id: 'xApiKey', type: 'apiKey', name: 'x-api-key', in: 'header' }]],
      ...config,
      throwOnError,
    }) as Promise<RequestResult<ListCrmListAttributesResponses, ThrowOnError>>,
    throwOnError,
  )
}
