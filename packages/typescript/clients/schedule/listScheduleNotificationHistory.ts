import { poolsterJsonRefs } from '../_poolster_json_refs.js'
/* eslint-disable no-alert, no-console */

import type { Options, RequestResult, ResponseResult } from '../../.poolster/client.js'
import type { ListScheduleNotificationHistoryOptions, ListScheduleNotificationHistoryResponses } from '../../models/schedule/ListScheduleNotificationHistory.js'
import { client, resolveResponse } from '../../.poolster/client.js'

/**
 * {@link /schedule/notification-history}
 */
export function listScheduleNotificationHistory<ThrowOnError extends boolean = true>(
  options: Options<ListScheduleNotificationHistoryOptions, ThrowOnError>,
): Promise<ResponseResult<RequestResult<ListScheduleNotificationHistoryResponses, ThrowOnError>, ThrowOnError>> {
  const { client: request = client, ...config } = options
  const throwOnError = (config.throwOnError ?? true) as ThrowOnError

  return resolveResponse(
    request({
      method: 'GET',
      url: '/schedule/notification-history',
      security: [[{ id: 'bearerAuth', type: 'http', scheme: 'bearer' }], [{ id: 'xApiKey', type: 'apiKey', name: 'x-api-key', in: 'header' }]],
      jsonPlan: { lossless: false, refs: poolsterJsonRefs, requests: {}, responses: {"200":{"application/json":{"nullable":false,"ref":"ScheduleNotificationHistoryResponse"}},"400":{},"401":{},"403":{},"503":{}} },
      ...config,
      throwOnError,
    }) as Promise<RequestResult<ListScheduleNotificationHistoryResponses, ThrowOnError>>,
    throwOnError,
  )
}
