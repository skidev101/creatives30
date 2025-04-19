import { FiCalendar } from "react-icons/fi";

export const renderStreakGraph = (darkmode,projects) => {
    const weeks = 5;
    const daysPerWeek = 6;
    const userData = {
    
      avatar: "https://avatars.githubusercontent.com/u/1?v=4",
      streak: 28, // days
      contributions: Array(30).fill(0).map(() => Math.floor(Math.random() * 5)), // mock contribution data
    };
    return (
      <div className="flex flex-col gap-1">
        <div className="flex gap-1">
          {Array.from({ length: weeks }).map((_, week) => (
            <div key={week} className="flex flex-col gap-1">
              {Array.from({ length: daysPerWeek }).map((_, day) => {
                const level = Math.floor(Math.random() * 4); // 0-3
                return (
                  <div 
                    key={day} 
                    className={`w-3 h-3 rounded-sm ${
                      level === 0 ? (darkmode ? 'bg-gray-800' : 'bg-gray-100') :
                      level === 1 ? (darkmode ? 'bg-green-900' : 'bg-green-300') :
                      level === 2 ? (darkmode ? 'bg-green-700' : 'bg-green-500') :
                      (darkmode ? 'bg-green-500' : 'bg-green-700')
                    }`}
                    title={`${level} contributions`}
                  />
                );
              })}
            </div>
          ))}
        </div>
        <div className={`text-xs mt-2 ${darkmode ? 'text-gray-400' : 'text-gray-600'}`}>
          <FiCalendar className="inline mr-1" />
          {userData.streak} day streak • {projects.length} projects
        </div>
      </div>
    );
  };