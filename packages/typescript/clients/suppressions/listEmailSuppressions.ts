import { poolsterJsonRefs } from '../_poolster_json_refs.js'
/* eslint-disable no-alert, no-console */

import type { Options, RequestResult, ResponseResult } from '../../.poolster/client.js'
import type { ListEmailSuppressionsOptions, ListEmailSuppressionsResponses } from '../../models/suppressions/ListEmailSuppressions.js'
import { client, resolveResponse } from '../../.poolster/client.js'

/**
 * {@link /email/suppressions}
 */
export function listEmailSuppressions<ThrowOnError extends boolean = true>(
  options: Options<ListEmailSuppressionsOptions, ThrowOnError>,
): Promise<ResponseResult<RequestResult<ListEmailSuppressionsResponses, ThrowOnError>, ThrowOnError>> {
  const { client: request = client, ...config } = options
  const throwOnError = (config.throwOnError ?? true) as ThrowOnError

  return resolveResponse(
    request({
      method: 'GET',
      url: '/email/suppressions',
      security: [[{ id: 'bearerAuth', type: 'http', scheme: 'bearer' }], [{ id: 'xApiKey', type: 'apiKey', name: 'x-api-key', in: 'header' }]],
      jsonPlan: { lossless: false, refs: poolsterJsonRefs, requests: {}, responses: {"200":{"application/json":{"nullable":false,"ref":"SuppressionListResponse"}},"401":{"application/json":{"nullable":false,"ref":"ErrorResponse"}},"403":{"application/json":{"nullable":false,"ref":"ErrorResponse"}},"422":{"application/json":{"nullable":false,"ref":"ErrorResponse"}},"503":{"application/json":{"nullable":false,"ref":"ErrorResponse"}}} },
      ...config,
      throwOnError,
    }) as Promise<RequestResult<ListEmailSuppressionsResponses, ThrowOnError>>,
    throwOnError,
  )
}
