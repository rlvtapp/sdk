/* eslint-disable no-alert, no-console */

import type { Options, RequestResult, ResponseResult } from '../../.kaji/client.js'
import type { TrackOptions, TrackResponses } from '../../models/events/Track.js'
import { client, resolveResponse } from '../../.kaji/client.js'

/**
 * {@link /v1/email/events}
 */
export function track<ThrowOnError extends boolean = true>(
  options: Options<TrackOptions, ThrowOnError>,
): Promise<ResponseResult<RequestResult<TrackResponses, ThrowOnError>, ThrowOnError>> {
  const { client: request = client, ...config } = options
  const throwOnError = (config.throwOnError ?? true) as ThrowOnError

  return resolveResponse(
    request({
      method: 'POST',
      url: '/v1/email/events',
      ...config,
      throwOnError,
    }) as Promise<RequestResult<TrackResponses, ThrowOnError>>,
    throwOnError,
  )
}
