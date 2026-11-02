import { poolsterJsonRefs } from '../_poolster_json_refs.js'
/* eslint-disable no-alert, no-console */

import type { Options, RequestResult, ResponseResult } from '../../.poolster/client.js'
import type { CreateCrmListAttributeOptions, CreateCrmListAttributeResponses } from '../../models/crm/CreateCrmListAttribute.js'
import { client, resolveResponse } from '../../.poolster/client.js'

/**
 * {@link /crm/lists/:list/attributes}
 */
export function createCrmListAttribute<ThrowOnError extends boolean = true>(
  options: Options<CreateCrmListAttributeOptions, ThrowOnError>,
): Promise<ResponseResult<RequestResult<CreateCrmListAttributeResponses, ThrowOnError>, ThrowOnError>> {
  const { client: request = client, ...config } = options
  const throwOnError = (config.throwOnError ?? true) as ThrowOnError

  return resolveResponse(
    request({
      method: 'POST',
      url: '/crm/lists/{list}/attributes',
      security: [[{ id: 'bearerAuth', type: 'http', scheme: 'bearer' }], [{ id: 'xApiKey', type: 'apiKey', name: 'x-api-key', in: 'header' }]],
      jsonPlan: { lossless: false, refs: poolsterJsonRefs, requests: {"application/json":{"nullable":false,"ref":"CrmAttributeCreate"}}, responses: {"201":{"application/json":{"nullable":false,"ref":"CrmMetadataAttributeResponse"}},"400":{"application/json":{"nullable":false,"ref":"CrmApiError"}},"401":{"application/json":{"nullable":false,"ref":"CrmApiError"}},"403":{"application/json":{"nullable":false,"ref":"CrmApiError"}},"404":{"application/json":{"nullable":false,"ref":"CrmApiError"}},"409":{"application/json":{"nullable":false,"ref":"CrmApiError"}},"413":{"application/json":{"nullable":false,"ref":"CrmApiError"}},"415":{"application/json":{"nullable":false,"ref":"CrmApiError"}},"503":{"application/json":{"nullable":false,"ref":"CrmApiError"}}} },
      ...config,
      throwOnError,
    }) as Promise<RequestResult<CreateCrmListAttributeResponses, ThrowOnError>>,
    throwOnError,
  )
}
