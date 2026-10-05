/* eslint-disable no-alert, no-console */

import type { Options, RequestResult, ResponseResult } from '../../.kaji/client.js'
import type { UpdateCrmListEntryOptions, UpdateCrmListEntryResponses } from '../../models/crm/UpdateCrmListEntry.js'
import { client, resolveResponse } from '../../.kaji/client.js'

/**
 * {@link /v1/crm/lists/:list/entries/:entry}
 */
export function updateCrmListEntry<ThrowOnError extends boolean = true>(
  options: Options<UpdateCrmListEntryOptions, ThrowOnError>,
): Promise<ResponseResult<RequestResult<UpdateCrmListEntryResponses, ThrowOnError>, ThrowOnError>> {
  const { client: request = client, ...config } = options
  const throwOnError = (config.throwOnError ?? true) as ThrowOnError

  return resolveResponse(
    request({
      method: 'PATCH',
      url: '/v1/crm/lists/{list}/entries/{entry}',
      security: [[{ id: 'bearerAuth', type: 'http', scheme: 'bearer' }], [{ id: 'xApiKey', type: 'apiKey', name: 'x-api-key', in: 'header' }]],
      ...config,
      throwOnError,
    }) as Promise<RequestResult<UpdateCrmListEntryResponses, ThrowOnError>>,
    throwOnError,
  )
}
