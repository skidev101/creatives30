import React from 'react'
import { useSelector } from 'react-redux'

const TinyHeatmap = ({ values }) => {
  const darkMode = useSelector((state) => state.darkMode)

  const getColor = (count) => {
    if (count > 0) return 'bg-blue-500'
    return darkMode ? 'bg-neutral-800' : 'bg-white'
  }

  return (
    <div className="grid grid-cols-5 gap-[8px] w-fit">
      {values.map((day, index) => (
        <div
          key={day.date}
          className={`${getColor(day.count)} w-5 h-5 rounded-sm border ${darkMode ? 'border-neutral-700' : 'border-gray-300'}`}
          title={`Day ${index + 1}: ${day.count > 0 ? 'Submitted' : 'No activity'}`}
        />
      ))}
    </div>
  )
}

export default TinyHeatmap
