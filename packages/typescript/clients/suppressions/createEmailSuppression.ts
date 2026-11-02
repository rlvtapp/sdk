import { poolsterJsonRefs } from '../_poolster_json_refs.js'
/* eslint-disable no-alert, no-console */

import type { Options, RequestResult, ResponseResult } from '../../.poolster/client.js'
import type { CreateEmailSuppressionOptions, CreateEmailSuppressionResponses } from '../../models/suppressions/CreateEmailSuppression.js'
import { client, resolveResponse } from '../../.poolster/client.js'

/**
 * {@link /email/suppressions}
 */
export function createEmailSuppression<ThrowOnError extends boolean = true>(
  options: Options<CreateEmailSuppressionOptions, ThrowOnError>,
): Promise<ResponseResult<RequestResult<CreateEmailSuppressionResponses, ThrowOnError>, ThrowOnError>> {
  const { client: request = client, ...config } = options
  const throwOnError = (config.throwOnError ?? true) as ThrowOnError

  return resolveResponse(
    request({
      method: 'POST',
      url: '/email/suppressions',
      security: [[{ id: 'bearerAuth', type: 'http', scheme: 'bearer' }], [{ id: 'xApiKey', type: 'apiKey', name: 'x-api-key', in: 'header' }]],
      jsonPlan: { lossless: false, refs: poolsterJsonRefs, requests: {"application/json":{"nullable":false,"ref":"NewSuppression"}}, responses: {"200":{"application/json":{"nullable":false,"ref":"SuppressionResponse"}},"201":{"application/json":{"nullable":false,"ref":"SuppressionResponse"}},"401":{"application/json":{"nullable":false,"ref":"ErrorResponse"}},"403":{"application/json":{"nullable":false,"ref":"ErrorResponse"}},"422":{"application/json":{"nullable":false,"ref":"ErrorResponse"}},"503":{"application/json":{"nullable":false,"ref":"ErrorResponse"}}} },
      ...config,
      throwOnError,
    }) as Promise<RequestResult<CreateEmailSuppressionResponses, ThrowOnError>>,
    throwOnError,
  )
}
