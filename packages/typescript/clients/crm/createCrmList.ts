/* eslint-disable no-alert, no-console */

import type { Options, RequestResult, ResponseResult } from '../../.kaji/client.js'
import type { CreateCrmListOptions, CreateCrmListResponses } from '../../models/crm/CreateCrmList.js'
import { client, resolveResponse } from '../../.kaji/client.js'

/**
 * {@link /v1/crm/lists}
 */
export function createCrmList<ThrowOnError extends boolean = true>(
  options: Options<CreateCrmListOptions, ThrowOnError>,
): Promise<ResponseResult<RequestResult<CreateCrmListResponses, ThrowOnError>, ThrowOnError>> {
  const { client: request = client, ...config } = options
  const throwOnError = (config.throwOnError ?? true) as ThrowOnError

  return resolveResponse(
    request({
      method: 'POST',
      url: '/v1/crm/lists',
      security: [[{ id: 'bearerAuth', type: 'http', scheme: 'bearer' }], [{ id: 'xApiKey', type: 'apiKey', name: 'x-api-key', in: 'header' }]],
      ...config,
      throwOnError,
    }) as Promise<RequestResult<CreateCrmListResponses, ThrowOnError>>,
    throwOnError,
  )
}
