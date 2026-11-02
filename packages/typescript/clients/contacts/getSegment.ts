import { poolsterJsonRefs } from '../_poolster_json_refs.js'
/* eslint-disable no-alert, no-console */

import type { Options, RequestResult, ResponseResult } from '../../.poolster/client.js'
import type { GetSegmentOptions, GetSegmentResponses } from '../../models/contacts/GetSegment.js'
import { client, resolveResponse } from '../../.poolster/client.js'

/**
 * {@link /v1/email/segments/:id}
 */
export function getSegment<ThrowOnError extends boolean = true>(
  options: Options<GetSegmentOptions, ThrowOnError>,
): Promise<ResponseResult<RequestResult<GetSegmentResponses, ThrowOnError>, ThrowOnError>> {
  const { client: request = client, ...config } = options
  const throwOnError = (config.throwOnError ?? true) as ThrowOnError

  return resolveResponse(
    request({
      method: 'GET',
      url: '/v1/email/segments/{id}',
      security: [[{ id: 'bearerAuth', type: 'http', scheme: 'bearer' }], [{ id: 'xApiKey', type: 'apiKey', name: 'x-api-key', in: 'header' }]],
      jsonPlan: { lossless: false, refs: poolsterJsonRefs, requests: {}, responses: {"200":{"application/json":{"nullable":false,"ref":"SegmentResponse"}},"401":{"application/json":{"nullable":false,"ref":"ErrorResponse"}},"404":{"application/json":{"nullable":false,"ref":"ErrorResponse"}},"503":{"application/json":{"nullable":false,"ref":"ErrorResponse"}}} },
      ...config,
      throwOnError,
    }) as Promise<RequestResult<GetSegmentResponses, ThrowOnError>>,
    throwOnError,
  )
}
