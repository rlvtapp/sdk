import { poolsterJsonRefs } from '../_poolster_json_refs.js'
/* eslint-disable no-alert, no-console */

import type { Options, RequestResult, ResponseResult } from '../../.poolster/client.js'
import type { CreateScheduleBookingOptions, CreateScheduleBookingResponses } from '../../models/schedule/CreateScheduleBooking.js'
import { client, resolveResponse } from '../../.poolster/client.js'

/**
 * {@link /schedule/bookings}
 */
export function createScheduleBooking<ThrowOnError extends boolean = true>(
  options: Options<CreateScheduleBookingOptions, ThrowOnError>,
): Promise<ResponseResult<RequestResult<CreateScheduleBookingResponses, ThrowOnError>, ThrowOnError>> {
  const { client: request = client, ...config } = options
  const throwOnError = (config.throwOnError ?? true) as ThrowOnError

  return resolveResponse(
    request({
      method: 'POST',
      url: '/schedule/bookings',
      jsonPlan: { lossless: false, refs: poolsterJsonRefs, requests: {"application/json":{"nullable":false,"ref":"SchedulePublicBookingCreate"}}, responses: {"200":{"application/json":{"nullable":false,"ref":"SchedulePublicBookingCreated"}},"400":{},"404":{},"409":{},"503":{}} },
      ...config,
      throwOnError,
    }) as Promise<RequestResult<CreateScheduleBookingResponses, ThrowOnError>>,
    throwOnError,
  )
}
