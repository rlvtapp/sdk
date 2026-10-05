/* eslint-disable no-alert, no-console */

import type { Options, RequestResult, ResponseResult } from '../../.kaji/client.js'
import type { ListCrmActivitiesOptions, ListCrmActivitiesResponses } from '../../models/crm/ListCrmActivities.js'
import { client, resolveResponse } from '../../.kaji/client.js'

/**
 * {@link /v1/crm/records/:record_id/activities}
 */
export function listCrmActivities<ThrowOnError extends boolean = true>(
  options: Options<ListCrmActivitiesOptions, ThrowOnError>,
): Promise<ResponseResult<RequestResult<ListCrmActivitiesResponses, ThrowOnError>, ThrowOnError>> {
  const { client: request = client, ...config } = options
  const throwOnError = (config.throwOnError ?? true) as ThrowOnError

  return resolveResponse(
    request({
      method: 'GET',
      url: '/v1/crm/records/{record_id}/activities',
      security: [[{ id: 'bearerAuth', type: 'http', scheme: 'bearer' }], [{ id: 'xApiKey', type: 'apiKey', name: 'x-api-key', in: 'header' }]],
      ...config,
      throwOnError,
    }) as Promise<RequestResult<ListCrmActivitiesResponses, ThrowOnError>>,
    throwOnError,
  )
}
