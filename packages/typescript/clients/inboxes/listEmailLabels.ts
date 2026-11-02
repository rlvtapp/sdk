import { poolsterJsonRefs } from '../_poolster_json_refs.js'
/* eslint-disable no-alert, no-console */

import type { Options, RequestResult, ResponseResult } from '../../.poolster/client.js'
import type { ListEmailLabelsOptions, ListEmailLabelsResponses } from '../../models/inboxes/ListEmailLabels.js'
import { client, resolveResponse } from '../../.poolster/client.js'

/**
 * {@link /email/labels}
 */
export function listEmailLabels<ThrowOnError extends boolean = true>(
  options: Options<ListEmailLabelsOptions, ThrowOnError>,
): Promise<ResponseResult<RequestResult<ListEmailLabelsResponses, ThrowOnError>, ThrowOnError>> {
  const { client: request = client, ...config } = options
  const throwOnError = (config.throwOnError ?? true) as ThrowOnError

  return resolveResponse(
    request({
      method: 'GET',
      url: '/email/labels',
      security: [[{ id: 'bearerAuth', type: 'http', scheme: 'bearer' }], [{ id: 'xApiKey', type: 'apiKey', name: 'x-api-key', in: 'header' }]],
      jsonPlan: { lossless: false, refs: poolsterJsonRefs, requests: {}, responses: {"200":{},"401":{"application/json":{"nullable":false,"ref":"ErrorResponse"}},"503":{"application/json":{"nullable":false,"ref":"ErrorResponse"}}} },
      ...config,
      throwOnError,
    }) as Promise<RequestResult<ListEmailLabelsResponses, ThrowOnError>>,
    throwOnError,
  )
}
