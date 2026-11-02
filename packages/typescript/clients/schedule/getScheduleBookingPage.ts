import { poolsterJsonRefs } from '../_poolster_json_refs.js'
/* eslint-disable no-alert, no-console */

import type { Options, RequestResult, ResponseResult } from '../../.poolster/client.js'
import type { GetScheduleBookingPageOptions, GetScheduleBookingPageResponses } from '../../models/schedule/GetScheduleBookingPage.js'
import { client, resolveResponse } from '../../.poolster/client.js'

/**
 * {@link /schedule/booking-pages/:workspace/:event}
 */
export function getScheduleBookingPage<ThrowOnError extends boolean = true>(
  options: Options<GetScheduleBookingPageOptions, ThrowOnError>,
): Promise<ResponseResult<RequestResult<GetScheduleBookingPageResponses, ThrowOnError>, ThrowOnError>> {
  const { client: request = client, ...config } = options
  const throwOnError = (config.throwOnError ?? true) as ThrowOnError

  return resolveResponse(
    request({
      method: 'GET',
      url: '/schedule/booking-pages/{workspace}/{event}',
      jsonPlan: { lossless: false, refs: poolsterJsonRefs, requests: {}, responses: {"200":{"application/json":{"nullable":false,"ref":"SchedulePublicEvent"}},"400":{},"404":{},"503":{}} },
      ...config,
      throwOnError,
    }) as Promise<RequestResult<GetScheduleBookingPageResponses, ThrowOnError>>,
    throwOnError,
  )
}
