import { poolsterJsonRefs } from '../_poolster_json_refs.js'
/* eslint-disable no-alert, no-console */

import type { Options, RequestResult, ResponseResult } from '../../.poolster/client.js'
import type { UpdateCrmTaskOptions, UpdateCrmTaskResponses } from '../../models/crm/UpdateCrmTask.js'
import { client, resolveResponse } from '../../.poolster/client.js'

/**
 * {@link /crm/tasks/:task_id}
 */
export function updateCrmTask<ThrowOnError extends boolean = true>(
  options: Options<UpdateCrmTaskOptions, ThrowOnError>,
): Promise<ResponseResult<RequestResult<UpdateCrmTaskResponses, ThrowOnError>, ThrowOnError>> {
  const { client: request = client, ...config } = options
  const throwOnError = (config.throwOnError ?? true) as ThrowOnError

  return resolveResponse(
    request({
      method: 'PATCH',
      url: '/crm/tasks/{task_id}',
      security: [[{ id: 'bearerAuth', type: 'http', scheme: 'bearer' }], [{ id: 'xApiKey', type: 'apiKey', name: 'x-api-key', in: 'header' }]],
      jsonPlan: { lossless: false, refs: poolsterJsonRefs, requests: {"application/json":{"nullable":false,"ref":"CrmTaskPatch"}}, responses: {"200":{"application/json":{"additional":null,"fields":{"api_version":{"kind":"string","nullable":false},"data":{"nullable":false,"ref":"CrmTask"}},"kind":"object","nullable":false,"required":["api_version","data"]}},"400":{"application/json":{"nullable":false,"ref":"CrmApiError"}},"401":{"application/json":{"nullable":false,"ref":"CrmApiError"}},"403":{"application/json":{"nullable":false,"ref":"CrmApiError"}},"404":{"application/json":{"nullable":false,"ref":"CrmApiError"}},"409":{"application/json":{"nullable":false,"ref":"CrmApiError"}},"413":{"application/json":{"nullable":false,"ref":"CrmApiError"}},"415":{"application/json":{"nullable":false,"ref":"CrmApiError"}},"503":{"application/json":{"nullable":false,"ref":"CrmApiError"}}} },
      ...config,
      throwOnError,
    }) as Promise<RequestResult<UpdateCrmTaskResponses, ThrowOnError>>,
    throwOnError,
  )
}
