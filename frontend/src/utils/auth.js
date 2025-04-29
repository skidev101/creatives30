import { getAuth } from 'firebase/auth';
import { store } from '../store';

export const getToken = async (forceRefresh = false) => {
    try {
      const auth = getAuth();
      await auth.authStateReady(); // Wait for Firebase initialization
      const user = auth.currentUser;
      
      if (!user) {
        // Check if we have user in Redux (page refresh case)
        const reduxState = store.getState();
        if (reduxState.user) {
          throw new Error('Firebase not initialized but Redux has user');
        }
        throw new Error('No authenticated user');
      }
      
      return await user.getIdToken(forceRefresh);
    } catch (error) {
      console.error('Token error:', error);
      throw error;
    }
  };


export const authFetch = async (url, options = {}) => {
    const defaultOptions = {
      method: 'GET', // default method
      headers: {
        'Content-Type': 'application/json',
      },
      ...options
    };
  
    try {
      const token = await getToken();
      // console.log("Sending token:", token)
      const response = await fetch(url, {
        ...defaultOptions,
        headers: {
          ...defaultOptions.headers,
          'Authorization': `Bearer ${token}`
        }
      });
  
      if (response.status === 401) {
        const newToken = await getToken(true); // Force refresh
        const retryResponse = await fetch(url, {
          ...defaultOptions,
          headers: {
            ...defaultOptions.headers,
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