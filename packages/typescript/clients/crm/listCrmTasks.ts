import { poolsterJsonRefs } from '../_poolster_json_refs.js'
/* eslint-disable no-alert, no-console */

import type { Options, RequestResult, ResponseResult } from '../../.poolster/client.js'
import type { ListCrmTasksOptions, ListCrmTasksResponses } from '../../models/crm/ListCrmTasks.js'
import { client, resolveResponse } from '../../.poolster/client.js'

/**
 * {@link /v1/crm/records/:record_id/tasks}
 */
export function listCrmTasks<ThrowOnError extends boolean = true>(
  options: Options<ListCrmTasksOptions, ThrowOnError>,
): Promise<ResponseResult<RequestResult<ListCrmTasksResponses, ThrowOnError>, ThrowOnError>> {
  const { client: request = client, ...config } = options
  const throwOnError = (config.throwOnError ?? true) as ThrowOnError

  return resolveResponse(
    request({
      method: 'GET',
      url: '/v1/crm/records/{record_id}/tasks',
      security: [[{ id: 'bearerAuth', type: 'http', scheme: 'bearer' }], [{ id: 'xApiKey', type: 'apiKey', name: 'x-api-key', in: 'header' }]],
      jsonPlan: { lossless: false, refs: poolsterJsonRefs, requests: {}, responses: {"200":{"application/json":{"additional":null,"fields":{"api_version":{"kind":"string","nullable":false},"data":{"items":{"nullable":false,"ref":"CrmTask"},"kind":"array","nullable":false},"page":{"nullable":false,"ref":"CrmContentPage"}},"kind":"object","nullable":false,"required":["api_version","data","page"]}},"400":{"application/json":{"nullable":false,"ref":"CrmApiError"}},"401":{"application/json":{"nullable":false,"ref":"CrmApiError"}},"403":{"application/json":{"nullable":false,"ref":"CrmApiError"}},"404":{"application/json":{"nullable":false,"ref":"CrmApiError"}},"409":{"application/json":{"nullable":false,"ref":"CrmApiError"}},"413":{"application/json":{"nullable":false,"ref":"CrmApiError"}},"415":{"application/json":{"nullable":false,"ref":"CrmApiError"}},"503":{"application/json":{"nullable":false,"ref":"CrmApiError"}}} },
      ...config,
      throwOnError,
    }) as Promise<RequestResult<ListCrmTasksResponses, ThrowOnError>>,
    throwOnError,
  )
}
