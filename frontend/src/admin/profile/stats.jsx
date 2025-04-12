import { useSelector } from 'react-redux';
import img from '../../assets/image.png';
import { FiAward, FiFolder, FiUsers, FiBarChart2 } from 'react-icons/fi';
import { motion } from 'framer-motion';

export const TodayStats= () => {
    const darkmode = useSelector((state) => state.darkMode);
    const user = useSelector((state) => state.user);
    const currentVersion = useSelector((state) => state.currentVersion); // Assuming you have version in state

    const currentHour = new Date().getHours();
    let greeting;

    if (currentHour < 12) {
        greeting = "Good Morning!";
    } else if (currentHour < 18) {
        greeting = "Good Afternoon!";
    } else {
        greeting = "Good Evening!";
    }

    // Mock data for today's version stats
    const todaysStats = {
        activeUsers: 142,
        newSubmissions: 28,
        leaderboardChanges: 19,
        version: currentVersion || 'v7'
    };

    const StatCard = ({ icon: Icon, title, value, color }) => (
        <motion.div 
            whileHover={{ y: -2 }}
            className={`flex items-center space-x-3 p-3 rounded-xl transition-all ${
                darkmode ? 'bg-neutral-900 hover:bg-neutral-800' : 'bg-gray-50 hover:bg-gray-100'
            }`}
        >
            <div className={`p-3 rounded-full ${darkmode ? `${color}-900/20` : `${color}-100`}`}>
                <Icon className={`text-xl ${darkmode ? `text-${color}-400` : `text-${color}-600`}`} />
            </div>
            <div>
                <p className={`text-xs font-medium ${darkmode ? 'text-neutral-400' : 'text-gray-600'}`}>{title}</p>
                <p className={`text-xl font-bold ${darkmode ? 'text-white' : 'text-gray-900'}`}>{value}</p>
            </div>
        </motion.div>
    );

    return (
        <div className="space-y-4 font-grotesk">
            {/* Today's Version Stats Section */}
            <section className={`w-full max-w-4xl mx-auto p-6 rounded-2xl ${
                darkmode ? 'bg-neutral-900' : 'bg-white'
            } shadow-sm border ${
                darkmode ? 'border-neutral-800' : 'border-gray-200'
            }`}>
                <div className="flex justify-between items-center mb-4">
                    <h3 className={`text-sm font-semibold uppercase tracking-wider ${
                        darkmode ? 'text-neutral-400' : 'text-gray-500'
                    }`}>
                        Today's Activity (Version {todaysStats.version})
                    </h3>
                    <span className={`text-xs px-2 py-1 rounded-full ${
                        darkmode ? 'bg-blue-900/30 text-blue-400' : 'bg-blue-100 text-blue-800'
                    }`}>
                        {new Date().toLocaleDateString()}
                    </span>
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
                        color="purple" 
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