/* eslint-disable no-unused-vars */
import { FiAward, FiFolder,  } from 'react-icons/fi';
import { useSelector } from 'react-redux';
import { motion } from 'framer-motion';
export const Stats = () => {
    const darkmode = useSelector((state) => state.darkMode);
       const StatCard = ({ icon: Icon, title, value, color }) => (
            <motion.div 
                whileHover={{ y: -2 }}
                className={`flex items-center space-x-1 p-2 rounded-xl transition-all ${
                    darkmode ? 'bg-neutral-900 hover:bg-neutral-800' : 'bg-gray-50 hover:bg-gray-100'
                }`}
            >
                <div className={`p-2 rounded-full ${darkmode ? `${color}-900/30` : `${color}-100`}`}>
                    <Icon className={`text-xl ${darkmode ? `text-${color}-400` : `text-${color}-600`}`} />
                </div>
                <div>
                    <p className={`text-xs font-medium ${darkmode ? 'text-neutral-400' : 'text-gray-600'}`}>{title}</p>
                    <p className={`text-xl font-bold ${darkmode ? 'text-white' : 'text-gray-900'}`}>{value}</p>
                </div>
            </motion.div>
        );
        const stats = {
            leaderboardPosition: 5,
            projectsSubmitted: 12,
            streakDays: 7,
            weeklyActivity: 'High'
        };
    
    return(
          <section className={`w-full max-w-4xl mx-auto p-6 rounded-2xl ${darkmode ? 'bg-neutral-900' : 'bg-white'} shadow-sm border ${darkmode ? 'border-neutral-800' : 'border-gray-200'}`}>
                        <h3 className={`text-sm font-semibold mb-4 uppercase tracking-wider ${darkmode ? 'text-neutral-400' : 'text-gray-500'}`}>Your Progress</h3>
                        
                        <div className="grid grid-cols-2 gap-4">
                            <StatCard icon={FiAward} title="Leaderboard Rank" value={`#${stats.leaderboardPosition}`} color="blue" />
                            <StatCard icon={FiFolder} title="Projects Submitted" value={stats.projectsSubmitted} color="green" />
                        </div>
                    </section>
    )
}