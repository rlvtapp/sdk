import { poolsterJsonRefs } from '../_poolster_json_refs.js'
/* eslint-disable no-alert, no-console */

import type { Options, RequestResult, ResponseResult } from '../../.poolster/client.js'
import type { DuplicateEmailTemplateOptions, DuplicateEmailTemplateResponses } from '../../models/templates/DuplicateEmailTemplate.js'
import { client, resolveResponse } from '../../.poolster/client.js'

/**
 * {@link /email/templates/:template/duplicate}
 */
export function duplicateEmailTemplate<ThrowOnError extends boolean = true>(
  options: Options<DuplicateEmailTemplateOptions, ThrowOnError>,
): Promise<ResponseResult<RequestResult<DuplicateEmailTemplateResponses, ThrowOnError>, ThrowOnError>> {
  const { client: request = client, ...config } = options
  const throwOnError = (config.throwOnError ?? true) as ThrowOnError

  return resolveResponse(
    request({
      method: 'POST',
      url: '/email/templates/{template}/duplicate',
      security: [[{ id: 'bearerAuth', type: 'http', scheme: 'bearer' }], [{ id: 'xApiKey', type: 'apiKey', name: 'x-api-key', in: 'header' }]],
      jsonPlan: { lossless: false, refs: poolsterJsonRefs, requests: {"application/json":{"kind":"union","nullable":false,"variants":[{"kind":"null","nullable":false},{"nullable":false,"ref":"DuplicateTemplateRequest"}]}}, responses: {"201":{},"401":{"application/json":{"nullable":false,"ref":"ErrorResponse"}},"403":{"application/json":{"nullable":false,"ref":"ErrorResponse"}},"404":{"application/json":{"nullable":false,"ref":"ErrorResponse"}},"409":{"application/json":{"nullable":false,"ref":"ErrorResponse"}},"422":{"application/json":{"nullable":false,"ref":"ErrorResponse"}}} },
      ...config,
      throwOnError,
    }) as Promise<RequestResult<DuplicateEmailTemplateResponses, ThrowOnError>>,
    throwOnError,
  )
}
