import { poolsterJsonRefs } from '../_poolster_json_refs.js'
/* eslint-disable no-alert, no-console */

import type { Options, RequestResult, ResponseResult } from '../../.poolster/client.js'
import type { GetSenderIdentityOptions, GetSenderIdentityResponses } from '../../models/configuration/GetSenderIdentity.js'
import { client, resolveResponse } from '../../.poolster/client.js'

/**
 * {@link /v1/email/sender-identities/:id}
 */
export function getSenderIdentity<ThrowOnError extends boolean = true>(
  options: Options<GetSenderIdentityOptions, ThrowOnError>,
): Promise<ResponseResult<RequestResult<GetSenderIdentityResponses, ThrowOnError>, ThrowOnError>> {
  const { client: request = client, ...config } = options
  const throwOnError = (config.throwOnError ?? true) as ThrowOnError

  return resolveResponse(
    request({
      method: 'GET',
      url: '/v1/email/sender-identities/{id}',
      security: [[{ id: 'bearerAuth', type: 'http', scheme: 'bearer' }], [{ id: 'xApiKey', type: 'apiKey', name: 'x-api-key', in: 'header' }]],
      jsonPlan: { lossless: false, refs: poolsterJsonRefs, requests: {}, responses: {"200":{"application/json":{"nullable":false,"ref":"SenderIdentityResponse"}},"401":{"application/json":{"nullable":false,"ref":"ErrorResponse"}},"404":{"application/json":{"nullable":false,"ref":"ErrorResponse"}},"503":{"application/json":{"nullable":false,"ref":"ErrorResponse"}}} },
      ...config,
      throwOnError,
    }) as Promise<RequestResult<GetSenderIdentityResponses, ThrowOnError>>,
    throwOnError,
  )
}
