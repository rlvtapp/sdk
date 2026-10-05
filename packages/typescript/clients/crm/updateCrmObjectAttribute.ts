/* eslint-disable no-alert, no-console */

import type { Options, RequestResult, ResponseResult } from '../../.kaji/client.js'
import type { UpdateCrmObjectAttributeOptions, UpdateCrmObjectAttributeResponses } from '../../models/crm/UpdateCrmObjectAttribute.js'
import { client, resolveResponse } from '../../.kaji/client.js'

/**
 * {@link /v1/crm/objects/:object/attributes/:attribute}
 */
export function updateCrmObjectAttribute<ThrowOnError extends boolean = true>(
  options: Options<UpdateCrmObjectAttributeOptions, ThrowOnError>,
): Promise<ResponseResult<RequestResult<UpdateCrmObjectAttributeResponses, ThrowOnError>, ThrowOnError>> {
  const { client: request = client, ...config } = options
  const throwOnError = (config.throwOnError ?? true) as ThrowOnError

  return resolveResponse(
    request({
      method: 'PATCH',
      url: '/v1/crm/objects/{object}/attributes/{attribute}',
      security: [[{ id: 'bearerAuth', type: 'http', scheme: 'bearer' }], [{ id: 'xApiKey', type: 'apiKey', name: 'x-api-key', in: 'header' }]],
      ...config,
      throwOnError,
    }) as Promise<RequestResult<UpdateCrmObjectAttributeResponses, ThrowOnError>>,
    throwOnError,
  )
}
