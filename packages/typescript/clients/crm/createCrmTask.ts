/* eslint-disable no-alert, no-console */

import type { Options, RequestResult, ResponseResult } from '../../.kaji/client.js'
import type { CreateCrmTaskOptions, CreateCrmTaskResponses } from '../../models/crm/CreateCrmTask.js'
import { client, resolveResponse } from '../../.kaji/client.js'

/**
 * {@link /v1/crm/records/:record_id/tasks}
 */
export function createCrmTask<ThrowOnError extends boolean = true>(
  options: Options<CreateCrmTaskOptions, ThrowOnError>,
): Promise<ResponseResult<RequestResult<CreateCrmTaskResponses, ThrowOnError>, ThrowOnError>> {
  const { client: request = client, ...config } = options
  const throwOnError = (config.throwOnError ?? true) as ThrowOnError

  return resolveResponse(
    request({
      method: 'POST',
      url: '/v1/crm/records/{record_id}/tasks',
      security: [[{ id: 'bearerAuth', type: 'http', scheme: 'bearer' }], [{ id: 'xApiKey', type: 'apiKey', name: 'x-api-key', in: 'header' }]],
      ...config,
      throwOnError,
    }) as Promise<RequestResult<CreateCrmTaskResponses, ThrowOnError>>,
    throwOnError,
  )
}
