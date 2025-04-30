// // utils/useApi.js
// import { useState } from 'react';
// import { authFetch } from '../utils/auth';

// export const useApi = () => {
//   const [loading, setLoading] = useState(false);

//   const callApi = async (url, options) => {
//     setLoading(true);
//     try {
//       const response = await authFetch(url, options);
//       return await response.json();
//     } finally {
//       setLoading(false);
//     }
//   };

//   return { callApi, loading };
// };