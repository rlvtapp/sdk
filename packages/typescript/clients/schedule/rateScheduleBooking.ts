import { poolsterJsonRefs } from '../_poolster_json_refs.js'
/* eslint-disable no-alert, no-console */

import type { Options, RequestResult, ResponseResult } from '../../.poolster/client.js'
import type { RateScheduleBookingOptions, RateScheduleBookingResponses } from '../../models/schedule/RateScheduleBooking.js'
import { client, resolveResponse } from '../../.poolster/client.js'

/**
 * {@link /schedule/bookings/:id/feedback}
 */
export function rateScheduleBooking<ThrowOnError extends boolean = true>(
  options: Options<RateScheduleBookingOptions, ThrowOnError>,
): Promise<ResponseResult<RequestResult<RateScheduleBookingResponses, ThrowOnError>, ThrowOnError>> {
  const { client: request = client, ...config } = options
  const throwOnError = (config.throwOnError ?? true) as ThrowOnError

  return resolveResponse(
    request({
      method: 'POST',
      url: '/schedule/bookings/{id}/feedback',
      security: [[{ id: 'managementCapability', type: 'http', scheme: 'bearer' }]],
      jsonPlan: { lossless: false, refs: poolsterJsonRefs, requests: {"application/json":{"nullable":false,"ref":"ScheduleFeedbackInput"}}, responses: {"200":{"application/json":{"nullable":false,"ref":"ScheduleFeedbackSavedResponse"}},"400":{"application/json":{"nullable":false,"ref":"ScheduleApiError"}},"401":{"application/json":{"nullable":false,"ref":"ScheduleApiError"}},"404":{"application/json":{"nullable":false,"ref":"ScheduleApiError"}},"409":{"application/json":{"nullable":false,"ref":"ScheduleApiError"}},"422":{"application/json":{"nullable":false,"ref":"ScheduleApiError"}},"503":{"application/json":{"nullable":false,"ref":"ScheduleApiError"}}} },
      ...config,
      throwOnError,
    }) as Promise<RequestResult<RateScheduleBookingResponses, ThrowOnError>>,
    throwOnError,
  )
}
