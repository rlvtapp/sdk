/* eslint-disable no-alert, no-console */

import type { Options, RequestResult, ResponseResult } from '../../.kaji/client.js'
import type { CreateCrmRecordOptions, CreateCrmRecordResponses } from '../../models/crm/CreateCrmRecord.js'
import { client, resolveResponse } from '../../.kaji/client.js'

/**
 * {@link /v1/crm/objects/:object/records}
 */
export function createCrmRecord<ThrowOnError extends boolean = true>(
  options: Options<CreateCrmRecordOptions, ThrowOnError>,
): Promise<ResponseResult<RequestResult<CreateCrmRecordResponses, ThrowOnError>, ThrowOnError>> {
  const { client: request = client, ...config } = options
  const throwOnError = (config.throwOnError ?? true) as ThrowOnError

  return resolveResponse(
    request({
      method: 'POST',
      url: '/v1/crm/objects/{object}/records',
      security: [[{ id: 'bearerAuth', type: 'http', scheme: 'bearer' }], [{ id: 'xApiKey', type: 'apiKey', name: 'x-api-key', in: 'header' }]],
      ...config,
      throwOnError,
    }) as Promise<RequestResult<CreateCrmRecordResponses, ThrowOnError>>,
    throwOnError,
  )
}
