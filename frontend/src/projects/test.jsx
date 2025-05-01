/* eslint-disable no-unused-vars */
import { FiCalendar } from "react-icons/fi";
import { motion } from 'framer-motion';

export const renderStreakGraph = (darkmode, commitData, projects, streak) => {
  const getColor = (hasCommits) => {
    return hasCommits 
      ? 'bg-blue-500' 
      : darkmode 
        ? 'bg-neutral-800' 
        : 'bg-white';
  };

  // Generate 30 days of data (today + 29 previous days)
  
  const displayData = Array.from({ length: 30 }).map((_, index) => {
    // If we have commit data for this index, use it, otherwise create empty day
    return commitData[index] || { 
      date: `Day ${index + 1}`, 
      commits: 0 
    };
  });
  return (
    <div className="flex flex-col gap-1">
    
        <div className="mb-8 flex justify-center flex-col items-center">
          <div className="grid grid-cols-7 gap-[4px] w-fit">
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
    
      <div className={`text-xs mt-2 ${darkmode ? 'text-gray-400' : 'text-gray-600'}`}>
        <FiCalendar className="inline mr-1" />
        {streak} day streak • {projects.length} projects
      </div>
    </div>
  );
};