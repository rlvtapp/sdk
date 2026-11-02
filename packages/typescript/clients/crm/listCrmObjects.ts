import { poolsterJsonRefs } from '../_poolster_json_refs.js'
/* eslint-disable no-alert, no-console */

import type { Options, RequestResult, ResponseResult } from '../../.poolster/client.js'
import type { ListCrmObjectsOptions, ListCrmObjectsResponses } from '../../models/crm/ListCrmObjects.js'
import { client, resolveResponse } from '../../.poolster/client.js'

/**
 * {@link /crm/objects}
 */
export function listCrmObjects<ThrowOnError extends boolean = true>(
  options: Options<ListCrmObjectsOptions, ThrowOnError>,
): Promise<ResponseResult<RequestResult<ListCrmObjectsResponses, ThrowOnError>, ThrowOnError>> {
  const { client: request = client, ...config } = options
  const throwOnError = (config.throwOnError ?? true) as ThrowOnError

  return resolveResponse(
    request({
      method: 'GET',
      url: '/crm/objects',
      security: [[{ id: 'bearerAuth', type: 'http', scheme: 'bearer' }], [{ id: 'xApiKey', type: 'apiKey', name: 'x-api-key', in: 'header' }]],
      jsonPlan: { lossless: false, refs: poolsterJsonRefs, requests: {}, responses: {"200":{"application/json":{"additional":null,"fields":{"api_version":{"kind":"string","nullable":false},"data":{"items":{"nullable":false,"ref":"CrmObjectDiscovery"},"kind":"array","nullable":false},"page":{"additional":null,"fields":{},"kind":"object","nullable":false,"required":[]}},"kind":"object","nullable":false,"required":[]}},"400":{"application/json":{"nullable":false,"ref":"CrmApiError"}},"401":{"application/json":{"nullable":false,"ref":"CrmApiError"}},"403":{"application/json":{"nullable":false,"ref":"CrmApiError"}},"404":{"application/json":{"nullable":false,"ref":"CrmApiError"}},"409":{"application/json":{"nullable":false,"ref":"CrmApiError"}},"413":{"application/json":{"nullable":false,"ref":"CrmApiError"}},"415":{"application/json":{"nullable":false,"ref":"CrmApiError"}},"503":{"application/json":{"nullable":false,"ref":"CrmApiError"}}} },
      ...config,
      throwOnError,
    }) as Promise<RequestResult<ListCrmObjectsResponses, ThrowOnError>>,
    throwOnError,
  )
}
