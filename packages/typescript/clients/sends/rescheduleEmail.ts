import { poolsterJsonRefs } from '../_poolster_json_refs.js'
/* eslint-disable no-alert, no-console */

import type { Options, RequestResult, ResponseResult } from '../../.poolster/client.js'
import type { RescheduleEmailOptions, RescheduleEmailResponses } from '../../models/sends/RescheduleEmail.js'
import { client, resolveResponse } from '../../.poolster/client.js'

/**
 * {@link /email/emails/:email_id}
 */
export function rescheduleEmail<ThrowOnError extends boolean = true>(
  options: Options<RescheduleEmailOptions, ThrowOnError>,
): Promise<ResponseResult<RequestResult<RescheduleEmailResponses, ThrowOnError>, ThrowOnError>> {
  const { client: request = client, ...config } = options
  const throwOnError = (config.throwOnError ?? true) as ThrowOnError

  return resolveResponse(
    request({
      method: 'PATCH',
      url: '/email/emails/{email_id}',
      security: [[{ id: 'bearerAuth', type: 'http', scheme: 'bearer' }], [{ id: 'xApiKey', type: 'apiKey', name: 'x-api-key', in: 'header' }]],
      jsonPlan: { lossless: false, refs: poolsterJsonRefs, requests: {"application/json":{"nullable":false,"ref":"RescheduleRequest"}}, responses: {"200":{"application/json":{"nullable":false,"ref":"SendResponse"}},"401":{"application/json":{"nullable":false,"ref":"ErrorResponse"}},"403":{"application/json":{"nullable":false,"ref":"ErrorResponse"}},"404":{"application/json":{"nullable":false,"ref":"ErrorResponse"}},"409":{"application/json":{"nullable":false,"ref":"ErrorResponse"}},"422":{"application/json":{"nullable":false,"ref":"ErrorResponse"}}} },
      ...config,
      throwOnError,
    }) as Promise<RequestResult<RescheduleEmailResponses, ThrowOnError>>,
    throwOnError,
  )
}
