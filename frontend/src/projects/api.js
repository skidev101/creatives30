import { getAuth } from "firebase/auth";

export const getProject = async (username) => {
    try {
      const auth = getAuth();
      const user = auth.currentUser;
  
      if (!user) {
        throw new Error("You must be logged in to fetch");
      }
  
      const idToken = await user.getIdToken();
  
      const response = await fetch(
        `https://xen4-backend.vercel.app/users/${username}`,
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
        throw new Error(errorData.message || 'Failed to fetch User');
      }
  
      return await response.json();
    } catch (error) {
      console.error('Error fetching User:', error);
      throw error;
    }
  };
  