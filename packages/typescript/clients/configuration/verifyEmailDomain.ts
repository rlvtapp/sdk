import { poolsterJsonRefs } from '../_poolster_json_refs.js'
/* eslint-disable no-alert, no-console */

import type { Options, RequestResult, ResponseResult } from '../../.poolster/client.js'
import type { VerifyEmailDomainOptions, VerifyEmailDomainResponses } from '../../models/configuration/VerifyEmailDomain.js'
import { client, resolveResponse } from '../../.poolster/client.js'

/**
 * {@link /email/domains/:id/verify}
 */
export function verifyEmailDomain<ThrowOnError extends boolean = true>(
  options: Options<VerifyEmailDomainOptions, ThrowOnError>,
): Promise<ResponseResult<RequestResult<VerifyEmailDomainResponses, ThrowOnError>, ThrowOnError>> {
  const { client: request = client, ...config } = options
  const throwOnError = (config.throwOnError ?? true) as ThrowOnError

  return resolveResponse(
    request({
      method: 'POST',
      url: '/email/domains/{id}/verify',
      security: [[{ id: 'bearerAuth', type: 'http', scheme: 'bearer' }], [{ id: 'xApiKey', type: 'apiKey', name: 'x-api-key', in: 'header' }]],
      jsonPlan: { lossless: false, refs: poolsterJsonRefs, requests: {}, responses: {"200":{"application/json":{"nullable":false,"ref":"DomainSetupResponse"}},"401":{"application/json":{"nullable":false,"ref":"ErrorResponse"}},"403":{"application/json":{"nullable":false,"ref":"ErrorResponse"}},"404":{"application/json":{"nullable":false,"ref":"ErrorResponse"}},"409":{"application/json":{"nullable":false,"ref":"ErrorResponse"}},"429":{"application/json":{"nullable":false,"ref":"ErrorResponse"}},"503":{"application/json":{"nullable":false,"ref":"ErrorResponse"}}} },
      ...config,
      throwOnError,
    }) as Promise<RequestResult<VerifyEmailDomainResponses, ThrowOnError>>,
    throwOnError,
  )
}
