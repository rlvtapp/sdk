import { poolsterJsonRefs } from '../_poolster_json_refs.js'
/* eslint-disable no-alert, no-console */

import type { Options, RequestResult, ResponseResult } from '../../.poolster/client.js'
import type { DiagnoseScheduleSlotOptions, DiagnoseScheduleSlotResponses } from '../../models/schedule/DiagnoseScheduleSlot.js'
import { client, resolveResponse } from '../../.poolster/client.js'

/**
 * {@link /schedule/slots/diagnose}
 */
export function diagnoseScheduleSlot<ThrowOnError extends boolean = true>(
  options: Options<DiagnoseScheduleSlotOptions, ThrowOnError>,
): Promise<ResponseResult<RequestResult<DiagnoseScheduleSlotResponses, ThrowOnError>, ThrowOnError>> {
  const { client: request = client, ...config } = options
  const throwOnError = (config.throwOnError ?? true) as ThrowOnError

  return resolveResponse(
    request({
      method: 'POST',
      url: '/schedule/slots/diagnose',
      security: [[{ id: 'bearerAuth', type: 'http', scheme: 'bearer' }], [{ id: 'xApiKey', type: 'apiKey', name: 'x-api-key', in: 'header' }]],
      jsonPlan: { lossless: false, refs: poolsterJsonRefs, requests: {"application/json":{"nullable":false,"ref":"ScheduleAvailabilityDiagnosticInput"}}, responses: {"200":{"application/json":{"nullable":false,"ref":"ScheduleAvailabilityDiagnosticResponse"}},"400":{"application/json":{"nullable":false,"ref":"ScheduleApiError"}},"401":{"application/json":{"nullable":false,"ref":"ScheduleApiError"}},"403":{"application/json":{"nullable":false,"ref":"ScheduleApiError"}},"404":{"application/json":{"nullable":false,"ref":"ScheduleApiError"}},"409":{"application/json":{"nullable":false,"ref":"ScheduleApiError"}},"413":{"application/json":{"nullable":false,"ref":"ScheduleApiError"}},"415":{"application/json":{"nullable":false,"ref":"ScheduleApiError"}},"422":{"application/json":{"nullable":false,"ref":"ScheduleApiError"}},"503":{"application/json":{"nullable":false,"ref":"ScheduleApiError"}}} },
      ...config,
      throwOnError,
    }) as Promise<RequestResult<DiagnoseScheduleSlotResponses, ThrowOnError>>,
    throwOnError,
  )
}
