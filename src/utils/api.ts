const fetchApi = async (url: string, options: RequestInit = {}) => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}${url}`, {
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
    ...options,
  });

  if (!response.ok) {
    // Handle HTTP errors by throwing an error
    const errorText = await response.text();
    throw new Error(`Error: ${response.status} ${errorText}`);
  }

  // Parse JSON response
  return response.json();
};

export const apiGet = async (url: string) => {
  return fetchApi(url, { method: 'GET' });
};

export const apiPost = async (url: string, body: any) => {
  return fetchApi(url, {
    method: 'POST',
    body: JSON.stringify(body),
  });
};
