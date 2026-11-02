import { poolsterJsonRefs } from '../_poolster_json_refs.js'
/* eslint-disable no-alert, no-console */

import type { Options, RequestResult, ResponseResult } from '../../.poolster/client.js'
import type { ListScheduleBookingSlotsOptions, ListScheduleBookingSlotsResponses } from '../../models/schedule/ListScheduleBookingSlots.js'
import { client, resolveResponse } from '../../.poolster/client.js'

/**
 * {@link /schedule/bookings/:id/slots}
 */
export function listScheduleBookingSlots<ThrowOnError extends boolean = true>(
  options: Options<ListScheduleBookingSlotsOptions, ThrowOnError>,
): Promise<ResponseResult<RequestResult<ListScheduleBookingSlotsResponses, ThrowOnError>, ThrowOnError>> {
  const { client: request = client, ...config } = options
  const throwOnError = (config.throwOnError ?? true) as ThrowOnError

  return resolveResponse(
    request({
      method: 'GET',
      url: '/schedule/bookings/{id}/slots',
      security: [[{ id: 'managementCapability', type: 'http', scheme: 'bearer' }]],
      jsonPlan: { lossless: false, refs: poolsterJsonRefs, requests: {}, responses: {"200":{"application/json":{"nullable":false,"ref":"ScheduleManagedSlotsResponse"}},"400":{"application/json":{"nullable":false,"ref":"ScheduleApiError"}},"401":{"application/json":{"nullable":false,"ref":"ScheduleApiError"}},"404":{"application/json":{"nullable":false,"ref":"ScheduleApiError"}},"409":{"application/json":{"nullable":false,"ref":"ScheduleApiError"}},"422":{"application/json":{"nullable":false,"ref":"ScheduleApiError"}},"503":{"application/json":{"nullable":false,"ref":"ScheduleApiError"}}} },
      ...config,
      throwOnError,
    }) as Promise<RequestResult<ListScheduleBookingSlotsResponses, ThrowOnError>>,
    throwOnError,
  )
}
