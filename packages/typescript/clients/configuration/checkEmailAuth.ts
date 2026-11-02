import { poolsterJsonRefs } from '../_poolster_json_refs.js'
/* eslint-disable no-alert, no-console */

import type { Options, RequestResult, ResponseResult } from '../../.poolster/client.js'
import type { CheckEmailAuthOptions, CheckEmailAuthResponses } from '../../models/configuration/CheckEmailAuth.js'
import { client, resolveResponse } from '../../.poolster/client.js'

/**
 * {@link /email/auth-check}
 */
export function checkEmailAuth<ThrowOnError extends boolean = true>(
  options: Options<CheckEmailAuthOptions, ThrowOnError>,
): Promise<ResponseResult<RequestResult<CheckEmailAuthResponses, ThrowOnError>, ThrowOnError>> {
  const { client: request = client, ...config } = options
  const throwOnError = (config.throwOnError ?? true) as ThrowOnError

  return resolveResponse(
    request({
      method: 'GET',
      url: '/email/auth-check',
      security: [[{ id: 'bearerAuth', type: 'http', scheme: 'bearer' }], [{ id: 'xApiKey', type: 'apiKey', name: 'x-api-key', in: 'header' }]],
      jsonPlan: { lossless: false, refs: poolsterJsonRefs, requests: {}, responses: {"200":{"application/json":{"nullable":false,"ref":"AuthCheckResponse"}},"401":{"application/json":{"nullable":false,"ref":"ErrorResponse"}},"403":{"application/json":{"nullable":false,"ref":"ErrorResponse"}},"503":{"application/json":{"nullable":false,"ref":"ErrorResponse"}}} },
      ...config,
      throwOnError,
    }) as Promise<RequestResult<CheckEmailAuthResponses, ThrowOnError>>,
    throwOnError,
  )
}
