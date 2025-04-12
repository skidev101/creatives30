/* eslint-disable no-unused-vars */
import { useSelector } from 'react-redux';

import { FiAward, FiFolder, FiTrendingUp, FiActivity, FiStar } from 'react-icons/fi';
import { motion } from 'framer-motion';

export const Top = () => {
    const darkmode = useSelector((state) => state.darkMode);


    const topThree = [
        { id: 1, name: 'Alex Johnson', projects: 42, avatar: 'AJ' },
        { id: 2, name: 'Sam Wilson', projects: 38, avatar: 'SW' },
        { id: 3, name: 'Taylor Smith', projects: 35, avatar: 'TS' }
    ];


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
                            {topThree.map((user, index) => (
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
                            ))}
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};