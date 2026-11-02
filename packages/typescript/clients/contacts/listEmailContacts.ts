import { poolsterJsonRefs } from '../_poolster_json_refs.js'
/* eslint-disable no-alert, no-console */

import type { Options, RequestResult, ResponseResult } from '../../.poolster/client.js'
import type { ListEmailContactsOptions, ListEmailContactsResponses } from '../../models/contacts/ListEmailContacts.js'
import { client, resolveResponse } from '../../.poolster/client.js'

/**
 * {@link /email/contacts}
 */
export function listEmailContacts<ThrowOnError extends boolean = true>(
  options: Options<ListEmailContactsOptions, ThrowOnError>,
): Promise<ResponseResult<RequestResult<ListEmailContactsResponses, ThrowOnError>, ThrowOnError>> {
  const { client: request = client, ...config } = options
  const throwOnError = (config.throwOnError ?? true) as ThrowOnError

  return resolveResponse(
    request({
      method: 'GET',
      url: '/email/contacts',
      security: [[{ id: 'bearerAuth', type: 'http', scheme: 'bearer' }], [{ id: 'xApiKey', type: 'apiKey', name: 'x-api-key', in: 'header' }]],
      jsonPlan: { lossless: false, refs: poolsterJsonRefs, requests: {}, responses: {"200":{"application/json":{"nullable":false,"ref":"ContactListResponse"}},"401":{"application/json":{"nullable":false,"ref":"ErrorResponse"}},"503":{"application/json":{"nullable":false,"ref":"ErrorResponse"}}} },
      ...config,
      throwOnError,
    }) as Promise<RequestResult<ListEmailContactsResponses, ThrowOnError>>,
    throwOnError,
  )
}
