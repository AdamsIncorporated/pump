type JsonValue =
  | string
  | number
  | boolean
  | null
  | JsonValue[]
  | { [key: string]: JsonValue };

export default interface UpdatePayload {
  table_name?: string;
  rows?: Record<string, JsonValue>[];
}
