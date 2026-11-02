import { Faker, en } from "@faker-js/faker";

export type FixtureLiteral = { kind: string; value?: unknown };
export interface FixtureSchema {
  kind: {
    kind: string;
    reference?: string;
    items?: FixtureSchema;
    fields?: { name: string; required: boolean; value: FixtureSchema }[];
    additional_properties?: { kind: string; value?: FixtureSchema };
    variants?: FixtureSchema[];
    schema?: FixtureSchema;
  };
  nullable?: boolean;
  optional?: boolean;
  nullish?: boolean;
  format?: string;
  enum_values?: FixtureLiteral[];
  const_value?: FixtureLiteral;
  default?: FixtureLiteral;
  constraints?: Record<string, string | number | boolean>;
  extensions?: Record<string, unknown>;
  discriminator?: { property_name: string; mapping: Record<string, string> };
}
export interface FixtureRuntimeOptions {
  seed?: number;
  max_depth: number;
  max_attempts: number;
  overrides: Record<string, FixtureLiteral>;
}

const canonical = (value: unknown): string => {
  if (typeof value === "bigint") return `integer:${value}`;
  if (Array.isArray(value)) return `[${value.map(canonical).join(",")}]`;
  if (value && typeof value === "object")
    return `{${Object.keys(value)
      .sort()
      .map((key) => `${JSON.stringify(key)}:${canonical((value as Record<string, unknown>)[key])}`)
      .join(",")}}`;
  return JSON.stringify(value) ?? "undefined";
};
const formats: Record<string, RegExp> = {
  uuid: /^[0-9a-f]{8}-[0-9a-f]{4}-[1-8][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i,
  email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  date: /^\d{4}-\d{2}-\d{2}$/,
  "date-time": /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(?:\.\d+)?(?:Z|[+-]\d{2}:\d{2})$/,
  byte: /^(?:[A-Za-z0-9+/]{4})*(?:[A-Za-z0-9+/]{2}==|[A-Za-z0-9+/]{3}=)?$/,
};
const supported = new Set([
  "minimum",
  "maximum",
  "exclusiveMinimum",
  "exclusiveMaximum",
  "multipleOf",
  "minLength",
  "maxLength",
  "pattern",
  "minItems",
  "maxItems",
  "uniqueItems",
  "minProperties",
  "maxProperties",
]);

export function createFixtureRuntime(
  schemas: Record<string, FixtureSchema>,
  options: FixtureRuntimeOptions,
) {
  const random = new Faker({ locale: [en] });
  if (options.seed !== undefined) random.seed(options.seed);
  const resolve = (schema: FixtureSchema): FixtureSchema => {
    if (schema.kind.kind !== "reference") return schema;
    const name = schema.kind.reference!.split("/").pop()!.replace(/~1/g, "/").replace(/~0/g, "~");
    const target = schemas[name];
    if (!target) throw new Error(`Fixture schema not found: ${name}`);
    return target;
  };
  const concrete = (schema: FixtureSchema): FixtureSchema => {
    const seen = new Set<FixtureSchema>();
    while (schema.kind.kind === "reference") {
      if (seen.has(schema)) throw new Error("Required recursive fixture alias");
      seen.add(schema);
      schema = resolve(schema);
    }
    return schema;
  };
  const fieldSchema = (schema: FixtureSchema, name: string): FixtureSchema => {
    schema = concrete(schema);
    const field = schema.kind.fields?.find((field) => field.name === name);
    if (field) return field.value;
    if (schema.kind.additional_properties?.value) return schema.kind.additional_properties.value;
    for (const variant of schema.kind.variants ?? []) {
      const result = fieldSchema(variant, name);
      if (result.kind.kind !== "any") return result;
    }
    return { kind: { kind: "any" } };
  };
  const literal = (input: FixtureLiteral, schema: FixtureSchema): unknown => {
    schema = concrete(schema);
    switch (input.kind) {
      case "number": {
        const text = String(input.value);
        const representation = schema.extensions?.["x-poolster-integer"];
        return schema.kind.kind === "integer" && representation === "bigint"
          ? BigInt(text)
          : schema.kind.kind === "integer" && representation === "string"
            ? text
            : Number(text);
      }
      case "array":
        return (input.value as FixtureLiteral[]).map((value) =>
          literal(value, schema.kind.items ?? { kind: { kind: "any" } }),
        );
      case "object":
        return Object.fromEntries(
          Object.entries(input.value as Record<string, FixtureLiteral>).map(([key, value]) => [
            key,
            literal(value, fieldSchema(schema, key)),
          ]),
        );
      default:
        return input.value;
    }
  };
  const constraints = (value: unknown, schema: FixtureSchema): boolean => {
    for (const [keyword, bound] of Object.entries(schema.constraints ?? {})) {
      // OpenAPI / JSON Schema annotations do not constrain the generated value.
      if (["example", "examples", "default", "deprecated", "readOnly", "writeOnly", "title", "description", "$comment"].includes(keyword)) continue;
      if (!supported.has(keyword))
        throw new Error(`Fixture constraint requires a custom generator: ${keyword}`);
      let numeric: number | bigint | undefined;
      if (typeof value === "number" || typeof value === "bigint") numeric = value;
      else if (schema.kind.kind === "integer" && typeof value === "string" && /^-?\d+$/.test(value))
        numeric = BigInt(value);
      const compare = (operator: string): boolean => {
        if (numeric === undefined) return true;
        if (typeof numeric === "bigint") {
          if (!/^-?\d+$/.test(String(bound)))
            throw new Error("Fractional constraints on bigint fixtures need a custom generator");
          const limit = BigInt(String(bound));
          return operator === "min"
            ? numeric >= limit
            : operator === "max"
              ? numeric <= limit
              : operator === "gt"
                ? numeric > limit
                : numeric < limit;
        }
        return operator === "min"
          ? numeric >= Number(bound)
          : operator === "max"
            ? numeric <= Number(bound)
            : operator === "gt"
              ? numeric > Number(bound)
              : numeric < Number(bound);
      };
      if (
        (keyword === "minimum" && !compare("min")) ||
        (keyword === "maximum" && !compare("max")) ||
        (keyword === "exclusiveMinimum" && !compare("gt")) ||
        (keyword === "exclusiveMaximum" && !compare("lt"))
      )
        return false;
      if (keyword === "multipleOf" && numeric !== undefined) {
        if (typeof numeric === "bigint") {
          const divisor = BigInt(String(bound));
          if (divisor <= 0n || numeric % divisor !== 0n) return false;
        } else {
          const divisor = Number(bound);
          const quotient = numeric / divisor;
          if (!(divisor > 0) || Math.abs(quotient - Math.round(quotient)) > 1e-9) return false;
        }
      }
      if (typeof value === "string") {
        const length = Array.from(value).length;
        if (
          (keyword === "minLength" && length < Number(bound)) ||
          (keyword === "maxLength" && length > Number(bound)) ||
          (keyword === "pattern" && !new RegExp(String(bound)).test(value))
        )
          return false;
      }
      if (Array.isArray(value)) {
        if (
          (keyword === "minItems" && value.length < Number(bound)) ||
          (keyword === "maxItems" && value.length > Number(bound))
        )
          return false;
        if (
          keyword === "uniqueItems" &&
          bound === true &&
          new Set(value.map(canonical)).size !== value.length
        )
          return false;
      }
      if (value && typeof value === "object" && !Array.isArray(value)) {
        const length = Object.keys(value).length;
        if (
          (keyword === "minProperties" && length < Number(bound)) ||
          (keyword === "maxProperties" && length > Number(bound))
        )
          return false;
      }
    }
    if (typeof value === "string" && schema.format) {
      const expression = formats[schema.format];
      if (expression && !expression.test(value)) return false;
      if (schema.format === "url" || schema.format === "uri") {
        try {
          new URL(value);
        } catch {
          return false;
        }
      }
    }
    return true;
  };
  const matches = (value: unknown, schema: FixtureSchema, depth = 0): boolean => {
    if (depth > options.max_depth * 4 + 32) return false;
    if (
      value === null &&
      (schema.nullable ||
        schema.nullish ||
        schema.kind.kind === "null" ||
        schema.kind.kind === "any")
    )
      return true;
    if (value === undefined)
      return schema.optional === true || schema.nullish === true || schema.kind.kind === "any";
    if (schema.const_value && canonical(value) !== canonical(literal(schema.const_value, schema)))
      return false;
    if (
      schema.enum_values?.length &&
      !schema.enum_values.some((item) => canonical(value) === canonical(literal(item, schema)))
    )
      return false;
    let valid = true;
    switch (schema.kind.kind) {
      case "reference":
        valid = matches(value, resolve(schema), depth + 1);
        break;
      case "null":
        valid = false;
        break;
      case "boolean":
        valid = typeof value === "boolean";
        break;
      case "integer": {
        const representation = schema.extensions?.["x-poolster-integer"];
        valid =
          representation === "bigint"
            ? typeof value === "bigint"
            : representation === "string"
              ? typeof value === "string" && /^-?(?:0|[1-9]\d*)$/.test(value)
              : typeof value === "number" && Number.isSafeInteger(value);
        break;
      }
      case "number":
        valid = typeof value === "number" && Number.isFinite(value);
        break;
      case "string":
        valid = typeof value === "string";
        break;
      case "array":
        valid =
          Array.isArray(value) &&
          value.every((item) => matches(item, schema.kind.items!, depth + 1));
        break;
      case "object": {
        valid = !!value && typeof value === "object" && !Array.isArray(value);
        if (!valid) break;
        const record = value as Record<string, unknown>;
        const fields = schema.kind.fields ?? [];
        valid = fields.every((field) =>
          field.name in record
            ? matches(record[field.name], field.value, depth + 1)
            : !field.required,
        );
        const extras = Object.keys(record).filter(
          (key) => !fields.some((field) => field.name === key),
        );
        if (schema.kind.additional_properties?.kind === "forbidden" && extras.length) valid = false;
        if (schema.kind.additional_properties?.kind === "schema")
          valid &&= extras.every((key) =>
            matches(record[key], schema.kind.additional_properties!.value!, depth + 1),
          );
        break;
      }
      case "one_of":
        valid =
          schema.kind.variants!.filter((variant) => matches(value, variant, depth + 1)).length ===
          1;
        break;
      case "any_of":
        valid = schema.kind.variants!.some((variant) => matches(value, variant, depth + 1));
        break;
      case "all_of":
        valid = schema.kind.variants!.every((variant) => matches(value, variant, depth + 1));
        break;
      case "not":
        valid = !matches(value, schema.kind.schema!, depth + 1);
        break;
    }
    return valid && constraints(value, schema);
  };
  const count = (
    schema: FixtureSchema,
    minimum: string,
    maximum: string,
    fallback: number,
  ): number => {
    const min = Number(schema.constraints?.[minimum] ?? 0);
    const max = Math.min(Number(schema.constraints?.[maximum] ?? Math.max(min, fallback)), 4096);
    if (!Number.isSafeInteger(min) || !Number.isSafeInteger(max) || min < 0 || min > max)
      throw new Error("Fixture bounds are invalid or exceed the 4096-item budget");
    return random.number.int({ min, max });
  };
  const build = (schema: FixtureSchema, depth: number): unknown => {
    if (schema.const_value) return literal(schema.const_value, schema);
    if (schema.enum_values?.length)
      return literal(random.helpers.arrayElement(schema.enum_values), schema);
    if (schema.default) {
      const value = literal(schema.default, schema);
      if (matches(value, schema)) return value;
    }
    if (depth >= options.max_depth && (schema.nullable || schema.nullish)) return null;
    if (depth > options.max_depth)
      throw new Error("Cannot construct a finite required recursive fixture");
    switch (schema.kind.kind) {
      case "reference":
        return build(resolve(schema), depth + 1);
      case "any":
        return { example: random.string.alpha({ length: 8 }) };
      case "null":
        return null;
      case "boolean":
        return random.datatype.boolean();
      case "integer":
      case "number": {
        const bounds = schema.constraints ?? {};
        const representation = schema.extensions?.["x-poolster-integer"];
        if (representation === "bigint" || representation === "string") {
          const read = (key: string, fallback: bigint) =>
            bounds[key] === undefined ? fallback : BigInt(String(bounds[key]));
          const min =
            bounds.exclusiveMinimum !== undefined
              ? read("exclusiveMinimum", 0n) + 1n
              : read(
                  "minimum",
                  bounds.maximum !== undefined
                    ? read("maximum", 0n) - 1000n
                    : bounds.exclusiveMaximum !== undefined
                      ? read("exclusiveMaximum", 0n) - 1000n
                      : -1000n,
                );
          const max =
            bounds.exclusiveMaximum !== undefined
              ? read("exclusiveMaximum", 0n) - 1n
              : read("maximum", min > 1000n ? min + 1000n : 1000n);
          const multiple = read("multipleOf", 1n);
          if (multiple <= 0n || max < min)
            throw new Error("Unsatisfiable integer fixture constraints");
          const low = min / multiple + (min % multiple > 0n ? 1n : 0n);
          const high = max / multiple - (max % multiple < 0n ? 1n : 0n);
          if (high < low) throw new Error("No integer fixture fits multipleOf and bounds");
          const value = random.number.bigInt({ min: low, max: high }) * multiple;
          return representation === "string" ? value.toString() : value;
        }
        const integer = schema.kind.kind === "integer";
        const multiple = Number(bounds.multipleOf ?? (integer ? 1 : 0));
        let min = Number(
          bounds.minimum ??
            (bounds.maximum !== undefined
              ? Number(bounds.maximum) - 1000
              : bounds.exclusiveMaximum !== undefined
                ? Number(bounds.exclusiveMaximum) - 1000
                : -1000),
        );
        let max = Number(bounds.maximum ?? Math.max(1000, min + 1000));
        if (bounds.exclusiveMinimum !== undefined)
          min =
            Number(bounds.exclusiveMinimum) +
            (integer
              ? 1
              : Math.max(1e-6, Math.abs(Number(bounds.exclusiveMinimum)) * Number.EPSILON));
        if (bounds.exclusiveMaximum !== undefined)
          max =
            Number(bounds.exclusiveMaximum) -
            (integer
              ? 1
              : Math.max(1e-6, Math.abs(Number(bounds.exclusiveMaximum)) * Number.EPSILON));
        if (
          !Number.isFinite(min) ||
          !Number.isFinite(max) ||
          max < min ||
          (integer && (min < Number.MIN_SAFE_INTEGER || max > Number.MAX_SAFE_INTEGER))
        )
          throw new Error(
            "Numeric fixture bounds require a lossless integer representation or a custom generator",
          );
        if (multiple > 0) {
          const low = Math.ceil(min / multiple);
          const high = Math.floor(max / multiple);
          if (high < low) throw new Error("No fixture fits multipleOf");
          return random.number.int({ min: low, max: high }) * multiple;
        }
        return integer
          ? random.number.int({ min: Math.ceil(min), max: Math.floor(max) })
          : random.number.float({ min, max });
      }
      case "string": {
        if (schema.constraints?.pattern)
          return random.helpers.fromRegExp(
            String(schema.constraints.pattern)
              .replace(/^\^/, "")
              .replace(/(?<!\\)\$$/, ""),
          );
        const date = () =>
          random.date
            .between({ from: "2020-01-01T00:00:00Z", to: "2030-01-01T00:00:00Z" })
            .toISOString();
        switch (schema.format) {
          case "uuid":
            return random.string.uuid();
          case "email":
            return random.internet.email();
          case "url":
          case "uri":
            return random.internet.url();
          case "date":
            return date().slice(0, 10);
          case "date-time":
            return date();
          case "byte":
            return "aGVsbG8=";
          default:
            return random.string.alpha({ length: count(schema, "minLength", "maxLength", 12) });
        }
      }
      case "array": {
        const min = Number(schema.constraints?.minItems ?? 0);
        const length =
          depth >= options.max_depth && min === 0 ? 0 : count(schema, "minItems", "maxItems", 3);
        const result: unknown[] = [];
        for (let i = 0; i < length; i++) {
          let item: unknown;
          let accepted = false;
          for (let attempt = 0; attempt < options.max_attempts; attempt++) {
            item = build(schema.kind.items!, depth + 1);
            if (
              !schema.constraints?.uniqueItems ||
              !result.some((other) => canonical(other) === canonical(item))
            ) {
              accepted = true;
              break;
            }
          }
          if (!accepted) throw new Error("Cannot construct enough distinct array fixtures");
          result.push(item);
        }
        return result;
      }
      case "object": {
        const result: Record<string, unknown> = {};
        const fields = schema.kind.fields ?? [];
        const min = Number(schema.constraints?.minProperties ?? 0);
        const max = Number(schema.constraints?.maxProperties ?? 4096);
        for (const field of fields) {
          if (
            field.required ||
            (depth < options.max_depth &&
              (Object.keys(result).length < min || random.datatype.boolean()))
          ) {
            if (Object.keys(result).length >= max && !field.required) continue;
            result[field.name] = build(field.value, depth + 1);
          }
        }
        const extra = schema.kind.additional_properties;
        if (Object.keys(result).length < min && extra?.kind === "forbidden")
          throw new Error("Object fixture requires unavailable properties");
        for (let index = 0; Object.keys(result).length < min; index++) {
          if (index >= 4096) throw new Error("Object fixture exceeds property budget");
          const key = `extra_${index}`;
          if (!(key in result))
            result[key] = extra?.value ? build(extra.value, depth + 1) : "sample";
        }
        return result;
      }
      case "one_of":
      case "any_of": {
        const selected = random.helpers.arrayElement(schema.kind.variants!);
        const result = build(selected, depth + 1);
        if (
          schema.discriminator &&
          result &&
          typeof result === "object" &&
          !Array.isArray(result)
        ) {
          const entry = Object.entries(schema.discriminator.mapping).find(
            ([, reference]) => reference === selected.kind.reference,
          );
          if (entry)
            (result as Record<string, unknown>)[schema.discriminator.property_name] = entry[0];
        }
        return result;
      }
      case "all_of": {
        const values = schema.kind.variants!.map((value) => build(value, depth + 1));
        if (values.every((value) => value && typeof value === "object" && !Array.isArray(value)))
          return Object.assign({}, ...values);
        return values[0];
      }
      case "not":
        return random.helpers.arrayElement([null, true, false, 0, 1, "sample", [], {}]);
      default:
        throw new Error(`Unsupported fixture kind: ${schema.kind.kind}`);
    }
  };
  return {
    seed(seed: number | number[]) {
      random.seed(seed);
    },
    create(name: string, depth = 0): unknown {
      const schema = schemas[name];
      if (!schema) throw new Error(`Fixture schema not found: ${name}`);
      if (options.overrides[name]) {
        const value = literal(options.overrides[name], schema);
        if (!matches(value, schema)) throw new Error(`Fixture override does not satisfy ${name}`);
        return value;
      }
      let last: unknown;
      for (let attempt = 0; attempt < options.max_attempts; attempt++) {
        try {
          const value = build(schema, depth);
          if (matches(value, schema)) return value;
        } catch (error) {
          last = error;
        }
      }
      throw new Error(
        `Unable to construct a valid fixture for ${name}: ${last instanceof Error ? last.message : "schema constraints have no supported candidate"}`,
      );
    },
  };
}

const __poolsterSchemas: Record<string, FixtureSchema> = { "ApiError": {"extensions":{},"kind":{"additional_properties":{"kind":"unspecified"},"fields":[{"name":"code","required":true,"value":{"constraints":{"example":"validation_error"},"kind":{"kind":"string"},"nullable":false,"nullish":false,"optional":false}},{"name":"message","required":true,"value":{"constraints":{"example":"The request is invalid."},"kind":{"kind":"string"},"nullable":false,"nullish":false,"optional":false}}],"kind":"object"},"nullable":false,"nullish":false,"optional":false},"ApiPrincipal": {"extensions":{},"kind":{"additional_properties":{"kind":"unspecified"},"fields":[{"name":"environment","required":true,"value":{"constraints":{"example":"test"},"kind":{"kind":"string"},"nullable":false,"nullish":false,"optional":false}},{"name":"key_id","required":true,"value":{"kind":{"kind":"string"},"nullable":false,"nullish":false,"optional":false}},{"name":"organization_id","required":true,"value":{"kind":{"kind":"string"},"nullable":false,"nullish":false,"optional":false}},{"name":"permissions","required":true,"value":{"kind":{"kind":"any"},"nullable":false,"nullish":false,"optional":false}},{"name":"project_id","required":false,"value":{"kind":{"kind":"string"},"nullable":true,"nullish":false,"optional":false}}],"kind":"object"},"nullable":false,"nullish":false,"optional":false},"AuthCheckResponse": {"extensions":{},"kind":{"additional_properties":{"kind":"unspecified"},"fields":[{"name":"principal","required":true,"value":{"kind":{"kind":"reference","reference":"#/components/schemas/ApiPrincipal"},"nullable":false,"nullish":false,"optional":false}},{"name":"valid","required":true,"value":{"kind":{"kind":"boolean"},"nullable":false,"nullish":false,"optional":false}}],"kind":"object"},"nullable":false,"nullish":false,"optional":false},"Contact": {"extensions":{},"kind":{"additional_properties":{"kind":"unspecified"},"fields":[{"name":"attributes","required":true,"value":{"kind":{"kind":"any"},"nullable":false,"nullish":false,"optional":false}},{"name":"blocked_at","required":false,"value":{"format":"date-time","kind":{"kind":"string"},"nullable":true,"nullish":false,"optional":false}},{"name":"blocked_reason","required":false,"value":{"kind":{"kind":"string"},"nullable":true,"nullish":false,"optional":false}},{"name":"consent_source","required":false,"value":{"kind":{"kind":"string"},"nullable":true,"nullish":false,"optional":false}},{"name":"consented_at","required":false,"value":{"format":"date-time","kind":{"kind":"string"},"nullable":true,"nullish":false,"optional":false}},{"name":"created_at","required":true,"value":{"format":"date-time","kind":{"kind":"string"},"nullable":false,"nullish":false,"optional":false}},{"name":"email","required":true,"value":{"constraints":{"example":"person@example.com"},"kind":{"kind":"string"},"nullable":false,"nullish":false,"optional":false}},{"name":"first_name","required":false,"value":{"kind":{"kind":"string"},"nullable":true,"nullish":false,"optional":false}},{"name":"id","required":true,"value":{"kind":{"kind":"string"},"nullable":false,"nullish":false,"optional":false}},{"name":"last_name","required":false,"value":{"kind":{"kind":"string"},"nullable":true,"nullish":false,"optional":false}},{"name":"locale","required":false,"value":{"constraints":{"example":"en"},"kind":{"kind":"string"},"nullable":true,"nullish":false,"optional":false}},{"name":"marketing_status","required":true,"value":{"constraints":{"example":"subscribed"},"kind":{"kind":"string"},"nullable":false,"nullish":false,"optional":false}},{"name":"normalized_email","required":true,"value":{"constraints":{"example":"person@example.com"},"kind":{"kind":"string"},"nullable":false,"nullish":false,"optional":false}},{"name":"origin","required":true,"value":{"constraints":{"example":"api"},"kind":{"kind":"string"},"nullable":false,"nullish":false,"optional":false}},{"name":"status","required":true,"value":{"constraints":{"example":"active"},"kind":{"kind":"string"},"nullable":false,"nullish":false,"optional":false}},{"name":"updated_at","required":true,"value":{"format":"date-time","kind":{"kind":"string"},"nullable":false,"nullish":false,"optional":false}}],"kind":"object"},"nullable":false,"nullish":false,"optional":false},"ContactListResponse": {"extensions":{},"kind":{"additional_properties":{"kind":"unspecified"},"fields":[{"name":"api_version","required":true,"value":{"kind":{"kind":"string"},"nullable":false,"nullish":false,"optional":false}},{"name":"data","required":true,"value":{"kind":{"items":{"kind":{"kind":"reference","reference":"#/components/schemas/Contact"},"nullable":false,"nullish":false,"optional":false},"kind":"array"},"nullable":false,"nullish":false,"optional":false}}],"kind":"object"},"nullable":false,"nullish":false,"optional":false},"ContactQuery": {"extensions":{},"kind":{"additional_properties":{"kind":"unspecified"},"fields":[{"name":"limit","required":false,"value":{"format":"int64","kind":{"kind":"integer"},"nullable":true,"nullish":false,"optional":false}},{"name":"marketing_status","required":false,"value":{"kind":{"kind":"string"},"nullable":true,"nullish":false,"optional":false}},{"name":"offset","required":false,"value":{"format":"int64","kind":{"kind":"integer"},"nullable":true,"nullish":false,"optional":false}},{"name":"order","required":false,"value":{"kind":{"kind":"string"},"nullable":true,"nullish":false,"optional":false}},{"name":"order_by","required":false,"value":{"kind":{"kind":"string"},"nullable":true,"nullish":false,"optional":false}},{"name":"search","required":false,"value":{"kind":{"kind":"string"},"nullable":true,"nullish":false,"optional":false}},{"name":"status","required":false,"value":{"kind":{"kind":"string"},"nullable":true,"nullish":false,"optional":false}}],"kind":"object"},"nullable":false,"nullish":false,"optional":false},"ContactQueryResponse": {"extensions":{},"kind":{"additional_properties":{"kind":"unspecified"},"fields":[{"name":"api_version","required":true,"value":{"kind":{"kind":"string"},"nullable":false,"nullish":false,"optional":false}},{"name":"data","required":true,"value":{"kind":{"items":{"kind":{"kind":"reference","reference":"#/components/schemas/Contact"},"nullable":false,"nullish":false,"optional":false},"kind":"array"},"nullable":false,"nullish":false,"optional":false}},{"name":"page","required":true,"value":{"kind":{"kind":"reference","reference":"#/components/schemas/Page"},"nullable":false,"nullish":false,"optional":false}}],"kind":"object"},"nullable":false,"nullish":false,"optional":false},"ContactResponse": {"extensions":{},"kind":{"additional_properties":{"kind":"unspecified"},"fields":[{"name":"api_version","required":true,"value":{"kind":{"kind":"string"},"nullable":false,"nullish":false,"optional":false}},{"name":"data","required":true,"value":{"kind":{"kind":"reference","reference":"#/components/schemas/Contact"},"nullable":false,"nullish":false,"optional":false}}],"kind":"object"},"nullable":false,"nullish":false,"optional":false},"CreateContact": {"extensions":{},"kind":{"additional_properties":{"kind":"unspecified"},"fields":[{"name":"attributes","required":false,"value":{"kind":{"additional_properties":{"kind":"schema","value":{"kind":{"kind":"any"},"nullable":false,"nullish":false,"optional":false}},"fields":[],"kind":"object"},"nullable":true,"nullish":false,"optional":false}},{"name":"email","required":true,"value":{"kind":{"kind":"string"},"nullable":false,"nullish":false,"optional":false}},{"name":"first_name","required":false,"value":{"kind":{"kind":"string"},"nullable":true,"nullish":false,"optional":false}},{"name":"last_name","required":false,"value":{"kind":{"kind":"string"},"nullable":true,"nullish":false,"optional":false}},{"name":"locale","required":false,"value":{"kind":{"kind":"string"},"nullable":true,"nullish":false,"optional":false}}],"kind":"object"},"nullable":false,"nullish":false,"optional":false},"CreateWebhookResponse": {"extensions":{},"kind":{"additional_properties":{"kind":"unspecified"},"fields":[{"name":"api_version","required":true,"value":{"kind":{"kind":"string"},"nullable":false,"nullish":false,"optional":false}},{"name":"data","required":true,"value":{"kind":{"kind":"reference","reference":"#/components/schemas/Webhook"},"nullable":false,"nullish":false,"optional":false}},{"name":"signing_secret","required":true,"value":{"kind":{"kind":"string"},"nullable":false,"nullish":false,"optional":false}}],"kind":"object"},"nullable":false,"nullish":false,"optional":false},"CrmActivity": {"extensions":{},"kind":{"additional_properties":{"kind":"unspecified"},"fields":[{"name":"actor_id","required":false,"value":{"kind":{"kind":"string"},"nullable":true,"nullish":false,"optional":false}},{"name":"created_at","required":true,"value":{"format":"date-time","kind":{"kind":"string"},"nullable":false,"nullish":false,"optional":false}},{"name":"id","required":true,"value":{"kind":{"kind":"string"},"nullable":false,"nullish":false,"optional":false}},{"name":"metadata","required":true,"value":{"kind":{"additional_properties":{"kind":"any"},"fields":[],"kind":"object"},"nullable":false,"nullish":false,"optional":false}},{"name":"record_id","required":true,"value":{"kind":{"kind":"string"},"nullable":false,"nullish":false,"optional":false}},{"name":"summary","required":true,"value":{"kind":{"kind":"string"},"nullable":false,"nullish":false,"optional":false}},{"name":"type","required":true,"value":{"kind":{"kind":"string"},"nullable":false,"nullish":false,"optional":false}}],"kind":"object"},"nullable":false,"nullish":false,"optional":false},"CrmApiError": {"extensions":{},"kind":{"additional_properties":{"kind":"unspecified"},"fields":[{"name":"api_version","required":true,"value":{"kind":{"kind":"string"},"nullable":false,"nullish":false,"optional":false}},{"name":"error","required":true,"value":{"kind":{"additional_properties":{"kind":"unspecified"},"fields":[{"name":"code","required":true,"value":{"kind":{"kind":"string"},"nullable":false,"nullish":false,"optional":false}},{"name":"message","required":true,"value":{"kind":{"kind":"string"},"nullable":false,"nullish":false,"optional":false}}],"kind":"object"},"nullable":false,"nullish":false,"optional":false}}],"kind":"object"},"nullable":false,"nullish":false,"optional":false},"CrmAttributeCreate": {"extensions":{},"kind":{"additional_properties":{"kind":"forbidden"},"fields":[{"name":"currency_code","required":false,"value":{"kind":{"kind":"string"},"nullable":true,"nullish":false,"optional":false}},{"name":"expression","required":false,"value":{"kind":{"kind":"string"},"nullable":true,"nullish":false,"optional":false}},{"name":"key","required":true,"value":{"kind":{"kind":"string"},"nullable":false,"nullish":false,"optional":false}},{"name":"multiple","required":false,"value":{"kind":{"kind":"boolean"},"nullable":false,"nullish":false,"optional":false}},{"name":"name","required":true,"value":{"constraints":{"maxLength":"200"},"kind":{"kind":"string"},"nullable":false,"nullish":false,"optional":false}},{"name":"options","required":false,"value":{"constraints":{"maxItems":"100"},"kind":{"items":{"kind":{"kind":"string"},"nullable":false,"nullish":false,"optional":false},"kind":"array"},"nullable":false,"nullish":false,"optional":false}},{"name":"required","required":false,"value":{"kind":{"kind":"boolean"},"nullable":false,"nullish":false,"optional":false}},{"name":"target_object_id","required":false,"value":{"kind":{"kind":"string"},"nullable":true,"nullish":false,"optional":false}},{"name":"type","required":true,"value":{"enum_values":[{"kind":"string","value":"text"},{"kind":"string","value":"number"},{"kind":"string","value":"currency"},{"kind":"string","value":"phone"},{"kind":"string","value":"rating"},{"kind":"string","value":"location"},{"kind":"string","value":"multi_select"},{"kind":"string","value":"status"},{"kind":"string","value":"relationship"},{"kind":"string","value":"formula"},{"kind":"string","value":"boolean"},{"kind":"string","value":"date"},{"kind":"string","value":"timestamp"},{"kind":"string","value":"select"},{"kind":"string","value":"record"},{"kind":"string","value":"user"}],"kind":{"kind":"string"},"nullable":false,"nullish":false,"optional":false}}],"kind":"object"},"nullable":false,"nullish":false,"optional":false},"CrmAttributeDiscovery": {"extensions":{},"kind":{"additional_properties":{"kind":"unspecified"},"fields":[{"name":"currency_code","required":false,"value":{"kind":{"kind":"string"},"nullable":true,"nullish":false,"optional":false}},{"name":"expression","required":false,"value":{"kind":{"kind":"string"},"nullable":true,"nullish":false,"optional":false}},{"name":"id","required":true,"value":{"kind":{"kind":"string"},"nullable":false,"nullish":false,"optional":false}},{"name":"is_system","required":false,"value":{"kind":{"kind":"boolean"},"nullable":false,"nullish":false,"optional":false}},{"name":"key","required":true,"value":{"kind":{"kind":"string"},"nullable":false,"nullish":false,"optional":false}},{"name":"multiple","required":true,"value":{"kind":{"kind":"boolean"},"nullable":false,"nullish":false,"optional":false}},{"name":"name","required":true,"value":{"kind":{"kind":"string"},"nullable":false,"nullish":false,"optional":false}},{"name":"options","required":true,"value":{"kind":{"items":{"kind":{"kind":"string"},"nullable":false,"nullish":false,"optional":false},"kind":"array"},"nullable":false,"nullish":false,"optional":false}},{"name":"read_only","required":true,"value":{"kind":{"kind":"boolean"},"nullable":false,"nullish":false,"optional":false}},{"name":"required","required":true,"value":{"kind":{"kind":"boolean"},"nullable":false,"nullish":false,"optional":false}},{"name":"target_object_id","required":false,"value":{"kind":{"kind":"string"},"nullable":true,"nullish":false,"optional":false}},{"name":"type","required":true,"value":{"kind":{"kind":"string"},"nullable":false,"nullish":false,"optional":false}}],"kind":"object"},"nullable":false,"nullish":false,"optional":false},"CrmAttributePatch": {"constraints":{"minProperties":"1"},"extensions":{},"kind":{"additional_properties":{"kind":"forbidden"},"fields":[{"name":"name","required":false,"value":{"constraints":{"maxLength":"200"},"kind":{"kind":"string"},"nullable":false,"nullish":false,"optional":false}},{"name":"options","required":false,"value":{"kind":{"items":{"kind":{"kind":"string"},"nullable":false,"nullish":false,"optional":false},"kind":"array"},"nullable":false,"nullish":false,"optional":false}},{"name":"required","required":false,"value":{"kind":{"kind":"boolean"},"nullable":false,"nullish":false,"optional":false}}],"kind":"object"},"nullable":false,"nullish":false,"optional":false},"CrmContentPage": {"extensions":{},"kind":{"additional_properties":{"kind":"unspecified"},"fields":[{"name":"limit","required":true,"value":{"kind":{"kind":"integer"},"nullable":false,"nullish":false,"optional":false}},{"name":"next_cursor","required":true,"value":{"kind":{"kind":"string"},"nullable":true,"nullish":false,"optional":false}}],"kind":"object"},"nullable":false,"nullish":false,"optional":false},"CrmCreateList": {"extensions":{},"kind":{"additional_properties":{"kind":"forbidden"},"fields":[{"name":"description","required":false,"value":{"constraints":{"maxLength":"2000"},"default":{"kind":"string","value":""},"kind":{"kind":"string"},"nullable":false,"nullish":false,"optional":false}},{"name":"name","required":true,"value":{"constraints":{"maxLength":"200","minLength":"1"},"kind":{"kind":"string"},"nullable":false,"nullish":false,"optional":false}},{"name":"object_id","required":true,"value":{"kind":{"kind":"string"},"nullable":false,"nullish":false,"optional":false}}],"kind":"object"},"nullable":false,"nullish":false,"optional":false},"CrmCreateListEntry": {"extensions":{},"kind":{"additional_properties":{"kind":"forbidden"},"fields":[{"name":"record_id","required":true,"value":{"kind":{"kind":"string"},"nullable":false,"nullish":false,"optional":false}},{"name":"values","required":false,"value":{"default":{"kind":"object","value":{}},"kind":{"additional_properties":{"kind":"any"},"fields":[],"kind":"object"},"nullable":false,"nullish":false,"optional":false}}],"kind":"object"},"nullable":false,"nullish":false,"optional":false},"CrmDeletedNote": {"extensions":{},"kind":{"additional_properties":{"kind":"unspecified"},"fields":[{"name":"deleted_at","required":true,"value":{"format":"date-time","kind":{"kind":"string"},"nullable":false,"nullish":false,"optional":false}},{"name":"id","required":true,"value":{"kind":{"kind":"string"},"nullable":false,"nullish":false,"optional":false}}],"kind":"object"},"nullable":false,"nullish":false,"optional":false},"CrmDeletedTask": {"extensions":{},"kind":{"additional_properties":{"kind":"unspecified"},"fields":[{"name":"id","required":true,"value":{"kind":{"kind":"string"},"nullable":false,"nullish":false,"optional":false}}],"kind":"object"},"nullable":false,"nullish":false,"optional":false},"CrmList": {"extensions":{},"kind":{"additional_properties":{"kind":"unspecified"},"fields":[{"name":"created_at","required":true,"value":{"format":"date-time","kind":{"kind":"string"},"nullable":false,"nullish":false,"optional":false}},{"name":"description","required":true,"value":{"kind":{"kind":"string"},"nullable":false,"nullish":false,"optional":false}},{"name":"id","required":true,"value":{"kind":{"kind":"string"},"nullable":false,"nullish":false,"optional":false}},{"name":"name","required":true,"value":{"kind":{"kind":"string"},"nullable":false,"nullish":false,"optional":false}},{"name":"object_id","required":true,"value":{"kind":{"kind":"string"},"nullable":false,"nullish":false,"optional":false}},{"name":"updated_at","required":true,"value":{"format":"date-time","kind":{"kind":"string"},"nullable":false,"nullish":false,"optional":false}}],"kind":"object"},"nullable":false,"nullish":false,"optional":false},"CrmListDeletionResponse": {"extensions":{},"kind":{"additional_properties":{"kind":"unspecified"},"fields":[{"name":"api_version","required":true,"value":{"kind":{"kind":"string"},"nullable":false,"nullish":false,"optional":false}},{"name":"data","required":true,"value":{"kind":{"additional_properties":{"kind":"unspecified"},"fields":[{"name":"deleted","required":true,"value":{"kind":{"kind":"boolean"},"nullable":false,"nullish":false,"optional":false}},{"name":"id","required":true,"value":{"kind":{"kind":"string"},"nullable":false,"nullish":false,"optional":false}}],"kind":"object"},"nullable":false,"nullish":false,"optional":false}}],"kind":"object"},"nullable":false,"nullish":false,"optional":false},"CrmListEntriesPage": {"extensions":{},"kind":{"additional_properties":{"kind":"unspecified"},"fields":[{"name":"api_version","required":true,"value":{"kind":{"kind":"string"},"nullable":false,"nullish":false,"optional":false}},{"name":"data","required":true,"value":{"kind":{"items":{"kind":{"kind":"reference","reference":"#/components/schemas/CrmListEntry"},"nullable":false,"nullish":false,"optional":false},"kind":"array"},"nullable":false,"nullish":false,"optional":false}},{"name":"page","required":true,"value":{"kind":{"additional_properties":{"kind":"unspecified"},"fields":[{"name":"limit","required":true,"value":{"kind":{"kind":"integer"},"nullable":false,"nullish":false,"optional":false}},{"name":"next_cursor","required":true,"value":{"kind":{"kind":"string"},"nullable":true,"nullish":false,"optional":false}}],"kind":"object"},"nullable":false,"nullish":false,"optional":false}}],"kind":"object"},"nullable":false,"nullish":false,"optional":false},"CrmListEntry": {"extensions":{},"kind":{"additional_properties":{"kind":"unspecified"},"fields":[{"name":"created_at","required":true,"value":{"format":"date-time","kind":{"kind":"string"},"nullable":false,"nullish":false,"optional":false}},{"name":"id","required":true,"value":{"kind":{"kind":"string"},"nullable":false,"nullish":false,"optional":false}},{"name":"list_id","required":true,"value":{"kind":{"kind":"string"},"nullable":false,"nullish":false,"optional":false}},{"name":"record_id","required":true,"value":{"kind":{"kind":"string"},"nullable":false,"nullish":false,"optional":false}},{"name":"updated_at","required":true,"value":{"format":"date-time","kind":{"kind":"string"},"nullable":false,"nullish":false,"optional":false}},{"name":"values","required":true,"value":{"kind":{"additional_properties":{"kind":"any"},"fields":[],"kind":"object"},"nullable":false,"nullish":false,"optional":false}}],"kind":"object"},"nullable":false,"nullish":false,"optional":false},"CrmListEntryResponse": {"extensions":{},"kind":{"additional_properties":{"kind":"unspecified"},"fields":[{"name":"api_version","required":true,"value":{"kind":{"kind":"string"},"nullable":false,"nullish":false,"optional":false}},{"name":"data","required":true,"value":{"kind":{"kind":"reference","reference":"#/components/schemas/CrmListEntry"},"nullable":false,"nullish":false,"optional":false}}],"kind":"object"},"nullable":false,"nullish":false,"optional":false},"CrmListResponse": {"extensions":{},"kind":{"additional_properties":{"kind":"unspecified"},"fields":[{"name":"api_version","required":true,"value":{"kind":{"kind":"string"},"nullable":false,"nullish":false,"optional":false}},{"name":"attributes","required":false,"value":{"kind":{"items":{"kind":{"additional_properties":{"kind":"unspecified"},"fields":[{"name":"currency_code","required":false,"value":{"kind":{"kind":"string"},"nullable":true,"nullish":false,"optional":false}},{"name":"expression","required":false,"value":{"kind":{"kind":"string"},"nullable":true,"nullish":false,"optional":false}},{"name":"id","required":false,"value":{"kind":{"kind":"string"},"nullable":false,"nullish":false,"optional":false}},{"name":"key","required":false,"value":{"kind":{"kind":"string"},"nullable":false,"nullish":false,"optional":false}},{"name":"multiple","required":false,"value":{"kind":{"kind":"boolean"},"nullable":false,"nullish":false,"optional":false}},{"name":"name","required":false,"value":{"kind":{"kind":"string"},"nullable":false,"nullish":false,"optional":false}},{"name":"options","required":false,"value":{"kind":{"items":{"kind":{"kind":"string"},"nullable":false,"nullish":false,"optional":false},"kind":"array"},"nullable":false,"nullish":false,"optional":false}},{"name":"read_only","required":false,"value":{"kind":{"kind":"boolean"},"nullable":false,"nullish":false,"optional":false}},{"name":"required","required":false,"value":{"kind":{"kind":"boolean"},"nullable":false,"nullish":false,"optional":false}},{"name":"target_object_id","required":false,"value":{"kind":{"kind":"string"},"nullable":true,"nullish":false,"optional":false}},{"name":"type","required":false,"value":{"kind":{"kind":"string"},"nullable":false,"nullish":false,"optional":false}}],"kind":"object"},"nullable":false,"nullish":false,"optional":false},"kind":"array"},"nullable":false,"nullish":false,"optional":false}},{"name":"data","required":true,"value":{"kind":{"kind":"reference","reference":"#/components/schemas/CrmList"},"nullable":false,"nullish":false,"optional":false}}],"kind":"object"},"nullable":false,"nullish":false,"optional":false},"CrmListsPage": {"extensions":{},"kind":{"additional_properties":{"kind":"unspecified"},"fields":[{"name":"api_version","required":true,"value":{"kind":{"kind":"string"},"nullable":false,"nullish":false,"optional":false}},{"name":"data","required":true,"value":{"kind":{"items":{"kind":{"kind":"reference","reference":"#/components/schemas/CrmList"},"nullable":false,"nullish":false,"optional":false},"kind":"array"},"nullable":false,"nullish":false,"optional":false}},{"name":"page","required":true,"value":{"kind":{"additional_properties":{"kind":"unspecified"},"fields":[{"name":"limit","required":true,"value":{"kind":{"kind":"integer"},"nullable":false,"nullish":false,"optional":false}},{"name":"next_cursor","required":true,"value":{"kind":{"kind":"string"},"nullable":true,"nullish":false,"optional":false}}],"kind":"object"},"nullable":false,"nullish":false,"optional":false}}],"kind":"object"},"nullable":false,"nullish":false,"optional":false},"CrmMetadataAttribute": {"extensions":{},"kind":{"additional_properties":{"kind":"unspecified"},"fields":[{"name":"created_at","required":false,"value":{"format":"date-time","kind":{"kind":"string"},"nullable":false,"nullish":false,"optional":false}},{"name":"currency_code","required":false,"value":{"kind":{"kind":"string"},"nullable":true,"nullish":false,"optional":false}},{"name":"expression","required":false,"value":{"kind":{"kind":"string"},"nullable":true,"nullish":false,"optional":false}},{"name":"id","required":true,"value":{"kind":{"kind":"string"},"nullable":false,"nullish":false,"optional":false}},{"name":"is_system","required":true,"value":{"kind":{"kind":"boolean"},"nullable":false,"nullish":false,"optional":false}},{"name":"key","required":true,"value":{"kind":{"kind":"string"},"nullable":false,"nullish":false,"optional":false}},{"name":"list_id","required":false,"value":{"kind":{"kind":"string"},"nullable":true,"nullish":false,"optional":false}},{"name":"multiple","required":true,"value":{"kind":{"kind":"boolean"},"nullable":false,"nullish":false,"optional":false}},{"name":"name","required":true,"value":{"constraints":{"maxLength":"200"},"kind":{"kind":"string"},"nullable":false,"nullish":false,"optional":false}},{"name":"object_id","required":false,"value":{"kind":{"kind":"string"},"nullable":true,"nullish":false,"optional":false}},{"name":"options","required":true,"value":{"constraints":{"maxItems":"100"},"kind":{"items":{"kind":{"kind":"string"},"nullable":false,"nullish":false,"optional":false},"kind":"array"},"nullable":false,"nullish":false,"optional":false}},{"name":"organization_id","required":false,"value":{"kind":{"kind":"string"},"nullable":false,"nullish":false,"optional":false}},{"name":"required","required":true,"value":{"kind":{"kind":"boolean"},"nullable":false,"nullish":false,"optional":false}},{"name":"target_object_id","required":false,"value":{"kind":{"kind":"string"},"nullable":true,"nullish":false,"optional":false}},{"name":"type","required":true,"value":{"enum_values":[{"kind":"string","value":"text"},{"kind":"string","value":"number"},{"kind":"string","value":"currency"},{"kind":"string","value":"phone"},{"kind":"string","value":"rating"},{"kind":"string","value":"location"},{"kind":"string","value":"multi_select"},{"kind":"string","value":"status"},{"kind":"string","value":"relationship"},{"kind":"string","value":"formula"},{"kind":"string","value":"boolean"},{"kind":"string","value":"date"},{"kind":"string","value":"timestamp"},{"kind":"string","value":"select"},{"kind":"string","value":"record"},{"kind":"string","value":"user"}],"kind":{"kind":"string"},"nullable":false,"nullish":false,"optional":false}},{"name":"updated_at","required":false,"value":{"format":"date-time","kind":{"kind":"string"},"nullable":false,"nullish":false,"optional":false}}],"kind":"object"},"nullable":false,"nullish":false,"optional":false},"CrmMetadataAttributeResponse": {"extensions":{},"kind":{"additional_properties":{"kind":"unspecified"},"fields":[{"name":"api_version","required":true,"value":{"kind":{"kind":"string"},"nullable":false,"nullish":false,"optional":false}},{"name":"data","required":true,"value":{"kind":{"kind":"reference","reference":"#/components/schemas/CrmMetadataAttribute"},"nullable":false,"nullish":false,"optional":false}}],"kind":"object"},"nullable":false,"nullish":false,"optional":false},"CrmMetadataAttributesResponse": {"extensions":{},"kind":{"additional_properties":{"kind":"unspecified"},"fields":[{"name":"api_version","required":true,"value":{"kind":{"kind":"string"},"nullable":false,"nullish":false,"optional":false}},{"name":"data","required":true,"value":{"kind":{"items":{"kind":{"kind":"reference","reference":"#/components/schemas/CrmMetadataAttribute"},"nullable":false,"nullish":false,"optional":false},"kind":"array"},"nullable":false,"nullish":false,"optional":false}}],"kind":"object"},"nullable":false,"nullish":false,"optional":false},"CrmMetadataDeleted": {"extensions":{},"kind":{"additional_properties":{"kind":"unspecified"},"fields":[{"name":"api_version","required":true,"value":{"kind":{"kind":"string"},"nullable":false,"nullish":false,"optional":false}},{"name":"data","required":true,"value":{"kind":{"kind":"reference","reference":"#/components/schemas/CrmMetadataDeletedData"},"nullable":false,"nullish":false,"optional":false}}],"kind":"object"},"nullable":false,"nullish":false,"optional":false},"CrmMetadataDeletedData": {"extensions":{},"kind":{"additional_properties":{"kind":"unspecified"},"fields":[{"name":"deleted","required":true,"value":{"kind":{"kind":"boolean"},"nullable":false,"nullish":false,"optional":false}}],"kind":"object"},"nullable":false,"nullish":false,"optional":false},"CrmMetadataObject": {"extensions":{},"kind":{"additional_properties":{"kind":"unspecified"},"fields":[{"name":"created_at","required":false,"value":{"format":"date-time","kind":{"kind":"string"},"nullable":false,"nullish":false,"optional":false}},{"name":"enabled","required":true,"value":{"kind":{"kind":"boolean"},"nullable":false,"nullish":false,"optional":false}},{"name":"icon","required":false,"value":{"kind":{"kind":"string"},"nullable":true,"nullish":false,"optional":false}},{"name":"id","required":true,"value":{"kind":{"kind":"string"},"nullable":false,"nullish":false,"optional":false}},{"name":"is_system","required":true,"value":{"kind":{"kind":"boolean"},"nullable":false,"nullish":false,"optional":false}},{"name":"name","required":true,"value":{"kind":{"kind":"string"},"nullable":false,"nullish":false,"optional":false}},{"name":"organization_id","required":false,"value":{"kind":{"kind":"string"},"nullable":false,"nullish":false,"optional":false}},{"name":"slug","required":true,"value":{"kind":{"kind":"string"},"nullable":false,"nullish":false,"optional":false}},{"name":"updated_at","required":false,"value":{"format":"date-time","kind":{"kind":"string"},"nullable":false,"nullish":false,"optional":false}}],"kind":"object"},"nullable":false,"nullish":false,"optional":false},"CrmMetadataObjectResponse": {"extensions":{},"kind":{"additional_properties":{"kind":"unspecified"},"fields":[{"name":"api_version","required":true,"value":{"kind":{"kind":"string"},"nullable":false,"nullish":false,"optional":false}},{"name":"data","required":true,"value":{"kind":{"kind":"reference","reference":"#/components/schemas/CrmMetadataObject"},"nullable":false,"nullish":false,"optional":false}}],"kind":"object"},"nullable":false,"nullish":false,"optional":false},"CrmNote": {"extensions":{},"kind":{"additional_properties":{"kind":"unspecified"},"fields":[{"name":"author_id","required":false,"value":{"kind":{"kind":"string"},"nullable":true,"nullish":false,"optional":false}},{"name":"body","required":true,"value":{"kind":{"kind":"string"},"nullable":false,"nullish":false,"optional":false}},{"name":"content","required":false,"value":{"kind":{"kind":"one_of","variants":[{"kind":{"kind":"reference","reference":"#/components/schemas/CrmNoteDocument"},"nullable":false,"nullish":false,"optional":false},{"kind":{"kind":"null"},"nullable":false,"nullish":false,"optional":false}]},"nullable":false,"nullish":false,"optional":false}},{"name":"created_at","required":true,"value":{"format":"date-time","kind":{"kind":"string"},"nullable":false,"nullish":false,"optional":false}},{"name":"deleted_at","required":false,"value":{"format":"date-time","kind":{"kind":"string"},"nullable":true,"nullish":false,"optional":false}},{"name":"id","required":true,"value":{"kind":{"kind":"string"},"nullable":false,"nullish":false,"optional":false}},{"name":"mention_records","required":false,"value":{"kind":{"items":{"kind":{"additional_properties":{"kind":"unspecified"},"fields":[{"name":"archived_at","required":false,"value":{"format":"date-time","kind":{"kind":"string"},"nullable":true,"nullish":false,"optional":false}},{"name":"display_name","required":false,"value":{"kind":{"kind":"string"},"nullable":false,"nullish":false,"optional":false}},{"name":"id","required":false,"value":{"kind":{"kind":"string"},"nullable":false,"nullish":false,"optional":false}}],"kind":"object"},"nullable":false,"nullish":false,"optional":false},"kind":"array"},"nullable":false,"nullish":false,"optional":false}},{"name":"mentions","required":true,"value":{"kind":{"items":{"kind":{"kind":"reference","reference":"#/components/schemas/CrmNoteMention"},"nullable":false,"nullish":false,"optional":false},"kind":"array"},"nullable":false,"nullish":false,"optional":false}},{"name":"record_id","required":true,"value":{"kind":{"kind":"string"},"nullable":false,"nullish":false,"optional":false}},{"name":"title","required":true,"value":{"kind":{"kind":"string"},"nullable":false,"nullish":false,"optional":false}},{"name":"updated_at","required":true,"value":{"format":"date-time","kind":{"kind":"string"},"nullable":false,"nullish":false,"optional":false}}],"kind":"object"},"nullable":false,"nullish":false,"optional":false},"CrmNoteDocument": {"extensions":{},"kind":{"additional_properties":{"kind":"forbidden"},"fields":[{"name":"content","required":true,"value":{"kind":{"items":{"kind":{"additional_properties":{"kind":"any"},"fields":[],"kind":"object"},"nullable":false,"nullish":false,"optional":false},"kind":"array"},"nullable":false,"nullish":false,"optional":false}},{"name":"type","required":true,"value":{"enum_values":[{"kind":"string","value":"doc"}],"kind":{"kind":"string"},"nullable":false,"nullish":false,"optional":false}}],"kind":"object"},"nullable":false,"nullish":false,"optional":false},"CrmNoteMention": {"extensions":{},"kind":{"additional_properties":{"kind":"forbidden"},"fields":[{"name":"end","required":true,"value":{"constraints":{"minimum":"1"},"kind":{"kind":"integer"},"nullable":false,"nullish":false,"optional":false}},{"name":"recordId","required":true,"value":{"constraints":{"maxLength":"200","minLength":"1"},"kind":{"kind":"string"},"nullable":false,"nullish":false,"optional":false}},{"name":"start","required":true,"value":{"constraints":{"minimum":"0"},"kind":{"kind":"integer"},"nullable":false,"nullish":false,"optional":false}}],"kind":"object"},"nullable":false,"nullish":false,"optional":false},"CrmNoteWrite": {"extensions":{},"kind":{"additional_properties":{"kind":"forbidden"},"fields":[{"name":"body","required":false,"value":{"constraints":{"maxLength":"20000"},"kind":{"kind":"string"},"nullable":false,"nullish":false,"optional":false}},{"name":"content","required":false,"value":{"kind":{"kind":"one_of","variants":[{"kind":{"kind":"reference","reference":"#/components/schemas/CrmNoteDocument"},"nullable":false,"nullish":false,"optional":false},{"kind":{"kind":"null"},"nullable":false,"nullish":false,"optional":false}]},"nullable":false,"nullish":false,"optional":false}},{"name":"mentions","required":false,"value":{"constraints":{"maxItems":"100"},"kind":{"items":{"kind":{"kind":"reference","reference":"#/components/schemas/CrmNoteMention"},"nullable":false,"nullish":false,"optional":false},"kind":"array"},"nullable":false,"nullish":false,"optional":false}},{"name":"title","required":false,"value":{"constraints":{"maxLength":"200"},"kind":{"kind":"string"},"nullable":false,"nullish":false,"optional":false}}],"kind":"object"},"nullable":false,"nullish":false,"optional":false},"CrmObjectCreate": {"extensions":{},"kind":{"additional_properties":{"kind":"forbidden"},"fields":[{"name":"icon","required":false,"value":{"constraints":{"maxLength":"100"},"kind":{"kind":"string"},"nullable":false,"nullish":false,"optional":false}},{"name":"name","required":true,"value":{"constraints":{"maxLength":"200"},"kind":{"kind":"string"},"nullable":false,"nullish":false,"optional":false}},{"name":"slug","required":true,"value":{"constraints":{"pattern":"^[a-z][a-z0-9_-]{0,63}$"},"kind":{"kind":"string"},"nullable":false,"nullish":false,"optional":false}}],"kind":"object"},"nullable":false,"nullish":false,"optional":false},"CrmObjectDelete": {"extensions":{},"kind":{"additional_properties":{"kind":"forbidden"},"fields":[{"name":"confirmation_name","required":true,"value":{"kind":{"kind":"string"},"nullable":false,"nullish":false,"optional":false}}],"kind":"object"},"nullable":false,"nullish":false,"optional":false},"CrmObjectDeletionPreview": {"extensions":{},"kind":{"additional_properties":{"kind":"unspecified"},"fields":[{"name":"api_version","required":true,"value":{"kind":{"kind":"string"},"nullable":false,"nullish":false,"optional":false}},{"name":"data","required":true,"value":{"kind":{"kind":"reference","reference":"#/components/schemas/CrmObjectDeletionPreviewData"},"nullable":false,"nullish":false,"optional":false}}],"kind":"object"},"nullable":false,"nullish":false,"optional":false},"CrmObjectDeletionPreviewData": {"extensions":{},"kind":{"additional_properties":{"kind":"unspecified"},"fields":[{"name":"blocking_relationships","required":true,"value":{"kind":{"items":{"kind":{"additional_properties":{"kind":"unspecified"},"fields":[{"name":"id","required":true,"value":{"kind":{"kind":"string"},"nullable":false,"nullish":false,"optional":false}},{"name":"name","required":true,"value":{"kind":{"kind":"string"},"nullable":false,"nullish":false,"optional":false}}],"kind":"object"},"nullable":false,"nullish":false,"optional":false},"kind":"array"},"nullable":false,"nullish":false,"optional":false}},{"name":"list_count","required":true,"value":{"kind":{"kind":"integer"},"nullable":false,"nullish":false,"optional":false}},{"name":"object","required":true,"value":{"kind":{"kind":"reference","reference":"#/components/schemas/CrmMetadataObject"},"nullable":false,"nullish":false,"optional":false}},{"name":"record_count","required":true,"value":{"kind":{"kind":"integer"},"nullable":false,"nullish":false,"optional":false}}],"kind":"object"},"nullable":false,"nullish":false,"optional":false},"CrmObjectDiscovery": {"extensions":{},"kind":{"additional_properties":{"kind":"unspecified"},"fields":[{"name":"created_at","required":false,"value":{"format":"date-time","kind":{"kind":"string"},"nullable":false,"nullish":false,"optional":false}},{"name":"enabled","required":true,"value":{"kind":{"kind":"boolean"},"nullable":false,"nullish":false,"optional":false}},{"name":"icon","required":false,"value":{"kind":{"kind":"string"},"nullable":true,"nullish":false,"optional":false}},{"name":"id","required":true,"value":{"kind":{"kind":"string"},"nullable":false,"nullish":false,"optional":false}},{"name":"is_system","required":true,"value":{"kind":{"kind":"boolean"},"nullable":false,"nullish":false,"optional":false}},{"name":"name","required":true,"value":{"kind":{"kind":"string"},"nullable":false,"nullish":false,"optional":false}},{"name":"slug","required":true,"value":{"kind":{"kind":"string"},"nullable":false,"nullish":false,"optional":false}},{"name":"updated_at","required":false,"value":{"format":"date-time","kind":{"kind":"string"},"nullable":false,"nullish":false,"optional":false}}],"kind":"object"},"nullable":false,"nullish":false,"optional":false},"CrmObjectPatch": {"constraints":{"minProperties":"1"},"extensions":{},"kind":{"additional_properties":{"kind":"forbidden"},"fields":[{"name":"enabled","required":false,"value":{"kind":{"kind":"boolean"},"nullable":false,"nullish":false,"optional":false}},{"name":"icon","required":false,"value":{"constraints":{"maxLength":"100"},"kind":{"kind":"string"},"nullable":false,"nullish":false,"optional":false}},{"name":"name","required":false,"value":{"constraints":{"maxLength":"200"},"kind":{"kind":"string"},"nullable":false,"nullish":false,"optional":false}}],"kind":"object"},"nullable":false,"nullish":false,"optional":false},"CrmQualityIssue": {"extensions":{},"kind":{"additional_properties":{"kind":"unspecified"},"fields":[{"name":"code","required":true,"value":{"enum_values":[{"kind":"string","value":"required_missing"},{"kind":"string","value":"invalid_value"},{"kind":"string","value":"unknown_attribute"},{"kind":"string","value":"invalid_formula"},{"kind":"string","value":"broken_reference"},{"kind":"string","value":"wrong_reference_object"},{"kind":"string","value":"duplicate_name"},{"kind":"string","value":"duplicate_values"},{"kind":"string","value":"stored_formula"}],"kind":{"kind":"string"},"nullable":false,"nullish":false,"optional":false}},{"name":"field_key","required":false,"value":{"kind":{"kind":"string"},"nullable":true,"nullish":false,"optional":false}},{"name":"message","required":true,"value":{"kind":{"kind":"string"},"nullable":false,"nullish":false,"optional":false}}],"kind":"object"},"nullable":false,"nullish":false,"optional":false},"CrmQualityRecord": {"extensions":{},"kind":{"additional_properties":{"kind":"unspecified"},"fields":[{"name":"display_name","required":true,"value":{"kind":{"kind":"string"},"nullable":false,"nullish":false,"optional":false}},{"name":"duplicate_candidate_count","required":true,"value":{"kind":{"kind":"integer"},"nullable":false,"nullish":false,"optional":false}},{"name":"duplicate_candidates","required":true,"value":{"constraints":{"maxItems":"20"},"kind":{"items":{"kind":{"additional_properties":{"kind":"unspecified"},"fields":[{"name":"display_name","required":true,"value":{"kind":{"kind":"string"},"nullable":false,"nullish":false,"optional":false}},{"name":"record_id","required":true,"value":{"kind":{"kind":"string"},"nullable":false,"nullish":false,"optional":false}}],"kind":"object"},"nullable":false,"nullish":false,"optional":false},"kind":"array"},"nullable":false,"nullish":false,"optional":false}},{"name":"issues","required":true,"value":{"kind":{"items":{"kind":{"kind":"reference","reference":"#/components/schemas/CrmQualityIssue"},"nullable":false,"nullish":false,"optional":false},"kind":"array"},"nullable":false,"nullish":false,"optional":false}},{"name":"record_id","required":true,"value":{"kind":{"kind":"string"},"nullable":false,"nullish":false,"optional":false}}],"kind":"object"},"nullable":false,"nullish":false,"optional":false},"CrmQualityResponse": {"extensions":{},"kind":{"additional_properties":{"kind":"unspecified"},"fields":[{"name":"api_version","required":true,"value":{"kind":{"kind":"string"},"nullable":false,"nullish":false,"optional":false}},{"name":"data","required":true,"value":{"kind":{"additional_properties":{"kind":"unspecified"},"fields":[{"name":"notice","required":true,"value":{"kind":{"kind":"string"},"nullable":false,"nullish":false,"optional":false}},{"name":"object_id","required":true,"value":{"kind":{"kind":"string"},"nullable":false,"nullish":false,"optional":false}},{"name":"records","required":true,"value":{"kind":{"items":{"kind":{"kind":"reference","reference":"#/components/schemas/CrmQualityRecord"},"nullable":false,"nullish":false,"optional":false},"kind":"array"},"nullable":false,"nullish":false,"optional":false}},{"name":"scanned_records","required":true,"value":{"kind":{"kind":"integer"},"nullable":false,"nullish":false,"optional":false}},{"name":"summary","required":true,"value":{"kind":{"additional_properties":{"kind":"unspecified"},"fields":[{"name":"broken_references","required":true,"value":{"kind":{"kind":"integer"},"nullable":false,"nullish":false,"optional":false}},{"name":"duplicate_candidates","required":true,"value":{"kind":{"kind":"integer"},"nullable":false,"nullish":false,"optional":false}},{"name":"invalid_values","required":true,"value":{"kind":{"kind":"integer"},"nullable":false,"nullish":false,"optional":false}},{"name":"missing_required","required":true,"value":{"kind":{"kind":"integer"},"nullable":false,"nullish":false,"optional":false}},{"name":"records_with_issues","required":true,"value":{"kind":{"kind":"integer"},"nullable":false,"nullish":false,"optional":false}}],"kind":"object"},"nullable":false,"nullish":false,"optional":false}}],"kind":"object"},"nullable":false,"nullish":false,"optional":false}},{"name":"page","required":true,"value":{"kind":{"additional_properties":{"kind":"unspecified"},"fields":[{"name":"limit","required":false,"value":{"kind":{"kind":"integer"},"nullable":false,"nullish":false,"optional":false}},{"name":"next_cursor","required":false,"value":{"kind":{"kind":"string"},"nullable":true,"nullish":false,"optional":false}}],"kind":"object"},"nullable":false,"nullish":false,"optional":false}}],"kind":"object"},"nullable":false,"nullish":false,"optional":false},"CrmRecord": {"extensions":{},"kind":{"additional_properties":{"kind":"unspecified"},"fields":[{"name":"archived_at","required":false,"value":{"format":"date-time","kind":{"kind":"string"},"nullable":true,"nullish":false,"optional":false}},{"name":"created_at","required":false,"value":{"format":"date-time","kind":{"kind":"string"},"nullable":false,"nullish":false,"optional":false}},{"name":"display_name","required":true,"value":{"kind":{"kind":"string"},"nullable":false,"nullish":false,"optional":false}},{"name":"external_id","required":false,"value":{"kind":{"kind":"string"},"nullable":true,"nullish":false,"optional":false}},{"name":"id","required":true,"value":{"kind":{"kind":"string"},"nullable":false,"nullish":false,"optional":false}},{"name":"object_id","required":true,"value":{"kind":{"kind":"string"},"nullable":false,"nullish":false,"optional":false}},{"name":"updated_at","required":false,"value":{"format":"date-time","kind":{"kind":"string"},"nullable":false,"nullish":false,"optional":false}},{"name":"values","required":true,"value":{"kind":{"additional_properties":{"kind":"any"},"fields":[],"kind":"object"},"nullable":false,"nullish":false,"optional":false}}],"kind":"object"},"nullable":false,"nullish":false,"optional":false},"CrmRecordCreate": {"extensions":{},"kind":{"additional_properties":{"kind":"forbidden"},"fields":[{"name":"display_name","required":true,"value":{"constraints":{"maxLength":"200","minLength":"1"},"kind":{"kind":"string"},"nullable":false,"nullish":false,"optional":false}},{"name":"external_id","required":false,"value":{"constraints":{"maxLength":"200"},"kind":{"kind":"string"},"nullable":true,"nullish":false,"optional":false}},{"name":"values","required":false,"value":{"kind":{"additional_properties":{"kind":"any"},"fields":[],"kind":"object"},"nullable":false,"nullish":false,"optional":false}}],"kind":"object"},"nullable":false,"nullish":false,"optional":false},"CrmRecordPatch": {"extensions":{},"kind":{"additional_properties":{"kind":"forbidden"},"fields":[{"name":"archived","required":false,"value":{"kind":{"kind":"boolean"},"nullable":false,"nullish":false,"optional":false}},{"name":"display_name","required":false,"value":{"constraints":{"maxLength":"200","minLength":"1"},"kind":{"kind":"string"},"nullable":false,"nullish":false,"optional":false}},{"name":"values","required":false,"value":{"kind":{"additional_properties":{"kind":"any"},"fields":[],"kind":"object"},"nullable":false,"nullish":false,"optional":false}}],"kind":"object"},"nullable":false,"nullish":false,"optional":false},"CrmRecordResponse": {"extensions":{},"kind":{"additional_properties":{"kind":"unspecified"},"fields":[{"name":"api_version","required":false,"value":{"kind":{"kind":"string"},"nullable":false,"nullish":false,"optional":false}},{"name":"data","required":false,"value":{"kind":{"kind":"reference","reference":"#/components/schemas/CrmRecord"},"nullable":false,"nullish":false,"optional":false}}],"kind":"object"},"nullable":false,"nullish":false,"optional":false},"CrmTask": {"extensions":{},"kind":{"additional_properties":{"kind":"unspecified"},"fields":[{"name":"completed_at","required":false,"value":{"format":"date-time","kind":{"kind":"string"},"nullable":true,"nullish":false,"optional":false}},{"name":"created_at","required":true,"value":{"format":"date-time","kind":{"kind":"string"},"nullable":false,"nullish":false,"optional":false}},{"name":"description","required":true,"value":{"kind":{"kind":"string"},"nullable":false,"nullish":false,"optional":false}},{"name":"due_at","required":true,"value":{"format":"date-time","kind":{"kind":"string"},"nullable":false,"nullish":false,"optional":false}},{"name":"due_timezone","required":true,"value":{"kind":{"kind":"string"},"nullable":false,"nullish":false,"optional":false}},{"name":"id","required":true,"value":{"kind":{"kind":"string"},"nullable":false,"nullish":false,"optional":false}},{"name":"owner_id","required":false,"value":{"kind":{"kind":"string"},"nullable":true,"nullish":false,"optional":false}},{"name":"record_id","required":true,"value":{"kind":{"kind":"string"},"nullable":false,"nullish":false,"optional":false}},{"name":"status","required":true,"value":{"enum_values":[{"kind":"string","value":"open"},{"kind":"string","value":"completed"}],"kind":{"kind":"string"},"nullable":false,"nullish":false,"optional":false}},{"name":"title","required":true,"value":{"kind":{"kind":"string"},"nullable":false,"nullish":false,"optional":false}},{"name":"updated_at","required":true,"value":{"format":"date-time","kind":{"kind":"string"},"nullable":false,"nullish":false,"optional":false}}],"kind":"object"},"nullable":false,"nullish":false,"optional":false},"CrmTaskCreate": {"extensions":{},"kind":{"additional_properties":{"kind":"forbidden"},"fields":[{"name":"description","required":false,"value":{"constraints":{"maxLength":"5000"},"kind":{"kind":"string"},"nullable":false,"nullish":false,"optional":false}},{"name":"due_at","required":true,"value":{"format":"date-time","kind":{"kind":"string"},"nullable":false,"nullish":false,"optional":false}},{"name":"due_timezone","required":true,"value":{"constraints":{"maxLength":"100","minLength":"1"},"kind":{"kind":"string"},"nullable":false,"nullish":false,"optional":false}},{"name":"owner_id","required":false,"value":{"kind":{"kind":"string"},"nullable":true,"nullish":false,"optional":false}},{"name":"status","required":false,"value":{"enum_values":[{"kind":"string","value":"open"},{"kind":"string","value":"completed"}],"kind":{"kind":"string"},"nullable":false,"nullish":false,"optional":false}},{"name":"title","required":true,"value":{"constraints":{"maxLength":"300","minLength":"1"},"kind":{"kind":"string"},"nullable":false,"nullish":false,"optional":false}}],"kind":"object"},"nullable":false,"nullish":false,"optional":false},"CrmTaskPatch": {"extensions":{},"kind":{"additional_properties":{"kind":"forbidden"},"fields":[{"name":"description","required":false,"value":{"constraints":{"maxLength":"5000"},"kind":{"kind":"string"},"nullable":false,"nullish":false,"optional":false}},{"name":"due_at","required":false,"value":{"format":"date-time","kind":{"kind":"string"},"nullable":false,"nullish":false,"optional":false}},{"name":"due_timezone","required":false,"value":{"constraints":{"maxLength":"100","minLength":"1"},"kind":{"kind":"string"},"nullable":false,"nullish":false,"optional":false}},{"name":"owner_id","required":false,"value":{"kind":{"kind":"string"},"nullable":true,"nullish":false,"optional":false}},{"name":"status","required":false,"value":{"enum_values":[{"kind":"string","value":"open"},{"kind":"string","value":"completed"}],"kind":{"kind":"string"},"nullable":false,"nullish":false,"optional":false}},{"name":"title","required":false,"value":{"constraints":{"maxLength":"300","minLength":"1"},"kind":{"kind":"string"},"nullable":false,"nullish":false,"optional":false}}],"kind":"object"},"nullable":false,"nullish":false,"optional":false},"CrmUpdateList": {"constraints":{"minProperties":"1"},"extensions":{},"kind":{"additional_properties":{"kind":"forbidden"},"fields":[{"name":"description","required":false,"value":{"constraints":{"maxLength":"2000"},"kind":{"kind":"string"},"nullable":false,"nullish":false,"optional":false}},{"name":"name","required":false,"value":{"constraints":{"maxLength":"200","minLength":"1"},"kind":{"kind":"string"},"nullable":false,"nullish":false,"optional":false}}],"kind":"object"},"nullable":false,"nullish":false,"optional":false},"CrmUpdateListEntry": {"extensions":{},"kind":{"additional_properties":{"kind":"forbidden"},"fields":[{"name":"values","required":true,"value":{"kind":{"additional_properties":{"kind":"any"},"fields":[],"kind":"object"},"nullable":false,"nullish":false,"optional":false}}],"kind":"object"},"nullable":false,"nullish":false,"optional":false},"CrmUpsert": {"extensions":{},"kind":{"additional_properties":{"kind":"forbidden"},"fields":[{"name":"display_name","required":false,"value":{"constraints":{"maxLength":"200","minLength":"1"},"kind":{"kind":"string"},"nullable":false,"nullish":false,"optional":false}},{"name":"external_id","required":true,"value":{"constraints":{"maxLength":"200","minLength":"1"},"kind":{"kind":"string"},"nullable":false,"nullish":false,"optional":false}},{"name":"values","required":false,"value":{"kind":{"additional_properties":{"kind":"any"},"fields":[],"kind":"object"},"nullable":false,"nullish":false,"optional":false}}],"kind":"object"},"nullable":false,"nullish":false,"optional":false},"Domain": {"extensions":{},"kind":{"additional_properties":{"kind":"unspecified"},"fields":[{"name":"created_at","required":true,"value":{"format":"date-time","kind":{"kind":"string"},"nullable":false,"nullish":false,"optional":false}},{"name":"dkim_selector","required":true,"value":{"constraints":{"example":"relevate"},"kind":{"kind":"string"},"nullable":false,"nullish":false,"optional":false}},{"name":"dmarc_mode","required":true,"value":{"constraints":{"example":"quarantine"},"kind":{"kind":"string"},"nullable":false,"nullish":false,"optional":false}},{"name":"id","required":true,"value":{"kind":{"kind":"string"},"nullable":false,"nullish":false,"optional":false}},{"name":"last_checked_at","required":false,"value":{"format":"date-time","kind":{"kind":"string"},"nullable":true,"nullish":false,"optional":false}},{"name":"name","required":true,"value":{"constraints":{"example":"mail.example.com"},"kind":{"kind":"string"},"nullable":false,"nullish":false,"optional":false}},{"name":"normalized_name","required":true,"value":{"constraints":{"example":"mail.example.com"},"kind":{"kind":"string"},"nullable":false,"nullish":false,"optional":false}},{"name":"ownership_verified_at","required":false,"value":{"format":"date-time","kind":{"kind":"string"},"nullable":true,"nullish":false,"optional":false}},{"name":"receiving_enabled","required":true,"value":{"kind":{"kind":"boolean"},"nullable":false,"nullish":false,"optional":false}},{"name":"receiving_verified_at","required":false,"value":{"format":"date-time","kind":{"kind":"string"},"nullable":true,"nullish":false,"optional":false}},{"name":"status","required":true,"value":{"constraints":{"example":"verified"},"kind":{"kind":"string"},"nullable":false,"nullish":false,"optional":false}},{"name":"updated_at","required":true,"value":{"format":"date-time","kind":{"kind":"string"},"nullable":false,"nullish":false,"optional":false}}],"kind":"object"},"nullable":false,"nullish":false,"optional":false},"DomainListResponse": {"extensions":{},"kind":{"additional_properties":{"kind":"unspecified"},"fields":[{"name":"api_version","required":true,"value":{"kind":{"kind":"string"},"nullable":false,"nullish":false,"optional":false}},{"name":"data","required":true,"value":{"kind":{"items":{"kind":{"kind":"reference","reference":"#/components/schemas/Domain"},"nullable":false,"nullish":false,"optional":false},"kind":"array"},"nullable":false,"nullish":false,"optional":false}}],"kind":"object"},"nullable":false,"nullish":false,"optional":false},"DomainResponse": {"extensions":{},"kind":{"additional_properties":{"kind":"unspecified"},"fields":[{"name":"api_version","required":true,"value":{"kind":{"kind":"string"},"nullable":false,"nullish":false,"optional":false}},{"name":"data","required":true,"value":{"kind":{"kind":"reference","reference":"#/components/schemas/Domain"},"nullable":false,"nullish":false,"optional":false}}],"kind":"object"},"nullable":false,"nullish":false,"optional":false},"ErrorResponse": {"extensions":{},"kind":{"additional_properties":{"kind":"unspecified"},"fields":[{"name":"api_version","required":true,"value":{"constraints":{"example":"2026-09-19"},"kind":{"kind":"string"},"nullable":false,"nullish":false,"optional":false}},{"name":"error","required":true,"value":{"kind":{"kind":"reference","reference":"#/components/schemas/ApiError"},"nullable":false,"nullish":false,"optional":false}}],"kind":"object"},"nullable":false,"nullish":false,"optional":false},"EventResponse": {"extensions":{},"kind":{"additional_properties":{"kind":"unspecified"},"fields":[{"name":"api_version","required":true,"value":{"kind":{"kind":"string"},"nullable":false,"nullish":false,"optional":false}},{"name":"event_id","required":true,"value":{"kind":{"kind":"string"},"nullable":false,"nullish":false,"optional":false}},{"name":"received_at","required":true,"value":{"format":"date-time","kind":{"kind":"string"},"nullable":false,"nullish":false,"optional":false}},{"name":"replayed","required":true,"value":{"kind":{"kind":"boolean"},"nullable":false,"nullish":false,"optional":false}}],"kind":"object"},"nullable":false,"nullish":false,"optional":false},"HookCreate": {"extensions":{},"kind":{"additional_properties":{"kind":"unspecified"},"fields":[{"name":"event_types","required":true,"value":{"kind":{"items":{"kind":{"kind":"string"},"nullable":false,"nullish":false,"optional":false},"kind":"array"},"nullable":false,"nullish":false,"optional":false}},{"name":"url","required":true,"value":{"kind":{"kind":"string"},"nullable":false,"nullish":false,"optional":false}}],"kind":"object"},"nullable":false,"nullish":false,"optional":false},"HookUpdate": {"extensions":{},"kind":{"additional_properties":{"kind":"unspecified"},"fields":[{"name":"event_types","required":false,"value":{"kind":{"items":{"kind":{"kind":"string"},"nullable":false,"nullish":false,"optional":false},"kind":"array"},"nullable":true,"nullish":false,"optional":false}},{"name":"status","required":false,"value":{"kind":{"kind":"string"},"nullable":true,"nullish":false,"optional":false}},{"name":"url","required":false,"value":{"kind":{"kind":"string"},"nullable":true,"nullish":false,"optional":false}}],"kind":"object"},"nullable":false,"nullish":false,"optional":false},"InboundListResponse": {"extensions":{},"kind":{"additional_properties":{"kind":"unspecified"},"fields":[{"name":"api_version","required":true,"value":{"kind":{"kind":"string"},"nullable":false,"nullish":false,"optional":false}},{"name":"data","required":true,"value":{"kind":{"items":{"kind":{"kind":"reference","reference":"#/components/schemas/InboundMessage"},"nullable":false,"nullish":false,"optional":false},"kind":"array"},"nullable":false,"nullish":false,"optional":false}}],"kind":"object"},"nullable":false,"nullish":false,"optional":false},"InboundMessage": {"extensions":{},"kind":{"additional_properties":{"kind":"unspecified"},"fields":[{"name":"authentication","required":true,"value":{"kind":{"kind":"any"},"nullable":false,"nullish":false,"optional":false}},{"name":"created_at","required":true,"value":{"format":"date-time","kind":{"kind":"string"},"nullable":false,"nullish":false,"optional":false}},{"name":"delivery_id","required":true,"value":{"kind":{"kind":"string"},"nullable":false,"nullish":false,"optional":false}},{"name":"disposition","required":true,"value":{"constraints":{"example":"quarantined"},"kind":{"kind":"string"},"nullable":false,"nullish":false,"optional":false}},{"name":"envelope_from","required":false,"value":{"kind":{"kind":"string"},"nullable":true,"nullish":false,"optional":false}},{"name":"envelope_to","required":true,"value":{"kind":{"kind":"string"},"nullable":false,"nullish":false,"optional":false}},{"name":"header_from","required":false,"value":{"kind":{"kind":"string"},"nullable":true,"nullish":false,"optional":false}},{"name":"header_to","required":true,"value":{"kind":{"items":{"kind":{"kind":"string"},"nullable":false,"nullish":false,"optional":false},"kind":"array"},"nullable":false,"nullish":false,"optional":false}},{"name":"html_body","required":false,"value":{"kind":{"kind":"string"},"nullable":true,"nullish":false,"optional":false}},{"name":"id","required":true,"value":{"kind":{"kind":"string"},"nullable":false,"nullish":false,"optional":false}},{"name":"in_reply_to","required":false,"value":{"kind":{"kind":"string"},"nullable":true,"nullish":false,"optional":false}},{"name":"malware_verdict","required":true,"value":{"kind":{"kind":"string"},"nullable":false,"nullish":false,"optional":false}},{"name":"message_id","required":false,"value":{"kind":{"kind":"string"},"nullable":true,"nullish":false,"optional":false}},{"name":"received_at","required":true,"value":{"format":"date-time","kind":{"kind":"string"},"nullable":false,"nullish":false,"optional":false}},{"name":"references","required":true,"value":{"kind":{"items":{"kind":{"kind":"string"},"nullable":false,"nullish":false,"optional":false},"kind":"array"},"nullable":false,"nullish":false,"optional":false}},{"name":"release_reason","required":false,"value":{"kind":{"kind":"string"},"nullable":true,"nullish":false,"optional":false}},{"name":"released_at","required":false,"value":{"format":"date-time","kind":{"kind":"string"},"nullable":true,"nullish":false,"optional":false}},{"name":"route_id","required":true,"value":{"kind":{"kind":"string"},"nullable":false,"nullish":false,"optional":false}},{"name":"spam_verdict","required":true,"value":{"kind":{"kind":"string"},"nullable":false,"nullish":false,"optional":false}},{"name":"subject","required":true,"value":{"kind":{"kind":"string"},"nullable":false,"nullish":false,"optional":false}},{"name":"text_body","required":false,"value":{"kind":{"kind":"string"},"nullable":true,"nullish":false,"optional":false}}],"kind":"object"},"nullable":false,"nullish":false,"optional":false},"InboundResponse": {"extensions":{},"kind":{"additional_properties":{"kind":"unspecified"},"fields":[{"name":"api_version","required":true,"value":{"kind":{"kind":"string"},"nullable":false,"nullish":false,"optional":false}},{"name":"data","required":true,"value":{"kind":{"kind":"reference","reference":"#/components/schemas/InboundMessage"},"nullable":false,"nullish":false,"optional":false}}],"kind":"object"},"nullable":false,"nullish":false,"optional":false},"Page": {"extensions":{},"kind":{"additional_properties":{"kind":"unspecified"},"fields":[{"name":"limit","required":true,"value":{"constraints":{"example":"25","maximum":"100","minimum":"1"},"format":"int64","kind":{"kind":"integer"},"nullable":false,"nullish":false,"optional":false}},{"name":"next_offset","required":false,"value":{"constraints":{"example":"25"},"format":"int64","kind":{"kind":"integer"},"nullable":true,"nullish":false,"optional":false}},{"name":"offset","required":true,"value":{"constraints":{"example":"0","minimum":"0"},"format":"int64","kind":{"kind":"integer"},"nullable":false,"nullish":false,"optional":false}}],"kind":"object"},"nullable":false,"nullish":false,"optional":false},"RecipientInput": {"extensions":{},"kind":{"additional_properties":{"kind":"forbidden"},"fields":[{"name":"address","required":true,"value":{"kind":{"kind":"string"},"nullable":false,"nullish":false,"optional":false}},{"name":"reference","required":false,"value":{"kind":{"kind":"string"},"nullable":true,"nullish":false,"optional":false}}],"kind":"object"},"nullable":false,"nullish":false,"optional":false},"RecipientResponse": {"extensions":{},"kind":{"additional_properties":{"kind":"unspecified"},"fields":[{"name":"address","required":true,"value":{"kind":{"kind":"string"},"nullable":false,"nullish":false,"optional":false}},{"name":"eligible_for_processing","required":false,"value":{"kind":{"kind":"boolean"},"nullable":true,"nullish":false,"optional":false}},{"name":"reason_code","required":true,"value":{"kind":{"kind":"string"},"nullable":false,"nullish":false,"optional":false}},{"name":"recipient_send_id","required":true,"value":{"kind":{"kind":"string"},"nullable":false,"nullish":false,"optional":false}},{"name":"state","required":true,"value":{"kind":{"kind":"string"},"nullable":false,"nullish":false,"optional":false}}],"kind":"object"},"nullable":false,"nullish":false,"optional":false},"Segment": {"extensions":{},"kind":{"additional_properties":{"kind":"unspecified"},"fields":[{"name":"created_at","required":true,"value":{"format":"date-time","kind":{"kind":"string"},"nullable":false,"nullish":false,"optional":false}},{"name":"definition","required":true,"value":{"kind":{"kind":"any"},"nullable":false,"nullish":false,"optional":false}},{"name":"id","required":true,"value":{"kind":{"kind":"string"},"nullable":false,"nullish":false,"optional":false}},{"name":"kind","required":true,"value":{"constraints":{"example":"dynamic"},"kind":{"kind":"string"},"nullable":false,"nullish":false,"optional":false}},{"name":"last_evaluated_at","required":false,"value":{"format":"date-time","kind":{"kind":"string"},"nullable":true,"nullish":false,"optional":false}},{"name":"name","required":true,"value":{"kind":{"kind":"string"},"nullable":false,"nullish":false,"optional":false}},{"name":"status","required":true,"value":{"constraints":{"example":"active"},"kind":{"kind":"string"},"nullable":false,"nullish":false,"optional":false}},{"name":"updated_at","required":true,"value":{"format":"date-time","kind":{"kind":"string"},"nullable":false,"nullish":false,"optional":false}},{"name":"version","required":true,"value":{"format":"int32","kind":{"kind":"integer"},"nullable":false,"nullish":false,"optional":false}}],"kind":"object"},"nullable":false,"nullish":false,"optional":false},"SegmentListResponse": {"extensions":{},"kind":{"additional_properties":{"kind":"unspecified"},"fields":[{"name":"api_version","required":true,"value":{"kind":{"kind":"string"},"nullable":false,"nullish":false,"optional":false}},{"name":"data","required":true,"value":{"kind":{"items":{"kind":{"kind":"reference","reference":"#/components/schemas/Segment"},"nullable":false,"nullish":false,"optional":false},"kind":"array"},"nullable":false,"nullish":false,"optional":false}}],"kind":"object"},"nullable":false,"nullish":false,"optional":false},"SegmentResponse": {"extensions":{},"kind":{"additional_properties":{"kind":"unspecified"},"fields":[{"name":"api_version","required":true,"value":{"kind":{"kind":"string"},"nullable":false,"nullish":false,"optional":false}},{"name":"data","required":true,"value":{"kind":{"kind":"reference","reference":"#/components/schemas/Segment"},"nullable":false,"nullish":false,"optional":false}}],"kind":"object"},"nullable":false,"nullish":false,"optional":false},"SendQuery": {"extensions":{},"kind":{"additional_properties":{"kind":"unspecified"},"fields":[{"name":"limit","required":false,"value":{"format":"int64","kind":{"kind":"integer"},"nullable":true,"nullish":false,"optional":false}},{"name":"message_class","required":false,"value":{"kind":{"kind":"string"},"nullable":true,"nullish":false,"optional":false}},{"name":"offset","required":false,"value":{"format":"int64","kind":{"kind":"integer"},"nullable":true,"nullish":false,"optional":false}},{"name":"reference","required":false,"value":{"kind":{"kind":"string"},"nullable":true,"nullish":false,"optional":false}},{"name":"state","required":false,"value":{"kind":{"kind":"string"},"nullable":true,"nullish":false,"optional":false}}],"kind":"object"},"nullable":false,"nullish":false,"optional":false},"SendRequest": {"extensions":{},"kind":{"additional_properties":{"kind":"forbidden"},"fields":[{"name":"html_body","required":false,"value":{"kind":{"kind":"string"},"nullable":true,"nullish":false,"optional":false}},{"name":"message_class","required":true,"value":{"kind":{"kind":"string"},"nullable":false,"nullish":false,"optional":false}},{"name":"purpose_id","required":true,"value":{"kind":{"kind":"string"},"nullable":false,"nullish":false,"optional":false}},{"name":"recipients","required":true,"value":{"kind":{"items":{"kind":{"kind":"reference","reference":"#/components/schemas/RecipientInput"},"nullable":false,"nullish":false,"optional":false},"kind":"array"},"nullable":false,"nullish":false,"optional":false}},{"name":"reference","required":false,"value":{"kind":{"kind":"string"},"nullable":true,"nullish":false,"optional":false}},{"name":"reply_to","required":false,"value":{"kind":{"kind":"string"},"nullable":true,"nullish":false,"optional":false}},{"name":"request_key","required":true,"value":{"kind":{"kind":"string"},"nullable":false,"nullish":false,"optional":false}},{"name":"sender_identity_id","required":true,"value":{"kind":{"kind":"string"},"nullable":false,"nullish":false,"optional":false}},{"name":"subject","required":true,"value":{"kind":{"kind":"string"},"nullable":false,"nullish":false,"optional":false}},{"name":"text_body","required":true,"value":{"kind":{"kind":"string"},"nullable":false,"nullish":false,"optional":false}}],"kind":"object"},"nullable":false,"nullish":false,"optional":false},"SendResponse": {"extensions":{},"kind":{"additional_properties":{"kind":"unspecified"},"fields":[{"name":"accepted_at","required":true,"value":{"format":"date-time","kind":{"kind":"string"},"nullable":false,"nullish":false,"optional":false}},{"name":"api_version","required":true,"value":{"kind":{"kind":"string"},"nullable":false,"nullish":false,"optional":false}},{"name":"reason_code","required":true,"value":{"kind":{"kind":"string"},"nullable":false,"nullish":false,"optional":false}},{"name":"recipients","required":true,"value":{"kind":{"items":{"kind":{"kind":"reference","reference":"#/components/schemas/RecipientResponse"},"nullable":false,"nullish":false,"optional":false},"kind":"array"},"nullable":false,"nullish":false,"optional":false}},{"name":"replayed","required":false,"value":{"kind":{"kind":"boolean"},"nullable":true,"nullish":false,"optional":false}},{"name":"send_id","required":true,"value":{"kind":{"kind":"string"},"nullable":false,"nullish":false,"optional":false}},{"name":"state","required":true,"value":{"kind":{"kind":"string"},"nullable":false,"nullish":false,"optional":false}}],"kind":"object"},"nullable":false,"nullish":false,"optional":false},"SenderIdentity": {"extensions":{},"kind":{"additional_properties":{"kind":"unspecified"},"fields":[{"name":"address","required":true,"value":{"constraints":{"example":"updates@mail.example.com"},"kind":{"kind":"string"},"nullable":false,"nullish":false,"optional":false}},{"name":"created_at","required":true,"value":{"format":"date-time","kind":{"kind":"string"},"nullable":false,"nullish":false,"optional":false}},{"name":"display_name","required":false,"value":{"constraints":{"example":"Example updates"},"kind":{"kind":"string"},"nullable":true,"nullish":false,"optional":false}},{"name":"domain_id","required":false,"value":{"kind":{"kind":"string"},"nullable":true,"nullish":false,"optional":false}},{"name":"id","required":true,"value":{"kind":{"kind":"string"},"nullable":false,"nullish":false,"optional":false}},{"name":"reply_to","required":false,"value":{"kind":{"kind":"string"},"nullable":true,"nullish":false,"optional":false}},{"name":"status","required":true,"value":{"constraints":{"example":"active"},"kind":{"kind":"string"},"nullable":false,"nullish":false,"optional":false}},{"name":"updated_at","required":true,"value":{"format":"date-time","kind":{"kind":"string"},"nullable":false,"nullish":false,"optional":false}}],"kind":"object"},"nullable":false,"nullish":false,"optional":false},"SenderIdentityListResponse": {"extensions":{},"kind":{"additional_properties":{"kind":"unspecified"},"fields":[{"name":"api_version","required":true,"value":{"kind":{"kind":"string"},"nullable":false,"nullish":false,"optional":false}},{"name":"data","required":true,"value":{"kind":{"items":{"kind":{"kind":"reference","reference":"#/components/schemas/SenderIdentity"},"nullable":false,"nullish":false,"optional":false},"kind":"array"},"nullable":false,"nullish":false,"optional":false}}],"kind":"object"},"nullable":false,"nullish":false,"optional":false},"SenderIdentityResponse": {"extensions":{},"kind":{"additional_properties":{"kind":"unspecified"},"fields":[{"name":"api_version","required":true,"value":{"kind":{"kind":"string"},"nullable":false,"nullish":false,"optional":false}},{"name":"data","required":true,"value":{"kind":{"kind":"reference","reference":"#/components/schemas/SenderIdentity"},"nullable":false,"nullish":false,"optional":false}}],"kind":"object"},"nullable":false,"nullish":false,"optional":false},"TrackEventRequest": {"extensions":{},"kind":{"additional_properties":{"kind":"forbidden"},"fields":[{"name":"attributes","required":false,"value":{"kind":{"additional_properties":{"kind":"schema","value":{"kind":{"kind":"any"},"nullable":false,"nullish":false,"optional":false}},"fields":[],"kind":"object"},"nullable":true,"nullish":false,"optional":false}},{"name":"create_contact","required":false,"value":{"kind":{"kind":"boolean"},"nullable":true,"nullish":false,"optional":false}},{"name":"email","required":true,"value":{"kind":{"kind":"string"},"nullable":false,"nullish":false,"optional":false}},{"name":"event","required":true,"value":{"kind":{"kind":"string"},"nullable":false,"nullish":false,"optional":false}},{"name":"idempotency_key","required":true,"value":{"kind":{"kind":"string"},"nullable":false,"nullish":false,"optional":false}},{"name":"occurred_at","required":false,"value":{"format":"date-time","kind":{"kind":"string"},"nullable":true,"nullish":false,"optional":false}},{"name":"properties","required":false,"value":{"kind":{"additional_properties":{"kind":"schema","value":{"kind":{"kind":"any"},"nullable":false,"nullish":false,"optional":false}},"fields":[],"kind":"object"},"nullable":true,"nullish":false,"optional":false}}],"kind":"object"},"nullable":false,"nullish":false,"optional":false},"UpdateContact": {"extensions":{},"kind":{"additional_properties":{"kind":"unspecified"},"fields":[{"name":"attributes","required":false,"value":{"kind":{"additional_properties":{"kind":"schema","value":{"kind":{"kind":"any"},"nullable":false,"nullish":false,"optional":false}},"fields":[],"kind":"object"},"nullable":true,"nullish":false,"optional":false}},{"name":"first_name","required":false,"value":{"kind":{"kind":"string"},"nullable":true,"nullish":false,"optional":false}},{"name":"last_name","required":false,"value":{"kind":{"kind":"string"},"nullable":true,"nullish":false,"optional":false}},{"name":"locale","required":false,"value":{"kind":{"kind":"string"},"nullable":true,"nullish":false,"optional":false}}],"kind":"object"},"nullable":false,"nullish":false,"optional":false},"Webhook": {"extensions":{},"kind":{"additional_properties":{"kind":"unspecified"},"fields":[{"name":"created_at","required":true,"value":{"format":"date-time","kind":{"kind":"string"},"nullable":false,"nullish":false,"optional":false}},{"name":"event_types","required":true,"value":{"kind":{"items":{"kind":{"kind":"string"},"nullable":false,"nullish":false,"optional":false},"kind":"array"},"nullable":false,"nullish":false,"optional":false}},{"name":"id","required":true,"value":{"kind":{"kind":"string"},"nullable":false,"nullish":false,"optional":false}},{"name":"status","required":true,"value":{"constraints":{"example":"active"},"kind":{"kind":"string"},"nullable":false,"nullish":false,"optional":false}},{"name":"updated_at","required":true,"value":{"format":"date-time","kind":{"kind":"string"},"nullable":false,"nullish":false,"optional":false}},{"name":"url","required":true,"value":{"constraints":{"example":"https://example.com/webhooks/relevate"},"kind":{"kind":"string"},"nullable":false,"nullish":false,"optional":false}}],"kind":"object"},"nullable":false,"nullish":false,"optional":false},"WebhookDelivery": {"extensions":{},"kind":{"additional_properties":{"kind":"unspecified"},"fields":[{"name":"attempt_count","required":true,"value":{"format":"int32","kind":{"kind":"integer"},"nullable":false,"nullish":false,"optional":false}},{"name":"created_at","required":true,"value":{"format":"date-time","kind":{"kind":"string"},"nullable":false,"nullish":false,"optional":false}},{"name":"event_id","required":true,"value":{"kind":{"kind":"string"},"nullable":false,"nullish":false,"optional":false}},{"name":"event_type","required":true,"value":{"kind":{"kind":"string"},"nullable":false,"nullish":false,"optional":false}},{"name":"id","required":true,"value":{"kind":{"kind":"string"},"nullable":false,"nullish":false,"optional":false}},{"name":"last_attempt_at","required":false,"value":{"format":"date-time","kind":{"kind":"string"},"nullable":true,"nullish":false,"optional":false}},{"name":"last_error","required":false,"value":{"kind":{"kind":"string"},"nullable":true,"nullish":false,"optional":false}},{"name":"next_attempt_at","required":false,"value":{"format":"date-time","kind":{"kind":"string"},"nullable":true,"nullish":false,"optional":false}},{"name":"payload","required":true,"value":{"kind":{"kind":"any"},"nullable":false,"nullish":false,"optional":false}},{"name":"state","required":true,"value":{"kind":{"kind":"string"},"nullable":false,"nullish":false,"optional":false}}],"kind":"object"},"nullable":false,"nullish":false,"optional":false},"WebhookDeliveryListResponse": {"extensions":{},"kind":{"additional_properties":{"kind":"unspecified"},"fields":[{"name":"api_version","required":true,"value":{"kind":{"kind":"string"},"nullable":false,"nullish":false,"optional":false}},{"name":"data","required":true,"value":{"kind":{"items":{"kind":{"kind":"reference","reference":"#/components/schemas/WebhookDelivery"},"nullable":false,"nullish":false,"optional":false},"kind":"array"},"nullable":false,"nullish":false,"optional":false}}],"kind":"object"},"nullable":false,"nullish":false,"optional":false},"WebhookListResponse": {"extensions":{},"kind":{"additional_properties":{"kind":"unspecified"},"fields":[{"name":"api_version","required":true,"value":{"kind":{"kind":"string"},"nullable":false,"nullish":false,"optional":false}},{"name":"data","required":true,"value":{"kind":{"items":{"kind":{"kind":"reference","reference":"#/components/schemas/Webhook"},"nullable":false,"nullish":false,"optional":false},"kind":"array"},"nullable":false,"nullish":false,"optional":false}}],"kind":"object"},"nullable":false,"nullish":false,"optional":false},"WebhookResponse": {"extensions":{},"kind":{"additional_properties":{"kind":"unspecified"},"fields":[{"name":"api_version","required":true,"value":{"kind":{"kind":"string"},"nullable":false,"nullish":false,"optional":false}},{"name":"data","required":true,"value":{"kind":{"kind":"reference","reference":"#/components/schemas/Webhook"},"nullable":false,"nullish":false,"optional":false}}],"kind":"object"},"nullable":false,"nullish":false,"optional":false} };
const __poolsterFixtures = createFixtureRuntime(__poolsterSchemas, {"max_attempts":64,"max_depth":8,"overrides":{}});
export const seedPoolsterFixtures = (seed: number | number[]) => __poolsterFixtures.seed(seed);
import type { ApiError } from "../models/ApiError.js";
export function createApiError(__depth = 0): ApiError { return __poolsterFixtures.create("ApiError", __depth) as ApiError; }
import type { ApiPrincipal } from "../models/ApiPrincipal.js";
export function createApiPrincipal(__depth = 0): ApiPrincipal { return __poolsterFixtures.create("ApiPrincipal", __depth) as ApiPrincipal; }
import type { AuthCheckResponse } from "../models/AuthCheckResponse.js";
export function createAuthCheckResponse(__depth = 0): AuthCheckResponse { return __poolsterFixtures.create("AuthCheckResponse", __depth) as AuthCheckResponse; }
import type { Contact } from "../models/Contact.js";
export function createContact(__depth = 0): Contact { return __poolsterFixtures.create("Contact", __depth) as Contact; }
import type { ContactListResponse } from "../models/ContactListResponse.js";
export function createContactListResponse(__depth = 0): ContactListResponse { return __poolsterFixtures.create("ContactListResponse", __depth) as ContactListResponse; }
import type { ContactQuery } from "../models/ContactQuery.js";
export function createContactQuery(__depth = 0): ContactQuery { return __poolsterFixtures.create("ContactQuery", __depth) as ContactQuery; }
import type { ContactQueryResponse } from "../models/ContactQueryResponse.js";
export function createContactQueryResponse(__depth = 0): ContactQueryResponse { return __poolsterFixtures.create("ContactQueryResponse", __depth) as ContactQueryResponse; }
import type { ContactResponse } from "../models/ContactResponse.js";
export function createContactResponse(__depth = 0): ContactResponse { return __poolsterFixtures.create("ContactResponse", __depth) as ContactResponse; }
import type { CreateContact } from "../models/CreateContact.js";
export function createCreateContact(__depth = 0): CreateContact { return __poolsterFixtures.create("CreateContact", __depth) as CreateContact; }
import type { CreateWebhookResponse } from "../models/CreateWebhookResponse.js";
export function createCreateWebhookResponse(__depth = 0): CreateWebhookResponse { return __poolsterFixtures.create("CreateWebhookResponse", __depth) as CreateWebhookResponse; }
import type { CrmActivity } from "../models/CrmActivity.js";
export function createCrmActivity(__depth = 0): CrmActivity { return __poolsterFixtures.create("CrmActivity", __depth) as CrmActivity; }
import type { CrmApiError } from "../models/CrmApiError.js";
export function createCrmApiError(__depth = 0): CrmApiError { return __poolsterFixtures.create("CrmApiError", __depth) as CrmApiError; }
import type { CrmAttributeCreate } from "../models/CrmAttributeCreate.js";
export function createCrmAttributeCreate(__depth = 0): CrmAttributeCreate { return __poolsterFixtures.create("CrmAttributeCreate", __depth) as CrmAttributeCreate; }
import type { CrmAttributeDiscovery } from "../models/CrmAttributeDiscovery.js";
export function createCrmAttributeDiscovery(__depth = 0): CrmAttributeDiscovery { return __poolsterFixtures.create("CrmAttributeDiscovery", __depth) as CrmAttributeDiscovery; }
import type { CrmAttributePatch } from "../models/CrmAttributePatch.js";
export function createCrmAttributePatch(__depth = 0): CrmAttributePatch { return __poolsterFixtures.create("CrmAttributePatch", __depth) as CrmAttributePatch; }
import type { CrmContentPage } from "../models/CrmContentPage.js";
export function createCrmContentPage(__depth = 0): CrmContentPage { return __poolsterFixtures.create("CrmContentPage", __depth) as CrmContentPage; }
import type { CrmCreateList } from "../models/CrmCreateList.js";
export function createCrmCreateList(__depth = 0): CrmCreateList { return __poolsterFixtures.create("CrmCreateList", __depth) as CrmCreateList; }
import type { CrmCreateListEntry } from "../models/CrmCreateListEntry.js";
export function createCrmCreateListEntry(__depth = 0): CrmCreateListEntry { return __poolsterFixtures.create("CrmCreateListEntry", __depth) as CrmCreateListEntry; }
import type { CrmDeletedNote } from "../models/CrmDeletedNote.js";
export function createCrmDeletedNote(__depth = 0): CrmDeletedNote { return __poolsterFixtures.create("CrmDeletedNote", __depth) as CrmDeletedNote; }
import type { CrmDeletedTask } from "../models/CrmDeletedTask.js";
export function createCrmDeletedTask(__depth = 0): CrmDeletedTask { return __poolsterFixtures.create("CrmDeletedTask", __depth) as CrmDeletedTask; }
import type { CrmList } from "../models/CrmList.js";
export function createCrmList(__depth = 0): CrmList { return __poolsterFixtures.create("CrmList", __depth) as CrmList; }
import type { CrmListDeletionResponse } from "../models/CrmListDeletionResponse.js";
export function createCrmListDeletionResponse(__depth = 0): CrmListDeletionResponse { return __poolsterFixtures.create("CrmListDeletionResponse", __depth) as CrmListDeletionResponse; }
import type { CrmListEntriesPage } from "../models/CrmListEntriesPage.js";
export function createCrmListEntriesPage(__depth = 0): CrmListEntriesPage { return __poolsterFixtures.create("CrmListEntriesPage", __depth) as CrmListEntriesPage; }
import type { CrmListEntry } from "../models/CrmListEntry.js";
export function createCrmListEntry(__depth = 0): CrmListEntry { return __poolsterFixtures.create("CrmListEntry", __depth) as CrmListEntry; }
import type { CrmListEntryResponse } from "../models/CrmListEntryResponse.js";
export function createCrmListEntryResponse(__depth = 0): CrmListEntryResponse { return __poolsterFixtures.create("CrmListEntryResponse", __depth) as CrmListEntryResponse; }
import type { CrmListResponse } from "../models/CrmListResponse.js";
export function createCrmListResponse(__depth = 0): CrmListResponse { return __poolsterFixtures.create("CrmListResponse", __depth) as CrmListResponse; }
import type { CrmListsPage } from "../models/CrmListsPage.js";
export function createCrmListsPage(__depth = 0): CrmListsPage { return __poolsterFixtures.create("CrmListsPage", __depth) as CrmListsPage; }
import type { CrmMetadataAttribute } from "../models/CrmMetadataAttribute.js";
export function createCrmMetadataAttribute(__depth = 0): CrmMetadataAttribute { return __poolsterFixtures.create("CrmMetadataAttribute", __depth) as CrmMetadataAttribute; }
import type { CrmMetadataAttributeResponse } from "../models/CrmMetadataAttributeResponse.js";
export function createCrmMetadataAttributeResponse(__depth = 0): CrmMetadataAttributeResponse { return __poolsterFixtures.create("CrmMetadataAttributeResponse", __depth) as CrmMetadataAttributeResponse; }
import type { CrmMetadataAttributesResponse } from "../models/CrmMetadataAttributesResponse.js";
export function createCrmMetadataAttributesResponse(__depth = 0): CrmMetadataAttributesResponse { return __poolsterFixtures.create("CrmMetadataAttributesResponse", __depth) as CrmMetadataAttributesResponse; }
import type { CrmMetadataDeleted } from "../models/CrmMetadataDeleted.js";
export function createCrmMetadataDeleted(__depth = 0): CrmMetadataDeleted { return __poolsterFixtures.create("CrmMetadataDeleted", __depth) as CrmMetadataDeleted; }
import type { CrmMetadataDeletedData } from "../models/CrmMetadataDeletedData.js";
export function createCrmMetadataDeletedData(__depth = 0): CrmMetadataDeletedData { return __poolsterFixtures.create("CrmMetadataDeletedData", __depth) as CrmMetadataDeletedData; }
import type { CrmMetadataObject } from "../models/CrmMetadataObject.js";
export function createCrmMetadataObject(__depth = 0): CrmMetadataObject { return __poolsterFixtures.create("CrmMetadataObject", __depth) as CrmMetadataObject; }
import type { CrmMetadataObjectResponse } from "../models/CrmMetadataObjectResponse.js";
export function createCrmMetadataObjectResponse(__depth = 0): CrmMetadataObjectResponse { return __poolsterFixtures.create("CrmMetadataObjectResponse", __depth) as CrmMetadataObjectResponse; }
import type { CrmNote } from "../models/CrmNote.js";
export function createCrmNote(__depth = 0): CrmNote { return __poolsterFixtures.create("CrmNote", __depth) as CrmNote; }
import type { CrmNoteDocument } from "../models/CrmNoteDocument.js";
export function createCrmNoteDocument(__depth = 0): CrmNoteDocument { return __poolsterFixtures.create("CrmNoteDocument", __depth) as CrmNoteDocument; }
import type { CrmNoteMention } from "../models/CrmNoteMention.js";
export function createCrmNoteMention(__depth = 0): CrmNoteMention { return __poolsterFixtures.create("CrmNoteMention", __depth) as CrmNoteMention; }
import type { CrmNoteWrite } from "../models/CrmNoteWrite.js";
export function createCrmNoteWrite(__depth = 0): CrmNoteWrite { return __poolsterFixtures.create("CrmNoteWrite", __depth) as CrmNoteWrite; }
import type { CrmObjectCreate } from "../models/CrmObjectCreate.js";
export function createCrmObjectCreate(__depth = 0): CrmObjectCreate { return __poolsterFixtures.create("CrmObjectCreate", __depth) as CrmObjectCreate; }
import type { CrmObjectDelete } from "../models/CrmObjectDelete.js";
export function createCrmObjectDelete(__depth = 0): CrmObjectDelete { return __poolsterFixtures.create("CrmObjectDelete", __depth) as CrmObjectDelete; }
import type { CrmObjectDeletionPreview } from "../models/CrmObjectDeletionPreview.js";
export function createCrmObjectDeletionPreview(__depth = 0): CrmObjectDeletionPreview { return __poolsterFixtures.create("CrmObjectDeletionPreview", __depth) as CrmObjectDeletionPreview; }
import type { CrmObjectDeletionPreviewData } from "../models/CrmObjectDeletionPreviewData.js";
export function createCrmObjectDeletionPreviewData(__depth = 0): CrmObjectDeletionPreviewData { return __poolsterFixtures.create("CrmObjectDeletionPreviewData", __depth) as CrmObjectDeletionPreviewData; }
import type { CrmObjectDiscovery } from "../models/CrmObjectDiscovery.js";
export function createCrmObjectDiscovery(__depth = 0): CrmObjectDiscovery { return __poolsterFixtures.create("CrmObjectDiscovery", __depth) as CrmObjectDiscovery; }
import type { CrmObjectPatch } from "../models/CrmObjectPatch.js";
export function createCrmObjectPatch(__depth = 0): CrmObjectPatch { return __poolsterFixtures.create("CrmObjectPatch", __depth) as CrmObjectPatch; }
import type { CrmQualityIssue } from "../models/CrmQualityIssue.js";
export function createCrmQualityIssue(__depth = 0): CrmQualityIssue { return __poolsterFixtures.create("CrmQualityIssue", __depth) as CrmQualityIssue; }
import type { CrmQualityRecord } from "../models/CrmQualityRecord.js";
export function createCrmQualityRecord(__depth = 0): CrmQualityRecord { return __poolsterFixtures.create("CrmQualityRecord", __depth) as CrmQualityRecord; }
import type { CrmQualityResponse } from "../models/CrmQualityResponse.js";
export function createCrmQualityResponse(__depth = 0): CrmQualityResponse { return __poolsterFixtures.create("CrmQualityResponse", __depth) as CrmQualityResponse; }
import type { CrmRecord } from "../models/CrmRecord.js";
export function createCrmRecord(__depth = 0): CrmRecord { return __poolsterFixtures.create("CrmRecord", __depth) as CrmRecord; }
import type { CrmRecordCreate } from "../models/CrmRecordCreate.js";
export function createCrmRecordCreate(__depth = 0): CrmRecordCreate { return __poolsterFixtures.create("CrmRecordCreate", __depth) as CrmRecordCreate; }
import type { CrmRecordPatch } from "../models/CrmRecordPatch.js";
export function createCrmRecordPatch(__depth = 0): CrmRecordPatch { return __poolsterFixtures.create("CrmRecordPatch", __depth) as CrmRecordPatch; }
import type { CrmRecordResponse } from "../models/CrmRecordResponse.js";
export function createCrmRecordResponse(__depth = 0): CrmRecordResponse { return __poolsterFixtures.create("CrmRecordResponse", __depth) as CrmRecordResponse; }
import type { CrmTask } from "../models/CrmTask.js";
export function createCrmTask(__depth = 0): CrmTask { return __poolsterFixtures.create("CrmTask", __depth) as CrmTask; }
import type { CrmTaskCreate } from "../models/CrmTaskCreate.js";
export function createCrmTaskCreate(__depth = 0): CrmTaskCreate { return __poolsterFixtures.create("CrmTaskCreate", __depth) as CrmTaskCreate; }
import type { CrmTaskPatch } from "../models/CrmTaskPatch.js";
export function createCrmTaskPatch(__depth = 0): CrmTaskPatch { return __poolsterFixtures.create("CrmTaskPatch", __depth) as CrmTaskPatch; }
import type { CrmUpdateList } from "../models/CrmUpdateList.js";
export function createCrmUpdateList(__depth = 0): CrmUpdateList { return __poolsterFixtures.create("CrmUpdateList", __depth) as CrmUpdateList; }
import type { CrmUpdateListEntry } from "../models/CrmUpdateListEntry.js";
export function createCrmUpdateListEntry(__depth = 0): CrmUpdateListEntry { return __poolsterFixtures.create("CrmUpdateListEntry", __depth) as CrmUpdateListEntry; }
import type { CrmUpsert } from "../models/CrmUpsert.js";
export function createCrmUpsert(__depth = 0): CrmUpsert { return __poolsterFixtures.create("CrmUpsert", __depth) as CrmUpsert; }
import type { Domain } from "../models/Domain.js";
export function createDomain(__depth = 0): Domain { return __poolsterFixtures.create("Domain", __depth) as Domain; }
import type { DomainListResponse } from "../models/DomainListResponse.js";
export function createDomainListResponse(__depth = 0): DomainListResponse { return __poolsterFixtures.create("DomainListResponse", __depth) as DomainListResponse; }
import type { DomainResponse } from "../models/DomainResponse.js";
export function createDomainResponse(__depth = 0): DomainResponse { return __poolsterFixtures.create("DomainResponse", __depth) as DomainResponse; }
import type { ErrorResponse } from "../models/ErrorResponse.js";
export function createErrorResponse(__depth = 0): ErrorResponse { return __poolsterFixtures.create("ErrorResponse", __depth) as ErrorResponse; }
import type { EventResponse } from "../models/EventResponse.js";
export function createEventResponse(__depth = 0): EventResponse { return __poolsterFixtures.create("EventResponse", __depth) as EventResponse; }
import type { HookCreate } from "../models/HookCreate.js";
export function createHookCreate(__depth = 0): HookCreate { return __poolsterFixtures.create("HookCreate", __depth) as HookCreate; }
import type { HookUpdate } from "../models/HookUpdate.js";
export function createHookUpdate(__depth = 0): HookUpdate { return __poolsterFixtures.create("HookUpdate", __depth) as HookUpdate; }
import type { InboundListResponse } from "../models/InboundListResponse.js";
export function createInboundListResponse(__depth = 0): InboundListResponse { return __poolsterFixtures.create("InboundListResponse", __depth) as InboundListResponse; }
import type { InboundMessage } from "../models/InboundMessage.js";
export function createInboundMessage(__depth = 0): InboundMessage { return __poolsterFixtures.create("InboundMessage", __depth) as InboundMessage; }
import type { InboundResponse } from "../models/InboundResponse.js";
export function createInboundResponse(__depth = 0): InboundResponse { return __poolsterFixtures.create("InboundResponse", __depth) as InboundResponse; }
import type { Page } from "../models/Page.js";
export function createPage(__depth = 0): Page { return __poolsterFixtures.create("Page", __depth) as Page; }
import type { RecipientInput } from "../models/RecipientInput.js";
export function createRecipientInput(__depth = 0): RecipientInput { return __poolsterFixtures.create("RecipientInput", __depth) as RecipientInput; }
import type { RecipientResponse } from "../models/RecipientResponse.js";
export function createRecipientResponse(__depth = 0): RecipientResponse { return __poolsterFixtures.create("RecipientResponse", __depth) as RecipientResponse; }
import type { Segment } from "../models/Segment.js";
export function createSegment(__depth = 0): Segment { return __poolsterFixtures.create("Segment", __depth) as Segment; }
import type { SegmentListResponse } from "../models/SegmentListResponse.js";
export function createSegmentListResponse(__depth = 0): SegmentListResponse { return __poolsterFixtures.create("SegmentListResponse", __depth) as SegmentListResponse; }
import type { SegmentResponse } from "../models/SegmentResponse.js";
export function createSegmentResponse(__depth = 0): SegmentResponse { return __poolsterFixtures.create("SegmentResponse", __depth) as SegmentResponse; }
import type { SendQuery } from "../models/SendQuery.js";
export function createSendQuery(__depth = 0): SendQuery { return __poolsterFixtures.create("SendQuery", __depth) as SendQuery; }
import type { SendRequest } from "../models/SendRequest.js";
export function createSendRequest(__depth = 0): SendRequest { return __poolsterFixtures.create("SendRequest", __depth) as SendRequest; }
import type { SendResponse } from "../models/SendResponse.js";
export function createSendResponse(__depth = 0): SendResponse { return __poolsterFixtures.create("SendResponse", __depth) as SendResponse; }
import type { SenderIdentity } from "../models/SenderIdentity.js";
export function createSenderIdentity(__depth = 0): SenderIdentity { return __poolsterFixtures.create("SenderIdentity", __depth) as SenderIdentity; }
import type { SenderIdentityListResponse } from "../models/SenderIdentityListResponse.js";
export function createSenderIdentityListResponse(__depth = 0): SenderIdentityListResponse { return __poolsterFixtures.create("SenderIdentityListResponse", __depth) as SenderIdentityListResponse; }
import type { SenderIdentityResponse } from "../models/SenderIdentityResponse.js";
export function createSenderIdentityResponse(__depth = 0): SenderIdentityResponse { return __poolsterFixtures.create("SenderIdentityResponse", __depth) as SenderIdentityResponse; }
import type { TrackEventRequest } from "../models/TrackEventRequest.js";
export function createTrackEventRequest(__depth = 0): TrackEventRequest { return __poolsterFixtures.create("TrackEventRequest", __depth) as TrackEventRequest; }
import type { UpdateContact } from "../models/UpdateContact.js";
export function createUpdateContact(__depth = 0): UpdateContact { return __poolsterFixtures.create("UpdateContact", __depth) as UpdateContact; }
import type { Webhook } from "../models/Webhook.js";
export function createWebhook(__depth = 0): Webhook { return __poolsterFixtures.create("Webhook", __depth) as Webhook; }
import type { WebhookDelivery } from "../models/WebhookDelivery.js";
export function createWebhookDelivery(__depth = 0): WebhookDelivery { return __poolsterFixtures.create("WebhookDelivery", __depth) as WebhookDelivery; }
import type { WebhookDeliveryListResponse } from "../models/WebhookDeliveryListResponse.js";
export function createWebhookDeliveryListResponse(__depth = 0): WebhookDeliveryListResponse { return __poolsterFixtures.create("WebhookDeliveryListResponse", __depth) as WebhookDeliveryListResponse; }
import type { WebhookListResponse } from "../models/WebhookListResponse.js";
export function createWebhookListResponse(__depth = 0): WebhookListResponse { return __poolsterFixtures.create("WebhookListResponse", __depth) as WebhookListResponse; }
import type { WebhookResponse } from "../models/WebhookResponse.js";
export function createWebhookResponse(__depth = 0): WebhookResponse { return __poolsterFixtures.create("WebhookResponse", __depth) as WebhookResponse; }
