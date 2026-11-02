import { poolsterJsonRefs } from '../_poolster_json_refs.js'
/* eslint-disable no-alert, no-console */

import type { Options, RequestResult, ResponseResult } from '../../.poolster/client.js'
import type { ListScheduleWorkflowsOptions, ListScheduleWorkflowsResponses } from '../../models/schedule/ListScheduleWorkflows.js'
import { client, resolveResponse } from '../../.poolster/client.js'

/**
 * {@link /schedule/workflows}
 */
export function listScheduleWorkflows<ThrowOnError extends boolean = true>(
  options: Options<ListScheduleWorkflowsOptions, ThrowOnError>,
): Promise<ResponseResult<RequestResult<ListScheduleWorkflowsResponses, ThrowOnError>, ThrowOnError>> {
  const { client: request = client, ...config } = options
  const throwOnError = (config.throwOnError ?? true) as ThrowOnError

  return resolveResponse(
    request({
      method: 'GET',
      url: '/schedule/workflows',
      security: [[{ id: 'bearerAuth', type: 'http', scheme: 'bearer' }], [{ id: 'xApiKey', type: 'apiKey', name: 'x-api-key', in: 'header' }]],
      jsonPlan: { lossless: false, refs: poolsterJsonRefs, requests: {}, responses: {"200":{"application/json":{"nullable":false,"ref":"ScheduleWorkflowListResponse"}},"400":{},"401":{},"403":{},"404":{},"409":{},"413":{},"422":{},"503":{}} },
      ...config,
      throwOnError,
    }) as Promise<RequestResult<ListScheduleWorkflowsResponses, ThrowOnError>>,
    throwOnError,
  )
}
