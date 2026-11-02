export type JsonShape = { kind?: string; nullable?: boolean; writeOnly?: boolean; literals?: unknown[]; required?: string[]; integer?: 'string' | 'bigint'; ref?: string; fields?: Record<string, JsonShape | null>; additional?: JsonShape | null; items?: JsonShape | null; variants?: (JsonShape | null)[] }
import { refs as chunk0 } from './_poolster_json_refs_0001.js'
export const poolsterJsonRefs: Record<string, JsonShape | null> = {
  ...chunk0,
}
