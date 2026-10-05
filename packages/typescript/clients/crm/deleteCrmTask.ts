/* eslint-disable no-alert, no-console */

import type { Options, RequestResult, ResponseResult } from '../../.kaji/client.js'
import type { DeleteCrmTaskOptions, DeleteCrmTaskResponses } from '../../models/crm/DeleteCrmTask.js'
import { client, resolveResponse } from '../../.kaji/client.js'

/**
 * {@link /v1/crm/tasks/:task_id}
 */
export function deleteCrmTask<ThrowOnError extends boolean = true>(
  options: Options<DeleteCrmTaskOptions, ThrowOnError>,
): Promise<ResponseResult<RequestResult<DeleteCrmTaskResponses, ThrowOnError>, ThrowOnError>> {
  const { client: request = client, ...config } = options
  const throwOnError = (config.throwOnError ?? true) as ThrowOnError

  return resolveResponse(
    request({
      method: 'DELETE',
      url: '/v1/crm/tasks/{task_id}',
      security: [[{ id: 'bearerAuth', type: 'http', scheme: 'bearer' }], [{ id: 'xApiKey', type: 'apiKey', name: 'x-api-key', in: 'header' }]],
      ...config,
      throwOnError,
    }) as Promise<RequestResult<DeleteCrmTaskResponses, ThrowOnError>>,
    throwOnError,
  )
}
