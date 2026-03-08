import { useState, useCallback } from 'react';

interface FetchOptions {
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
  body?: unknown;
  headers?: Record<string, string>;
}

interface FetchState<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
}

interface ApiError {
  message?: string;
}

const useFetch = <T = unknown>(baseUrl: string = '') => {

  const [state, setState] = useState<FetchState<T>>({
    data: null,
    loading: false,
    error: null,
  });

const sendRequest = useCallback(
  async (endpoint: string, options: FetchOptions = {}): Promise<T> => {
    const { method = 'GET', body = null, headers = {} } = options;

    setState((prev) => ({ ...prev, loading: true, error: null }));

    try {
      const response = await fetch(`${baseUrl}${endpoint}`, {
        method,
        headers: {
          'Content-Type': 'application/json',
          ...headers,
        },
        body: body ? JSON.stringify(body) : null,
      });

      const responseData = await response.json();

      if (!response.ok) {
        const errorData = responseData as ApiError;
        throw new Error(errorData.message || `Error: ${response.status}`);
      }

      const data = responseData as T;

      setState({ data, loading: false, error: null });
      return data;
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : 'Something went wrong';

      setState({ data: null, loading: false, error: errorMessage });
      throw err;
    }
  },
  [baseUrl]
);

  return { ...state, sendRequest };
};

export default useFetch;
