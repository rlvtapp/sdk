/* eslint-disable no-alert, no-console */

import type { Options, RequestResult, ResponseResult } from '../../.kaji/client.js'
import type { CreateCrmObjectOptions, CreateCrmObjectResponses } from '../../models/crm/CreateCrmObject.js'
import { client, resolveResponse } from '../../.kaji/client.js'

/**
 * {@link /v1/crm/objects}
 */
export function createCrmObject<ThrowOnError extends boolean = true>(
  options: Options<CreateCrmObjectOptions, ThrowOnError>,
): Promise<ResponseResult<RequestResult<CreateCrmObjectResponses, ThrowOnError>, ThrowOnError>> {
  const { client: request = client, ...config } = options
  const throwOnError = (config.throwOnError ?? true) as ThrowOnError

  return resolveResponse(
    request({
      method: 'POST',
      url: '/v1/crm/objects',
      security: [[{ id: 'bearerAuth', type: 'http', scheme: 'bearer' }], [{ id: 'xApiKey', type: 'apiKey', name: 'x-api-key', in: 'header' }]],
      ...config,
      throwOnError,
    }) as Promise<RequestResult<CreateCrmObjectResponses, ThrowOnError>>,
    throwOnError,
  )
}
