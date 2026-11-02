import { poolsterJsonRefs } from '../_poolster_json_refs.js'
/* eslint-disable no-alert, no-console */

import type { Options, RequestResult, ResponseResult } from '../../.poolster/client.js'
import type { UpsertCrmRecordOptions, UpsertCrmRecordResponses } from '../../models/crm/UpsertCrmRecord.js'
import { client, resolveResponse } from '../../.poolster/client.js'

/**
 * {@link /v1/crm/objects/:object/records/upsert}
 */
export function upsertCrmRecord<ThrowOnError extends boolean = true>(
  options: Options<UpsertCrmRecordOptions, ThrowOnError>,
): Promise<ResponseResult<RequestResult<UpsertCrmRecordResponses, ThrowOnError>, ThrowOnError>> {
  const { client: request = client, ...config } = options
  const throwOnError = (config.throwOnError ?? true) as ThrowOnError

  return resolveResponse(
    request({
      method: 'POST',
      url: '/v1/crm/objects/{object}/records/upsert',
      security: [[{ id: 'bearerAuth', type: 'http', scheme: 'bearer' }], [{ id: 'xApiKey', type: 'apiKey', name: 'x-api-key', in: 'header' }]],
      jsonPlan: { lossless: false, refs: poolsterJsonRefs, requests: {"application/json":{"nullable":false,"ref":"CrmUpsert"}}, responses: {"200":{"application/json":{"nullable":false,"ref":"CrmRecordResponse"}},"201":{"application/json":{"nullable":false,"ref":"CrmRecordResponse"}},"400":{"application/json":{"nullable":false,"ref":"CrmApiError"}},"401":{"application/json":{"nullable":false,"ref":"CrmApiError"}},"403":{"application/json":{"nullable":false,"ref":"CrmApiError"}},"404":{"application/json":{"nullable":false,"ref":"CrmApiError"}},"409":{"application/json":{"nullable":false,"ref":"CrmApiError"}},"413":{"application/json":{"nullable":false,"ref":"CrmApiError"}},"415":{"application/json":{"nullable":false,"ref":"CrmApiError"}},"503":{"application/json":{"nullable":false,"ref":"CrmApiError"}}} },
      ...config,
      throwOnError,
    }) as Promise<RequestResult<UpsertCrmRecordResponses, ThrowOnError>>,
    throwOnError,
  )
}
