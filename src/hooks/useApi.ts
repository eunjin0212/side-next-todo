import { useState, useEffect } from 'react';
import { apiGet } from '@/utils/api';

export const useApi = (url: string) => {
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
