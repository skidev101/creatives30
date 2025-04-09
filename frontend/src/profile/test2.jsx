/* eslint-disable no-unused-vars */


import React, { useEffect, useState } from 'react';
import { subDays,  isToday, isAfter, } from 'date-fns';
import { FiAward, FiCalendar,FiTrendingUp, } from 'react-icons/fi';
import { motion } from 'framer-motion';
import { useSelector } from 'react-redux';

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
  const [data, setData] = useState([]);

  const darkmode = useSelector((state) => state.darkMode);

  // Mock data initialization
  useEffect(() => {
    const today = new Date();
    const vals = [];
    for (let i = 29; i >= 0; i--) {
      const d = subDays(today, i);
      vals.push({
        date: d.toISOString().slice(0, 10),
        count: i % 5 === 0 ? 0 : Math.floor(Math.random() * 5), // simulate some missed days
      });
    }
    setData(vals);
  }, []);



  
  const calculateStreaks = () => {
    let currentStreak = 0;
    let longestStreak = 0;
    let tempStreak = 0;

    data.forEach((day) => {
      if (day.count > 0 && !isAfter(new Date(day.date), new Date())) {
        tempStreak++;
        currentStreak = isToday(new Date(day.date)) ? tempStreak : 0;
        longestStreak = Math.max(longestStreak, tempStreak);
      } else {
        tempStreak = 0;
      }
    });

    return { currentStreak, longestStreak };
  };

  const { currentStreak, longestStreak } = calculateStreaks();
  const completedDays = data.filter(day => day.count > 0 && !isAfter(new Date(day.date), new Date())).length;

  return (
    <div className={`w-full max-w-4xl mx-auto p-4 ${darkmode ? 'bg-[#111313]' : 'bg-white'} rounded-[14px] font-grotesk`}>
      <div className="mb-8">
        <div className="flex justify-between items-center mb-2">
          <h2 className="text-lg font-semibold">Progress</h2>
          <span className={`text-sm ${darkmode ? 'text-neutral-400' : 'text-gray-600'}`}>
            {completedDays} of 30 days
          </span>
        </div>
        <ProgressBar current={completedDays} total={30} />
      </div>

    
      <div className={`grid grid-cols-1 md:grid-cols-3 gap-4 mb-8 p-4 rounded-lg ${darkmode ? 'bg-neutral-900' : 'bg-gray-50'}`}>
        <div className="flex items-center space-x-3">
          <FiTrendingUp className={`text-2xl ${darkmode ? 'text-green-400' : 'text-green-600'}`} />
          <div>
            <p className="text-sm font-medium">Current Streak</p>
            <p className="text-xl font-bold">{currentStreak} days</p>
          </div>
        </div>
        <div className="flex items-center space-x-3">
          <FiAward className={`text-2xl ${darkmode ? 'text-yellow-400' : 'text-yellow-600'}`} />
          <div>
            <p className="text-sm font-medium">Longest Streak</p>
            <p className="text-xl font-bold">{longestStreak} days</p>
          </div>
        </div>
        <div className="flex items-center space-x-3">
          <FiCalendar className={`text-2xl ${darkmode ? 'text-blue-400' : 'text-blue-600'}`} />
          <div>
            <p className="text-sm font-medium">Days Completed</p>
            <p className="text-xl font-bold">{completedDays}/30</p>
          </div>
        </div>
      </div>

      
     

    

  
    </div>
  );
};

export default Streak;