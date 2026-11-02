import { poolsterJsonRefs } from '../_poolster_json_refs.js'
/* eslint-disable no-alert, no-console */

import type { Options, RequestResult, ResponseResult } from '../../.poolster/client.js'
import type { ExportScheduleHostInsightsCsvOptions, ExportScheduleHostInsightsCsvResponses } from '../../models/schedule/ExportScheduleHostInsightsCsv.js'
import { client, resolveResponse } from '../../.poolster/client.js'

/**
 * {@link /schedule/hosts/:actor/insights/export}
 */
export function exportScheduleHostInsightsCsv<ThrowOnError extends boolean = true>(
  options: Options<ExportScheduleHostInsightsCsvOptions, ThrowOnError>,
): Promise<ResponseResult<RequestResult<ExportScheduleHostInsightsCsvResponses, ThrowOnError>, ThrowOnError>> {
  const { client: request = client, ...config } = options
  const throwOnError = (config.throwOnError ?? true) as ThrowOnError

  return resolveResponse(
    request({
      method: 'GET',
      url: '/schedule/hosts/{actor}/insights/export',
      security: [[{ id: 'bearerAuth', type: 'http', scheme: 'bearer' }], [{ id: 'xApiKey', type: 'apiKey', name: 'x-api-key', in: 'header' }]],
      jsonPlan: { lossless: false, refs: poolsterJsonRefs, requests: {}, responses: {"200":{"text/csv":{"kind":"string","nullable":false}},"400":{},"401":{},"403":{},"503":{}} },
      ...config,
      throwOnError,
    }) as Promise<RequestResult<ExportScheduleHostInsightsCsvResponses, ThrowOnError>>,
    throwOnError,
  )
}
