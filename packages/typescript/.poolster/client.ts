export interface SecurityCredentials {
  "bearerAuth"?: string
  "xApiKey"?: string
}
export type SecurityDescriptor = { id: string; type: 'apiKey' | 'http' | 'oauth2'; name?: string; in?: 'header' | 'query' | 'cookie'; scheme?: string; scopes?: string[] }
export class ApiError extends Error {
  constructor(public readonly status: number, public readonly body: unknown) { super(`Request failed: ${status}`) }
}
export interface RetryConfig { maxAttempts?: number; initialDelayMs?: number; maxDelayMs?: number }
export interface RequestHookContext { method: string; url: string; body?: unknown; path?: Record<string, unknown>; query: Record<string, unknown>; headers: Headers }
export interface ResponseHookContext { request: RequestHookContext; status: number; response: Response }
export interface ClientHooks { beforeRequest?: (request: RequestHookContext) => void | Promise<void>; afterResponse?: (response: ResponseHookContext) => void | Promise<void>; onError?: (error: unknown, request: RequestHookContext) => void | Promise<void> }
export interface Codec { encode?: (value: unknown) => BodyInit | undefined; decode?: (value: unknown, contentType: string) => unknown | Promise<unknown> }
export interface StandardSchema { readonly ['~standard']?: { readonly validate: (value: unknown) => { value?: unknown; issues?: readonly unknown[] } | Promise<{ value?: unknown; issues?: readonly unknown[] }> } }
export type Validator = StandardSchema | ((value: unknown) => void | Promise<void>)
export interface ClientValidation { request?: Validator; response?: Validator }
export interface ClientConfig { timeoutMs?: number; baseUrl?: string; apiKey?: string; apiKeyHeader?: string; apiKeyPrefix?: string; auth?: SecurityCredentials; headers?: HeadersInit; fetch?: typeof globalThis.fetch; retry?: RetryConfig | false; middleware?: readonly ClientMiddleware[]; validateResponses?: boolean; hooks?: ClientHooks; codecs?: Record<string, Codec>; validation?: ClientValidation; multipartEncoder?: MultipartEncoder }
export type ParameterStyle = { contentType?: string; style?: 'simple' | 'label' | 'matrix' | 'form' | 'spaceDelimited' | 'pipeDelimited' | 'deepObject'; explode?: boolean }
export type ParameterStyles = Partial<Record<'path' | 'query' | 'header' | 'cookie', Record<string, ParameterStyle>>>
export type FormPartHeader = { required?: boolean; style?: ParameterStyle['style']; explode?: boolean; allowReserved?: boolean; schema_definition?: unknown; example_json?: string }
export type FormEncoding = { contentType?: string; headers?: Record<string, FormPartHeader>; style?: 'form' | 'spaceDelimited' | 'pipeDelimited' | 'deepObject'; explode?: boolean; allowReserved?: boolean; encoding?: Record<string, FormEncoding>; prefixEncoding?: FormEncoding[]; itemEncoding?: FormEncoding }
export type FormEncodings = Record<string, Record<string, FormEncoding>>
export type FormPartHeaders = Record<string, Record<string, Record<string, unknown>>>
export type MultipartPart = { name: string; value: string | Blob; contentType?: string; headers?: Record<string, string> }
export interface MultipartEncoder { encode(parts: readonly MultipartPart[]): { body: BodyInit; contentType: string } }
export type RequestConfig = { requestOptions?: RequestOptions; method: string; url: string; body?: unknown; path?: Record<string, unknown>; query?: Record<string, unknown>; querystring?: Record<string, unknown>; wholeQuery?: { name: string; contentType: string }; headers?: HeadersInit | Record<string, unknown>; cookies?: Record<string, unknown>; throwOnError?: boolean; security?: SecurityDescriptor[][]; contentType?: { request?: string }; responseType?: 'stream' | 'arraybuffer'; styles?: ParameterStyles; formEncodings?: FormEncodings; formHeaders?: FormPartHeaders; multipartPlan?: MultipartPlan; validation?: ClientValidation; validateResponses?: boolean; paginationUrl?: string; idempotencyHeader?: string; jsonPlan?: JsonPlan }
export type ClientInstance = (request: RequestConfig) => Promise<unknown>
export type Options<T, ThrowOnError extends boolean> = T & { requestOptions?: RequestOptions; client?: ClientInstance; throwOnError?: ThrowOnError; formHeaders?: FormPartHeaders; multipartPlan?: MultipartPlan; validation?: ClientValidation }
export type SuccessOf<T> = T[Extract<keyof T, `2${string}`>]
type StatusCode<S> = S extends `${infer Code extends number}` ? Code : number
type MediaResult<S, T> = T extends { contentType: infer ContentType extends string; data: infer Data } ? { status: StatusCode<S>; contentType: ContentType; data: Data; headers: Headers } : { status: StatusCode<S>; contentType: string; data: T; headers: Headers }
export type StatusResult<T> = { [S in keyof T]: MediaResult<S, T[S]> }[keyof T]
export type SuccessResult<T> = { [S in Extract<keyof T, `2${string}`>]: MediaResult<S, T[S]> }[Extract<keyof T, `2${string}`>]
export type RequestResult<T, ThrowOnError extends boolean> = ThrowOnError extends true ? SuccessResult<T> : StatusResult<T>
export type ResponseResult<T extends { status: number; data: unknown }, ThrowOnError extends boolean> = ThrowOnError extends true ? T['data'] : T
export type EventStreamResult<T> = AsyncIterable<T>
const isRecord = (value: unknown): value is Record<string, unknown> => typeof value === 'object' && value !== null && !Array.isArray(value)
const serializeWholeQuery = (value: unknown, contentType: string): string => {
  if (value === undefined) return ''
  const media = contentType.split(';')[0].trim().toLowerCase()
  if (value === null && media !== 'application/json' && !media.endsWith('+json')) return ''
  if (media === 'text/plain') { const raw = String(value).replace(/^\?/, ''); if (/[#\r\n]/.test(raw)) throw new TypeError('Whole-query value contains a fragment or line break'); return raw }
  if (media === 'application/json' || media.endsWith('+json')) return encodeURIComponent(JSON.stringify(value))
  if (media !== 'application/x-www-form-urlencoded') throw new TypeError(`Unsupported whole-query content type: ${contentType}`)
  if (!isRecord(value)) throw new TypeError('Form whole-query value must be an object')
  const params = new URLSearchParams()
  for (const [name, item] of Object.entries(value)) {
    if (item === undefined || item === null) continue
    for (const part of Array.isArray(item) ? item : [item]) params.append(name, String(part))
  }
  return params.toString()
}
const appendWholeQuery = (url: string, querystring: Record<string, unknown> | undefined, metadata: { name: string; contentType: string } | undefined): string => {
  if (!metadata) return url
  const search = serializeWholeQuery(querystring?.[metadata.name], metadata.contentType)
  return search ? `${url}${url.includes('?') ? '&' : '?'}${search}` : url
}
const decodeSequence = (text: string, contentType: string, jsonPlan?: JsonPlan, status = 200): unknown[] => {
  if (new TextEncoder().encode(text).length > 64 * 1024 * 1024) throw new TypeError('Sequential response exceeds 64 MiB')
  const media = contentType.split(';')[0].trim().toLowerCase()
  if (media === 'application/json-seq' && text.split('\x1e')[0].trim()) throw new TypeError('JSON sequence must begin with a record separator')
  const records = media === 'application/json-seq' ? text.split('\x1e') : text.split(/\r?\n/)
  const values = records.map(record => record.trim()).filter(Boolean)
  if (values.length > 100000) throw new TypeError('Sequential response exceeds 100000 records')
  const itemShape = jsonPlan ? resolvedShape(responseJsonShape(jsonPlan, status, contentType), jsonPlan.refs)?.items : undefined
  return values.map(record => jsonPlan?.lossless ? parseJson(record, itemShape, jsonPlan.refs) : JSON.parse(record) as unknown)
}
const isJsonSequence = (contentType: string): boolean => ['application/json-seq', 'application/x-ndjson', 'application/ndjson', 'application/jsonl'].includes(contentType.split(';')[0].trim().toLowerCase())
const encodeSequence = (body: unknown, contentType: string, jsonPlan?: JsonPlan): string => {
  if (!Array.isArray(body)) throw new TypeError('Sequential JSON request body must be an array')
  return body.map(item => {
    const itemShape = jsonPlan ? resolvedShape(requestJsonShape(jsonPlan, contentType), jsonPlan.refs)?.items : undefined
    const encoded = jsonPlan?.lossless ? stringifyJson(item, itemShape, jsonPlan.refs) : JSON.stringify(item)
    if (encoded === undefined) throw new TypeError('Sequential JSON item must be serializable')
    return (contentType.split(';')[0].trim().toLowerCase() === 'application/json-seq' ? '\x1e' : '') + encoded + '\n'
  }).join('')
}
const styleFor = (styles: ParameterStyles | undefined, location: keyof ParameterStyles, name: string): Required<Omit<ParameterStyle, 'contentType'>> & Pick<ParameterStyle, 'contentType'> => {
  const configured = styles?.[location]?.[name] ?? {}
  const style = configured.style ?? (location === 'path' || location === 'header' ? 'simple' : 'form')
  return { style, explode: configured.explode ?? (style === 'form'), contentType: configured.contentType ?? '' }
}
const scalar = (value: unknown) => encodeURIComponent(String(value))
const contentParameter = (value: unknown, contentType: string): string => contentType.split(';')[0].includes('json') ? JSON.stringify(value) : String(value)
const pairs = (value: Record<string, unknown>, separator: string) => Object.entries(value).map(([key, item]) => `${scalar(key)}=${scalar(item)}`).join(separator)
const serializePath = (name: string, value: unknown, parameter: Required<Omit<ParameterStyle, 'contentType'>> & Pick<ParameterStyle, 'contentType'>) => {
  if (value === undefined || (value === null && !parameter.contentType)) return ''
  if (parameter.contentType) return encodeURIComponent(contentParameter(value, parameter.contentType))
  const values = Array.isArray(value) ? value : undefined
  const object = isRecord(value) ? value : undefined
  if (parameter.style === 'label') return `.${values ? values.map(scalar).join(parameter.explode ? '.' : ',') : object ? (parameter.explode ? pairs(object, '.') : Object.entries(object).flatMap(([key, item]) => [scalar(key), scalar(item)]).join(',')) : scalar(value)}`
  if (parameter.style === 'matrix') {
    if (values) return parameter.explode ? values.map((item) => `;${name}=${scalar(item)}`).join('') : `;${name}=${values.map(scalar).join(',')}`
    if (object) return parameter.explode ? `;${pairs(object, ';')}` : `;${name}=${Object.entries(object).flatMap(([key, item]) => [scalar(key), scalar(item)]).join(',')}`
    return `;${name}=${scalar(value)}`
  }
  if (values) return values.map(scalar).join(',')
  if (object) return parameter.explode ? pairs(object, ',') : Object.entries(object).flatMap(([key, item]) => [scalar(key), scalar(item)]).join(',')
  return scalar(value)
}
const appendQuery = (params: URLSearchParams, name: string, value: unknown, parameter: Required<Omit<ParameterStyle, 'contentType'>> & Pick<ParameterStyle, 'contentType'>) => {
  if (value === undefined || (value === null && !parameter.contentType)) return
  if (parameter.contentType) { params.append(name, contentParameter(value, parameter.contentType)); return }
  const values = Array.isArray(value) ? value : undefined
  const object = isRecord(value) ? value : undefined
  if (parameter.style === 'deepObject' && object) { for (const [key, item] of Object.entries(object)) params.append(`${name}[${key}]`, String(item)); return }
  if (object && parameter.explode) { for (const [key, item] of Object.entries(object)) params.append(key, String(item)); return }
  const separator = parameter.style === 'spaceDelimited' ? ' ' : parameter.style === 'pipeDelimited' ? '|' : ','
  if (values) { if (parameter.explode && parameter.style === 'form') values.forEach((item) => params.append(name, String(item))); else params.append(name, values.join(separator)); return }
  if (object) { params.append(name, Object.entries(object).flatMap(([key, item]) => [key, String(item)]).join(separator)); return }
  params.append(name, String(value))
}
const resolveUrl = (template: string, path?: Record<string, unknown>, query?: Record<string, unknown>, styles?: ParameterStyles) => {
  const url = template.replace(/\{([^}]+)\}/g, (_match, key) => serializePath(key, path?.[key], styleFor(styles, 'path', key)) || `{${key}}`)
  const params = new URLSearchParams()
  for (const [key, value] of Object.entries(query ?? {})) appendQuery(params, key, value, styleFor(styles, 'query', key))
  const search = params.toString()
  return search ? `${url}${url.includes('?') ? '&' : '?'}${search}` : url
}
const resolvePaginationUrl = (nextUrl: string, baseUrl?: string): string => {
  // A continuation URL comes from a response body. Only accept an absolute
  // URL on the configured API origin, or a root-relative URL when no base URL
  // is configured. This prevents credentials from being sent to another host.
  if (!baseUrl) {
    if (!nextUrl.startsWith('/') || nextUrl.startsWith('//')) throw new TypeError('Pagination URL must be root-relative when baseUrl is not configured')
    return nextUrl
  }
  const base = new URL(baseUrl)
  const target = new URL(nextUrl, base)
  if (target.origin !== base.origin) throw new TypeError('Pagination URL must use the configured API origin')
  return target.toString()
}
const codecFor = (codecs: Record<string, Codec> | undefined, contentType: string) => codecs?.[contentType.split(';')[0].trim()] ?? codecs?.['*/*']
const validate = async (validator: Validator | undefined, value: unknown) => { if (!validator) return; if (typeof validator === 'function') return validator(value); const result = await validator['~standard']?.validate(value); if (result?.issues?.length) throw new TypeError(`Poolster validation failed: ${result.issues.map(String).join(', ')}`) }
const formEntries = (name: string, value: unknown, encoding: FormEncoding = {}): Array<[string, string | Blob]> => {
  if (value === undefined || value === null) return []
  const style = encoding.style ?? 'form'; const explode = encoding.explode ?? true
  if (style === 'deepObject' && isRecord(value)) return Object.entries(value).flatMap(([key, item]) => formEntries(`${name}[${key}]`, item, { ...encoding, explode: false }))
  if (isRecord(value)) { if (explode) return Object.entries(value).flatMap(([key, item]) => formEntries(key, item, { ...encoding, explode: false })); const separator = style === 'spaceDelimited' ? ' ' : style === 'pipeDelimited' ? '|' : ','; return [[name, Object.entries(value).flatMap(([key, item]) => [key, String(item)]).join(separator)]] }
  if (Array.isArray(value)) { const separator = style === 'spaceDelimited' ? ' ' : style === 'pipeDelimited' ? '|' : ','; return explode ? value.flatMap((item) => formEntries(name, item, { ...encoding, explode: false })) : [[name, value.map(String).join(separator)]] }
  return [[name, value instanceof Blob ? value : String(value)]]
}
const formPartHeaders = (contentType: string, property: string, encoding: FormEncoding | undefined, values: FormPartHeaders | undefined): Record<string, string> | undefined => {
  const supplied = values?.[contentType]?.[property]
  const declared = encoding?.headers ?? {}
  for (const [name, header] of Object.entries(declared)) if (name.toLowerCase() !== 'content-type' && header.required && !Object.keys(supplied ?? {}).some((key) => key.toLowerCase() === name.toLowerCase())) throw new TypeError(`Missing required multipart header ${name} for ${property}`)
  if (!supplied) return undefined
  return Object.fromEntries(Object.entries(supplied).map(([name, value]) => {
    const header = Object.entries(declared).find(([declaredName]) => declaredName.toLowerCase() === name.toLowerCase())?.[1]
    return [name, serializePath(name, value, { style: header?.style ?? 'simple', explode: header?.explode ?? false })]
  }))
}
const multipartParts = (body: Record<string, unknown>, encodings: FormEncodings | undefined, contentType: string, values?: FormPartHeaders): MultipartPart[] => Object.entries(body).flatMap(([property, value]) => {
  const encoding = encodings?.[contentType]?.[property]
  const headers = formPartHeaders(contentType, property, encoding, values)
  return formEntries(property, value, encoding).map(([name, item]) => ({ name, value: item, contentType: encoding?.contentType, headers }))
})
const appendForm = (form: FormData, parts: readonly MultipartPart[]) => { for (const part of parts) { if (part.headers && Object.keys(part.headers).length) throw new TypeError('Native FormData cannot set per-part headers; configure client.multipartEncoder') ; const item = part.contentType ? new Blob([part.value], { type: part.contentType }) : part.value; form.append(part.name, item) } return form }
const formComponent = (value: string, allowReserved?: boolean) => allowReserved ? encodeURI(value).replace(/[&=]/g, (char) => char === '&' ? '%26' : '%3D') : encodeURIComponent(value)
const encodedForm = (body: Record<string, unknown>, encodings: FormEncodings | undefined, contentType: string) => Object.entries(body).flatMap(([key, value]) => { const encoding = encodings?.[contentType]?.[key]; return formEntries(key, value, encoding).map(([part, item]) => [part, typeof item === 'string' ? item : String(item), encoding?.allowReserved] as const) }).map(([part, item, allowReserved]) => `${formComponent(part, allowReserved)}=${formComponent(item, allowReserved)}`).join('&')
const requestBody = (body: unknown, headers: Headers, contentType: string | undefined, codecs?: Record<string, Codec>, formEncodings?: FormEncodings, formHeaders?: FormPartHeaders, multipartEncoder?: MultipartEncoder, multipartPlan?: MultipartPlan, jsonPlan?: JsonPlan) => {
  if (body === undefined || body === null) return undefined
  const mediaType = contentType ?? headers.get('content-type') ?? 'application/json'
  if (multipartPlan) { const encoded = encodePlannedMultipart(body, multipartPlan, formHeaders); headers.set('content-type', encoded.type); return encoded }
  if (mediaType.startsWith('multipart/form-data') && isRecord(body)) { const parts = multipartParts(body, formEncodings, mediaType, formHeaders); if (multipartEncoder) { const encoded = multipartEncoder.encode(parts); headers.set('content-type', encoded.contentType); return encoded.body }; headers.delete('content-type'); return appendForm(new FormData(), parts) }
  const codec = codecFor(codecs, mediaType)
  if (codec?.encode) { if (!headers.has('content-type') && !mediaType.startsWith('multipart/form-data')) headers.set('content-type', mediaType); return codec.encode(body) }
  if (isJsonSequence(mediaType)) { if (!headers.has('content-type')) headers.set('content-type', mediaType); return encodeSequence(body, mediaType, jsonPlan) }
  if (body instanceof FormData || body instanceof URLSearchParams || body instanceof Blob || typeof body === 'string') return body as BodyInit
  if (mediaType.startsWith('application/x-www-form-urlencoded') && isRecord(body)) { if (!headers.has('content-type')) headers.set('content-type', mediaType); return encodedForm(body, formEncodings, mediaType) }
  if (!headers.has('content-type')) headers.set('content-type', mediaType)
  return jsonPlan?.lossless ? stringifyJson(body, requestJsonShape(jsonPlan, mediaType), jsonPlan.refs) : JSON.stringify(body)
}
const responseBody = async (response: Response, codecs?: Record<string, Codec>, jsonPlan?: JsonPlan) => {
  const contentType = response.headers.get('content-type') ?? ''
  const mediaType = contentType.split(';')[0].trim().toLowerCase()
  const codec = codecFor(codecs, contentType)
  if (codec?.decode) return codec.decode(await response.text(), contentType)
  if (isJsonSequence(contentType)) return decodeSequence(await response.text(), contentType, jsonPlan, response.status)
  if (mediaType.includes('json') || mediaType.endsWith('+json')) return jsonPlan?.lossless ? parseJson(await response.text(), responseJsonShape(jsonPlan, response.status, contentType), jsonPlan.refs) : response.json()
  if (mediaType.startsWith('text/') || mediaType.includes('xml') || mediaType.includes('yaml')) return response.text()
  return response.arrayBuffer()
}
const applySecurity = (headers: Headers, query: Record<string, unknown>, security: SecurityDescriptor[][] | undefined, credentials?: SecurityCredentials) => {
  if (!security) return
  const values: Record<string, string | undefined> = { ...credentials }
  const selected = security.find((alternative) => alternative.every((scheme) => values[scheme.id]))
  if (!selected) return
  for (const scheme of selected) {
    const value = values[scheme.id]
    if (!value) continue
    if (scheme.type === 'apiKey') {
      const name = scheme.name
      if (!name) continue
      if (scheme.in === 'query') query[name] = value
      else if (scheme.in === 'cookie') headers.append('cookie', `${name}=${encodeURIComponent(value)}`)
      else headers.set(name, value)
    } else headers.set('authorization', `${scheme.scheme === 'basic' ? 'Basic' : 'Bearer'} ${value}`)
  }
}
const retryableStatus = (status: number) => status === 408 || status === 429 || status === 500 || status === 502 || status === 503 || status === 504
const retryAllowed = (method: string, headers: Headers, idempotencyHeader?: string) => ['GET', 'HEAD', 'OPTIONS', 'TRACE', 'QUERY', 'PUT', 'DELETE'].includes(method.toUpperCase()) || (['POST', 'PATCH'].includes(method.toUpperCase()) && (!!headers.get('idempotency-key')?.trim() || (!!idempotencyHeader && !!headers.get(idempotencyHeader)?.trim())))
const retryHeaderDelay = (value: string | null | undefined, milliseconds: boolean): number | undefined => {
  if (!value) return undefined
  const trimmed = value.trim()
  if (/^\d+(?:\.\d+)?$/.test(trimmed)) {
    const delay = Number(trimmed) * (milliseconds ? 1 : 1000)
    return Number.isFinite(delay) ? delay : undefined
  }
  if (milliseconds || !/^[A-Za-z]/.test(trimmed)) return undefined
  const timestamp = Date.parse(trimmed)
  return Number.isFinite(timestamp) ? Math.max(0, timestamp - Date.now()) : undefined
}
const retryDelay = async (attempt: number, retry: RetryConfig, retryAfter?: string | null, retryAfterMilliseconds?: string | null, signal?: AbortSignal) => {
  const fromHeader = retryHeaderDelay(retryAfterMilliseconds, true) ?? retryHeaderDelay(retryAfter, false)
  const exponential = (retry.initialDelayMs ?? 250) * 2 ** attempt
  const delay = Math.max(0, Math.min(fromHeader ?? exponential, retry.maxDelayMs ?? 8_000))
  await requestRetryPause(delay, signal)
}
const createTransport = (config: ClientConfig = {}): ClientInstance => async ({ method, url, body, path, query, querystring, wholeQuery, headers, cookies, throwOnError: _throwOnError, security, contentType, responseType, styles, formEncodings, formHeaders, multipartPlan, validation, paginationUrl, idempotencyHeader, requestOptions, jsonPlan }) => {
  const signal = requestOptions?.signal
  const mergedHeaders = new Headers(config.headers)
  if (config.apiKey) mergedHeaders.set(config.apiKeyHeader ?? 'authorization', `${config.apiKeyPrefix ?? 'Bearer '}${config.apiKey}`)
  new Headers(headers as HeadersInit).forEach((value, key) => mergedHeaders.set(key, value))
  new Headers(requestOptions?.headers).forEach((value, key) => mergedHeaders.set(key, value))
  const resolvedQuery = { ...(query ?? {}) }
  applySecurity(mergedHeaders, resolvedQuery, security, config.auth)
  for (const [name, value] of Object.entries(cookies ?? {})) { if (value !== undefined && (value !== null || styles?.cookie?.[name]?.contentType)) mergedHeaders.append('cookie', `${name}=${serializePath(name, value, styleFor(styles, 'cookie', name))}`) }
  for (const [name, value] of Object.entries(headers as Record<string, unknown> ?? {})) if (styles?.header?.[name]) mergedHeaders.set(name, styles.header[name]?.contentType ? contentParameter(value, styles.header[name]!.contentType!) : serializePath(name, value, styleFor(styles, 'header', name)))
  new Headers(requestOptions?.headers).forEach((value, key) => mergedHeaders.set(key, value))
  const requestUrl = paginationUrl ? resolvePaginationUrl(paginationUrl, config.baseUrl) : `${config.baseUrl ?? ''}${appendWholeQuery(resolveUrl(url, path, resolvedQuery, styles), querystring, wholeQuery)}`
  const request = { method, url: requestUrl, body, path, query: resolvedQuery, headers: mergedHeaders }
  await validate(validation?.request ?? config.validation?.request, body)
  await config.hooks?.beforeRequest?.(request)
  const retry = config.retry === false ? undefined : config.retry ?? {}
  const maxAttempts = retry && retryAllowed(method, mergedHeaders, idempotencyHeader) ? Math.max(1, retry.maxAttempts ?? 3) : 1
  let response!: Response
  for (let attempt = 0; attempt < maxAttempts; attempt += 1) {
      signal?.throwIfAborted()
    try {
      response = await (config.fetch ?? globalThis.fetch)(requestUrl, { method, body: requestBody(body, mergedHeaders, contentType?.request, config.codecs, formEncodings, formHeaders, config.multipartEncoder, multipartPlan, jsonPlan), headers: mergedHeaders, signal })
      if (attempt + 1 < maxAttempts && retryableStatus(response.status)) {
        await retryDelay(attempt, retry ?? {}, response.headers.get('retry-after'), response.headers.get('retry-after-ms'), signal)
        continue
      }
      break
    } catch (error) {
      if (signal?.aborted || (typeof error === 'object' && error !== null && 'name' in error && error.name === 'AbortError') || attempt + 1 >= maxAttempts) {
        await config.hooks?.onError?.(error, request)
        throw error
      }
      await retryDelay(attempt, retry ?? {}, undefined, undefined, signal)
    }
  }
  await config.hooks?.afterResponse?.({ request, status: response.status, response: response.clone() })
  if (!response.ok && _throwOnError !== false) {
    const error = new ApiError(response.status, await responseBody(response.clone(), config.codecs, jsonPlan))
    await config.hooks?.onError?.(error, request)
    throw error
  }
  if (responseType === 'stream') return response
  const data = response.status === 204 ? undefined : await responseBody(response.clone(), config.codecs, jsonPlan)
  await validate(validation?.response ?? config.validation?.response, data)
  return { status: response.status, contentType: response.headers.get('content-type')?.split(';')[0].trim() ?? '', data, headers: response.headers }
}
export const toEventStream = async <T>(response: Promise<unknown>, jsonPlan?: JsonPlan): Promise<EventStreamResult<T>> => {
  const raw = await response
  if (!(raw instanceof Response) || !raw.body) throw new TypeError('SSE requires a Fetch Response with a readable body')
  const reader = raw.body.getReader()
  const decoder = new TextDecoder()
  return (async function* (): AsyncGenerator<T> {
    let buffer = ''
    while (true) {
      const next = await reader.read()
      if (next.done) break
      buffer += decoder.decode(next.value, { stream: true })
      const events = buffer.split(/\r?\n\r?\n/)
      buffer = events.pop() ?? ''
      for (const event of events) {
        const data = event.split(/\r?\n/).filter((line) => line.startsWith('data:')).map((line) => line.slice(5).trimStart()).join('\n')
        if (!data) continue
        try { yield (jsonPlan ? parseJson(data, responseJsonShape(jsonPlan, eventStreamStatus(raw), 'text/event-stream'), jsonPlan.refs) : JSON.parse(data)) as T } catch { yield data as T }
      }
    }
  })()
}
/** Middleware runs once per logical request, around transport retries and legacy hooks. */
export type MiddlewareNext = (request: RequestConfig) => Promise<unknown>
export type ClientMiddleware = (request: RequestConfig, next: MiddlewareNext) => Promise<unknown>
/** Ordinary responses use this envelope; Fetch streaming requests return a native Response. */
export interface MiddlewareResponse { status: number; contentType: string; data: unknown; headers: Headers | Record<string, unknown> }
export const createClient = (config: ClientConfig = {}): ClientInstance => {
  const transport = createTransport(config)
  const middleware = [...(config.middleware ?? [])]
  return (request) => withRequestControl(request.requestOptions, config.timeoutMs, async (requestOptions) => {
    request = { ...request, requestOptions }
    const dispatch = (index: number, current: RequestConfig): Promise<unknown> => {
      const handler = middleware[index]
      if (!handler) return transport(current)
      let called = false
      return Promise.resolve().then(() => handler(current, (updated) => {
        if (called) return Promise.reject(new TypeError('Middleware next may only be called once'))
        called = true
        return dispatch(index + 1, updated)
      }))
    }
    return dispatch(0, { ...request, path: request.path ? { ...request.path } : undefined, query: request.query ? { ...request.query } : undefined, headers: (request.headers instanceof Headers ? new Headers(request.headers) : Array.isArray(request.headers) ? request.headers.map(([name, value]) => [name, value]) : request.headers ? { ...request.headers } : undefined) as RequestConfig['headers'], cookies: request.cookies ? { ...request.cookies } : undefined }).then((response) => (request.validateResponses ?? config.validateResponses) && request.responseType !== 'stream' && request.method.toUpperCase() !== 'HEAD' ? checkResponseEnvelope(response, request.jsonPlan) : response)
  })
}
export const client = createClient()
export const resolveResponse = <T extends { status: number; data: unknown }, ThrowOnError extends boolean>(promise: Promise<T>, throwOnError: ThrowOnError): Promise<ResponseResult<T, ThrowOnError>> => (throwOnError ? promise.then((result) => result.data) : promise) as Promise<ResponseResult<T, ThrowOnError>>

export type MultipartPlan = {
  content_type: string;
  encoding?: Record<string, FormEncoding>;
  prefix_encoding?: FormEncoding[];
  item_encoding?: FormEncoding;
};
const mimeValue = (value: string): string => {
  if (!value || /[\r\n\x00-\x1f\x7f]/.test(value))
    throw new TypeError("Invalid multipart header value");
  return value;
};
const mimeName = (value: string): string => {
  mimeValue(value);
  if (/["\\]/.test(value)) throw new TypeError("Invalid multipart field name");
  return value;
};
const encodePlannedMultipart = (
  body: unknown,
  plan: MultipartPlan,
  values?: FormPartHeaders,
  depth = 0,
): Blob => {
  if (depth > 16) throw new TypeError("Multipart nesting exceeds 16 levels");
  if (!plan.content_type.startsWith("multipart/"))
    throw new TypeError("Multipart plan requires a multipart media type");
  const ordered = Array.isArray(body);
  if (!ordered && !isRecord(body))
    throw new TypeError("Multipart input must be an object or ordered array");
  const fields: Array<[string, unknown]> = ordered
    ? body.map((item, index) => [String(index), item])
    : Object.entries(body as Record<string, unknown>);
  if (fields.length > 1024) throw new TypeError("Multipart body exceeds 1024 parts");
  const boundary = `poolster-${globalThis.crypto?.randomUUID?.() ?? `${Date.now().toString(16)}-${Math.random().toString(16).slice(2)}`}`;
  const chunks: BlobPart[] = [];
  for (let index = 0; index < fields.length; index++) {
    const [name, value] = fields[index];
    if (value === undefined) continue;
    const encoding = ordered
      ? (plan.prefix_encoding?.[index] ?? plan.item_encoding ?? {})
      : (plan.encoding?.[name] ?? {});
    const supplied = formPartHeaders(plan.content_type, name, encoding, values) ?? {};
    let mediaType =
      encoding.contentType ??
      (value instanceof Blob
        ? value.type || "application/octet-stream"
        : typeof value === "string"
          ? "text/plain"
          : "application/json");
    let payload: string | Blob;
    if (encoding.encoding || encoding.prefixEncoding || encoding.itemEncoding) {
      mediaType = encoding.contentType ?? "multipart/mixed";
      payload = encodePlannedMultipart(
        value,
        {
          content_type: mediaType,
          encoding: encoding.encoding,
          prefix_encoding: encoding.prefixEncoding,
          item_encoding: encoding.itemEncoding,
        },
        values,
        depth + 1,
      );
      mediaType = payload.type;
    } else if (value instanceof Blob) payload = value;
    else if (mediaType.split(";")[0].trim().includes("json")) {
      const encoded = JSON.stringify(value);
      if (encoded === undefined) throw new TypeError("Multipart value must be serializable");
      payload = encoded;
    } else payload = String(value);
    const headers = [`Content-Type: ${mimeValue(mediaType)}`];
    if (plan.content_type.split(";")[0].trim() === "multipart/form-data") {
      const filename =
        value instanceof Blob && "name" in value && typeof value.name === "string"
          ? `; filename="${mimeName(value.name)}"`
          : "";
      headers.unshift(`Content-Disposition: form-data; name="${mimeName(name)}"${filename}`);
    }
    for (const [header, headerValue] of Object.entries(supplied)) {
      if (!/^[!#$%&'*+.^_`|~0-9A-Za-z-]+$/.test(header))
        throw new TypeError("Invalid multipart header name");
      if (header.toLowerCase() !== "content-type")
        headers.push(`${header}: ${mimeValue(headerValue)}`);
    }
    chunks.push(`--${boundary}\r\n${headers.join("\r\n")}\r\n\r\n`, payload, "\r\n");
  }
  chunks.push(`--${boundary}--\r\n`);
  const encoded = new Blob(chunks, {
    type: `${plan.content_type.split(";")[0].trim()}; boundary=${boundary}`,
  });
  if (encoded.size > 64 * 1024 * 1024) throw new TypeError("Multipart body exceeds 64 MiB");
  return encoded;
};

/** Runtime-only per-call controls; API-declared headers remain separately typed. */
export interface RequestOptions {
  headers?: HeadersInit;
  timeoutMs?: number;
  signal?: AbortSignal;
}
export class PoolsterRequestTimeoutError extends Error {
  constructor() {
    super("Request timed out");
    this.name = "TimeoutError";
  }
}
export async function withRequestControl<T>(
  options: RequestOptions | undefined,
  defaultTimeoutMs: number | undefined,
  run: (options: RequestOptions) => Promise<T>,
): Promise<T> {
  const prepared = {
    ...options,
    headers: options?.headers ? new Headers(options.headers) : undefined,
  };
  const timeoutMs = options?.timeoutMs ?? defaultTimeoutMs;
  if (
    timeoutMs !== undefined &&
    (!Number.isFinite(timeoutMs) || timeoutMs <= 0 || timeoutMs > 2_147_483_647)
  )
    throw new RangeError("timeoutMs must be a finite positive timer duration");
  const caller = options?.signal;
  if (caller?.aborted) throw caller.reason ?? new DOMException("Request cancelled", "AbortError");
  if (timeoutMs === undefined && !caller) return run(prepared);
  const controller = timeoutMs === undefined ? undefined : new AbortController();
  const forward = () => controller?.abort(caller?.reason);
  if (controller && caller) caller.addEventListener("abort", forward, { once: true });
  const combine = (
    AbortSignal as typeof AbortSignal & { any?: (signals: AbortSignal[]) => AbortSignal }
  ).any;
  const signal =
    controller && caller && combine
      ? combine.call(AbortSignal, [controller.signal, caller])
      : (controller?.signal ?? caller!);
  const timer =
    timeoutMs === undefined
      ? undefined
      : setTimeout(() => controller!.abort(new PoolsterRequestTimeoutError()), timeoutMs);
  let rejectAbort!: () => void;
  const cancelled = new Promise<never>((_, reject) => {
    rejectAbort = () =>
      reject(signal.reason ?? new DOMException("Request cancelled", "AbortError"));
    signal.addEventListener("abort", rejectAbort, { once: true });
  });
  try {
    return await Promise.race([
      Promise.resolve().then(() => {
        signal.throwIfAborted();
        return run({ ...prepared, signal });
      }),
      cancelled,
    ]);
  } finally {
    if (timer !== undefined) clearTimeout(timer);
    signal.removeEventListener("abort", rejectAbort);
    if (controller && caller) caller.removeEventListener("abort", forward);
  }
}
const requestRetryPause = (delay: number, signal?: AbortSignal): Promise<void> => {
  signal?.throwIfAborted();
  return new Promise((resolve, reject) => {
    const abort = () => {
      clearTimeout(timer);
      signal?.removeEventListener("abort", abort);
      reject(signal?.reason ?? new DOMException("Request cancelled", "AbortError"));
    };
    const timer = setTimeout(() => {
      signal?.removeEventListener("abort", abort);
      resolve();
    }, delay);
    signal?.addEventListener("abort", abort, { once: true });
    if (signal?.aborted) abort();
  });
};


export type JsonShape = { kind?: string; nullable?: boolean; writeOnly?: boolean; literals?: unknown[]; required?: string[]; integer?: 'string' | 'bigint'; ref?: string; fields?: Record<string, JsonShape | null>; additional?: JsonShape | null; items?: JsonShape | null; variants?: (JsonShape | null)[] }
export type JsonPlan = { lossless?: boolean; refs: Record<string, JsonShape | null>; requests: Record<string, JsonShape | null>; responses: Record<string, Record<string, JsonShape | null>> }
class JsonNumber { constructor(readonly text: string) {} }
// Parse tokens before converting numbers. JSON.parse validates the complete
// document first; the second pass preserves integer digits exactly.
const rawJson = (text: string): unknown => {
  JSON.parse(text)
  let i = 0
  const whitespace = () => { while (/\s/.test(text[i] ?? '') && i < text.length) i++ }
  const string = (): string => {
    const start = i++
    while (i < text.length) { const c = text[i++]; if (c === '\\') i++; else if (c === '"') break }
    return JSON.parse(text.slice(start, i)) as string
  }
  const value = (): unknown => {
    whitespace()
    if (text[i] === '"') return string()
    if (text[i] === '[') { i++; const result: unknown[] = []; whitespace(); if (text[i] === ']') { i++; return result }; while (true) { result.push(value()); whitespace(); if (text[i++] === ']') return result } }
    if (text[i] === '{') { i++; const result: Record<string, unknown> = {}; whitespace(); if (text[i] === '}') { i++; return result }; while (true) { whitespace(); const key = string(); whitespace(); i++; const item = value(); Object.defineProperty(result, key, { value: item, enumerable: true, configurable: true, writable: true }); whitespace(); if (text[i++] === '}') return result } }
    for (const [literal, result] of [['true', true], ['false', false], ['null', null]] as const) { if (text.startsWith(literal, i)) { i += literal.length; return result } }
    const number = /^-?(?:0|[1-9]\d*)(?:\.\d+)?(?:[eE][+-]?\d+)?/.exec(text.slice(i))!
    i += number[0].length
    return new JsonNumber(number[0])
  }
  return value()
}
const resolvedShape = (shape: JsonShape | null | undefined, refs: JsonPlan['refs'], seen = new Set<string>()): JsonShape | null => {
  if (!shape) return null
  if (shape.ref) { if (seen.has(shape.ref)) return null; seen.add(shape.ref); const target = resolvedShape(refs[shape.ref], refs, seen); return target ? { ...target, nullable: shape.nullable || target.nullable, writeOnly: shape.writeOnly || target.writeOnly } : null }
  return shape
}
const integerDigits = (token: string): string => {
  const match = /^(-?)(\d+)(?:\.(\d+))?(?:[eE]([+-]?\d+))?$/.exec(token)
  if (!match) throw new TypeError('Invalid integer JSON token')
  const fraction = match[3] ?? ''
  const exponent = Number(match[4] ?? 0)
  if (!Number.isSafeInteger(exponent) || Math.abs(exponent) > 10000) throw new TypeError('Integer JSON exponent exceeds the supported bound')
  let digits = match[2] + fraction
  if (/^0+$/.test(digits)) return '0'
  const shift = exponent - fraction.length
  if (shift >= 0) digits += '0'.repeat(shift)
  else {
    const cut = digits.length + shift
    if (cut < 0 || !/^0*$/.test(digits.slice(Math.max(0,cut)))) throw new TypeError('Fractional value for an integer JSON schema')
    digits = digits.slice(0,cut) || '0'
  }
  digits = digits.replace(/^0+(?=\d)/,'')
  return (match[1] && digits !== '0' ? '-' : '') + digits
}
const matchesJsonShape = (value: unknown, shape: JsonShape | null | undefined, refs: JsonPlan['refs'], depth = 0): boolean => {
  if (depth > 64) return true
  const resolved = resolvedShape(shape, refs)
  if (!resolved) return true
  if (value === null) return !!resolved.nullable || resolved.kind === 'null'
  if (resolved.literals) { const scalar = value instanceof JsonNumber ? value.text : String(value); if (!resolved.literals.some((literal) => String(literal) === scalar)) return false }
  if (resolved.variants) return resolved.variants.some((variant) => matchesJsonShape(value,variant,refs,depth+1))
  if (resolved.kind === 'integer') { if (value instanceof JsonNumber) { try { integerDigits(value.text); return true } catch { return false } }; return typeof value === 'bigint' || (typeof value === 'number' && Number.isInteger(value)) || (typeof value === 'string' && resolved.integer === 'string' && /^-?(?:0|[1-9]\d*)$/.test(value)) }
  if (resolved.kind === 'number') return value instanceof JsonNumber || typeof value === 'number'
  if (resolved.kind === 'string' || resolved.kind === 'boolean') return typeof value === resolved.kind
  if (resolved.kind === 'array') return Array.isArray(value)
  if (resolved.kind === 'object') {
    if (!value || typeof value !== 'object' || Array.isArray(value) || value instanceof JsonNumber) return false
    const object = value as Record<string, unknown>
    return (resolved.required ?? []).every((key) => Object.hasOwn(object,key)) && Object.entries(resolved.fields ?? {}).every(([key,child]) => !Object.hasOwn(object,key) || matchesJsonShape(object[key],child,refs,depth+1))
  }
  return true
}
const selectedShape = (value: unknown, shape: JsonShape | null | undefined, refs: JsonPlan['refs']): JsonShape | null => {
  const resolved = resolvedShape(shape,refs)
  if (!resolved?.variants) return resolved
  // A union selects a matching branch; an intersection combines its fields.
  if (resolved.kind !== 'allOf') return selectedShape(value,resolved.variants.find((variant) => matchesJsonShape(value,variant,refs)),refs)
  const members = resolved.variants.map((variant) => selectedShape(value,variant,refs)).filter((variant): variant is JsonShape => !!variant)
  return { integer: members.find((member) => member.integer)?.integer, fields: Object.assign({},...members.map((member) => member.fields ?? {})), items: members.find((member) => member.items)?.items, additional: members.find((member) => member.additional)?.additional }
}
const fieldJsonShape = (shape: JsonShape | null, key: string): JsonShape | null | undefined => shape?.fields && Object.hasOwn(shape.fields,key) ? shape.fields[key] : shape?.additional
const decodeJsonValue = (value: unknown, shape: JsonShape | null | undefined, refs: JsonPlan['refs']): unknown => {
  const resolved = selectedShape(value, shape, refs)
  if (value instanceof JsonNumber) {
    if (resolved?.integer) { const digits = integerDigits(value.text); return resolved.integer === 'bigint' ? BigInt(digits) : digits }
    return Number(value.text)
  }
  if (typeof value === 'string' && resolved?.integer && /^-?(?:0|[1-9]\d*)$/.test(value)) return resolved.integer === 'bigint' ? BigInt(value) : value
  if (Array.isArray(value)) return value.map((item) => decodeJsonValue(item, resolved?.items, refs))
  if (value && typeof value === 'object') return Object.fromEntries(Object.entries(value).map(([key, item]) => [key, decodeJsonValue(item, fieldJsonShape(resolved,key), refs)]))
  return value
}
/** Structural response checks; enum values and unknown object fields remain forward compatible. */
export class ResponseDecodeError extends TypeError {
  constructor(public readonly path: string, public readonly expected: string) {
    super(`Poolster response decoding failed at ${path}: expected ${expected}`)
    this.name = 'ResponseDecodeError'
  }
}
export const assertResponseShape = (value: unknown, shape: JsonShape | null | undefined, refs: JsonPlan['refs'] = {}, path = '$', depth = 0): void => {
  const schema = resolvedShape(shape, refs)
  if (!schema) return
  if (depth > 128) throw new ResponseDecodeError(path, 'a bounded response structure')
  if (value === null && (schema.nullable || schema.kind === 'null')) return
  if (schema.variants) {
    if (schema.kind === 'allOf') {
      for (const variant of schema.variants) assertResponseShape(value, variant, refs, path, depth + 1)
      return
    }
    for (const variant of schema.variants) {
      try { assertResponseShape(value, variant, refs, path, depth + 1); return }
      catch (error) { if (!(error instanceof ResponseDecodeError)) throw error }
    }
    throw new ResponseDecodeError(path, 'a declared union shape')
  }
  if (value === null) throw new ResponseDecodeError(path, schema.kind ?? 'a non-null value')
  const fail = (expected: string): never => { throw new ResponseDecodeError(path, expected) }
  switch (schema.kind) {
    case 'string': if (typeof value !== 'string') fail('string'); break
    case 'boolean': if (typeof value !== 'boolean') fail('boolean'); break
    case 'number': if (typeof value !== 'number' || !Number.isFinite(value)) fail('finite number'); break
    case 'integer':
      if (schema.integer === 'bigint') { if (typeof value !== 'bigint') fail('bigint') }
      else if (schema.integer === 'string') { if (typeof value !== 'string' || !/^-?(?:0|[1-9]\d*)$/.test(value)) fail('integer string') }
      else if (typeof value !== 'number' || !Number.isInteger(value)) fail('integer')
      break
    case 'null': fail('null'); break
    case 'array':
      if (!Array.isArray(value)) fail('array')
      for (const [index, item] of (value as unknown[]).entries()) assertResponseShape(item, schema.items, refs, `${path}[${index}]`, depth + 1)
      break
    case 'object': {
      if (!value || typeof value !== 'object' || Array.isArray(value)) fail('object')
      const object = value as Record<string, unknown>
      for (const key of schema.required ?? []) {
        if (!resolvedShape(schema.fields?.[key], refs)?.writeOnly && !Object.hasOwn(object, key)) throw new ResponseDecodeError(`${path}[${JSON.stringify(key)}]`, 'required property')
      }
      for (const [key, child] of Object.entries(schema.fields ?? {})) {
        if (Object.hasOwn(object, key)) assertResponseShape(object[key], child, refs, `${path}[${JSON.stringify(key)}]`, depth + 1)
      }
      if (schema.additional) for (const [key, item] of Object.entries(object)) {
        if (!Object.hasOwn(schema.fields ?? {}, key)) assertResponseShape(item, schema.additional, refs, `${path}[${JSON.stringify(key)}]`, depth + 1)
      }
      break
    }
  }
}
const checkResponseEnvelope = (response: unknown, plan: JsonPlan | undefined): unknown => {
  if (!plan) return response
  if (!response || typeof response !== 'object' || !('status' in response)) throw new ResponseDecodeError('$', 'response envelope')
  const envelope = response as { status: number; data?: unknown; contentType?: string }
  if (!Number.isInteger(envelope.status) || envelope.status < 100 || envelope.status > 599) throw new ResponseDecodeError('$.status', 'HTTP status')
  if (envelope.status >= 200 && envelope.status < 300 && envelope.status !== 204) {
    assertResponseShape(envelope.data, responseJsonShape(plan, envelope.status, envelope.contentType ?? ''), plan.refs)
  }
  return response
}
export const parseJson = (text: string, shape?: JsonShape | null, refs: JsonPlan['refs'] = {}): unknown => decodeJsonValue(rawJson(text), shape, refs)
export const stringifyJson = (value: unknown, shape?: JsonShape | null, refs: JsonPlan['refs'] = {}): string => {
  const encode = (item: unknown, current?: JsonShape | null): string | undefined => {
    const resolved = selectedShape(item, current, refs)
    if (resolved?.integer && item !== null && item !== undefined) {
      if (typeof item === 'number' && !Number.isSafeInteger(item)) throw new TypeError('Integer JSON values must be supplied as an exact string or bigint')
      const text = String(item)
      if (!/^-?(?:0|[1-9]\d*)$/.test(text)) throw new TypeError('Invalid integer JSON value')
      return text
    }
    if (typeof item === 'bigint') throw new TypeError('BigInt requires a declared integer schema')
    if (Array.isArray(item)) return '[' + item.map((v) => encode(v, resolved?.items) ?? 'null').join(',') + ']'
    if (item && typeof item === 'object') {
      if (typeof (item as { toJSON?: unknown }).toJSON === 'function') return JSON.stringify(item)
      return '{' + Object.entries(item).flatMap(([key, v]) => { const encoded = encode(v, fieldJsonShape(resolved,key)); return encoded === undefined ? [] : [JSON.stringify(key) + ':' + encoded] }).join(',') + '}'
    }
    return JSON.stringify(item)
  }
  return encode(value, shape) ?? 'null'
}
const eventStreamStatus = (value: unknown): number => value instanceof Response ? value.status : value && typeof value === 'object' && 'status' in value ? Number(value.status) : 200
const mediaJsonShape = (schemas: Record<string, JsonShape | null> | undefined, contentType: string): JsonShape | null | undefined => {
  if (!schemas) return undefined
  const value = contentType.trim().toLowerCase()
  const exact = Object.entries(schemas).find(([key]) => key.trim().toLowerCase() === value)
  if (exact) return exact[1]
  const media = value.split(';')[0].trim()
  const matches = Object.entries(schemas).filter(([key]) => key.split(';')[0].trim().toLowerCase() === media).map(([, shape]) => shape)
  if (matches.length === 1) return matches[0]
  if (matches.length > 1) return { kind: 'union', variants: matches }
  return schemas[`${media.split('/')[0]}/*`] ?? schemas['*/*']
}
const requestJsonShape = (plan: JsonPlan | undefined, contentType: string | undefined) => mediaJsonShape(plan?.requests, contentType ?? 'application/json')
const responseJsonShape = (plan: JsonPlan | undefined, status: number, contentType: string) => {
  const statusSchemas = plan?.responses[String(status)] ?? plan?.responses[`${Math.floor(status / 100)}XX`] ?? plan?.responses.default
  return mediaJsonShape(statusSchemas, contentType)
}

