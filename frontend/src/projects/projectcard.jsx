
import { StarRating } from "./starrating";
import {  FiExternalLink,  } from 'react-icons/fi';
export const ProjectCard = ({ project, darkmode, onView }) => {
  return (
    <div className={`rounded-lg border ${darkmode ? 'border-gray-700 bg-[#1a1a1a]' : 'border-gray-200 bg-white'} p-4 mb-4`}>
       <div className="flex justify-between items-start">
        <div>
          <h3 className={`text-lg font-medium ${darkmode ? 'text-white' : 'text-gray-900'}`}>
            {/* {project?.name} */}<span className={`text-xs px-2 py-1 rounded-full ${darkmode ? 'bg-gray-800 text-blue-400' : 'bg-blue-100 text-blue-800'}`}>
                {"V6"}
              </span>  (day {project?.day}) 
          </h3>
          <p className={`mt-1 ${darkmode ? 'text-gray-400' : 'text-gray-600'}`}>
            {project?.description}
          </p>
      
        </div>
        
        {/* <div className="flex items-center">
          <StarRating rating={project?.rating} darkmode={darkmode} />
          <span className={`ml-2 ${darkmode ? 'text-gray-300' : 'text-gray-700'}`}>
            {project?.rating}
          </span>
        </div> */}
      </div> 
  
      <div className="mt-3 flex flex-wrap gap-2">
  {project.languages.split(',').map((language, index) => (
    <span
      key={index}
      className={`px-2 py-1 rounded-full text-xs ${darkmode ? 'bg-gray-800 text-gray-300' : 'bg-gray-100 text-gray-700'}`}
    >
      {language.trim()} 
    </span>
  ))}
</div>
      {/* <div className="flex  items-start mt-3">
      {project.version && (
              <span className={`text-xs px-2 py-1 rounded-full ${darkmode ? 'bg-gray-800 text-blue-400' : 'bg-blue-100 text-blue-800'}`}>
                {project.version}
              </span>
      )}
        </div> */}
      <div className="mt-4 flex justify-between items-center">
            <a
            href={project.livelink}
            target="_blank"
            rel="noopener noreferrer"
            className={`flex items-center text-sm ${darkmode ? 'text-green-400 hover:text-green-300' : 'text-green-600 hover:text-green-800'}`}
          >
            Live Demo <FiExternalLink className="ml-1" />
          </a>
        <div className="flex flex-col items-end text-right space-y-1">
          <button
            onClick={() => onView(project)}
            className={`flex items-center text-sm ${darkmode ? 'text-blue-400 hover:text-blue-300' : 'text-blue-600 hover:text-blue-800'}`}
          >
            View Project <FiExternalLink className="ml-1" />
          </button>
          
        </div>
      </div>
    </div>
  );
};