import { poolsterJsonRefs } from '../_poolster_json_refs.js'
/* eslint-disable no-alert, no-console */

import type { Options, RequestResult, ResponseResult } from '../../.poolster/client.js'
import type { DeleteEmailDomainOptions, DeleteEmailDomainResponses } from '../../models/configuration/DeleteEmailDomain.js'
import { client, resolveResponse } from '../../.poolster/client.js'

/**
 * {@link /email/domains/:id}
 */
export function deleteEmailDomain<ThrowOnError extends boolean = true>(
  options: Options<DeleteEmailDomainOptions, ThrowOnError>,
): Promise<ResponseResult<RequestResult<DeleteEmailDomainResponses, ThrowOnError>, ThrowOnError>> {
  const { client: request = client, ...config } = options
  const throwOnError = (config.throwOnError ?? true) as ThrowOnError

  return resolveResponse(
    request({
      method: 'DELETE',
      url: '/email/domains/{id}',
      security: [[{ id: 'bearerAuth', type: 'http', scheme: 'bearer' }], [{ id: 'xApiKey', type: 'apiKey', name: 'x-api-key', in: 'header' }]],
      jsonPlan: { lossless: false, refs: poolsterJsonRefs, requests: {}, responses: {"200":{"application/json":{"nullable":false,"ref":"DeletedDomainResponse"}},"401":{"application/json":{"nullable":false,"ref":"ErrorResponse"}},"403":{"application/json":{"nullable":false,"ref":"ErrorResponse"}},"404":{"application/json":{"nullable":false,"ref":"ErrorResponse"}},"409":{"application/json":{"nullable":false,"ref":"ErrorResponse"}},"503":{"application/json":{"nullable":false,"ref":"ErrorResponse"}}} },
      ...config,
      throwOnError,
    }) as Promise<RequestResult<DeleteEmailDomainResponses, ThrowOnError>>,
    throwOnError,
  )
}
