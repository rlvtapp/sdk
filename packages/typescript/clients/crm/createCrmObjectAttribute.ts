/* eslint-disable no-alert, no-console */

import type { Options, RequestResult, ResponseResult } from '../../.kaji/client.js'
import type { CreateCrmObjectAttributeOptions, CreateCrmObjectAttributeResponses } from '../../models/crm/CreateCrmObjectAttribute.js'
import { client, resolveResponse } from '../../.kaji/client.js'

/**
 * {@link /v1/crm/objects/:object/attributes}
 */
export function createCrmObjectAttribute<ThrowOnError extends boolean = true>(
  options: Options<CreateCrmObjectAttributeOptions, ThrowOnError>,
): Promise<ResponseResult<RequestResult<CreateCrmObjectAttributeResponses, ThrowOnError>, ThrowOnError>> {
  const { client: request = client, ...config } = options
  const throwOnError = (config.throwOnError ?? true) as ThrowOnError

  return resolveResponse(
    request({
      method: 'POST',
      url: '/v1/crm/objects/{object}/attributes',
      security: [[{ id: 'bearerAuth', type: 'http', scheme: 'bearer' }], [{ id: 'xApiKey', type: 'apiKey', name: 'x-api-key', in: 'header' }]],
      ...config,
      throwOnError,
    }) as Promise<RequestResult<CreateCrmObjectAttributeResponses, ThrowOnError>>,
    throwOnError,
  )
}
