import { poolsterJsonRefs } from '../_poolster_json_refs.js'
/* eslint-disable no-alert, no-console */

import type { Options, RequestResult, ResponseResult } from '../../.poolster/client.js'
import type { TrackEmailEventOptions, TrackEmailEventResponses } from '../../models/events/TrackEmailEvent.js'
import { client, resolveResponse } from '../../.poolster/client.js'

/**
 * {@link /email/events}
 */
export function trackEmailEvent<ThrowOnError extends boolean = true>(
  options: Options<TrackEmailEventOptions, ThrowOnError>,
): Promise<ResponseResult<RequestResult<TrackEmailEventResponses, ThrowOnError>, ThrowOnError>> {
  const { client: request = client, ...config } = options
  const throwOnError = (config.throwOnError ?? true) as ThrowOnError

  return resolveResponse(
    request({
      method: 'POST',
      url: '/email/events',
      jsonPlan: { lossless: false, refs: poolsterJsonRefs, requests: {"application/json":{"nullable":false,"ref":"TrackEventRequest"}}, responses: {"202":{"application/json":{"nullable":false,"ref":"EventResponse"}},"401":{"application/json":{"nullable":false,"ref":"ErrorResponse"}},"403":{"application/json":{"nullable":false,"ref":"ErrorResponse"}},"409":{"application/json":{"nullable":false,"ref":"ErrorResponse"}},"422":{"application/json":{"nullable":false,"ref":"ErrorResponse"}},"503":{"application/json":{"nullable":false,"ref":"ErrorResponse"}}} },
      ...config,
      throwOnError,
    }) as Promise<RequestResult<TrackEmailEventResponses, ThrowOnError>>,
    throwOnError,
  )
}
