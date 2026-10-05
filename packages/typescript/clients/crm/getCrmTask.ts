/* eslint-disable no-alert, no-console */

import type { Options, RequestResult, ResponseResult } from '../../.kaji/client.js'
import type { GetCrmTaskOptions, GetCrmTaskResponses } from '../../models/crm/GetCrmTask.js'
import { client, resolveResponse } from '../../.kaji/client.js'

/**
 * {@link /v1/crm/tasks/:task_id}
 */
export function getCrmTask<ThrowOnError extends boolean = true>(
  options: Options<GetCrmTaskOptions, ThrowOnError>,
): Promise<ResponseResult<RequestResult<GetCrmTaskResponses, ThrowOnError>, ThrowOnError>> {
  const { client: request = client, ...config } = options
  const throwOnError = (config.throwOnError ?? true) as ThrowOnError

  return resolveResponse(
    request({
      method: 'GET',
      url: '/v1/crm/tasks/{task_id}',
      security: [[{ id: 'bearerAuth', type: 'http', scheme: 'bearer' }], [{ id: 'xApiKey', type: 'apiKey', name: 'x-api-key', in: 'header' }]],
      ...config,
      throwOnError,
    }) as Promise<RequestResult<GetCrmTaskResponses, ThrowOnError>>,
    throwOnError,
  )
}
