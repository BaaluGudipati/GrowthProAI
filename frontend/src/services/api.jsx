const API_URL = import.meta.env.VITE_API_URL;
export const getBusinessData = async (name, location) => {
  const response = await fetch(`${API_URL}/business-data`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ name, location }),
  });

  if (!response.ok) {
    throw new Error('Failed to fetch business data');
  }

  return response.json();
};

export const regenerateHeadline = async (name, location) => {
  const response = await fetch(
    `${API_URL}/regenerate-headline?name=${encodeURIComponent(name)}&location=${encodeURIComponent(location)}`
  );

  if (!response.ok) {
    throw new Error('Failed to regenerate headline');
  }

  return response.json();
};