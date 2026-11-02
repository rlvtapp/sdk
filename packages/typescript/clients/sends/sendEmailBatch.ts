import { poolsterJsonRefs } from '../_poolster_json_refs.js'
/* eslint-disable no-alert, no-console */

import type { Options, RequestResult, ResponseResult } from '../../.poolster/client.js'
import type { SendEmailBatchOptions, SendEmailBatchResponses } from '../../models/sends/SendEmailBatch.js'
import { client, resolveResponse } from '../../.poolster/client.js'

/**
 * {@link /email/emails/batch}
 */
export function sendEmailBatch<ThrowOnError extends boolean = true>(
  options: Options<SendEmailBatchOptions, ThrowOnError>,
): Promise<ResponseResult<RequestResult<SendEmailBatchResponses, ThrowOnError>, ThrowOnError>> {
  const { client: request = client, ...config } = options
  const throwOnError = (config.throwOnError ?? true) as ThrowOnError

  return resolveResponse(
    request({
      method: 'POST',
      url: '/email/emails/batch',
      security: [[{ id: 'bearerAuth', type: 'http', scheme: 'bearer' }], [{ id: 'xApiKey', type: 'apiKey', name: 'x-api-key', in: 'header' }]],
      jsonPlan: { lossless: false, refs: poolsterJsonRefs, requests: {"application/json":{"nullable":false,"ref":"BatchSendRequest"}}, responses: {"200":{"application/json":{"nullable":false,"ref":"BatchSendResponse"}},"401":{"application/json":{"nullable":false,"ref":"ErrorResponse"}},"403":{"application/json":{"nullable":false,"ref":"ErrorResponse"}},"422":{"application/json":{"nullable":false,"ref":"ErrorResponse"}}} },
      ...config,
      throwOnError,
    }) as Promise<RequestResult<SendEmailBatchResponses, ThrowOnError>>,
    throwOnError,
  )
}
