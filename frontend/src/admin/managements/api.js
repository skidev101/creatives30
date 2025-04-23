import { getAuth } from "firebase/auth";

export const addAdmin = async (email) => {
    try {
      const auth = getAuth();
      const user = auth.currentUser;
  
      if (!user) {
        throw new Error("You must be logged in to add an admin");
      }
  
      const idToken = await user.getIdToken();
      const adminData = { email };
  
      const response = await fetch(
        'https://xen4-backend.vercel.app/admin/addAdmin',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${idToken}`
          },
          body: JSON.stringify(adminData)
        }
      );
  
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to add admin");
      }
  
      return await response.json();
    } catch (error) {
      console.error('Error adding admin:', error);
      throw error;
    }
  };
export const fetchAdmins = async (page = 1, limit = 15) => {
    try {
      const auth = getAuth();
      const user = auth.currentUser;
  
      if (!user) {
        throw new Error("You must be logged in to fetch admins");
      }
  
      const idToken = await user.getIdToken();
      
      const response = await fetch(
        `https://xen4-backend.vercel.app/admin/allAdmins?page=${page}&limit=${limit}`,
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
        throw new Error(errorData.message || 'Failed to fetch admins');
      }
  
      return await response.json();
    } catch (error) {
      console.error('Error fetching admins:', error);
      throw error;
    }
  };



  export const fetchUsers = async ( page = 1, limit = 15) => {
    try {
      const auth = getAuth();
      const user = auth.currentUser;
      if (!user) {
        throw new Error("You must be logged in to fetch users");
      }
  
      const idToken = await user.getIdToken();
     
      const response = await fetch(
        `https://xen4-backend.vercel.app/admin/allUsers?page=${page}&limit=${limit}`,
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
        throw new Error(errorData.message || 'Failed to fetch Users');
      }
  
      return await response.json();
    } catch (error) {
      console.error('Error fetching Users:', error);
      throw error;
    }
  };
  export const deleteUser = async (email) => {
    try {
      const auth = getAuth();
      const user = auth.currentUser;
  
      if (!user) {
        throw new Error("You must be logged in to delete users");
      }
  
      const idToken = await user.getIdToken();
      
      const response = await fetch(
        'https://xen4-backend.vercel.app/admin/deleteUser',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${idToken}`
          },
          body: JSON.stringify({ email }) 
        }
      );
  
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to delete user");
      }
  
      return await response.json();
    } catch (error) {
      console.error('Error deleting user:', error);
      throw error;
    }
  };