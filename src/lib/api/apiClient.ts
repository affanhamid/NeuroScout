type ApiMethod = "GET" | "POST" | "PUT" | "DELETE";

interface ApiRequestOptions {
  method?: ApiMethod;
  body?: Record<string, unknown>;
  headers?: Record<string, string>;
}

export const apiClient = async <T>(
  endpoint: string,
  { method = "GET", body, headers }: ApiRequestOptions = {}
): Promise<T> => {
  const response = await fetch(endpoint, {
    method,
    headers: {
      "Content-Type": "application/json",
      ...headers
    },
    body: body ? JSON.stringify(body) : undefined
  });

  const responseData = await response.json();
  
  if (!response.ok) {
    throw new Error(`API request failed: ${JSON.stringify(responseData)}`);
  }

  return responseData;
};