import { poolsterJsonRefs } from '../_poolster_json_refs.js'
/* eslint-disable no-alert, no-console */

import type { Options, RequestResult, ResponseResult } from '../../.poolster/client.js'
import type { CreateEmailLabelOptions, CreateEmailLabelResponses } from '../../models/inboxes/CreateEmailLabel.js'
import { client, resolveResponse } from '../../.poolster/client.js'

/**
 * {@link /email/labels}
 */
export function createEmailLabel<ThrowOnError extends boolean = true>(
  options: Options<CreateEmailLabelOptions, ThrowOnError>,
): Promise<ResponseResult<RequestResult<CreateEmailLabelResponses, ThrowOnError>, ThrowOnError>> {
  const { client: request = client, ...config } = options
  const throwOnError = (config.throwOnError ?? true) as ThrowOnError

  return resolveResponse(
    request({
      method: 'POST',
      url: '/email/labels',
      security: [[{ id: 'bearerAuth', type: 'http', scheme: 'bearer' }], [{ id: 'xApiKey', type: 'apiKey', name: 'x-api-key', in: 'header' }]],
      jsonPlan: { lossless: false, refs: poolsterJsonRefs, requests: {"application/json":{"nullable":false,"ref":"LabelInput"}}, responses: {"201":{},"401":{"application/json":{"nullable":false,"ref":"ErrorResponse"}},"409":{"application/json":{"nullable":false,"ref":"ErrorResponse"}},"422":{"application/json":{"nullable":false,"ref":"ErrorResponse"}},"503":{"application/json":{"nullable":false,"ref":"ErrorResponse"}}} },
      ...config,
      throwOnError,
    }) as Promise<RequestResult<CreateEmailLabelResponses, ThrowOnError>>,
    throwOnError,
  )
}
