import React, { useEffect, useState } from 'react';
import { FiAward, FiLock } from 'react-icons/fi';
import { useSelector } from 'react-redux';

const Achievements = () => {
  const darkmode = useSelector((state) => state.darkMode);
  const [streak, setStreak] = useState(1); // You can set this based on actual logic
  const [badges, setBadges] = useState([]);

  useEffect(() => {
    const allBadges = [
      { id: 1, name: "First Project", earned: streak >= 0 },
      { id: 2, name: "5-Day Streak", earned: streak >= 6 },
      { id: 3, name: "Challenge Complete", earned: false },
    ];
    setBadges(allBadges);
  }, [streak]);

  return (
    <div className={`w-full max-w-4xl mx-auto p-4 ${darkmode ? 'bg-[#111313]' : 'bg-white'} rounded-[14px] font-grotesk`}>
      <div className="mb-8">
        <h2 className={`text-lg font-semibold mb-4 ${darkmode ? "text-white" : ''}`}>Achievements</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {badges.map((badge) => (
            <div
              key={badge.id}
              className={`p-4 rounded-lg text-center relative overflow-hidden ${
                badge.earned 
                  ? (darkmode ? 'bg-yellow-900/30' : 'bg-yellow-100') 
                  : (darkmode ? 'bg-gray-800/50' : 'bg-gray-100')
              }`}
            >
              {!badge.earned && (
                <div className={`absolute inset-0 flex items-center justify-center ${
                  darkmode ? 'bg-black/40' : 'bg-white/70'
                }`}>
                  <FiLock className={`text-xl ${darkmode ? 'text-gray-400' : 'text-gray-500'}`} />
                </div>
              )}
              <FiAward className={`mx-auto text-2xl mb-2 ${
                badge.earned 
                  ? 'text-yellow-500' 
                  : (darkmode ? 'text-gray-500' : 'text-gray-400')
              }`} />
              <h3 className={`font-medium ${
                badge.earned 
                  ? `${darkmode ? 'text-yellow-400' : 'text-yellow-600'}` 
                  : (darkmode ? 'text-gray-400' : 'text-gray-500')
              }`}>
                {badge.name}
              </h3>
              <p className={`text-xs mt-1 ${
                badge.earned 
                  ? (darkmode ? 'text-yellow-200' : 'text-yellow-700') 
                  : (darkmode ? 'text-gray-500' : 'text-gray-600')
              }`}>
                {badge.earned ? 'Earned!' : 'Locked'}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Achievements;