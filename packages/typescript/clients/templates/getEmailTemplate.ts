import { poolsterJsonRefs } from '../_poolster_json_refs.js'
/* eslint-disable no-alert, no-console */

import type { Options, RequestResult, ResponseResult } from '../../.poolster/client.js'
import type { GetEmailTemplateOptions, GetEmailTemplateResponses } from '../../models/templates/GetEmailTemplate.js'
import { client, resolveResponse } from '../../.poolster/client.js'

/**
 * {@link /email/templates/:template}
 */
export function getEmailTemplate<ThrowOnError extends boolean = true>(
  options: Options<GetEmailTemplateOptions, ThrowOnError>,
): Promise<ResponseResult<RequestResult<GetEmailTemplateResponses, ThrowOnError>, ThrowOnError>> {
  const { client: request = client, ...config } = options
  const throwOnError = (config.throwOnError ?? true) as ThrowOnError

  return resolveResponse(
    request({
      method: 'GET',
      url: '/email/templates/{template}',
      security: [[{ id: 'bearerAuth', type: 'http', scheme: 'bearer' }], [{ id: 'xApiKey', type: 'apiKey', name: 'x-api-key', in: 'header' }]],
      jsonPlan: { lossless: false, refs: poolsterJsonRefs, requests: {}, responses: {"200":{},"404":{"application/json":{"nullable":false,"ref":"ErrorResponse"}},"409":{"application/json":{"nullable":false,"ref":"ErrorResponse"}},"422":{"application/json":{"nullable":false,"ref":"ErrorResponse"}}} },
      ...config,
      throwOnError,
    }) as Promise<RequestResult<GetEmailTemplateResponses, ThrowOnError>>,
    throwOnError,
  )
}
