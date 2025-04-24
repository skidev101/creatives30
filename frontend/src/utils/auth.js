import { getAuth } from 'firebase/auth';

export const getToken = async (forceRefresh = false) => {
  try {
    const auth = getAuth();
    const user = auth.currentUser;
    if (!user) throw new Error('No authenticated user');
    return await user.getIdToken(forceRefresh);
  } catch (error) {
    console.error('Token error:', error);
    throw error; // Re-throw to handle in components
  }
};

export const authFetch = async (url, options = {}) => {
  try {
    const token = await getToken();
    const response = await fetch(url, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
        ...options.headers
      }
    });

    // Auto-retry once if token expired
    if (response.status === 401) {
      const newToken = await getToken(true); // Force refresh
      const retryResponse = await fetch(url, {
        ...options,
        headers: {
          ...options.headers,
          'Authorization': `Bearer ${newToken}`
        }
      });
      return retryResponse;
    }

    return response;
  } catch (error) {
    console.error('API call failed:', error);
    throw error;
  }
};