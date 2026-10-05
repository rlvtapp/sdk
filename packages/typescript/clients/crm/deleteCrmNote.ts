/* eslint-disable no-alert, no-console */

import type { Options, RequestResult, ResponseResult } from '../../.kaji/client.js'
import type { DeleteCrmNoteOptions, DeleteCrmNoteResponses } from '../../models/crm/DeleteCrmNote.js'
import { client, resolveResponse } from '../../.kaji/client.js'

/**
 * {@link /v1/crm/notes/:note_id}
 */
export function deleteCrmNote<ThrowOnError extends boolean = true>(
  options: Options<DeleteCrmNoteOptions, ThrowOnError>,
): Promise<ResponseResult<RequestResult<DeleteCrmNoteResponses, ThrowOnError>, ThrowOnError>> {
  const { client: request = client, ...config } = options
  const throwOnError = (config.throwOnError ?? true) as ThrowOnError

  return resolveResponse(
    request({
      method: 'DELETE',
      url: '/v1/crm/notes/{note_id}',
      security: [[{ id: 'bearerAuth', type: 'http', scheme: 'bearer' }], [{ id: 'xApiKey', type: 'apiKey', name: 'x-api-key', in: 'header' }]],
      ...config,
      throwOnError,
    }) as Promise<RequestResult<DeleteCrmNoteResponses, ThrowOnError>>,
    throwOnError,
  )
}
