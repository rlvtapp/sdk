/* eslint-disable no-alert, no-console */

import type { Options, RequestResult, ResponseResult } from '../../.kaji/client.js'
import type { UpdateCrmRecordOptions, UpdateCrmRecordResponses } from '../../models/crm/UpdateCrmRecord.js'
import { client, resolveResponse } from '../../.kaji/client.js'

/**
 * {@link /v1/crm/records/:record_id}
 */
export function updateCrmRecord<ThrowOnError extends boolean = true>(
  options: Options<UpdateCrmRecordOptions, ThrowOnError>,
): Promise<ResponseResult<RequestResult<UpdateCrmRecordResponses, ThrowOnError>, ThrowOnError>> {
  const { client: request = client, ...config } = options
  const throwOnError = (config.throwOnError ?? true) as ThrowOnError

  return resolveResponse(
    request({
      method: 'PATCH',
      url: '/v1/crm/records/{record_id}',
      security: [[{ id: 'bearerAuth', type: 'http', scheme: 'bearer' }], [{ id: 'xApiKey', type: 'apiKey', name: 'x-api-key', in: 'header' }]],
      ...config,
      throwOnError,
    }) as Promise<RequestResult<UpdateCrmRecordResponses, ThrowOnError>>,
    throwOnError,
  )
}
