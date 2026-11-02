import { poolsterJsonRefs } from '../_poolster_json_refs.js'
/* eslint-disable no-alert, no-console */

import type { Options, RequestResult, ResponseResult } from '../../.poolster/client.js'
import type { ListProvidedEmailDomainsOptions, ListProvidedEmailDomainsResponses } from '../../models/inboxes/ListProvidedEmailDomains.js'
import { client, resolveResponse } from '../../.poolster/client.js'

/**
 * {@link /email/inboxes/provided-domains}
 */
export function listProvidedEmailDomains<ThrowOnError extends boolean = true>(
  options: Options<ListProvidedEmailDomainsOptions, ThrowOnError>,
): Promise<ResponseResult<RequestResult<ListProvidedEmailDomainsResponses, ThrowOnError>, ThrowOnError>> {
  const { client: request = client, ...config } = options
  const throwOnError = (config.throwOnError ?? true) as ThrowOnError

  return resolveResponse(
    request({
      method: 'GET',
      url: '/email/inboxes/provided-domains',
      security: [[{ id: 'bearerAuth', type: 'http', scheme: 'bearer' }], [{ id: 'xApiKey', type: 'apiKey', name: 'x-api-key', in: 'header' }]],
      jsonPlan: { lossless: false, refs: poolsterJsonRefs, requests: {}, responses: {"200":{}} },
      ...config,
      throwOnError,
    }) as Promise<RequestResult<ListProvidedEmailDomainsResponses, ThrowOnError>>,
    throwOnError,
  )
}
