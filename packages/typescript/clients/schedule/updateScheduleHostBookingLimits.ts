import { poolsterJsonRefs } from '../_poolster_json_refs.js'
/* eslint-disable no-alert, no-console */

import type { Options, RequestResult, ResponseResult } from '../../.poolster/client.js'
import type { UpdateScheduleHostBookingLimitsOptions, UpdateScheduleHostBookingLimitsResponses } from '../../models/schedule/UpdateScheduleHostBookingLimits.js'
import { client, resolveResponse } from '../../.poolster/client.js'

/**
 * {@link /schedule/hosts/:actor/booking-limits}
 */
export function updateScheduleHostBookingLimits<ThrowOnError extends boolean = true>(
  options: Options<UpdateScheduleHostBookingLimitsOptions, ThrowOnError>,
): Promise<ResponseResult<RequestResult<UpdateScheduleHostBookingLimitsResponses, ThrowOnError>, ThrowOnError>> {
  const { client: request = client, ...config } = options
  const throwOnError = (config.throwOnError ?? true) as ThrowOnError

  return resolveResponse(
    request({
      method: 'PUT',
      url: '/schedule/hosts/{actor}/booking-limits',
      security: [[{ id: 'bearerAuth', type: 'http', scheme: 'bearer' }], [{ id: 'xApiKey', type: 'apiKey', name: 'x-api-key', in: 'header' }]],
      jsonPlan: { lossless: false, refs: poolsterJsonRefs, requests: {"application/json":{"nullable":false,"ref":"ScheduleHostCapacityPolicyInput"}}, responses: {"200":{"application/json":{"nullable":false,"ref":"ScheduleHostCapacityPolicy"}},"400":{"application/json":{"nullable":false,"ref":"ScheduleApiError"}},"401":{"application/json":{"nullable":false,"ref":"ScheduleApiError"}},"403":{"application/json":{"nullable":false,"ref":"ScheduleApiError"}},"404":{"application/json":{"nullable":false,"ref":"ScheduleApiError"}},"409":{"application/json":{"nullable":false,"ref":"ScheduleApiError"}},"413":{"application/json":{"nullable":false,"ref":"ScheduleApiError"}},"415":{"application/json":{"nullable":false,"ref":"ScheduleApiError"}},"422":{"application/json":{"nullable":false,"ref":"ScheduleApiError"}},"503":{"application/json":{"nullable":false,"ref":"ScheduleApiError"}}} },
      ...config,
      throwOnError,
    }) as Promise<RequestResult<UpdateScheduleHostBookingLimitsResponses, ThrowOnError>>,
    throwOnError,
  )
}
