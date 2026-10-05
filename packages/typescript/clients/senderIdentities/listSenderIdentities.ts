/* eslint-disable no-alert, no-console */

import type { Options, RequestResult, ResponseResult } from '../../.kaji/client.js'
import type { ListSenderIdentitiesOptions, ListSenderIdentitiesResponses } from '../../models/senderIdentities/ListSenderIdentities.js'
import { client, resolveResponse } from '../../.kaji/client.js'

/**
 * {@link /v1/email/sender-identities}
 */
export function listSenderIdentities<ThrowOnError extends boolean = true>(
  options: Options<ListSenderIdentitiesOptions, ThrowOnError>,
): Promise<ResponseResult<RequestResult<ListSenderIdentitiesResponses, ThrowOnError>, ThrowOnError>> {
  const { client: request = client, ...config } = options
  const throwOnError = (config.throwOnError ?? true) as ThrowOnError

  return resolveResponse(
    request({
      method: 'GET',
      url: '/v1/email/sender-identities',
      security: [[{ id: 'bearerAuth', type: 'http', scheme: 'bearer' }], [{ id: 'xApiKey', type: 'apiKey', name: 'x-api-key', in: 'header' }]],
      ...config,
      throwOnError,
    }) as Promise<RequestResult<ListSenderIdentitiesResponses, ThrowOnError>>,
    throwOnError,
  )
}
