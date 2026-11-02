import { poolsterJsonRefs } from '../_poolster_json_refs.js'
/* eslint-disable no-alert, no-console */

import type { Options, RequestResult, ResponseResult } from '../../.poolster/client.js'
import type { GetScheduleBookingStatusOptions, GetScheduleBookingStatusResponses } from '../../models/schedule/GetScheduleBookingStatus.js'
import { client, resolveResponse } from '../../.poolster/client.js'

/**
 * {@link /schedule/bookings/:id/status}
 */
export function getScheduleBookingStatus<ThrowOnError extends boolean = true>(
  options: Options<GetScheduleBookingStatusOptions, ThrowOnError>,
): Promise<ResponseResult<RequestResult<GetScheduleBookingStatusResponses, ThrowOnError>, ThrowOnError>> {
  const { client: request = client, ...config } = options
  const throwOnError = (config.throwOnError ?? true) as ThrowOnError

  return resolveResponse(
    request({
      method: 'GET',
      url: '/schedule/bookings/{id}/status',
      security: [[{ id: 'bookingCapability', type: 'http', scheme: 'bearer' }]],
      jsonPlan: { lossless: false, refs: poolsterJsonRefs, requests: {}, responses: {"200":{"application/json":{"nullable":false,"ref":"SchedulePublicBookingStatus"}},"400":{},"401":{},"409":{},"503":{}} },
      ...config,
      throwOnError,
    }) as Promise<RequestResult<GetScheduleBookingStatusResponses, ThrowOnError>>,
    throwOnError,
  )
}
