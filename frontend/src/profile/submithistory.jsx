/* eslint-disable no-unused-vars */
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { motion } from 'framer-motion';
import { getAuth } from 'firebase/auth';
import { authFetch } from '../utils/auth';
import SkeletonLoader from '../components/skeleton';
import { getUser } from './api';

const SubmitHistory = () => {
  const darkmode = useSelector((state) => state.darkMode);
  const [commitData, setCommitData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const leaderboard = useSelector((state) => state.leaderboard);
  const currentVersion = leaderboard.currentVersion
  console.log("c", currentVersion)
  const user = useSelector((state) => state.user);
  const getColor = (hasCommits) => {
    return hasCommits 
      ? 'bg-blue-500' 
      : darkmode 
        ? 'bg-neutral-800' 
        : 'bg-white';
  };


  //   const fetchCommitData = async () => {
  //     try {
  //       if (!user) {
  //         throw new Error('User not authenticated');
  //       }

  //       const response = await authFetch('https://xen4-backend.vercel.app/user/commitHistory', {
  //         method: "POST",
        
  //         body: JSON.stringify({ 
  //           version: currentVersion,  // Changed from currentVersion to version
  //           uid: user.uid            // Added uid which backend requires
  //         })
  //       });
        
  //       if (!response.ok) {
  //         throw new Error(`HTTP error! status: ${response.status}`);
  //       }

  //       const data = await response.json();
  //       console.log("Response data:", data);
        
  //       if (!Array.isArray(data?.commitHistory)) {
  //         throw new Error('Invalid data format: expected an array');
  //       }

  //       // setCommitData(data.commitHistory || []);
  //     } catch (error) {
  //       console.error('Fetch error:', error);
  //       setError(error.message);
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  //   fetchCommitData();
  // }, [currentVersion, user]);

     useEffect(() => {
       const loadUser = async () => {
         try {
           setLoading(true);
           const data = await getUser(user.username);
           console.log("users", data)
           console.log("project", data.projects)
           setCommitData(data.commitHistory || [])
         
         } catch (err) {
           setError(err.message);
         } finally {
           setLoading(false);
         }
       };
   
       loadUser();
     }, [user]);
  if (loading) {
    return (
      <section className={`w-full max-w-4xl mx-auto p-4 ${darkmode ? 'bg-[#111313]' : 'bg-white'} rounded-[14px] font-grotesk`}>
        <h3 className={`text-[12px] font-semibold mb-4 uppercase tracking-wider ${
          darkmode ? 'text-gray-500' : 'text-gray-500'
        }`}>
          <SkeletonLoader width={100} height={14} />
        </h3>
        
        <div className="mb-8 flex justify-center flex-col items-center">
          <div className="grid grid-cols-5 gap-[8px] w-fit"> 
            {Array.from({ length: 30 }).map((_, index) => ( 
              <motion.div
                key={`skeleton-${index}`}
                className={`${darkmode ? 'bg-neutral-800' : 'bg-gray-200'} w-5 h-5 rounded-sm ${
                  darkmode ? 'border-neutral-700' : 'border-gray-300'
                }`}
              />
            ))}
          </div>
        </div>
      </section>
    );
  }

  // if (error) {
  //   return (
  //     <section className={`w-full max-w-4xl mx-auto p-4 ${darkmode ? 'bg-[#111313]' : 'bg-white'} rounded-[14px] font-grotesk`}>
  //       <div className="text-red-500">Error: {error}</div>
  //     </section>
  //   );
  // }
  const displayData = Array.from({ length: 30 }).map((_, index) => {
    // If we have commit data for this index, use it, otherwise create empty day
    return commitData[index] || { 
      date: `Day ${index + 1}`, 
      commits: 0 
    };
  });
  return (
    <section className={`w-full max-w-4xl mx-auto p-4 ${darkmode ? 'bg-[#111313]' : 'bg-white'} rounded-[14px] font-grotesk relative group overflow-hidden`}>
              <div className={`absolute top-0 left-0 w-full h-full bg-gradient-to-r ${darkmode ? 'via-neutral-200/20' : 'via-gray-300/50'} from-transparent to-transparent transform -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out`}></div>
      <h3 className={`text-[12px] font-semibold mb-4 uppercase tracking-wider ${
        darkmode ? 'text-neutral-400' : 'text-gray-500'
      }`}>Commit Activity</h3>
      
    
        <div className="mb-8 flex justify-center flex-col items-center">
          <div className="grid grid-cols-5 gap-[8px] w-fit">
          {displayData.map((day, index) => (
            <motion.div
              key={`day-${index}`}
              whileHover={{ scale: 1.1 }}
              className={`${getColor(day.commits > 0)} w-5 h-5 rounded-sm border ${
                darkmode ? 'border-neutral-700' : 'border-gray-300'
              }`}
              title={`${day.date}: ${day.commits > 0 ? `${day.commits} commits` : 'No commits'}`}
            />
          ))}
            
          </div>
        </div>
   
    </section>
  );
};

export default SubmitHistory;