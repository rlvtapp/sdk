import { poolsterJsonRefs } from '../_poolster_json_refs.js'
/* eslint-disable no-alert, no-console */

import type { Options, RequestResult, ResponseResult } from '../../.poolster/client.js'
import type { CreateEmailSuppressionBatchOptions, CreateEmailSuppressionBatchResponses } from '../../models/suppressions/CreateEmailSuppressionBatch.js'
import { client, resolveResponse } from '../../.poolster/client.js'

/**
 * {@link /email/suppressions/batch}
 */
export function createEmailSuppressionBatch<ThrowOnError extends boolean = true>(
  options: Options<CreateEmailSuppressionBatchOptions, ThrowOnError>,
): Promise<ResponseResult<RequestResult<CreateEmailSuppressionBatchResponses, ThrowOnError>, ThrowOnError>> {
  const { client: request = client, ...config } = options
  const throwOnError = (config.throwOnError ?? true) as ThrowOnError

  return resolveResponse(
    request({
      method: 'POST',
      url: '/email/suppressions/batch',
      security: [[{ id: 'bearerAuth', type: 'http', scheme: 'bearer' }], [{ id: 'xApiKey', type: 'apiKey', name: 'x-api-key', in: 'header' }]],
      jsonPlan: { lossless: false, refs: poolsterJsonRefs, requests: {"application/json":{"nullable":false,"ref":"SuppressionBatchRequest"}}, responses: {"200":{"application/json":{"nullable":false,"ref":"SuppressionBatchResponse"}},"401":{"application/json":{"nullable":false,"ref":"ErrorResponse"}},"403":{"application/json":{"nullable":false,"ref":"ErrorResponse"}},"422":{"application/json":{"nullable":false,"ref":"ErrorResponse"}},"503":{"application/json":{"nullable":false,"ref":"ErrorResponse"}}} },
      ...config,
      throwOnError,
    }) as Promise<RequestResult<CreateEmailSuppressionBatchResponses, ThrowOnError>>,
    throwOnError,
  )
}
