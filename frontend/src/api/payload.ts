type JsonValue =
  | string
  | number
  | boolean
  | null
  | JsonValue[]
  | { [key: string]: JsonValue };

export interface UpdatePayload {
  table_name?: string;
  rows?: Record<string, JsonValue>[];
}

export interface DeletePayload {
  table_name?: string;
  ids?: Int32List;
}
