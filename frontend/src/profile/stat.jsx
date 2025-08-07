/* eslint-disable no-unused-vars */
import { FiAward, FiFolder } from 'react-icons/fi';
import { useSelector } from 'react-redux';
import { motion } from 'framer-motion';

export const Stats = () => {
    const darkMode = useSelector((state) => state.darkMode);
const user = useSelector((state) => state.user);
const leaderboard = useSelector((state) => state.leaderboard);

    const StatCard = ({ icon: Icon, title, value, color }) => (
        <motion.div 
            whileHover={{ y: -2 }}
            className={`flex items-center space-x-1 p-2 rounded-xl transition-all ${
                darkMode ? 'bg-neutral-900 hover:bg-neutral-800' : 'bg-gray-50 hover:bg-gray-100'
            }`}
        >
            <div className={`p-2 rounded-full ${darkMode ? `${color}-900/30` : `${color}-100`}`}>
                <Icon className={`text-xl ${darkMode ? `text-${color}-400` : `text-${color}-600`}`} />
            </div>
            <div>
                <p className={`text-xs font-medium ${darkMode ? 'text-neutral-400' : 'text-gray-600'}`}>{title}</p>
                <p className={`text-xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>{value}</p>
            </div>
        </motion.div>
    );

    // Calculate leaderboard position
    const calculateLeaderboardPosition = () => {
        if (!leaderboard.currentVersion || !leaderboard.versions[leaderboard.currentVersion]) {
            return 'N/A';
        }

        const currentData = leaderboard.versions[leaderboard.currentVersion].data;
        const sortedUsers = [...currentData].sort((a, b) => b.projectCount - a.projectCount);
        const userIndex = sortedUsers.findIndex(u => u.username === user?.username);
        
        return userIndex >= 0 ? `#${userIndex + 1}` : 'N/A';
    };

    // Get project count from user data
    const getProjectCount = () => {
        if (!leaderboard.currentVersion || !leaderboard.versions[leaderboard.currentVersion]) {
            return 0;
        }

        const currentData = leaderboard.versions[leaderboard.currentVersion].data;
        const userData = currentData.find(u => u.username === user?.username);
        
        return userData?.projectCount || 0;
    };

    return (
        <section className={`w-full max-w-4xl mx-auto p-6 rounded-[14px] ${darkMode ? 'bg-[#111313]' : 'bg-white'} font-grotesk relative group overflow-hidden ${darkMode ? '' : ''}`}>
                    <div className={`absolute top-0 left-0 w-full h-full bg-gradient-to-r ${darkMode ? 'via-neutral-200/20' : 'via-gray-300/50'} from-transparent to-transparent transform -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out`}></div>
            <h3 className={`text-sm font-semibold mb-4 uppercase tracking-wider ${darkMode ? 'text-neutral-400' : 'text-gray-500'}`}>Your Progress</h3>
            
            <div className="grid grid-cols-2 gap-4">
                <StatCard 
                    icon={FiAward} 
                    title="Leaderboard Rank" 
                    value={calculateLeaderboardPosition()} 
                    color="blue" 
                />
                <StatCard 
                    icon={FiFolder} 
                    title="Projects Submitted" 
                    value={getProjectCount()} 
                    color="green" 
                />
            </div>
        </section>
    );
};