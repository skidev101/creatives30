/* eslint-disable no-unused-vars */
import { subDays, format, isAfter } from 'date-fns';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { motion } from 'framer-motion'; 

const Heatmap = () => {
  const darkmode = useSelector((state) => state.darkMode);
  const [data, setData] = useState([]);

  const getColor = (count, date) => {
    if (isAfter(new Date(date), new Date())) return darkmode ? 'bg-neutral-800' : 'bg-gray-100'; // Upcoming days
    if (count === 0) return darkmode ? 'bg-neutral-800' : 'bg-white'; // Missed days
   
    return 'bg-blue-300'; // Low activity
  };

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
  }, []);

  return (
    <section className={`w-full max-w-4xl mx-auto p-4 ${darkmode ? 'bg-[#111313]' : 'bg-white'} rounded-[14px] font-grotesk`}>
    <div className="mb-8 flex justify-center flex-col items-center">
      <h2 className="text-lg font-semibold mb-4">Activity Heatmap</h2>
      <div className="grid grid-cols-5 gap-[8px] w-fit">
        {data.map((day) => (
          <motion.div
            key={day.date}
            whileHover={{ scale: 1.1 }}
            className={`${getColor(day.count, day.date)} w-5 h-5 rounded-sm border ${
              darkmode ? 'border-neutral-700' : 'border-gray-300'
            }`}
            title={`${format(new Date(day.date), 'MMM d')}: ${day.count > 0 ? `${day.count} submissions` : 'No activity'}`}
          />
        ))}
      </div>
    </div>
    </section>
  );
};

export default Heatmap;