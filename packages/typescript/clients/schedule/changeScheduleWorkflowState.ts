import { poolsterJsonRefs } from '../_poolster_json_refs.js'
/* eslint-disable no-alert, no-console */

import type { Options, RequestResult, ResponseResult } from '../../.poolster/client.js'
import type { ChangeScheduleWorkflowStateOptions, ChangeScheduleWorkflowStateResponses } from '../../models/schedule/ChangeScheduleWorkflowState.js'
import { client, resolveResponse } from '../../.poolster/client.js'

/**
 * {@link /schedule/workflows/:id/state}
 */
export function changeScheduleWorkflowState<ThrowOnError extends boolean = true>(
  options: Options<ChangeScheduleWorkflowStateOptions, ThrowOnError>,
): Promise<ResponseResult<RequestResult<ChangeScheduleWorkflowStateResponses, ThrowOnError>, ThrowOnError>> {
  const { client: request = client, ...config } = options
  const throwOnError = (config.throwOnError ?? true) as ThrowOnError

  return resolveResponse(
    request({
      method: 'PUT',
      url: '/schedule/workflows/{id}/state',
      security: [[{ id: 'bearerAuth', type: 'http', scheme: 'bearer' }], [{ id: 'xApiKey', type: 'apiKey', name: 'x-api-key', in: 'header' }]],
      jsonPlan: { lossless: false, refs: poolsterJsonRefs, requests: {"application/json":{"nullable":false,"ref":"ScheduleWorkflowStateInput"}}, responses: {"200":{"application/json":{"nullable":false,"ref":"ScheduleWorkflowResponse"}},"400":{},"401":{},"403":{},"404":{},"409":{},"413":{},"422":{},"503":{}} },
      ...config,
      throwOnError,
    }) as Promise<RequestResult<ChangeScheduleWorkflowStateResponses, ThrowOnError>>,
    throwOnError,
  )
}
