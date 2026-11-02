import { poolsterJsonRefs } from '../_poolster_json_refs.js'
/* eslint-disable no-alert, no-console */

import type { Options, RequestResult, ResponseResult } from '../../.poolster/client.js'
import type { ListEmailSenderIdentitiesOptions, ListEmailSenderIdentitiesResponses } from '../../models/configuration/ListEmailSenderIdentities.js'
import { client, resolveResponse } from '../../.poolster/client.js'

/**
 * {@link /email/sender-identities}
 */
export function listEmailSenderIdentities<ThrowOnError extends boolean = true>(
  options: Options<ListEmailSenderIdentitiesOptions, ThrowOnError>,
): Promise<ResponseResult<RequestResult<ListEmailSenderIdentitiesResponses, ThrowOnError>, ThrowOnError>> {
  const { client: request = client, ...config } = options
  const throwOnError = (config.throwOnError ?? true) as ThrowOnError

  return resolveResponse(
    request({
      method: 'GET',
      url: '/email/sender-identities',
      security: [[{ id: 'bearerAuth', type: 'http', scheme: 'bearer' }], [{ id: 'xApiKey', type: 'apiKey', name: 'x-api-key', in: 'header' }]],
      jsonPlan: { lossless: false, refs: poolsterJsonRefs, requests: {}, responses: {"200":{"application/json":{"nullable":false,"ref":"SenderIdentityListResponse"}},"401":{"application/json":{"nullable":false,"ref":"ErrorResponse"}},"503":{"application/json":{"nullable":false,"ref":"ErrorResponse"}}} },
      ...config,
      throwOnError,
    }) as Promise<RequestResult<ListEmailSenderIdentitiesResponses, ThrowOnError>>,
    throwOnError,
  )
}
