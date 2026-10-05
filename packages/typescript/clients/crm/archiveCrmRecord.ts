/* eslint-disable no-alert, no-console */

import type { Options, RequestResult, ResponseResult } from '../../.kaji/client.js'
import type { ArchiveCrmRecordOptions, ArchiveCrmRecordResponses } from '../../models/crm/ArchiveCrmRecord.js'
import { client, resolveResponse } from '../../.kaji/client.js'

/**
 * {@link /v1/crm/records/:record_id}
 */
export function archiveCrmRecord<ThrowOnError extends boolean = true>(
  options: Options<ArchiveCrmRecordOptions, ThrowOnError>,
): Promise<ResponseResult<RequestResult<ArchiveCrmRecordResponses, ThrowOnError>, ThrowOnError>> {
  const { client: request = client, ...config } = options
  const throwOnError = (config.throwOnError ?? true) as ThrowOnError

  return resolveResponse(
    request({
      method: 'DELETE',
      url: '/v1/crm/records/{record_id}',
      security: [[{ id: 'bearerAuth', type: 'http', scheme: 'bearer' }], [{ id: 'xApiKey', type: 'apiKey', name: 'x-api-key', in: 'header' }]],
      ...config,
      throwOnError,
    }) as Promise<RequestResult<ArchiveCrmRecordResponses, ThrowOnError>>,
    throwOnError,
  )
}
