/* eslint-disable no-alert, no-console */

import type { Options, RequestResult, ResponseResult } from '../../.kaji/client.js'
import type { CreateContactOptions, CreateContactResponses } from '../../models/contacts/CreateContact.js'
import { client, resolveResponse } from '../../.kaji/client.js'

/**
 * {@link /v1/email/contacts}
 */
export function createContact<ThrowOnError extends boolean = true>(
  options: Options<CreateContactOptions, ThrowOnError>,
): Promise<ResponseResult<RequestResult<CreateContactResponses, ThrowOnError>, ThrowOnError>> {
  const { client: request = client, ...config } = options
  const throwOnError = (config.throwOnError ?? true) as ThrowOnError

  return resolveResponse(
    request({
      method: 'POST',
      url: '/v1/email/contacts',
      security: [[{ id: 'bearerAuth', type: 'http', scheme: 'bearer' }], [{ id: 'xApiKey', type: 'apiKey', name: 'x-api-key', in: 'header' }]],
      ...config,
      throwOnError,
    }) as Promise<RequestResult<CreateContactResponses, ThrowOnError>>,
    throwOnError,
  )
}
