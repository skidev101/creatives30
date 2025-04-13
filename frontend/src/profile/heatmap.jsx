/* eslint-disable no-unused-vars */
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { motion } from 'framer-motion';

const Heatmap = () => {
  const darkmode = useSelector((state) => state.darkMode);
  const [data, setData] = useState([]);

  const getColor = (count) => {
    if (count === 0) return darkmode ? 'bg-neutral-800' : 'bg-white'; //miss days
    return 'bg-blue-500'; // submitted days
  };

  useEffect(() => {
    
    const vals = [];
    for (let i = 1; i <= 30; i++) {
      vals.push({
        day: i,
        count: Math.random() > 0.3 ? 1 : 0, 
      });
    }
    setData(vals);
  }, []);

  return (
    <section className={`w-full max-w-4xl mx-auto p-4 ${darkmode ? 'bg-[#111313]' : 'bg-white'} rounded-[14px] font-grotesk`}>
      <h3 className={`text-[12px] font-semibold mb-4 uppercase tracking-wider ${
        darkmode ? 'text-neutral-400' : 'text-gray-500'
      }`}>Streak</h3>
      <div className="mb-8 flex justify-center flex-col items-center">
        <div className="grid grid-cols-5 gap-[8px] w-fit">
          {data.map((day) => (
            <motion.div
              key={`day-${day.day}`}
              whileHover={{ scale: 1.1 }}
              className={`${getColor(day.count)} w-5 h-5 rounded-sm border ${
                darkmode ? 'border-neutral-700' : 'border-gray-300'
              }`}
              title={`Day ${day.day}: ${day.count > 0 ? 'Submitted' : 'No activity'}`}
            />
          ))}
        </div>
      
      </div>
    </section>
  );
};

export default Heatmap;