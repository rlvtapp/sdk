import { poolsterJsonRefs } from '../_poolster_json_refs.js'
/* eslint-disable no-alert, no-console */

import type { Options, RequestResult, ResponseResult } from '../../.poolster/client.js'
import type { ListEmailSegmentsOptions, ListEmailSegmentsResponses } from '../../models/contacts/ListEmailSegments.js'
import { client, resolveResponse } from '../../.poolster/client.js'

/**
 * {@link /email/segments}
 */
export function listEmailSegments<ThrowOnError extends boolean = true>(
  options: Options<ListEmailSegmentsOptions, ThrowOnError>,
): Promise<ResponseResult<RequestResult<ListEmailSegmentsResponses, ThrowOnError>, ThrowOnError>> {
  const { client: request = client, ...config } = options
  const throwOnError = (config.throwOnError ?? true) as ThrowOnError

  return resolveResponse(
    request({
      method: 'GET',
      url: '/email/segments',
      security: [[{ id: 'bearerAuth', type: 'http', scheme: 'bearer' }], [{ id: 'xApiKey', type: 'apiKey', name: 'x-api-key', in: 'header' }]],
      jsonPlan: { lossless: false, refs: poolsterJsonRefs, requests: {}, responses: {"200":{"application/json":{"nullable":false,"ref":"SegmentListResponse"}},"401":{"application/json":{"nullable":false,"ref":"ErrorResponse"}},"503":{"application/json":{"nullable":false,"ref":"ErrorResponse"}}} },
      ...config,
      throwOnError,
    }) as Promise<RequestResult<ListEmailSegmentsResponses, ThrowOnError>>,
    throwOnError,
  )
}
