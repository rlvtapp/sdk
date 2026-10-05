/* eslint-disable no-alert, no-console */

import type { Options, RequestResult, ResponseResult } from '../../.kaji/client.js'
import type { GetCrmRecordOptions, GetCrmRecordResponses } from '../../models/crm/GetCrmRecord.js'
import { client, resolveResponse } from '../../.kaji/client.js'

/**
 * {@link /v1/crm/records/:record_id}
 */
export function getCrmRecord<ThrowOnError extends boolean = true>(
  options: Options<GetCrmRecordOptions, ThrowOnError>,
): Promise<ResponseResult<RequestResult<GetCrmRecordResponses, ThrowOnError>, ThrowOnError>> {
  const { client: request = client, ...config } = options
  const throwOnError = (config.throwOnError ?? true) as ThrowOnError

  return resolveResponse(
    request({
      method: 'GET',
      url: '/v1/crm/records/{record_id}',
      security: [[{ id: 'bearerAuth', type: 'http', scheme: 'bearer' }], [{ id: 'xApiKey', type: 'apiKey', name: 'x-api-key', in: 'header' }]],
      ...config,
      throwOnError,
    }) as Promise<RequestResult<GetCrmRecordResponses, ThrowOnError>>,
    throwOnError,
  )
}
