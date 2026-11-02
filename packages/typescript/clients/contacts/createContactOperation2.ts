import { poolsterJsonRefs } from '../_poolster_json_refs.js'
/* eslint-disable no-alert, no-console */

import type { Options, RequestResult, ResponseResult } from '../../.poolster/client.js'
import type { CreateContactOperation2Options, CreateContactOperation2Responses } from '../../models/contacts/CreateContactOperation2.js'
import { client, resolveResponse } from '../../.poolster/client.js'

/**
 * {@link /v1/email/contacts}
 */
export function createContactOperation2<ThrowOnError extends boolean = true>(
  options: Options<CreateContactOperation2Options, ThrowOnError>,
): Promise<ResponseResult<RequestResult<CreateContactOperation2Responses, ThrowOnError>, ThrowOnError>> {
  const { client: request = client, ...config } = options
  const throwOnError = (config.throwOnError ?? true) as ThrowOnError

  return resolveResponse(
    request({
      method: 'POST',
      url: '/v1/email/contacts',
      security: [[{ id: 'bearerAuth', type: 'http', scheme: 'bearer' }], [{ id: 'xApiKey', type: 'apiKey', name: 'x-api-key', in: 'header' }]],
      jsonPlan: { lossless: false, refs: poolsterJsonRefs, requests: {"application/json":{"nullable":false,"ref":"CreateContact"}}, responses: {"201":{"application/json":{"nullable":false,"ref":"ContactResponse"}},"401":{"application/json":{"nullable":false,"ref":"ErrorResponse"}},"422":{"application/json":{"nullable":false,"ref":"ErrorResponse"}},"503":{"application/json":{"nullable":false,"ref":"ErrorResponse"}}} },
      ...config,
      throwOnError,
    }) as Promise<RequestResult<CreateContactOperation2Responses, ThrowOnError>>,
    throwOnError,
  )
}
