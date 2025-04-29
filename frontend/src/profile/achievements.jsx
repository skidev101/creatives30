import React, { useEffect, useState } from 'react';
import { FiAward, FiLock } from 'react-icons/fi';
import { useSelector } from 'react-redux';

import { authFetch } from '../utils/auth';
import SkeletonLoader from '../components/skeleton';

const Achievements = () => {
  const darkmode = useSelector((state) => state.darkMode);
  const [badges, setBadges] = useState([]);
  const [loading, setLoading] = useState(true);
  const [streak, setStreak] = useState(0);

  useEffect(() => {
    const fetchStreakData = async () => {
      try {
   
        const response = await authFetch('https://xen4-backend.vercel.app/user/streak', {
          method:"POST",
        })

        if (!response.ok) {
          throw new Error(`Failed to fetch streak data: ${response.status}`);
        }

        const data = await response.json();
        setStreak(data.streak || 0);
        
      } catch (error) {
        console.error('Error fetching streak data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchStreakData();
  }, []);

  useEffect(() => {
    if (!loading) {
      const achievementBadges = [
        { 
          id: 1, 
          name: "First Project", 
          description: "Complete your first project submission",
          earned: streak >= 1,
          icon: <FiAward className="text-2xl" />
        },
        { 
          id: 2, 
          name: "5-Day Streak", 
          description: "Maintain activity for 5 consecutive days",
          earned: streak >= 5,
          icon: <FiAward className="text-2xl" />
        },
        { 
          id: 3, 
          name: "Challenge Master", 
          description: "Complete the 30-day challenge",
          earned: streak >= 30,
          icon: <FiAward className="text-2xl" />
        }
      ];
      setBadges(achievementBadges);
    }
  }, [loading, streak]);

  if (loading) {
    return (
      <div className={`w-full max-w-4xl mx-auto p-4 ${darkmode ? 'bg-[#111313]' : 'bg-white'} rounded-[14px] font-grotesk`}>
        <h2 className={`text-lg font-semibold mb-6 ${darkmode ? 'text-white' : 'text-gray-800'}`}>
          <SkeletonLoader width={180} height={24} />
        </h2>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {[1, 2, 3].map((id) => (
            <div
              key={id}
              className={`relative p-4 rounded-lg border ${
                darkmode ? 'border-gray-700 bg-gray-800/30' : 'border-gray-200 bg-gray-50'
              }`}
            >
              <div className="flex flex-col items-center text-center">
              
                <div className={`mb-3 p-3 rounded-full ${
                  darkmode ? 'bg-gray-700' : 'bg-gray-200'
                }`}>
                  <SkeletonLoader circle={true} width={40} height={40} />
                </div>
               
                <h3 className="w-full">
                  <SkeletonLoader width={120} height={16} className="mx-auto" />
                </h3>
            
                <p className="w-full mt-1">
                  <SkeletonLoader width={100} height={12} className="mx-auto" />
                </p>
              
                <div className="w-full mt-2">
                  <SkeletonLoader width={80} height={20} className="mx-auto" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className={`w-full max-w-4xl mx-auto p-4 ${darkmode ? 'bg-[#111313]' : 'bg-white'} rounded-[14px] font-grotesk`}>
      <h2 className={`text-lg font-semibold mb-6 ${darkmode ? 'text-white' : 'text-gray-800'}`}>
        Your Achievements
      </h2>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {badges.map((badge) => (
          <div
            key={badge.id}
            className={`relative p-4 rounded-lg border transition-all ${
              badge.earned
                ? darkmode 
                  ? 'border-yellow-500/30 bg-yellow-900/10' 
                  : 'border-yellow-400 bg-yellow-50'
                : darkmode 
                  ? 'border-gray-700 bg-gray-800/30' 
                  : 'border-gray-200 bg-gray-50'
            }`}
          >
            {!badge.earned && (
              <div className={`absolute inset-0 flex items-center justify-center rounded-lg ${
                darkmode ? 'bg-black/30' : 'bg-white/80'
              }`}>
                <FiLock className={`text-xl ${
                  darkmode ? 'text-gray-500' : 'text-gray-400'
                }`} />
              </div>
            )}
            
            <div className="flex flex-col items-center text-center">
              <div className={`mb-3 p-3 rounded-full ${
                badge.earned
                  ? darkmode 
                    ? 'bg-yellow-900/20 text-yellow-400' 
                    : 'bg-yellow-100 text-yellow-500'
                  : darkmode 
                    ? 'bg-gray-700 text-gray-500' 
                    : 'bg-gray-200 text-gray-400'
              }`}>
                {badge.icon}
              </div>
              
              <h3 className={`font-medium text-sm ${
                badge.earned
                  ? darkmode ? 'text-yellow-300' : 'text-yellow-600'
                  : darkmode ? 'text-gray-400' : 'text-gray-500'
              }`}>
                {badge.name}
              </h3>
              
              <p className={`text-xs mt-1 ${
                badge.earned
                  ? darkmode ? 'text-yellow-200/80' : 'text-yellow-700'
                  : darkmode ? 'text-gray-500' : 'text-gray-600'
              }`}>
                {badge.description}
              </p>
              
              <span className={`mt-2 text-xs px-2 py-1 rounded-full ${
                badge.earned
                  ? darkmode ? 'bg-yellow-900/30 text-yellow-300' : 'bg-yellow-100 text-yellow-700'
                  : darkmode ? 'bg-gray-700 text-gray-400' : 'bg-gray-200 text-gray-600'
              }`}>
                {badge.earned ? 'Unlocked' : 'Locked'}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Achievements;