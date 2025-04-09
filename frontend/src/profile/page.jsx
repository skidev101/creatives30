
// import React, { useEffect, useState } from 'react'

// import { subDays } from 'date-fns'
// import TinyHeatmap from './test'
// import { useSelector } from 'react-redux'

// const ProfilePage = () => {
//   const [data, setData] = useState([])
//   const darkmode = useSelector((state)=> state.darkMode)
//   useEffect(() => {
//     const today = new Date()
//     const vals = []
//     for (let i = 29; i >= 0; i--) {
//       const d = subDays(today, i)
//       vals.push({
//         date: d.toISOString().slice(0, 10),
//         count: Math.floor(Math.random() * 5), // simulate data
//       })
//     }
//     setData(vals)
//   }, [])

//   return (
//      <div className={`inline-flex w-full flex-col items-start border-b justify-start rounded-[14px] border ${darkmode ? 'border-neutral-800' : 'border-slate-100'} ${darkmode ? 'bg-[#111313]' : 'bg-white'} p-6 space-y-6 font-grotesk`}>
//     <div className=" mx-auto p-4">
//       <h1 className="text-base font-semibold mb-2">Version 6</h1>
//       <TinyHeatmap values={data} />
//     </div>
//     </div>
//   )
// }

// export default ProfilePage



import React, { useEffect, useState } from 'react';
import { subDays, format, isToday, isAfter, isBefore } from 'date-fns';
import { FiGithub, FiExternalLink, FiAward, FiCalendar, FiClock, FiTrendingUp, FiSettings } from 'react-icons/fi';
import { motion } from 'framer-motion';
import { useSelector } from 'react-redux';

const TinyHeatmap = ({ values }) => {
  const darkMode = useSelector((state) => state.darkMode);

  const getColor = (count, date) => {
    if (isAfter(new Date(date), new Date())) return darkMode ? 'bg-neutral-800' : 'bg-gray-100'; // Upcoming days
    if (count === 0) return darkMode ? 'bg-neutral-800' : 'bg-white'; // Missed days
    if (count > 3) return 'bg-green-500'; // High activity
    if (count > 1) return 'bg-blue-400'; // Medium activity
    return 'bg-blue-300'; // Low activity
  };

  return (
    <div className="grid grid-cols-5 gap-[8px] w-fit">
      {values.map((day) => (
        <motion.div
          key={day.date}
          whileHover={{ scale: 1.1 }}
          className={`${getColor(day.count, day.date)} w-5 h-5 rounded-sm border ${
            darkMode ? 'border-neutral-700' : 'border-gray-300'
          }`}
          title={`${format(new Date(day.date), 'MMM d')}: ${day.count > 0 ? `${day.count} submissions` : 'No activity'}`}
        />
      ))}
    </div>
  );
};

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

const ProfilePage = () => {
  const [data, setData] = useState([]);
  const [notes, setNotes] = useState({});
  const [expandedProjects, setExpandedProjects] = useState(false);
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

    // Mock projects data
    setProjects([
      {
        id: 1,
        title: "E-commerce Dashboard",
        date: subDays(today, 1).toISOString(),
        description: "Built with React and Node.js",
        githubUrl: "#",
        liveUrl: "#",
        image: "https://via.placeholder.com/150",
      },
      // Add more projects...
    ]);

    // Mock badges
    setBadges([
      { id: 1, name: "First Project", earned: true },
      { id: 2, name: "5-Day Streak", earned: true },
      { id: 3, name: "Challenge Complete", earned: false },
    ]);
  }, []);

  const [projects, setProjects] = useState([]);
  const [badges, setBadges] = useState([]);

  // Calculate streaks
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
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
        <div>
          <h1 className="text-2xl font-bold">My 30-Day Challenge</h1>
          <p className={`${darkmode ? 'text-neutral-400' : 'text-gray-600'}`}>
            Track your coding journey
          </p>
        </div>
        <div className="flex items-center space-x-4 mt-4 md:mt-0">
          <div className={`px-3 py-1 rounded-full ${darkmode ? 'bg-blue-900 text-blue-300' : 'bg-blue-100 text-blue-800'}`}>
            {Math.round((completedDays / 30) * 100)}% Complete
          </div>
          <button className={`p-2 rounded-full ${darkmode ? 'hover:bg-neutral-800' : 'hover:bg-gray-100'}`}>
            <FiSettings className={darkmode ? 'text-neutral-400' : 'text-gray-600'} />
          </button>
        </div>
      </div>

      {/* Stats Overview */}
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

      {/* Progress Section */}
      <div className="mb-8">
        <div className="flex justify-between items-center mb-2">
          <h2 className="text-lg font-semibold">Progress</h2>
          <span className={`text-sm ${darkmode ? 'text-neutral-400' : 'text-gray-600'}`}>
            {completedDays} of 30 days
          </span>
        </div>
        <ProgressBar current={completedDays} total={30} />
      </div>

      {/* Heatmap */}
      <div className="mb-8">
        <h2 className="text-lg font-semibold mb-4">Activity Heatmap</h2>
        <TinyHeatmap values={data} />
      </div>

      {/* Projects Section */}
      <div className="mb-8">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">Recent Projects</h2>
          <button 
            onClick={() => setExpandedProjects(!expandedProjects)}
            className={`text-sm ${darkmode ? 'text-blue-400' : 'text-blue-600'}`}
          >
            {expandedProjects ? 'Show Less' : 'View All'}
          </button>
        </div>
        
        <div className="space-y-4">
          {(expandedProjects ? projects : projects.slice(0, 3)).map((project) => (
            <motion.div
              key={project.id}
              whileHover={{ y: -2 }}
              className={`p-4 rounded-lg border ${darkmode ? 'border-neutral-800 bg-neutral-900' : 'border-gray-200 bg-white'}`}
            >
              <div className="flex flex-col md:flex-row gap-4">
                <div className="w-full md:w-32 h-32 bg-gray-200 rounded-lg overflow-hidden">
                  <img src={project.image} alt={project.title} className="w-full h-full object-cover" />
                </div>
                <div className="flex-1">
                  <h3 className="font-medium text-lg mb-1">{project.title}</h3>
                  <p className={`text-sm mb-3 ${darkmode ? 'text-neutral-400' : 'text-gray-600'}`}>
                    {format(new Date(project.date), 'MMMM d, yyyy')}
                  </p>
                  <p className="mb-4">{project.description}</p>
                  <div className="flex space-x-3">
                    {project.githubUrl && (
                      <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="flex items-center text-sm">
                        <FiGithub className="mr-1" /> Code
                      </a>
                    )}
                    {project.liveUrl && (
                      <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="flex items-center text-sm">
                        <FiExternalLink className="mr-1" /> Live Demo
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Badges Section */}
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

      {/* Notes Section */}
      <div className={`p-4 rounded-lg ${darkmode ? 'bg-neutral-900' : 'bg-gray-50'}`}>
        <h2 className="text-lg font-semibold mb-4">Daily Notes</h2>
        <textarea
          className={`w-full p-3 rounded-lg border ${darkmode ? 'bg-neutral-800 border-neutral-700 text-white' : 'bg-white border-gray-300'}`}
          rows="3"
          placeholder="Today I worked on..."
        ></textarea>
        <div className="flex justify-end mt-2">
          <button className={`px-4 py-2 rounded-lg ${darkmode ? 'bg-blue-800 hover:bg-blue-700' : 'bg-blue-600 hover:bg-blue-700'} text-white`}>
            Save Note
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;