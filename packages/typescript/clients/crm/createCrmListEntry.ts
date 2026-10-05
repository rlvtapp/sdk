/* eslint-disable no-alert, no-console */

import type { Options, RequestResult, ResponseResult } from '../../.kaji/client.js'
import type { CreateCrmListEntryOptions, CreateCrmListEntryResponses } from '../../models/crm/CreateCrmListEntry.js'
import { client, resolveResponse } from '../../.kaji/client.js'

/**
 * {@link /v1/crm/lists/:list/entries}
 */
export function createCrmListEntry<ThrowOnError extends boolean = true>(
  options: Options<CreateCrmListEntryOptions, ThrowOnError>,
): Promise<ResponseResult<RequestResult<CreateCrmListEntryResponses, ThrowOnError>, ThrowOnError>> {
  const { client: request = client, ...config } = options
  const throwOnError = (config.throwOnError ?? true) as ThrowOnError

  return resolveResponse(
    request({
      method: 'POST',
      url: '/v1/crm/lists/{list}/entries',
      security: [[{ id: 'bearerAuth', type: 'http', scheme: 'bearer' }], [{ id: 'xApiKey', type: 'apiKey', name: 'x-api-key', in: 'header' }]],
      ...config,
      throwOnError,
    }) as Promise<RequestResult<CreateCrmListEntryResponses, ThrowOnError>>,
    throwOnError,
  )
}
