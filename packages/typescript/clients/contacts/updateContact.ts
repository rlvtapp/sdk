/* eslint-disable no-alert, no-console */

import type { Options, RequestResult, ResponseResult } from '../../.kaji/client.js'
import type { UpdateContactOptions, UpdateContactResponses } from '../../models/contacts/UpdateContact.js'
import { client, resolveResponse } from '../../.kaji/client.js'

/**
 * {@link /v1/email/contacts/:id}
 */
export function updateContact<ThrowOnError extends boolean = true>(
  options: Options<UpdateContactOptions, ThrowOnError>,
): Promise<ResponseResult<RequestResult<UpdateContactResponses, ThrowOnError>, ThrowOnError>> {
  const { client: request = client, ...config } = options
  const throwOnError = (config.throwOnError ?? true) as ThrowOnError

  return resolveResponse(
    request({
      method: 'PATCH',
      url: '/v1/email/contacts/{id}',
      security: [[{ id: 'bearerAuth', type: 'http', scheme: 'bearer' }], [{ id: 'xApiKey', type: 'apiKey', name: 'x-api-key', in: 'header' }]],
      ...config,
      throwOnError,
    }) as Promise<RequestResult<UpdateContactResponses, ThrowOnError>>,
    throwOnError,
  )
}
