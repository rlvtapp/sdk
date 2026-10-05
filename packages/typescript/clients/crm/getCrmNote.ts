/* eslint-disable no-alert, no-console */

import type { Options, RequestResult, ResponseResult } from '../../.kaji/client.js'
import type { GetCrmNoteOptions, GetCrmNoteResponses } from '../../models/crm/GetCrmNote.js'
import { client, resolveResponse } from '../../.kaji/client.js'

/**
 * {@link /v1/crm/notes/:note_id}
 */
export function getCrmNote<ThrowOnError extends boolean = true>(
  options: Options<GetCrmNoteOptions, ThrowOnError>,
): Promise<ResponseResult<RequestResult<GetCrmNoteResponses, ThrowOnError>, ThrowOnError>> {
  const { client: request = client, ...config } = options
  const throwOnError = (config.throwOnError ?? true) as ThrowOnError

  return resolveResponse(
    request({
      method: 'GET',
      url: '/v1/crm/notes/{note_id}',
      security: [[{ id: 'bearerAuth', type: 'http', scheme: 'bearer' }], [{ id: 'xApiKey', type: 'apiKey', name: 'x-api-key', in: 'header' }]],
      ...config,
      throwOnError,
    }) as Promise<RequestResult<GetCrmNoteResponses, ThrowOnError>>,
    throwOnError,
  )
}
