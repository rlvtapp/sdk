import { poolsterJsonRefs } from '../_poolster_json_refs.js'
/* eslint-disable no-alert, no-console */

import type { Options, RequestResult, ResponseResult } from '../../.poolster/client.js'
import type { SaveScheduleNotificationSettingsOptions, SaveScheduleNotificationSettingsResponses } from '../../models/schedule/SaveScheduleNotificationSettings.js'
import { client, resolveResponse } from '../../.poolster/client.js'

/**
 * {@link /schedule/notification-settings}
 */
export function saveScheduleNotificationSettings<ThrowOnError extends boolean = true>(
  options: Options<SaveScheduleNotificationSettingsOptions, ThrowOnError>,
): Promise<ResponseResult<RequestResult<SaveScheduleNotificationSettingsResponses, ThrowOnError>, ThrowOnError>> {
  const { client: request = client, ...config } = options
  const throwOnError = (config.throwOnError ?? true) as ThrowOnError

  return resolveResponse(
    request({
      method: 'PUT',
      url: '/schedule/notification-settings',
      security: [[{ id: 'bearerAuth', type: 'http', scheme: 'bearer' }], [{ id: 'xApiKey', type: 'apiKey', name: 'x-api-key', in: 'header' }]],
      jsonPlan: { lossless: false, refs: poolsterJsonRefs, requests: {"application/json":{"nullable":false,"ref":"ScheduleNotificationSettingsInput"}}, responses: {"200":{"application/json":{"nullable":false,"ref":"ScheduleNotificationSettingsResponse"}},"400":{"application/json":{"nullable":false,"ref":"ScheduleApiError"}},"401":{"application/json":{"nullable":false,"ref":"ScheduleApiError"}},"403":{"application/json":{"nullable":false,"ref":"ScheduleApiError"}},"413":{"application/json":{"nullable":false,"ref":"ScheduleApiError"}},"415":{"application/json":{"nullable":false,"ref":"ScheduleApiError"}},"422":{"application/json":{"nullable":false,"ref":"ScheduleApiError"}},"503":{"application/json":{"nullable":false,"ref":"ScheduleApiError"}}} },
      ...config,
      throwOnError,
    }) as Promise<RequestResult<SaveScheduleNotificationSettingsResponses, ThrowOnError>>,
    throwOnError,
  )
}
