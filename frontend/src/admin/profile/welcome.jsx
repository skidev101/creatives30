/* eslint-disable no-unused-vars */
import { useSelector } from 'react-redux';
import img from '../../assets/image.png';
import { FiDatabase,  FiActivity } from 'react-icons/fi';
import { motion } from 'framer-motion';

export const WelcomeAdmin = () => {
    const leaderboard = useSelector((state) => state.leaderboard);
    const darkmode = useSelector((state) => state.darkMode);
    const user = useSelector((state) => state.user);
    const currentHour = new Date().getHours();
    let greeting;

    if (currentHour < 12) {
        greeting = "Good Morning!";
    } else if (currentHour < 18) {
        greeting = "Good Afternoon!";
    } else {
        greeting = "Good Evening!";
    }
    
      // Get current version
      const getCurrentVersion = () => {
        if (!leaderboard.currentVersion) {
            return 'N/A';
        }
        return leaderboard.currentVersion;
    };

    // Get project count from current version data
    const getProjectCount = () => {
        if (!leaderboard.currentVersion || !leaderboard.versions || !leaderboard.versions[leaderboard.currentVersion]) {
            return 0;
        }
        
        const versionData = leaderboard.versions[leaderboard.currentVersion];
        // Check different possible structures
        if (versionData.projectCount !== undefined) {
            return versionData.projectCount;
        } else if (versionData.data?.projectCount !== undefined) {
            return versionData.data.projectCount;
        } else if (Array.isArray(versionData.data)) {
            return versionData.data.length;
        }
        return 0;
    };

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
                <p className={`lg:text-xl md:text-md text-sm font-bold ${darkmode ? 'text-white' : 'text-gray-900'}`}>{value}</p>
            </div>
        </motion.div>
    );

    return (
        <div className="space-y-4 font-grotesk">
            
            <section className={`w-full max-w-4xl mx-auto p-4 rounded-2xl ${
                darkmode ? 'bg-neutral-900' : 'bg-white'
            } shadow-sm border ${
                darkmode ? 'border-neutral-800' : 'border-gray-200'
            }`}>
                <div className="flex items-center space-x-4">
                    <div className="relative">
                        <div className="w-14 h-14 rounded-full overflow-hidden border-2 border-gray-300 dark:border-neutral-700">
                            <img src={img} alt="Profile" className="w-full h-full object-cover" />
                        </div>
                        <div className={`absolute -bottom-1 -right-1 w-5 h-5 rounded-full border-2 ${
                            darkmode ? 'border-neutral-900 bg-green-500' : 'border-white bg-green-500'
                        }`}></div>
                    </div>
                    <div>
                        <h2 className={`text-lg font-semibold ${darkmode ? 'text-white' : 'text-gray-900'}`}>
                            {greeting} 
                        </h2>
                        <p className={`text-sm ${darkmode ? 'text-neutral-400' : 'text-gray-600'}`}>
                            {user?.email || "guest"}
                        </p>
                    </div>
                </div>
            </section>

            <section className={`w-full max-w-4xl mx-auto p-6 rounded-2xl ${
                darkmode ? 'bg-neutral-900' : 'bg-white'
            } shadow-sm border ${
                darkmode ? 'border-neutral-800' : 'border-gray-200'
            }`}>
                <div className="flex justify-between items-center mb-4">
                    <span className={`text-xs px-2 py-1 rounded-full ${
                        darkmode ? 'bg-blue-900/30 text-blue-400' : 'bg-blue-100 text-blue-800'
                    }`}>
                        Current Version
                    </span>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                    <StatCard 
                        icon={FiDatabase} 
                        title="Total Submissions" 
                        value={getProjectCount()} 
                        color="blue" 
                    />
                   
                 
                    <StatCard 
                        icon={FiActivity} 
                        title="Version" 
                        value={getCurrentVersion()} 
                        color="yellow" 
                    />
                </div>
            </section>
        </div>
    );
};