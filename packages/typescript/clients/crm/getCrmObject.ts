import { poolsterJsonRefs } from '../_poolster_json_refs.js'
/* eslint-disable no-alert, no-console */

import type { Options, RequestResult, ResponseResult } from '../../.poolster/client.js'
import type { GetCrmObjectOptions, GetCrmObjectResponses } from '../../models/crm/GetCrmObject.js'
import { client, resolveResponse } from '../../.poolster/client.js'

/**
 * {@link /crm/objects/:object}
 */
export function getCrmObject<ThrowOnError extends boolean = true>(
  options: Options<GetCrmObjectOptions, ThrowOnError>,
): Promise<ResponseResult<RequestResult<GetCrmObjectResponses, ThrowOnError>, ThrowOnError>> {
  const { client: request = client, ...config } = options
  const throwOnError = (config.throwOnError ?? true) as ThrowOnError

  return resolveResponse(
    request({
      method: 'GET',
      url: '/crm/objects/{object}',
      security: [[{ id: 'bearerAuth', type: 'http', scheme: 'bearer' }], [{ id: 'xApiKey', type: 'apiKey', name: 'x-api-key', in: 'header' }]],
      jsonPlan: { lossless: false, refs: poolsterJsonRefs, requests: {}, responses: {"200":{"application/json":{"additional":null,"fields":{"api_version":{"kind":"string","nullable":false},"attributes":{"items":{"nullable":false,"ref":"CrmAttributeDiscovery"},"kind":"array","nullable":false},"data":{"nullable":false,"ref":"CrmObjectDiscovery"}},"kind":"object","nullable":false,"required":[]}},"400":{"application/json":{"nullable":false,"ref":"CrmApiError"}},"401":{"application/json":{"nullable":false,"ref":"CrmApiError"}},"403":{"application/json":{"nullable":false,"ref":"CrmApiError"}},"404":{"application/json":{"nullable":false,"ref":"CrmApiError"}},"409":{"application/json":{"nullable":false,"ref":"CrmApiError"}},"413":{"application/json":{"nullable":false,"ref":"CrmApiError"}},"415":{"application/json":{"nullable":false,"ref":"CrmApiError"}},"503":{"application/json":{"nullable":false,"ref":"CrmApiError"}}} },
      ...config,
      throwOnError,
    }) as Promise<RequestResult<GetCrmObjectResponses, ThrowOnError>>,
    throwOnError,
  )
}
