import React, { useEffect, useState } from 'react';
import { FiAward, FiCalendar, FiTrendingUp } from 'react-icons/fi';
import { useSelector } from 'react-redux';

import { authFetch } from '../utils/auth';
import SkeletonLoader from '../components/skeleton';


const ProgressBar = ({ current, total }) => {
  const percentage = Math.round((current / total) * 100);
  return (
    <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
      <div
        className="bg-blue-600 h-2.5 rounded-full"
        style={{ width: `${percentage}%` }}
      ></div>
    </div>
  );
};

const Streak = () => {
  const [streakData, setStreakData] = useState({
    currentStreak: 0,
    longestStreak: 0,
    completedDays: 0,
    activity: []
  });
  const [loading, setLoading] = useState(true);
  const darkmode = useSelector((state) => state.darkMode);

  useEffect(() => {
    const fetchStreakData = async () => {
      try {
        const response = await authFetch('https://xen4-backend.vercel.app/user/streak')
      

        if (!response.ok) {
          throw new Error(`Failed to fetch streak data: ${response.status}`);
        }

        const data = await response.json();
        console.log("Backend streak data:", data);

        // Calculate completed days from activity
        const completedDays = data.activity.filter(day => day.commited).length;
        
        setStreakData({
          currentStreak: data.streak || 0,
          longestStreak: data.streak || 0, //  not provided
          completedDays,
          activity: data.activity || []
        });

      } catch (error) {
        console.error('Error:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchStreakData();
  }, []);

  if (loading) {
    return (
      <div className={`w-full max-w-4xl mx-auto p-4 ${darkmode ? 'bg-[#111313]' : 'bg-white'} rounded-[14px] font-grotesk`}>
        <div className="mb-8">
          <div className="flex justify-between items-center mb-2">
            <SkeletonLoader width={100} height={24} />
            <SkeletonLoader width={80} height={20} />
          </div>
          <SkeletonLoader height={10} />
        </div>
  
        <div className={`grid grid-cols-1 md:grid-cols-3 gap-4 mb-8 p-4 rounded-lg ${darkmode ? 'bg-neutral-900' : 'bg-gray-50'}`}>
          {[1, 2, 3].map((item) => (
            <div key={item} className="flex items-center space-x-1">
              <SkeletonLoader circle={true} width={32} height={32} />
              <div className="flex-1 ">
                <SkeletonLoader width={80} height={16} className="mb-1" />
                <SkeletonLoader width={80} height={20} />
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className={`w-full max-w-4xl mx-auto p-4 ${darkmode ? 'bg-[#111313]' : 'bg-white'} rounded-[14px] font-grotesk`}>
      <div className="mb-8">
        <div className="flex justify-between items-center mb-2">
          <h2 className={`text-lg font-semibold ${darkmode ? 'text-white' : ''}`}>Progress</h2>
          <span className={`text-sm ${darkmode ? 'text-neutral-400' : 'text-gray-600'}`}>
            {streakData.completedDays} of 30 days
          </span>
        </div>
        <ProgressBar current={streakData.completedDays} total={30} />
      </div>

      <div className={`grid grid-cols-1 md:grid-cols-3 gap-4 mb-8 p-4 rounded-lg ${darkmode ? 'bg-neutral-900' : 'bg-gray-50'}`}>
        <div className="flex items-center space-x-3">
          <FiTrendingUp className={`text-2xl ${darkmode ? 'text-green-400' : 'text-green-600'}`} />
          <div>
            <p className={`text-sm font-medium ${darkmode ? 'text-neutral-400' : ''}`}>Current Streak</p>
            <p className={`text-xl font-bold ${darkmode ? 'text-white' : ''}`}>
              {streakData.currentStreak} {streakData.currentStreak === 1 ? 'day' : 'days'}
            </p>
          </div>
        </div>
        <div className="flex items-center space-x-3">
          <FiAward className={`text-2xl ${darkmode ? 'text-yellow-400' : 'text-yellow-600'}`} />
          <div>
            <p className={`text-sm font-medium ${darkmode ? 'text-neutral-400' : ''}`}>Longest Streak</p>
            <p className={`text-xl font-bold ${darkmode ? 'text-white' : ''}`}>
              {streakData.longestStreak} {streakData.longestStreak === 1 ? 'day' : 'days'}
            </p>
          </div>
        </div>
        <div className="flex items-center space-x-3">
          <FiCalendar className={`text-2xl ${darkmode ? 'text-blue-400' : 'text-blue-600'}`} />
          <div>
            <p className={`text-sm font-medium ${darkmode ? 'text-neutral-400' : ''}`}>Days Completed</p>
            <p className={`text-xl font-bold ${darkmode ? 'text-white' : ''}`}>{streakData.completedDays}/30</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Streak;