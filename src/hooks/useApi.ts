import { useState, useEffect } from 'react';
import { apiGet, apiPost } from '@/utils/api';

export const useGet = (url: string) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!url) return
    const fetchData = async () => {
      try {
        const response = await apiGet(url);
        setData(response);
      } catch (err) {
        const error = err as { message: string }
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [url]);

  return { data, loading, error };
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const usePost = (url: string, params: any) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  useEffect(() => {
    if (!url) return
    const fetchData = async () => {
      try {
        const response = await apiPost(url, params);
        setData(response);
      } catch (err) {
        const error = err as { message: string }
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [params, url]);

  return { data, loading, error };
}
