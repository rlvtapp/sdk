import { poolsterJsonRefs } from '../_poolster_json_refs.js'
/* eslint-disable no-alert, no-console */

import type { Options, RequestResult, ResponseResult } from '../../.poolster/client.js'
import type { QueryOptions, QueryResponses } from '../../models/sends/Query.js'
import { client, resolveResponse } from '../../.poolster/client.js'

/**
 * {@link /v1/email/sends/query}
 */
export function query<ThrowOnError extends boolean = true>(
  options: Options<QueryOptions, ThrowOnError>,
): Promise<ResponseResult<RequestResult<QueryResponses, ThrowOnError>, ThrowOnError>> {
  const { client: request = client, ...config } = options
  const throwOnError = (config.throwOnError ?? true) as ThrowOnError

  return resolveResponse(
    request({
      method: 'POST',
      url: '/v1/email/sends/query',
      security: [[{ id: 'bearerAuth', type: 'http', scheme: 'bearer' }], [{ id: 'xApiKey', type: 'apiKey', name: 'x-api-key', in: 'header' }]],
      jsonPlan: { lossless: false, refs: poolsterJsonRefs, requests: {"application/json":{"nullable":false,"ref":"SendQuery"}}, responses: {"200":{},"401":{"application/json":{"nullable":false,"ref":"ErrorResponse"}},"403":{"application/json":{"nullable":false,"ref":"ErrorResponse"}},"422":{"application/json":{"nullable":false,"ref":"ErrorResponse"}},"503":{"application/json":{"nullable":false,"ref":"ErrorResponse"}}} },
      ...config,
      throwOnError,
    }) as Promise<RequestResult<QueryResponses, ThrowOnError>>,
    throwOnError,
  )
}
