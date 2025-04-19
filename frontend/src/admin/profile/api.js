import { getAuth } from "firebase/auth";

export const fetchVersion = async (versionNumber = 1, page = 1, limit = 15) => {
    try {
      const auth = getAuth();
      const user = auth.currentUser;
  
      if (!user) {
        throw new Error("You must be logged in to fetch version stats");
      }
  
      const idToken = await user.getIdToken();
      
      const response = await fetch(
        `https://xen4-backend.vercel.app/admin/versionStat/${versionNumber}?page=${page}&limit=${limit}`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${idToken}`
          }
        }
      );
  
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to fetch version stats');
      }
  
      return await response.json();
    } catch (error) {
      console.error('Error fetching version stats:', error);
      throw error;
    }
  };