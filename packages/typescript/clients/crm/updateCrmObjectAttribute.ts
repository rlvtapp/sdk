import { poolsterJsonRefs } from '../_poolster_json_refs.js'
/* eslint-disable no-alert, no-console */

import type { Options, RequestResult, ResponseResult } from '../../.poolster/client.js'
import type { UpdateCrmObjectAttributeOptions, UpdateCrmObjectAttributeResponses } from '../../models/crm/UpdateCrmObjectAttribute.js'
import { client, resolveResponse } from '../../.poolster/client.js'

/**
 * {@link /v1/crm/objects/:object/attributes/:attribute}
 */
export function updateCrmObjectAttribute<ThrowOnError extends boolean = true>(
  options: Options<UpdateCrmObjectAttributeOptions, ThrowOnError>,
): Promise<ResponseResult<RequestResult<UpdateCrmObjectAttributeResponses, ThrowOnError>, ThrowOnError>> {
  const { client: request = client, ...config } = options
  const throwOnError = (config.throwOnError ?? true) as ThrowOnError

  return resolveResponse(
    request({
      method: 'PATCH',
      url: '/v1/crm/objects/{object}/attributes/{attribute}',
      security: [[{ id: 'bearerAuth', type: 'http', scheme: 'bearer' }], [{ id: 'xApiKey', type: 'apiKey', name: 'x-api-key', in: 'header' }]],
      jsonPlan: { lossless: false, refs: poolsterJsonRefs, requests: {"application/json":{"nullable":false,"ref":"CrmAttributePatch"}}, responses: {"200":{"application/json":{"nullable":false,"ref":"CrmMetadataAttributeResponse"}},"400":{"application/json":{"nullable":false,"ref":"CrmApiError"}},"401":{"application/json":{"nullable":false,"ref":"CrmApiError"}},"403":{"application/json":{"nullable":false,"ref":"CrmApiError"}},"404":{"application/json":{"nullable":false,"ref":"CrmApiError"}},"409":{"application/json":{"nullable":false,"ref":"CrmApiError"}},"413":{"application/json":{"nullable":false,"ref":"CrmApiError"}},"415":{"application/json":{"nullable":false,"ref":"CrmApiError"}},"503":{"application/json":{"nullable":false,"ref":"CrmApiError"}}} },
      ...config,
      throwOnError,
    }) as Promise<RequestResult<UpdateCrmObjectAttributeResponses, ThrowOnError>>,
    throwOnError,
  )
}
