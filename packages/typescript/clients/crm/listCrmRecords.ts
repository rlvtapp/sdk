/* eslint-disable no-alert, no-console */

import type { Options, RequestResult, ResponseResult } from '../../.kaji/client.js'
import type { ListCrmRecordsOptions, ListCrmRecordsResponses } from '../../models/crm/ListCrmRecords.js'
import { client, resolveResponse } from '../../.kaji/client.js'

/**
 * {@link /v1/crm/objects/:object/records}
 */
export function listCrmRecords<ThrowOnError extends boolean = true>(
  options: Options<ListCrmRecordsOptions, ThrowOnError>,
): Promise<ResponseResult<RequestResult<ListCrmRecordsResponses, ThrowOnError>, ThrowOnError>> {
  const { client: request = client, ...config } = options
  const throwOnError = (config.throwOnError ?? true) as ThrowOnError

  return resolveResponse(
    request({
      method: 'GET',
      url: '/v1/crm/objects/{object}/records',
      security: [[{ id: 'bearerAuth', type: 'http', scheme: 'bearer' }], [{ id: 'xApiKey', type: 'apiKey', name: 'x-api-key', in: 'header' }]],
      ...config,
      throwOnError,
    }) as Promise<RequestResult<ListCrmRecordsResponses, ThrowOnError>>,
    throwOnError,
  )
}
