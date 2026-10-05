/* eslint-disable no-alert, no-console */

import type { Options, RequestResult, ResponseResult } from '../../.kaji/client.js'
import type { GetContactOptions, GetContactResponses } from '../../models/contacts/GetContact.js'
import { client, resolveResponse } from '../../.kaji/client.js'

/**
 * {@link /v1/email/contacts/:id}
 */
export function getContact<ThrowOnError extends boolean = true>(
  options: Options<GetContactOptions, ThrowOnError>,
): Promise<ResponseResult<RequestResult<GetContactResponses, ThrowOnError>, ThrowOnError>> {
  const { client: request = client, ...config } = options
  const throwOnError = (config.throwOnError ?? true) as ThrowOnError

  return resolveResponse(
    request({
      method: 'GET',
      url: '/v1/email/contacts/{id}',
      security: [[{ id: 'bearerAuth', type: 'http', scheme: 'bearer' }], [{ id: 'xApiKey', type: 'apiKey', name: 'x-api-key', in: 'header' }]],
      ...config,
      throwOnError,
    }) as Promise<RequestResult<GetContactResponses, ThrowOnError>>,
    throwOnError,
  )
}
