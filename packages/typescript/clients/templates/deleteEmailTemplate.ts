import { poolsterJsonRefs } from '../_poolster_json_refs.js'
/* eslint-disable no-alert, no-console */

import type { Options, RequestResult, ResponseResult } from '../../.poolster/client.js'
import type { DeleteEmailTemplateOptions, DeleteEmailTemplateResponses } from '../../models/templates/DeleteEmailTemplate.js'
import { client, resolveResponse } from '../../.poolster/client.js'

/**
 * {@link /email/templates/:template}
 */
export function deleteEmailTemplate<ThrowOnError extends boolean = true>(
  options: Options<DeleteEmailTemplateOptions, ThrowOnError>,
): Promise<ResponseResult<RequestResult<DeleteEmailTemplateResponses, ThrowOnError>, ThrowOnError>> {
  const { client: request = client, ...config } = options
  const throwOnError = (config.throwOnError ?? true) as ThrowOnError

  return resolveResponse(
    request({
      method: 'DELETE',
      url: '/email/templates/{template}',
      security: [[{ id: 'bearerAuth', type: 'http', scheme: 'bearer' }], [{ id: 'xApiKey', type: 'apiKey', name: 'x-api-key', in: 'header' }]],
      jsonPlan: { lossless: false, refs: poolsterJsonRefs, requests: {}, responses: {"200":{},"404":{"application/json":{"nullable":false,"ref":"ErrorResponse"}},"409":{"application/json":{"nullable":false,"ref":"ErrorResponse"}}} },
      ...config,
      throwOnError,
    }) as Promise<RequestResult<DeleteEmailTemplateResponses, ThrowOnError>>,
    throwOnError,
  )
}
