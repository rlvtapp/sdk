import { poolsterJsonRefs } from '../_poolster_json_refs.js'
/* eslint-disable no-alert, no-console */

import type { Options, RequestResult, ResponseResult } from '../../.poolster/client.js'
import type { RevokeEmailApiKeyOptions, RevokeEmailApiKeyResponses } from '../../models/apiKeys/RevokeEmailApiKey.js'
import { client, resolveResponse } from '../../.poolster/client.js'

/**
 * {@link /email/api-keys/:id}
 */
export function revokeEmailApiKey<ThrowOnError extends boolean = true>(
  options: Options<RevokeEmailApiKeyOptions, ThrowOnError>,
): Promise<ResponseResult<RequestResult<RevokeEmailApiKeyResponses, ThrowOnError>, ThrowOnError>> {
  const { client: request = client, ...config } = options
  const throwOnError = (config.throwOnError ?? true) as ThrowOnError

  return resolveResponse(
    request({
      method: 'DELETE',
      url: '/email/api-keys/{id}',
      security: [[{ id: 'bearerAuth', type: 'http', scheme: 'bearer' }], [{ id: 'xApiKey', type: 'apiKey', name: 'x-api-key', in: 'header' }]],
      jsonPlan: { lossless: false, refs: poolsterJsonRefs, requests: {}, responses: {"200":{},"401":{"application/json":{"nullable":false,"ref":"ErrorResponse"}},"403":{"application/json":{"nullable":false,"ref":"ErrorResponse"}},"404":{"application/json":{"nullable":false,"ref":"ErrorResponse"}},"503":{"application/json":{"nullable":false,"ref":"ErrorResponse"}}} },
      ...config,
      throwOnError,
    }) as Promise<RequestResult<RevokeEmailApiKeyResponses, ThrowOnError>>,
    throwOnError,
  )
}
