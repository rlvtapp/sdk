/* eslint-disable no-alert, no-console */

import type { Options, RequestResult, ResponseResult } from '../../.kaji/client.js'
import type { DeleteCrmListEntryOptions, DeleteCrmListEntryResponses } from '../../models/crm/DeleteCrmListEntry.js'
import { client, resolveResponse } from '../../.kaji/client.js'

/**
 * {@link /v1/crm/lists/:list/entries/:entry}
 */
export function deleteCrmListEntry<ThrowOnError extends boolean = true>(
  options: Options<DeleteCrmListEntryOptions, ThrowOnError>,
): Promise<ResponseResult<RequestResult<DeleteCrmListEntryResponses, ThrowOnError>, ThrowOnError>> {
  const { client: request = client, ...config } = options
  const throwOnError = (config.throwOnError ?? true) as ThrowOnError

  return resolveResponse(
    request({
      method: 'DELETE',
      url: '/v1/crm/lists/{list}/entries/{entry}',
      security: [[{ id: 'bearerAuth', type: 'http', scheme: 'bearer' }], [{ id: 'xApiKey', type: 'apiKey', name: 'x-api-key', in: 'header' }]],
      ...config,
      throwOnError,
    }) as Promise<RequestResult<DeleteCrmListEntryResponses, ThrowOnError>>,
    throwOnError,
  )
}
