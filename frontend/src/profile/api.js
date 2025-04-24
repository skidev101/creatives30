
import { authFetch } from "../utils/auth";

export const getUser = async (username) => {
    try {
   
    
      const response = await authFetch(
        `https://xen4-backend.vercel.app/users/${username}`,
  );
  
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to fetch User');
      }
  
      return await response.json();
    } catch (error) {
      console.error('Error fetching User:', error);
      throw error;
    }
  };
  