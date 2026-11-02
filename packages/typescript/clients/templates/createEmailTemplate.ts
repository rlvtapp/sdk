import { poolsterJsonRefs } from '../_poolster_json_refs.js'
/* eslint-disable no-alert, no-console */

import type { Options, RequestResult, ResponseResult } from '../../.poolster/client.js'
import type { CreateEmailTemplateOptions, CreateEmailTemplateResponses } from '../../models/templates/CreateEmailTemplate.js'
import { client, resolveResponse } from '../../.poolster/client.js'

/**
 * {@link /email/templates}
 */
export function createEmailTemplate<ThrowOnError extends boolean = true>(
  options: Options<CreateEmailTemplateOptions, ThrowOnError>,
): Promise<ResponseResult<RequestResult<CreateEmailTemplateResponses, ThrowOnError>, ThrowOnError>> {
  const { client: request = client, ...config } = options
  const throwOnError = (config.throwOnError ?? true) as ThrowOnError

  return resolveResponse(
    request({
      method: 'POST',
      url: '/email/templates',
      security: [[{ id: 'bearerAuth', type: 'http', scheme: 'bearer' }], [{ id: 'xApiKey', type: 'apiKey', name: 'x-api-key', in: 'header' }]],
      jsonPlan: { lossless: false, refs: poolsterJsonRefs, requests: {"application/json":{"nullable":false,"ref":"CreateTemplateRequest"}}, responses: {"201":{},"401":{"application/json":{"nullable":false,"ref":"ErrorResponse"}},"403":{"application/json":{"nullable":false,"ref":"ErrorResponse"}},"409":{"application/json":{"nullable":false,"ref":"ErrorResponse"}},"422":{"application/json":{"nullable":false,"ref":"ErrorResponse"}}} },
      ...config,
      throwOnError,
    }) as Promise<RequestResult<CreateEmailTemplateResponses, ThrowOnError>>,
    throwOnError,
  )
}
