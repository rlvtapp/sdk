import { poolsterJsonRefs } from '../_poolster_json_refs.js'
/* eslint-disable no-alert, no-console */

import type { Options, RequestResult, ResponseResult } from '../../.poolster/client.js'
import type { GetEmailAttachmentOptions, GetEmailAttachmentResponses } from '../../models/inboxes/GetEmailAttachment.js'
import { client, resolveResponse } from '../../.poolster/client.js'

/**
 * {@link /email/attachments/:attachment_id}
 */
export function getEmailAttachment<ThrowOnError extends boolean = true>(
  options: Options<GetEmailAttachmentOptions, ThrowOnError>,
): Promise<ResponseResult<RequestResult<GetEmailAttachmentResponses, ThrowOnError>, ThrowOnError>> {
  const { client: request = client, ...config } = options
  const throwOnError = (config.throwOnError ?? true) as ThrowOnError

  return resolveResponse(
    request({
      method: 'GET',
      url: '/email/attachments/{attachment_id}',
      security: [[{ id: 'bearerAuth', type: 'http', scheme: 'bearer' }], [{ id: 'xApiKey', type: 'apiKey', name: 'x-api-key', in: 'header' }]],
      jsonPlan: { lossless: false, refs: poolsterJsonRefs, requests: {}, responses: {"200":{"application/json":{"nullable":false,"ref":"AttachmentResponse"}},"401":{"application/json":{"nullable":false,"ref":"ErrorResponse"}},"404":{"application/json":{"nullable":false,"ref":"ErrorResponse"}},"409":{"application/json":{"nullable":false,"ref":"ErrorResponse"}},"503":{"application/json":{"nullable":false,"ref":"ErrorResponse"}}} },
      ...config,
      throwOnError,
    }) as Promise<RequestResult<GetEmailAttachmentResponses, ThrowOnError>>,
    throwOnError,
  )
}
