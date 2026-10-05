/* eslint-disable no-alert, no-console */

import type { Options, RequestResult, ResponseResult } from '../../.kaji/client.js'
import type { ListCrmNotesOptions, ListCrmNotesResponses } from '../../models/crm/ListCrmNotes.js'
import { client, resolveResponse } from '../../.kaji/client.js'

/**
 * {@link /v1/crm/records/:record_id/notes}
 */
export function listCrmNotes<ThrowOnError extends boolean = true>(
  options: Options<ListCrmNotesOptions, ThrowOnError>,
): Promise<ResponseResult<RequestResult<ListCrmNotesResponses, ThrowOnError>, ThrowOnError>> {
  const { client: request = client, ...config } = options
  const throwOnError = (config.throwOnError ?? true) as ThrowOnError

  return resolveResponse(
    request({
      method: 'GET',
      url: '/v1/crm/records/{record_id}/notes',
      security: [[{ id: 'bearerAuth', type: 'http', scheme: 'bearer' }], [{ id: 'xApiKey', type: 'apiKey', name: 'x-api-key', in: 'header' }]],
      ...config,
      throwOnError,
    }) as Promise<RequestResult<ListCrmNotesResponses, ThrowOnError>>,
    throwOnError,
  )
}
