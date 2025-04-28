

import { authFetch } from "../utils/auth";

export const getProject = async (username) => {
    try {

      const response = await authFetch(
        `https://xen4-backend.vercel.app/users/${username}`,
        {
          method: 'GET',
       
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

  export const rateProject = async ({ projectId, rating }) => {
    console.log("[rateProject] Starting with:", { projectId, rating });
  
    try {
  
    
    
      const response = await authFetch(`https://xen4-backend.vercel.app/project/rate/${projectId}`, {
        method: "POST",
     
        body: JSON.stringify({ rating }),
      });
    
      console.log("[rateProject] Response received:", response);
    
      if (!response.ok) {
        const errorContent = await response.json();
        console.error("errorresponse", errorContent);
    

      }
    
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("[rateProject]Full error:", error);
   
    }
    
  };
  
  
  export const getProjectRating = async (projectId) => {
    try {
      const response = await authFetch(`https://xen4-backend.vercel.app/project/rate/${projectId}`);
      return await response.json();
    } catch (error) {
      console.error('Error fetching rating:', error);
      throw error;
    }
  };
  
  export const submitComment = async (projectId, comment) => {
    try {
      const response = await authFetch(
        `https://xen4-backend.vercel.app/project/comment/${projectId}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ comment }), // Make sure this matches your backend expectations
        }
      );
  
      if (!response.ok) {
        // Clone the response before reading it
        const errorResponse = response.clone();
        const errorData = await errorResponse.json();
        throw new Error(errorData.message || 'Failed to submit comment');
      }
  
      return await response.json();
    } catch (error) {
      console.error('Error submitting comment:', error);
      throw error;
    }
  };
  export const getProjectComments = async (projectId) => {
    try {
      const response = await authFetch(`https://xen4-backend.vercel.app/project/comment/${projectId}`);
      return await response.json();
    } catch (error) {
      console.error('Error fetching comments:', error);
      throw error;
    }
  };