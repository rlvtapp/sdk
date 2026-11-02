import { poolsterJsonRefs } from '../_poolster_json_refs.js'
/* eslint-disable no-alert, no-console */

import type { Options, RequestResult, ResponseResult } from '../../.poolster/client.js'
import type { GetScheduleBookingOptions, GetScheduleBookingResponses } from '../../models/schedule/GetScheduleBooking.js'
import { client, resolveResponse } from '../../.poolster/client.js'

/**
 * {@link /schedule/bookings/:id}
 */
export function getScheduleBooking<ThrowOnError extends boolean = true>(
  options: Options<GetScheduleBookingOptions, ThrowOnError>,
): Promise<ResponseResult<RequestResult<GetScheduleBookingResponses, ThrowOnError>, ThrowOnError>> {
  const { client: request = client, ...config } = options
  const throwOnError = (config.throwOnError ?? true) as ThrowOnError

  return resolveResponse(
    request({
      method: 'GET',
      url: '/schedule/bookings/{id}',
      security: [[{ id: 'bearerAuth', type: 'http', scheme: 'bearer' }], [{ id: 'xApiKey', type: 'apiKey', name: 'x-api-key', in: 'header' }], [{ id: 'managementCapability', type: 'http', scheme: 'bearer' }]],
      jsonPlan: { lossless: false, refs: poolsterJsonRefs, requests: {}, responses: {"200":{"application/json":{"kind":"union","nullable":false,"variants":[{"nullable":false,"ref":"ScheduleHostBookingDetail"},{"nullable":false,"ref":"ScheduleManagedBookingResponse"}]}},"400":{"application/json":{"nullable":false,"ref":"ScheduleApiError"}},"401":{"application/json":{"nullable":false,"ref":"ScheduleApiError"}},"403":{"application/json":{"nullable":false,"ref":"ScheduleApiError"}},"404":{"application/json":{"nullable":false,"ref":"ScheduleApiError"}},"409":{"application/json":{"nullable":false,"ref":"ScheduleApiError"}},"413":{"application/json":{"nullable":false,"ref":"ScheduleApiError"}},"415":{"application/json":{"nullable":false,"ref":"ScheduleApiError"}},"422":{"application/json":{"nullable":false,"ref":"ScheduleApiError"}},"503":{"application/json":{"nullable":false,"ref":"ScheduleApiError"}}} },
      ...config,
      throwOnError,
    }) as Promise<RequestResult<GetScheduleBookingResponses, ThrowOnError>>,
    throwOnError,
  )
}
