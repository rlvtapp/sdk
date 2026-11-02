import { poolsterJsonRefs } from '../_poolster_json_refs.js'
/* eslint-disable no-alert, no-console */

import type { Options, RequestResult, ResponseResult } from '../../.poolster/client.js'
import type { GetEmailUsageOptions, GetEmailUsageResponses } from '../../models/usage/GetEmailUsage.js'
import { client, resolveResponse } from '../../.poolster/client.js'

/**
 * {@link /email/usage}
 */
export function getEmailUsage<ThrowOnError extends boolean = true>(
  options: Options<GetEmailUsageOptions, ThrowOnError>,
): Promise<ResponseResult<RequestResult<GetEmailUsageResponses, ThrowOnError>, ThrowOnError>> {
  const { client: request = client, ...config } = options
  const throwOnError = (config.throwOnError ?? true) as ThrowOnError

  return resolveResponse(
    request({
      method: 'GET',
      url: '/email/usage',
      security: [[{ id: 'bearerAuth', type: 'http', scheme: 'bearer' }], [{ id: 'xApiKey', type: 'apiKey', name: 'x-api-key', in: 'header' }]],
      jsonPlan: { lossless: false, refs: poolsterJsonRefs, requests: {}, responses: {"200":{},"401":{"application/json":{"nullable":false,"ref":"ErrorResponse"}},"403":{"application/json":{"nullable":false,"ref":"ErrorResponse"}},"503":{"application/json":{"nullable":false,"ref":"ErrorResponse"}}} },
      ...config,
      throwOnError,
    }) as Promise<RequestResult<GetEmailUsageResponses, ThrowOnError>>,
    throwOnError,
  )
}
