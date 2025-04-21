// api.js
export const fetchLeaderboardData = async (page = 1, limit = 10, version = '') => {
    try {
      const versionParam = version ? `&ver=${version.replace('v', '')}` : '';
      const url = `https://xen4-backend.vercel.app/leaderboard?page=${page}&limit=${limit}${versionParam}`;

      const response = await fetch(url);
  
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return {
        success: true,
        data: {
          ...data,
          versions: [...new Set(data.data.map(user => `v${user.version}`))]
        }
      };
    } catch (error) {
      console.error('Fetch leaderboard error:', error);
      return {
        success: false,
        error: error.message
      };
    }
};

 
