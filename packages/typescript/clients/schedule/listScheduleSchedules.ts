import { poolsterJsonRefs } from '../_poolster_json_refs.js'
/* eslint-disable no-alert, no-console */

import type { Options, RequestResult, ResponseResult } from '../../.poolster/client.js'
import type { ListScheduleSchedulesOptions, ListScheduleSchedulesResponses } from '../../models/schedule/ListScheduleSchedules.js'
import { client, resolveResponse } from '../../.poolster/client.js'

/**
 * {@link /schedule/schedules}
 */
export function listScheduleSchedules<ThrowOnError extends boolean = true>(
  options: Options<ListScheduleSchedulesOptions, ThrowOnError>,
): Promise<ResponseResult<RequestResult<ListScheduleSchedulesResponses, ThrowOnError>, ThrowOnError>> {
  const { client: request = client, ...config } = options
  const throwOnError = (config.throwOnError ?? true) as ThrowOnError

  return resolveResponse(
    request({
      method: 'GET',
      url: '/schedule/schedules',
      security: [[{ id: 'bearerAuth', type: 'http', scheme: 'bearer' }], [{ id: 'xApiKey', type: 'apiKey', name: 'x-api-key', in: 'header' }]],
      jsonPlan: { lossless: false, refs: poolsterJsonRefs, requests: {}, responses: {"200":{"application/json":{"nullable":false,"ref":"ScheduleAvailabilityList"}},"400":{"application/json":{"nullable":false,"ref":"ScheduleApiError"}},"401":{"application/json":{"nullable":false,"ref":"ScheduleApiError"}},"403":{"application/json":{"nullable":false,"ref":"ScheduleApiError"}},"404":{"application/json":{"nullable":false,"ref":"ScheduleApiError"}},"409":{"application/json":{"nullable":false,"ref":"ScheduleApiError"}},"413":{"application/json":{"nullable":false,"ref":"ScheduleApiError"}},"415":{"application/json":{"nullable":false,"ref":"ScheduleApiError"}},"422":{"application/json":{"nullable":false,"ref":"ScheduleApiError"}},"503":{"application/json":{"nullable":false,"ref":"ScheduleApiError"}}} },
      ...config,
      throwOnError,
    }) as Promise<RequestResult<ListScheduleSchedulesResponses, ThrowOnError>>,
    throwOnError,
  )
}
