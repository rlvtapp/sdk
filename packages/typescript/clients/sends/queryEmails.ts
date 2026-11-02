import { poolsterJsonRefs } from '../_poolster_json_refs.js'
/* eslint-disable no-alert, no-console */

import type { Options, RequestResult, ResponseResult } from '../../.poolster/client.js'
import type { QueryEmailsOptions, QueryEmailsResponses } from '../../models/sends/QueryEmails.js'
import { client, resolveResponse } from '../../.poolster/client.js'

/**
 * {@link /email/emails/query}
 */
export function queryEmails<ThrowOnError extends boolean = true>(
  options: Options<QueryEmailsOptions, ThrowOnError>,
): Promise<ResponseResult<RequestResult<QueryEmailsResponses, ThrowOnError>, ThrowOnError>> {
  const { client: request = client, ...config } = options
  const throwOnError = (config.throwOnError ?? true) as ThrowOnError

  return resolveResponse(
    request({
      method: 'POST',
      url: '/email/emails/query',
      security: [[{ id: 'bearerAuth', type: 'http', scheme: 'bearer' }], [{ id: 'xApiKey', type: 'apiKey', name: 'x-api-key', in: 'header' }]],
      jsonPlan: { lossless: false, refs: poolsterJsonRefs, requests: {"application/json":{"nullable":false,"ref":"SendQuery"}}, responses: {"200":{},"401":{"application/json":{"nullable":false,"ref":"ErrorResponse"}},"403":{"application/json":{"nullable":false,"ref":"ErrorResponse"}},"422":{"application/json":{"nullable":false,"ref":"ErrorResponse"}},"503":{"application/json":{"nullable":false,"ref":"ErrorResponse"}}} },
      ...config,
      throwOnError,
    }) as Promise<RequestResult<QueryEmailsResponses, ThrowOnError>>,
    throwOnError,
  )
}
