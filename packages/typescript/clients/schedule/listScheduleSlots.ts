import { poolsterJsonRefs } from '../_poolster_json_refs.js'
/* eslint-disable no-alert, no-console */

import type { Options, RequestResult, ResponseResult } from '../../.poolster/client.js'
import type { ListScheduleSlotsOptions, ListScheduleSlotsResponses } from '../../models/schedule/ListScheduleSlots.js'
import { client, resolveResponse } from '../../.poolster/client.js'

/**
 * {@link /schedule/slots}
 */
export function listScheduleSlots<ThrowOnError extends boolean = true>(
  options: Options<ListScheduleSlotsOptions, ThrowOnError>,
): Promise<ResponseResult<RequestResult<ListScheduleSlotsResponses, ThrowOnError>, ThrowOnError>> {
  const { client: request = client, ...config } = options
  const throwOnError = (config.throwOnError ?? true) as ThrowOnError

  return resolveResponse(
    request({
      method: 'GET',
      url: '/schedule/slots',
      jsonPlan: { lossless: false, refs: poolsterJsonRefs, requests: {}, responses: {"200":{"application/json":{"nullable":false,"ref":"SchedulePublicSlots"}},"400":{},"404":{},"503":{}} },
      ...config,
      throwOnError,
    }) as Promise<RequestResult<ListScheduleSlotsResponses, ThrowOnError>>,
    throwOnError,
  )
}
