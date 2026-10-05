/* eslint-disable no-alert, no-console */

import type { Options, RequestResult, ResponseResult } from '../../.kaji/client.js'
import type { QueryContactsOptions, QueryContactsResponses } from '../../models/contacts/QueryContacts.js'
import { client, resolveResponse } from '../../.kaji/client.js'

/**
 * {@link /v1/email/contacts/query}
 */
export function queryContacts<ThrowOnError extends boolean = true>(
  options: Options<QueryContactsOptions, ThrowOnError>,
): Promise<ResponseResult<RequestResult<QueryContactsResponses, ThrowOnError>, ThrowOnError>> {
  const { client: request = client, ...config } = options
  const throwOnError = (config.throwOnError ?? true) as ThrowOnError

  return resolveResponse(
    request({
      method: 'POST',
      url: '/v1/email/contacts/query',
      security: [[{ id: 'bearerAuth', type: 'http', scheme: 'bearer' }], [{ id: 'xApiKey', type: 'apiKey', name: 'x-api-key', in: 'header' }]],
      ...config,
      throwOnError,
    }) as Promise<RequestResult<QueryContactsResponses, ThrowOnError>>,
    throwOnError,
  )
}
