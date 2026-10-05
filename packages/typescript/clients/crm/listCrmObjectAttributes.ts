/* eslint-disable no-alert, no-console */

import type { Options, RequestResult, ResponseResult } from '../../.kaji/client.js'
import type { ListCrmObjectAttributesOptions, ListCrmObjectAttributesResponses } from '../../models/crm/ListCrmObjectAttributes.js'
import { client, resolveResponse } from '../../.kaji/client.js'

/**
 * {@link /v1/crm/objects/:object/attributes}
 */
export function listCrmObjectAttributes<ThrowOnError extends boolean = true>(
  options: Options<ListCrmObjectAttributesOptions, ThrowOnError>,
): Promise<ResponseResult<RequestResult<ListCrmObjectAttributesResponses, ThrowOnError>, ThrowOnError>> {
  const { client: request = client, ...config } = options
  const throwOnError = (config.throwOnError ?? true) as ThrowOnError

  return resolveResponse(
    request({
      method: 'GET',
      url: '/v1/crm/objects/{object}/attributes',
      security: [[{ id: 'bearerAuth', type: 'http', scheme: 'bearer' }], [{ id: 'xApiKey', type: 'apiKey', name: 'x-api-key', in: 'header' }]],
      ...config,
      throwOnError,
    }) as Promise<RequestResult<ListCrmObjectAttributesResponses, ThrowOnError>>,
    throwOnError,
  )
}
