/* eslint-disable no-unused-vars */
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { motion } from 'framer-motion';
import { getAuth } from 'firebase/auth';
import { authFetch } from '../utils/auth';
import SkeletonLoader from '../components/skeleton';

const SubmitHistory = () => {
  const darkmode = useSelector((state) => state.darkMode);
  const [commitData, setCommitData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const leaderboard = useSelector((state) => state.leaderboard);
  const currentVersion = leaderboard.currentVersion
  const getColor = (hasCommits) => {
    return hasCommits 
      ? 'bg-blue-500' 
      : darkmode 
        ? 'bg-neutral-800' 
        : 'bg-white';
  };

  useEffect(() => {
    const fetchCommitData = async () => {
      try {
        if (!currentVersion) {
          setCommitData([]);
          setLoading(false);
          return;
        }
        const response = await authFetch('https://xen4-backend.vercel.app/user/commitHistory',{
          method:"POST",
          body: JSON.stringify({currentVersion})
        });
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        
        if (!Array.isArray(data?.commitHistory)) {
          throw new Error('Invalid data format: expected an array');
        }

        setCommitData(data.commitHistory || []);
      } catch (error) {
        console.error('Fetch error:', error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCommitData();
  }, [currentVersion]);

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

  if (error) {
    return (
      <section className={`w-full max-w-4xl mx-auto p-4 ${darkmode ? 'bg-[#111313]' : 'bg-white'} rounded-[14px] font-grotesk`}>
        <div className="text-red-500">Error: {error}</div>
      </section>
    );
  }

  return (
    <section className={`w-full max-w-4xl mx-auto p-4 ${darkmode ? 'bg-[#111313]' : 'bg-white'} rounded-[14px] font-grotesk`}>
      <h3 className={`text-[12px] font-semibold mb-4 uppercase tracking-wider ${
        darkmode ? 'text-neutral-400' : 'text-gray-500'
      }`}>Commit Activity</h3>
      
      {commitData.length > 0 ? (
        <div className="mb-8 flex justify-center flex-col items-center">
          <div className="grid grid-cols-5 gap-[8px] w-fit">
          {[...commitData].map((day, index) => (
              <motion.div
                key={`day-${index}`}
                whileHover={{ scale: 1.1 }}
                className={`${getColor(day.commits)} w-5 h-5 rounded-sm border ${
                  darkmode ? 'border-neutral-700' : 'border-gray-300'
                }`}
                title={`${day.date}: ${day.commits ? 'Commits made' : 'No commits'}`}
                
              />
              
            ))}
            
          </div>
        </div>
      ) : (
        <div className={`${darkmode ? " text-gray-300 ":"text-gray-200"}text-center py-4`}>No commit data available</div>
      )}
    </section>
  );
};

export default SubmitHistory;