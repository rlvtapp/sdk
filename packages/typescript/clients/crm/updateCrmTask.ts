/* eslint-disable no-alert, no-console */

import type { Options, RequestResult, ResponseResult } from '../../.kaji/client.js'
import type { UpdateCrmTaskOptions, UpdateCrmTaskResponses } from '../../models/crm/UpdateCrmTask.js'
import { client, resolveResponse } from '../../.kaji/client.js'

/**
 * {@link /v1/crm/tasks/:task_id}
 */
export function updateCrmTask<ThrowOnError extends boolean = true>(
  options: Options<UpdateCrmTaskOptions, ThrowOnError>,
): Promise<ResponseResult<RequestResult<UpdateCrmTaskResponses, ThrowOnError>, ThrowOnError>> {
  const { client: request = client, ...config } = options
  const throwOnError = (config.throwOnError ?? true) as ThrowOnError

  return resolveResponse(
    request({
      method: 'PATCH',
      url: '/v1/crm/tasks/{task_id}',
      security: [[{ id: 'bearerAuth', type: 'http', scheme: 'bearer' }], [{ id: 'xApiKey', type: 'apiKey', name: 'x-api-key', in: 'header' }]],
      ...config,
      throwOnError,
    }) as Promise<RequestResult<UpdateCrmTaskResponses, ThrowOnError>>,
    throwOnError,
  )
}
