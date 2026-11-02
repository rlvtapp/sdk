import { poolsterJsonRefs } from '../_poolster_json_refs.js'
/* eslint-disable no-alert, no-console */

import type { Options, RequestResult, ResponseResult } from '../../.poolster/client.js'
import type { GetScheduleBookingFeedbackOptions, GetScheduleBookingFeedbackResponses } from '../../models/schedule/GetScheduleBookingFeedback.js'
import { client, resolveResponse } from '../../.poolster/client.js'

/**
 * {@link /schedule/bookings/:id/feedback}
 */
export function getScheduleBookingFeedback<ThrowOnError extends boolean = true>(
  options: Options<GetScheduleBookingFeedbackOptions, ThrowOnError>,
): Promise<ResponseResult<RequestResult<GetScheduleBookingFeedbackResponses, ThrowOnError>, ThrowOnError>> {
  const { client: request = client, ...config } = options
  const throwOnError = (config.throwOnError ?? true) as ThrowOnError

  return resolveResponse(
    request({
      method: 'GET',
      url: '/schedule/bookings/{id}/feedback',
      security: [[{ id: 'managementCapability', type: 'http', scheme: 'bearer' }]],
      jsonPlan: { lossless: false, refs: poolsterJsonRefs, requests: {}, responses: {"200":{"application/json":{"nullable":false,"ref":"ScheduleFeedbackResponse"}},"400":{"application/json":{"nullable":false,"ref":"ScheduleApiError"}},"401":{"application/json":{"nullable":false,"ref":"ScheduleApiError"}},"404":{"application/json":{"nullable":false,"ref":"ScheduleApiError"}},"409":{"application/json":{"nullable":false,"ref":"ScheduleApiError"}},"422":{"application/json":{"nullable":false,"ref":"ScheduleApiError"}},"503":{"application/json":{"nullable":false,"ref":"ScheduleApiError"}}} },
      ...config,
      throwOnError,
    }) as Promise<RequestResult<GetScheduleBookingFeedbackResponses, ThrowOnError>>,
    throwOnError,
  )
}
