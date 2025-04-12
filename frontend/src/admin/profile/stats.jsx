/* eslint-disable no-unused-vars */
import { useSelector } from 'react-redux';
import { FiAward, FiFolder, FiUsers, FiBarChart2 } from 'react-icons/fi';
import { motion } from 'framer-motion';

export const TodayStats= () => {
    const darkmode = useSelector((state) => state.darkMode);
  // const currentVersion = useSelector((state) => state.currentVersion); 


    // Mock data for today's version stats
    const todaysStats = {
        activeUsers: 142,
        newSubmissions: 28,
        leaderboardChanges: 19,
        // version: currentVersion || 'v7'
        version : "v7"
    };

    const StatCard = ({ icon: Icon, title, value, color }) => (
        <motion.div 
            whileHover={{ y: -2 }}
            className={`flex items-center space-x-3 md:p-3 p-1 rounded-xl transition-all ${
                darkmode ? 'bg-neutral-900 hover:bg-neutral-800' : 'bg-gray-50 hover:bg-gray-100'
            }`}
        >
            <div className={`p-3 rounded-full ${darkmode ? `${color}-900/20` : `${color}-100`}`}>
                <Icon className={`text-xl ${darkmode ? `text-${color}-400` : `text-${color}-600`}`} />
            </div>
            <div>
                <p className={`text-xs font-medium ${darkmode ? 'text-neutral-400' : 'text-gray-600'}`}>{title}</p>
                <p className={`lg:text-xl md:text-md text-sm font-bold ${darkmode ? 'text-white' : 'text-gray-900'}`}>{value}</p>
            </div>
        </motion.div>
    );

    return (
        <div className="space-y-4 font-grotesk">
          
            <section className={`w-full max-w-4xl mx-auto p-6 rounded-2xl ${
                darkmode ? 'bg-neutral-900' : 'bg-white'
            } shadow-sm border ${
                darkmode ? 'border-neutral-800' : 'border-gray-200'
            }`}>
                <div className="flex justify-between items-center mb-4">
                    <h3 className={`text-sm font-semibold uppercase tracking-wider ${
                        darkmode ? 'text-neutral-400' : 'text-gray-500'
                    }`}>
                        Today's Activity ({todaysStats.version})
                    </h3>

                </div>
                
                <div className="grid grid-cols-2 gap-4">
                    <StatCard 
                        icon={FiUsers} 
                        title="Active Users" 
                        value={todaysStats.activeUsers} 
                        color="blue" 
                    />
                    <StatCard 
                        icon={FiFolder} 
                        title="New Submissions" 
                        value={todaysStats.newSubmissions} 
                        color="green" 
                    />
                    <StatCard 
                        icon={FiAward} 
                        title="Leaderboard Changes" 
                        value={todaysStats.leaderboardChanges} 
                        color="red" 
                    />
                    <StatCard 
                        icon={FiBarChart2} 
                        title="Version Performance" 
                        value="92%" 
                        color="yellow" 
                    />
                </div>
            </section>
        </div>
    );
};