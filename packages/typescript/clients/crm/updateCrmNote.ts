/* eslint-disable no-alert, no-console */

import type { Options, RequestResult, ResponseResult } from '../../.kaji/client.js'
import type { UpdateCrmNoteOptions, UpdateCrmNoteResponses } from '../../models/crm/UpdateCrmNote.js'
import { client, resolveResponse } from '../../.kaji/client.js'

/**
 * {@link /v1/crm/notes/:note_id}
 */
export function updateCrmNote<ThrowOnError extends boolean = true>(
  options: Options<UpdateCrmNoteOptions, ThrowOnError>,
): Promise<ResponseResult<RequestResult<UpdateCrmNoteResponses, ThrowOnError>, ThrowOnError>> {
  const { client: request = client, ...config } = options
  const throwOnError = (config.throwOnError ?? true) as ThrowOnError

  return resolveResponse(
    request({
      method: 'PATCH',
      url: '/v1/crm/notes/{note_id}',
      security: [[{ id: 'bearerAuth', type: 'http', scheme: 'bearer' }], [{ id: 'xApiKey', type: 'apiKey', name: 'x-api-key', in: 'header' }]],
      ...config,
      throwOnError,
    }) as Promise<RequestResult<UpdateCrmNoteResponses, ThrowOnError>>,
    throwOnError,
  )
}
