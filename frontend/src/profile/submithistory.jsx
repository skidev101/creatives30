/* eslint-disable no-unused-vars */
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { motion } from 'framer-motion';
import { getAuth } from 'firebase/auth';

const SubmitHistory = () => {
  const darkmode = useSelector((state) => state.darkMode);
  const [commitData, setCommitData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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
        const auth = getAuth();
        const user = auth.currentUser;
        
        if (!user) {
          throw new Error('User not authenticated');
        }

        const idToken = await user.getIdToken();
        
        const response = await fetch('https://xen4-backend.vercel.app/user/commitHistory', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${idToken}`
          }
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        
        // Ensure data is an array before setting state
        if (!Array.isArray(data?.commitHistory)) {
          throw new Error('Invalid data format: expected an array');
        }

        setCommitData([...data.commitHistory].reverse() || []);
    
      } catch (error) {
        console.error('Error fetching commit history:', error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCommitData();
  }, []);

  if (loading) {
    return (
      <section className={`w-full max-w-4xl mx-auto p-4 ${darkmode ? 'bg-[#111313]' : 'bg-white'} rounded-[14px] font-grotesk`}>
        <div>Loading commit data...</div>
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
            {commitData.map((day, index) => (
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
        <div className="text-center py-4">No commit data available</div>
      )}
    </section>
  );
};

export default SubmitHistory;