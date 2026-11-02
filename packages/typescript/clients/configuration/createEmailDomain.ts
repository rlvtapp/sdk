import { poolsterJsonRefs } from '../_poolster_json_refs.js'
/* eslint-disable no-alert, no-console */

import type { Options, RequestResult, ResponseResult } from '../../.poolster/client.js'
import type { CreateEmailDomainOptions, CreateEmailDomainResponses } from '../../models/configuration/CreateEmailDomain.js'
import { client, resolveResponse } from '../../.poolster/client.js'

/**
 * {@link /email/domains}
 */
export function createEmailDomain<ThrowOnError extends boolean = true>(
  options: Options<CreateEmailDomainOptions, ThrowOnError>,
): Promise<ResponseResult<RequestResult<CreateEmailDomainResponses, ThrowOnError>, ThrowOnError>> {
  const { client: request = client, ...config } = options
  const throwOnError = (config.throwOnError ?? true) as ThrowOnError

  return resolveResponse(
    request({
      method: 'POST',
      url: '/email/domains',
      security: [[{ id: 'bearerAuth', type: 'http', scheme: 'bearer' }], [{ id: 'xApiKey', type: 'apiKey', name: 'x-api-key', in: 'header' }]],
      jsonPlan: { lossless: false, refs: poolsterJsonRefs, requests: {"application/json":{"nullable":false,"ref":"CreateDomainRequest"}}, responses: {"201":{"application/json":{"nullable":false,"ref":"DomainSetupResponse"}},"401":{"application/json":{"nullable":false,"ref":"ErrorResponse"}},"403":{"application/json":{"nullable":false,"ref":"ErrorResponse"}},"409":{"application/json":{"nullable":false,"ref":"ErrorResponse"}},"422":{"application/json":{"nullable":false,"ref":"ErrorResponse"}},"503":{"application/json":{"nullable":false,"ref":"ErrorResponse"}}} },
      ...config,
      throwOnError,
    }) as Promise<RequestResult<CreateEmailDomainResponses, ThrowOnError>>,
    throwOnError,
  )
}
