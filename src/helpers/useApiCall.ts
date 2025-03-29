import { useState } from 'react';
import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4001/api';

// Custom hook for API calls
const useApiCall = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  interface RequestConfig extends AxiosRequestConfig {
    url: string;
  }

  const request = async ({
    method,
    url,
    data,
    params,
    headers,
  }: RequestConfig): Promise<any> => {
    setIsLoading(true);
    setError(null);

    try {
      const response: AxiosResponse = await axios({
        method,
        url: `${API_BASE_URL}/${url}`,
        data,
        params,
        headers: {
          'Content-Type': 'application/json',
          ...headers, // Allows custom headers (e.g., Authorization token)
        },
      });

      setIsLoading(false);
      return response.data;
    } catch (err: any) {
      setIsLoading(false);
      const errorMessage =
        err?.response?.data?.message || err.message || 'Something went wrong';
      setError(errorMessage);
      console.error('API Call Error:', errorMessage);
      throw new Error(errorMessage);
    }
  };

  return { isLoading, request, error };
};

export default useApiCall;
