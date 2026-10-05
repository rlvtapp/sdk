/* eslint-disable no-alert, no-console */

import type { Options, RequestResult, ResponseResult } from '../../.kaji/client.js'
import type { UpsertCrmRecordOptions, UpsertCrmRecordResponses } from '../../models/crm/UpsertCrmRecord.js'
import { client, resolveResponse } from '../../.kaji/client.js'

/**
 * {@link /v1/crm/objects/:object/records/upsert}
 */
export function upsertCrmRecord<ThrowOnError extends boolean = true>(
  options: Options<UpsertCrmRecordOptions, ThrowOnError>,
): Promise<ResponseResult<RequestResult<UpsertCrmRecordResponses, ThrowOnError>, ThrowOnError>> {
  const { client: request = client, ...config } = options
  const throwOnError = (config.throwOnError ?? true) as ThrowOnError

  return resolveResponse(
    request({
      method: 'POST',
      url: '/v1/crm/objects/{object}/records/upsert',
      security: [[{ id: 'bearerAuth', type: 'http', scheme: 'bearer' }], [{ id: 'xApiKey', type: 'apiKey', name: 'x-api-key', in: 'header' }]],
      ...config,
      throwOnError,
    }) as Promise<RequestResult<UpsertCrmRecordResponses, ThrowOnError>>,
    throwOnError,
  )
}
