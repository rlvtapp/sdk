/* eslint-disable no-alert, no-console */

import type { Options, RequestResult, ResponseResult } from '../../.kaji/client.js'
import type { GetCrmListEntryOptions, GetCrmListEntryResponses } from '../../models/crm/GetCrmListEntry.js'
import { client, resolveResponse } from '../../.kaji/client.js'

/**
 * {@link /v1/crm/lists/:list/entries/:entry}
 */
export function getCrmListEntry<ThrowOnError extends boolean = true>(
  options: Options<GetCrmListEntryOptions, ThrowOnError>,
): Promise<ResponseResult<RequestResult<GetCrmListEntryResponses, ThrowOnError>, ThrowOnError>> {
  const { client: request = client, ...config } = options
  const throwOnError = (config.throwOnError ?? true) as ThrowOnError

  return resolveResponse(
    request({
      method: 'GET',
      url: '/v1/crm/lists/{list}/entries/{entry}',
      security: [[{ id: 'bearerAuth', type: 'http', scheme: 'bearer' }], [{ id: 'xApiKey', type: 'apiKey', name: 'x-api-key', in: 'header' }]],
      ...config,
      throwOnError,
    }) as Promise<RequestResult<GetCrmListEntryResponses, ThrowOnError>>,
    throwOnError,
  )
}
