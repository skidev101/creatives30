/* eslint-disable no-unused-vars */
import { useSelector } from 'react-redux';
import { FiStar } from 'react-icons/fi';
import { motion } from 'framer-motion';
import { useMemo } from 'react';  // Add this import

export const Top = () => {
    const darkmode = useSelector((state) => state.darkMode);
    const leaderboard = useSelector((state) => state.leaderboard);

    // Memoize the top three calculation to prevent unnecessary recalculations
    const topThree = useMemo(() => {
        if (!leaderboard || !leaderboard.versions || !leaderboard.currentVersion) {
            return [];
        }

        const currentVersion = leaderboard.versions[leaderboard.currentVersion];
        if (!currentVersion || !currentVersion.data) {
            return [];
        }

        const users = Array.isArray(currentVersion.data) 
            ? currentVersion.data 
            : Object.values(currentVersion.data);

        return users
            .sort((a, b) => (b.projectCount || 0) - (a.projectCount || 0))
            .slice(0, 3)
            .map((user, index) => ({
                id: user.id || index,
                name: user.username || `User ${index + 1}`,
                projects: user.projectCount || 0,
            }));
    }, [leaderboard]);  // Recalculate when leaderboard changes

    return (
        <div className="space-y-4 font-grotesk">
            <section className={`w-full max-w-4xl mx-auto p-6 rounded-2xl ${
                darkmode ? 'bg-neutral-900' : 'bg-white'
            } shadow-sm border ${
                darkmode ? 'border-neutral-800' : 'border-gray-200'
            }`}>
                <div className="">
                    <div>
                        <h3 className={`text-sm font-semibold mb-4 uppercase tracking-wider ${
                            darkmode ? 'text-neutral-400' : 'text-gray-500'
                        }`}>Top Performers</h3>
                        
                        <div className="space-y-3">
                            {topThree.length > 0 ? (
                                topThree.map((user, index) => (
                                    <motion.div 
                                        key={user.id}
                                        whileHover={{ scale: 1.02 }}
                                        className={`flex items-center p-3 rounded-lg ${
                                            darkmode ? 'bg-neutral-800' : 'bg-gray-50'
                                        }`}
                                    >
                                        <div className={`w-8 h-8 rounded-full flex items-center justify-center mr-3 ${
                                            index === 0 ? 'bg-yellow-500/20 text-yellow-500' :
                                            index === 1 ? 'bg-gray-500/20 text-gray-500' :
                                            'bg-amber-700/20 text-amber-700'
                                        }`}>
                                            {index === 0 ? <FiStar className="text-yellow-500" /> : `#${index + 1}`}
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <p className={`text-sm font-medium truncate ${darkmode ? 'text-white' : 'text-gray-900'}`}>
                                                {user.name}
                                            </p>
                                            <p className={`text-xs ${darkmode ? 'text-neutral-400' : 'text-gray-500'}`}>
                                                {user.projects} projects
                                            </p>
                                        </div>
                                    </motion.div>
                                ))
                            ) : (
                                <p className={`text-center py-4 ${darkmode ? 'text-neutral-400' : 'text-gray-500'}`}>
                                    No data available
                                </p>
                            )}
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};