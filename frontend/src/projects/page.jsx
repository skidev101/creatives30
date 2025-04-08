import { useState } from 'react';
import { useSelector } from 'react-redux';
import { FiChevronLeft, FiStar, FiExternalLink, FiX } from 'react-icons/fi';

import { ProjectCard } from './projectcard';
import { ProjectModal } from './projectmodal';
import { userProjects } from './projectarray';


export default function ProjectsPage() {
  const darkmode = useSelector((state) => state.darkMode);
  const userId = 1;

  const [selectedProject, setSelectedProject] = useState(null);

  const projects = userProjects[userId] || [];

  return (
    <div className={`w-full max-w-6xl mx-auto mt-4 rounded-[14px] ${darkmode ? 'bg-[#111313]' : 'bg-white'} p-4 md:p-6 font-grotesk`}>
      <div className="flex justify-between  mb-6">
        <div>
        <a
          href="/leaderboard"
          className={`flex items-center mr-4 ${darkmode ? 'text-gray-300 hover:text-white' : 'text-gray-700 hover:text-black'}`}
        >
          <FiChevronLeft className="mr-1" /> Back to Leaderboard
        </a>

        </div>
     <div className='flex  flex-grow justify-end'>
     <h2 className={`text-lg font-bold ${darkmode ? 'text-white' : 'text-gray-900'}`}>
          User {userId}
        </h2>
     </div>
      </div>

      {projects.length > 0 ? (
        <div>
          {projects.map(project => (
            <ProjectCard
              key={project.id}
              project={project}
              darkmode={darkmode}
              onView={(proj) => setSelectedProject(proj)}
            />
          ))}
        </div>
      ) : (
        <div className={`text-center py-8 ${darkmode ? 'text-gray-400' : 'text-gray-600'}`}>
          No projects found for this user.
        </div>
      )}

      <div className={`mt-6 text-sm ${darkmode ? 'text-gray-400' : 'text-gray-600'}`}>
        Showing {projects.length} projects
      </div>

      <ProjectModal project={selectedProject} darkmode={darkmode} onClose={() => setSelectedProject(null)} />
    </div>
  );
}
