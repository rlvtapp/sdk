import { poolsterJsonRefs } from '../_poolster_json_refs.js'
/* eslint-disable no-alert, no-console */

import type { Options, RequestResult, ResponseResult } from '../../.poolster/client.js'
import type { AddEmailThreadNoteOptions, AddEmailThreadNoteResponses } from '../../models/inboxes/AddEmailThreadNote.js'
import { client, resolveResponse } from '../../.poolster/client.js'

/**
 * {@link /email/threads/:thread_id/notes}
 */
export function addEmailThreadNote<ThrowOnError extends boolean = true>(
  options: Options<AddEmailThreadNoteOptions, ThrowOnError>,
): Promise<ResponseResult<RequestResult<AddEmailThreadNoteResponses, ThrowOnError>, ThrowOnError>> {
  const { client: request = client, ...config } = options
  const throwOnError = (config.throwOnError ?? true) as ThrowOnError

  return resolveResponse(
    request({
      method: 'POST',
      url: '/email/threads/{thread_id}/notes',
      security: [[{ id: 'bearerAuth', type: 'http', scheme: 'bearer' }], [{ id: 'xApiKey', type: 'apiKey', name: 'x-api-key', in: 'header' }]],
      jsonPlan: { lossless: false, refs: poolsterJsonRefs, requests: {"application/json":{"nullable":false,"ref":"NoteInput"}}, responses: {"201":{},"401":{"application/json":{"nullable":false,"ref":"ErrorResponse"}},"404":{"application/json":{"nullable":false,"ref":"ErrorResponse"}},"422":{"application/json":{"nullable":false,"ref":"ErrorResponse"}},"503":{"application/json":{"nullable":false,"ref":"ErrorResponse"}}} },
      ...config,
      throwOnError,
    }) as Promise<RequestResult<AddEmailThreadNoteResponses, ThrowOnError>>,
    throwOnError,
  )
}
