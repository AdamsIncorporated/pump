type Endpoint = "create" | "read" | "update" | "delete";

interface ApiOptions<T = any> {
  endpoint?: Endpoint;
  body?: T;
  headers?: Record<string, string>;
}

function getHttpMethod(endpoint: Endpoint): string {
  switch (endpoint) {
    case "create":
      return "POST";
    case "read":
      return "GET";
    case "update":
      return "PUT";
    case "delete":
      return "DELETE";
  }
}

async function api<TResponse = any, TRequest = any>(
  route: string,
  options: ApiOptions<TRequest> = {}
): Promise<TResponse> {
  const { endpoint = "create", body, headers = {} } = options;
  const method = getHttpMethod(endpoint);

  const response = await fetch(`/api/${route}`, {
    method,
    headers: {
      "Content-Type": "application/json",
      ...headers,
    },
    body: method !== "GET" && body ? JSON.stringify(body) : undefined,
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`API error: ${response.status} ${errorText}`);
  }

  return await response.json();
}
