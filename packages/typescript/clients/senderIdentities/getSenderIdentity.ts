/* eslint-disable no-alert, no-console */

import type { Options, RequestResult, ResponseResult } from '../../.kaji/client.js'
import type { GetSenderIdentityOptions, GetSenderIdentityResponses } from '../../models/senderIdentities/GetSenderIdentity.js'
import { client, resolveResponse } from '../../.kaji/client.js'

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
      ...config,
      throwOnError,
    }) as Promise<RequestResult<GetSenderIdentityResponses, ThrowOnError>>,
    throwOnError,
  )
}
