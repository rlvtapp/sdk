/* eslint-disable no-alert, no-console */

import type { Options, RequestResult, ResponseResult } from '../../.kaji/client.js'
import type { GetDomainOptions, GetDomainResponses } from '../../models/domains/GetDomain.js'
import { client, resolveResponse } from '../../.kaji/client.js'

/**
 * {@link /v1/email/domains/:id}
 */
export function getDomain<ThrowOnError extends boolean = true>(
  options: Options<GetDomainOptions, ThrowOnError>,
): Promise<ResponseResult<RequestResult<GetDomainResponses, ThrowOnError>, ThrowOnError>> {
  const { client: request = client, ...config } = options
  const throwOnError = (config.throwOnError ?? true) as ThrowOnError

  return resolveResponse(
    request({
      method: 'GET',
      url: '/v1/email/domains/{id}',
      security: [[{ id: 'bearerAuth', type: 'http', scheme: 'bearer' }], [{ id: 'xApiKey', type: 'apiKey', name: 'x-api-key', in: 'header' }]],
      ...config,
      throwOnError,
    }) as Promise<RequestResult<GetDomainResponses, ThrowOnError>>,
    throwOnError,
  )
}
