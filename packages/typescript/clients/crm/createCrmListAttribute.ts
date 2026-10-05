/* eslint-disable no-alert, no-console */

import type { Options, RequestResult, ResponseResult } from '../../.kaji/client.js'
import type { CreateCrmListAttributeOptions, CreateCrmListAttributeResponses } from '../../models/crm/CreateCrmListAttribute.js'
import { client, resolveResponse } from '../../.kaji/client.js'

/**
 * {@link /v1/crm/lists/:list/attributes}
 */
export function createCrmListAttribute<ThrowOnError extends boolean = true>(
  options: Options<CreateCrmListAttributeOptions, ThrowOnError>,
): Promise<ResponseResult<RequestResult<CreateCrmListAttributeResponses, ThrowOnError>, ThrowOnError>> {
  const { client: request = client, ...config } = options
  const throwOnError = (config.throwOnError ?? true) as ThrowOnError

  return resolveResponse(
    request({
      method: 'POST',
      url: '/v1/crm/lists/{list}/attributes',
      security: [[{ id: 'bearerAuth', type: 'http', scheme: 'bearer' }], [{ id: 'xApiKey', type: 'apiKey', name: 'x-api-key', in: 'header' }]],
      ...config,
      throwOnError,
    }) as Promise<RequestResult<CreateCrmListAttributeResponses, ThrowOnError>>,
    throwOnError,
  )
}
