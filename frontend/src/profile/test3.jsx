
import React, { useEffect, useState } from 'react';
import {FiAward,  } from 'react-icons/fi';

import { useSelector } from 'react-redux';





const Achievements = () => {
  const darkmode = useSelector((state) => state.darkMode);

  
  useEffect(() => { 
    setBadges([
      { id: 1, name: "First Project", earned: true },
      { id: 2, name: "5-Day Streak", earned: true },
      { id: 3, name: "Challenge Complete", earned: false },
    ]);
  }, []);


  const [badges, setBadges] = useState([]);

 



  return (
    <div className={`w-full max-w-4xl mx-auto p-4 ${darkmode ? 'bg-[#111313]' : 'bg-white'} rounded-[14px] font-grotesk`}>
      
      <div className="mb-8">
        <h2 className="text-lg font-semibold mb-4">Achievements</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {badges.map((badge) => (
            <div
              key={badge.id}
              className={`p-4 rounded-lg text-center ${badge.earned ? (darkmode ? 'bg-yellow-900/30' : 'bg-yellow-100') : (darkmode ? 'bg-neutral-800' : 'bg-gray-100')}`}
            >
              <FiAward className={`mx-auto text-2xl mb-2 ${badge.earned ? 'text-yellow-500' : (darkmode ? 'text-neutral-600' : 'text-gray-400')}`} />
              <h3 className={`font-medium ${badge.earned ? 'text-yellow-600 dark:text-yellow-400' : (darkmode ? 'text-neutral-500' : 'text-gray-500')}`}>
                {badge.name}
              </h3>
              <p className="text-xs mt-1">
                {badge.earned ? 'Earned!' : 'Keep going!'}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Achievements;