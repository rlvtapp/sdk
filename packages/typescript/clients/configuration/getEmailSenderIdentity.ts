import { poolsterJsonRefs } from '../_poolster_json_refs.js'
/* eslint-disable no-alert, no-console */

import type { Options, RequestResult, ResponseResult } from '../../.poolster/client.js'
import type { GetEmailSenderIdentityOptions, GetEmailSenderIdentityResponses } from '../../models/configuration/GetEmailSenderIdentity.js'
import { client, resolveResponse } from '../../.poolster/client.js'

/**
 * {@link /email/sender-identities/:id}
 */
export function getEmailSenderIdentity<ThrowOnError extends boolean = true>(
  options: Options<GetEmailSenderIdentityOptions, ThrowOnError>,
): Promise<ResponseResult<RequestResult<GetEmailSenderIdentityResponses, ThrowOnError>, ThrowOnError>> {
  const { client: request = client, ...config } = options
  const throwOnError = (config.throwOnError ?? true) as ThrowOnError

  return resolveResponse(
    request({
      method: 'GET',
      url: '/email/sender-identities/{id}',
      security: [[{ id: 'bearerAuth', type: 'http', scheme: 'bearer' }], [{ id: 'xApiKey', type: 'apiKey', name: 'x-api-key', in: 'header' }]],
      jsonPlan: { lossless: false, refs: poolsterJsonRefs, requests: {}, responses: {"200":{"application/json":{"nullable":false,"ref":"SenderIdentityResponse"}},"401":{"application/json":{"nullable":false,"ref":"ErrorResponse"}},"404":{"application/json":{"nullable":false,"ref":"ErrorResponse"}},"503":{"application/json":{"nullable":false,"ref":"ErrorResponse"}}} },
      ...config,
      throwOnError,
    }) as Promise<RequestResult<GetEmailSenderIdentityResponses, ThrowOnError>>,
    throwOnError,
  )
}
