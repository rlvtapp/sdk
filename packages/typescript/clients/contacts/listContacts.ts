/* eslint-disable no-alert, no-console */

import type { Options, RequestResult, ResponseResult } from '../../.kaji/client.js'
import type { ListContactsOptions, ListContactsResponses } from '../../models/contacts/ListContacts.js'
import { client, resolveResponse } from '../../.kaji/client.js'

/**
 * {@link /v1/email/contacts}
 */
export function listContacts<ThrowOnError extends boolean = true>(
  options: Options<ListContactsOptions, ThrowOnError>,
): Promise<ResponseResult<RequestResult<ListContactsResponses, ThrowOnError>, ThrowOnError>> {
  const { client: request = client, ...config } = options
  const throwOnError = (config.throwOnError ?? true) as ThrowOnError

  return resolveResponse(
    request({
      method: 'GET',
      url: '/v1/email/contacts',
      security: [[{ id: 'bearerAuth', type: 'http', scheme: 'bearer' }], [{ id: 'xApiKey', type: 'apiKey', name: 'x-api-key', in: 'header' }]],
      ...config,
      throwOnError,
    }) as Promise<RequestResult<ListContactsResponses, ThrowOnError>>,
    throwOnError,
  )
}
