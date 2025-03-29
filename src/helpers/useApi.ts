import { useState, useEffect } from 'react';
import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';

// Custom hook for API calls
const useApi = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const getHeaders = () => {
    const token = localStorage.getItem('accessToken');
    return {
      Authorization: `Bearer ${token}`,
    };
  };

  const refreshToken = localStorage.getItem('refreshToken');

  interface RequestConfig {
    method: AxiosRequestConfig['method'];
    url: string;
    data?: any;
    params?: any;
    attemptRefresh?: boolean;
  }

  const request = async ({
    method,
    url,
    data = {},
    params = {},
    attemptRefresh = true,
  }: RequestConfig): Promise<any> => {
    setIsLoading(true);
    setError(null);

    try {
      const response: AxiosResponse = await axios({
        method,
        url: `http://localhost:4001/api/${url}`,
        headers: getHeaders(),
        data,
        params,
      });
      return response.data;
    } catch (err: any) {
      if (
        err.response &&
        (err.response.status === 401 || err.response.status === 403) &&
        attemptRefresh &&
        refreshToken == null
      ) {
        try {
          const res: AxiosResponse = await axios.post(
            'users',
            { refreshToken: refreshToken },
            {
              baseURL: 'http://localhost:4001/api/',
            },
          );

          localStorage.setItem('accessToken', res.data.accessToken);
          return request({ method, url, data, params, attemptRefresh: false });
        } catch (refreshError: any) {
          // throw refreshError;
          console.log(refreshError);
        }
      } else {
        setError(err.message || 'An error occurred');
        throw err;
      }
    } finally {
      setIsLoading(false);
    }
  };

  return {
    isLoading,
    error,
    request,
  };
};

export default useApi;
