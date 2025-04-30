/* eslint-disable no-unused-vars */
import { useSelector } from 'react-redux';
import { FiUsers, FiFolderPlus, FiTrendingUp, FiBarChart2 } from 'react-icons/fi';
import { motion } from 'framer-motion';
import { useEffect, useMemo, useState } from 'react';

export const TodayStats = () => {
    const darkMode = useSelector((state) => state.darkMode);
    const leaderboard = useSelector((state) => state.leaderboard);
    const [dailyData, setDailyData] = useState(null);

    
    useEffect(() => {
        const today = new Date().toISOString().split('T')[0];
        const savedData = JSON.parse(localStorage.getItem('leaderboardDailyStats')) || {};
        
        if (!savedData[today] || savedData[today].version !== leaderboard.currentVersion) {
            const newData = {
                ...savedData,
                [today]: {
                    version: leaderboard.currentVersion,
                    users: [],
                    submissions: 0,
                    timestamp: Date.now()
                }
            };
            localStorage.setItem('leaderboardDailyStats', JSON.stringify(newData));
            setDailyData(newData[today]);
        } else {
            setDailyData(savedData[today]);
        }
    }, [leaderboard.currentVersion]);

    const todaysStats = useMemo(() => {
        if (!leaderboard?.currentVersion || !leaderboard.versions?.[leaderboard.currentVersion]?.data) {
            return {
                activeUsers: 0,
                newSubmissions: 0,
                leaderboardChanges: 0,
                versionPerformance: 0,
                version: 'N/A'
            };
        }

        const currentData = leaderboard.versions[leaderboard.currentVersion].data;
        const userCount = currentData.length;

        // Calculate new submissions (using localStorage tracking)
        const newSubmissions = dailyData?.submissions || 0;

        // Calculate leaderboard changes (placeholder - would need position history)
        const leaderboardChanges = dailyData?.leaderboardChanges || 0;

        // Version performance (percentage of active users/total users)
        const versionPerformance = userCount > 0 ? Math.min(Math.round((userCount / 100) * 100), 100) : 0;

        return {
            activeUsers: userCount,
            newSubmissions:userCount,
            leaderboardChanges,
            versionPerformance,
            version: leaderboard.currentVersion
        };
    }, [leaderboard, dailyData]);

    const StatCard = ({ icon: Icon, title, value, color }) => {
        const colorMap = {
            blue: { bg: darkMode ? 'bg-blue-900/20' : 'bg-blue-100', text: darkMode ? 'text-blue-400' : 'text-blue-600' },
            green: { bg: darkMode ? 'bg-green-900/20' : 'bg-green-100', text: darkMode ? 'text-green-400' : 'text-green-600' },
            red: { bg: darkMode ? 'bg-red-900/20' : 'bg-red-100', text: darkMode ? 'text-red-400' : 'text-red-600' },
            yellow: { bg: darkMode ? 'bg-yellow-900/20' : 'bg-yellow-100', text: darkMode ? 'text-yellow-400' : 'text-yellow-600' }
        };

        return (
            <motion.div 
                whileHover={{ y: -2 }}
                className={`flex items-center space-x-3 p-3 rounded-xl ${
                    darkMode ? 'bg-neutral-800 hover:bg-neutral-700' : 'bg-gray-50 hover:bg-gray-100'
                }`}
            >
                <div className={`p-2 rounded-full ${colorMap[color].bg}`}>
                    <Icon className={`text-lg ${colorMap[color].text}`} />
                </div>
                <div>
                    <p className={`text-xs font-medium ${darkMode ? 'text-neutral-400' : 'text-gray-600'}`}>{title}</p>
                    <p className={`text-lg font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                        {value}
                        {typeof value === 'number' && title !== "Version Performance" && (
                            <span className="text-xs ml-1">today</span>
                        )}
                    </p>
                </div>
            </motion.div>
        );
    };

    return (
        <div className="font-grotesk">
            <section className={`w-full max-w-4xl mx-auto p-5 rounded-xl ${
                darkMode ? 'bg-neutral-900' : 'bg-white'
            } border ${
                darkMode ? 'border-neutral-800' : 'border-gray-200'
            }`}>
                <div className="flex justify-between items-center mb-3">
                    <h3 className={`text-xs font-semibold uppercase tracking-wider ${
                        darkMode ? 'text-neutral-400' : 'text-gray-500'
                    }`}>
                        Daily Activity • {todaysStats.version}
                    </h3>
                    <span className={`text-xs ${darkMode ? 'text-neutral-500' : 'text-gray-400'}`}>
                        {new Date().toLocaleDateString()}
                    </span>
                </div>
                
                <div className="grid grid-cols-2 gap-3">
                    <StatCard 
                        icon={FiUsers} 
                        title="Active Users" 
                        value={todaysStats.activeUsers} 
                        color="blue" 
                    />
                    <StatCard 
                        icon={FiFolderPlus} 
                        title="New Submissions" 
                        value={todaysStats.newSubmissions} 
                        color="green" 
                    />
                    <StatCard 
                        icon={FiTrendingUp} 
                        title="Rank Changes" 
                        value={todaysStats.leaderboardChanges} 
                        color="red" 
                    />
                    <StatCard 
                        icon={FiBarChart2} 
                        title="Version Performance" 
                        value={`${todaysStats.versionPerformance}%`} 
                        color="yellow" 
                    />
                </div>
            </section>
        </div>
    );
};