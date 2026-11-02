import { poolsterJsonRefs } from '../_poolster_json_refs.js'
/* eslint-disable no-alert, no-console */

import type { Options, RequestResult, ResponseResult } from '../../.poolster/client.js'
import type { QueryEmailContactsOptions, QueryEmailContactsResponses } from '../../models/contacts/QueryEmailContacts.js'
import { client, resolveResponse } from '../../.poolster/client.js'

/**
 * {@link /email/contacts/query}
 */
export function queryEmailContacts<ThrowOnError extends boolean = true>(
  options: Options<QueryEmailContactsOptions, ThrowOnError>,
): Promise<ResponseResult<RequestResult<QueryEmailContactsResponses, ThrowOnError>, ThrowOnError>> {
  const { client: request = client, ...config } = options
  const throwOnError = (config.throwOnError ?? true) as ThrowOnError

  return resolveResponse(
    request({
      method: 'POST',
      url: '/email/contacts/query',
      security: [[{ id: 'bearerAuth', type: 'http', scheme: 'bearer' }], [{ id: 'xApiKey', type: 'apiKey', name: 'x-api-key', in: 'header' }]],
      jsonPlan: { lossless: false, refs: poolsterJsonRefs, requests: {"application/json":{"nullable":false,"ref":"ContactQuery"}}, responses: {"200":{"application/json":{"nullable":false,"ref":"ContactQueryResponse"}},"401":{"application/json":{"nullable":false,"ref":"ErrorResponse"}},"422":{"application/json":{"nullable":false,"ref":"ErrorResponse"}},"503":{"application/json":{"nullable":false,"ref":"ErrorResponse"}}} },
      ...config,
      throwOnError,
    }) as Promise<RequestResult<QueryEmailContactsResponses, ThrowOnError>>,
    throwOnError,
  )
}
