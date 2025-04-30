/* eslint-disable no-unused-vars */
import { FiCalendar } from "react-icons/fi";
import { motion } from 'framer-motion';

export const renderStreakGraph = (darkmode,commitData, projects, streak) => {

  
    const getColor = (hasCommits) => {
      return hasCommits 
        ? 'bg-blue-500' 
        : darkmode 
          ? 'bg-neutral-800' 
          : 'bg-white';
    };
    // Safely get the last streak object


  
    return (
      <div className="flex flex-col gap-1">
      
   {commitData.length > 0 ? (
        <div className="mb-8 flex justify-center flex-col items-center">
          <div className="grid grid-cols-5 gap-[4px] w-fit">
          {[...commitData].map((day, index) => (
              <motion.div
                key={`day-${index}`}
                whileHover={{ scale: 1.1 }}
                className={`${getColor(day.commits)} w-3 h-3 rounded-sm border ${
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
        <div className={`text-xs mt-2 ${darkmode ? 'text-gray-400' : 'text-gray-600'}`}>
          <FiCalendar className="inline mr-1" />
          {streak}  day streak • {projects.length} projects
        </div>
      </div>
    );
  };