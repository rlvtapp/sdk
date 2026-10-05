/* eslint-disable no-alert, no-console */

import type { Options, RequestResult, ResponseResult } from '../../.kaji/client.js'
import type { ListDomainsOptions, ListDomainsResponses } from '../../models/domains/ListDomains.js'
import { client, resolveResponse } from '../../.kaji/client.js'

/**
 * {@link /v1/email/domains}
 */
export function listDomains<ThrowOnError extends boolean = true>(
  options: Options<ListDomainsOptions, ThrowOnError>,
): Promise<ResponseResult<RequestResult<ListDomainsResponses, ThrowOnError>, ThrowOnError>> {
  const { client: request = client, ...config } = options
  const throwOnError = (config.throwOnError ?? true) as ThrowOnError

  return resolveResponse(
    request({
      method: 'GET',
      url: '/v1/email/domains',
      security: [[{ id: 'bearerAuth', type: 'http', scheme: 'bearer' }], [{ id: 'xApiKey', type: 'apiKey', name: 'x-api-key', in: 'header' }]],
      ...config,
      throwOnError,
    }) as Promise<RequestResult<ListDomainsResponses, ThrowOnError>>,
    throwOnError,
  )
}
