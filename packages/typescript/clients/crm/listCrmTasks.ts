/* eslint-disable no-alert, no-console */

import type { Options, RequestResult, ResponseResult } from '../../.kaji/client.js'
import type { ListCrmTasksOptions, ListCrmTasksResponses } from '../../models/crm/ListCrmTasks.js'
import { client, resolveResponse } from '../../.kaji/client.js'

/**
 * {@link /v1/crm/records/:record_id/tasks}
 */
export function listCrmTasks<ThrowOnError extends boolean = true>(
  options: Options<ListCrmTasksOptions, ThrowOnError>,
): Promise<ResponseResult<RequestResult<ListCrmTasksResponses, ThrowOnError>, ThrowOnError>> {
  const { client: request = client, ...config } = options
  const throwOnError = (config.throwOnError ?? true) as ThrowOnError

  return resolveResponse(
    request({
      method: 'GET',
      url: '/v1/crm/records/{record_id}/tasks',
      security: [[{ id: 'bearerAuth', type: 'http', scheme: 'bearer' }], [{ id: 'xApiKey', type: 'apiKey', name: 'x-api-key', in: 'header' }]],
      ...config,
      throwOnError,
    }) as Promise<RequestResult<ListCrmTasksResponses, ThrowOnError>>,
    throwOnError,
  )
}
