import { poolsterJsonRefs } from '../_poolster_json_refs.js'
/* eslint-disable no-alert, no-console */

import type { Options, RequestResult, ResponseResult } from '../../.poolster/client.js'
import type { ListEmailThreadsOptions, ListEmailThreadsResponses } from '../../models/inboxes/ListEmailThreads.js'
import { client, resolveResponse } from '../../.poolster/client.js'

/**
 * {@link /email/inboxes/:inbox_id/threads}
 */
export function listEmailThreads<ThrowOnError extends boolean = true>(
  options: Options<ListEmailThreadsOptions, ThrowOnError>,
): Promise<ResponseResult<RequestResult<ListEmailThreadsResponses, ThrowOnError>, ThrowOnError>> {
  const { client: request = client, ...config } = options
  const throwOnError = (config.throwOnError ?? true) as ThrowOnError

  return resolveResponse(
    request({
      method: 'GET',
      url: '/email/inboxes/{inbox_id}/threads',
      security: [[{ id: 'bearerAuth', type: 'http', scheme: 'bearer' }], [{ id: 'xApiKey', type: 'apiKey', name: 'x-api-key', in: 'header' }]],
      jsonPlan: { lossless: false, refs: poolsterJsonRefs, requests: {}, responses: {"200":{"application/json":{"nullable":false,"ref":"ThreadListResponse"}},"401":{"application/json":{"nullable":false,"ref":"ErrorResponse"}},"404":{"application/json":{"nullable":false,"ref":"ErrorResponse"}},"422":{"application/json":{"nullable":false,"ref":"ErrorResponse"}},"503":{"application/json":{"nullable":false,"ref":"ErrorResponse"}}} },
      ...config,
      throwOnError,
    }) as Promise<RequestResult<ListEmailThreadsResponses, ThrowOnError>>,
    throwOnError,
  )
}
