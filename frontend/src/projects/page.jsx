import { useState } from 'react';
import { useSelector } from 'react-redux';
import { FiChevronLeft, FiStar, FiExternalLink, FiX, FiChevronRight } from 'react-icons/fi';

import { ProjectCard } from './projectcard';
import { ProjectModal } from './projectmodal';
import { userProjects } from './projectarray';
import { Link } from 'react-router-dom';


export default function ProjectsPage() {
  const darkmode = useSelector((state) => state.darkMode);
  const userId = 1;

  const [selectedProject, setSelectedProject] = useState(null);

  const projects = userProjects[userId] || [];
  
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 3;
  const pageCount = Math.ceil(projects.length / rowsPerPage);
  const paginatedprojects = projects.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );

  const handlePageChange = (page) => setCurrentPage(page);

  return (
    <div className={`w-full max-w-6xl mx-auto mt-4 rounded-[14px] ${darkmode ? 'bg-[#111313]' : 'bg-white'} p-4 md:p-6 font-grotesk`}>
      <div className="flex justify-between  mb-6">
        <div>
        <Link
          to={"/leaderboard"}
          className={`flex items-center mr-4 ${darkmode ? 'text-gray-300 hover:text-white' : 'text-gray-700 hover:text-black'}`}
        >
          <FiChevronLeft className="mr-1" /> Back to Leaderboard
        </Link>

        </div>
     <div className='flex  flex-grow justify-end'>
     <h2 className={`text-lg font-bold ${darkmode ? 'text-white' : 'text-gray-900'}`}>
          User {userId}
        </h2>
     </div>
      </div>

      {paginatedprojects.length > 0 ? (
        <div>
          {paginatedprojects.map(project => (
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

      {/* <div className={`mt-6 text-sm ${darkmode ? 'text-gray-400' : 'text-gray-600'}`}>
        Showing {projects.length} projects
      </div> */}
  <div className="flex flex-col md:flex-row justify-between items-center gap-4 mt-4">
               <div className={`text-sm ${darkmode ? 'text-gray-400' : 'text-gray-600'}`}>
                 Showing {(currentPage - 1) * rowsPerPage + 1} to {Math.min(currentPage * rowsPerPage, projects.length)} of {projects.length} entries
               </div>
       
               <div className="flex items-center gap-1">
                 <button
                   onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
                   disabled={currentPage === 1}
                   className={`p-2 rounded-md ${darkmode ? 'text-gray-300 hover:bg-gray-800 disabled:text-gray-600' : 'text-gray-700 hover:bg-gray-100 disabled:text-gray-400'}`}
                 >
                   <FiChevronLeft />
                 </button>
       
                 {Array.from({ length: pageCount }, (_, i) => (
                   <button
                     key={i}
                     onClick={() => handlePageChange(i + 1)}
                     className={`w-8 h-8 rounded-md ${currentPage === i + 1 ? (darkmode ? 'bg-red-800 text-white' : 'bg-blue-600 text-white') : (darkmode ? 'text-gray-300 hover:bg-gray-800' : 'text-gray-700 hover:bg-gray-100')}`}
                   >
                     {i + 1}
                   </button>
                 ))}
       
                 <button
                   onClick={() => handlePageChange(Math.min(pageCount, currentPage + 1))}
                   disabled={currentPage === pageCount}
                   className={`p-2 rounded-md ${darkmode ? 'text-gray-300 hover:bg-gray-800 disabled:text-gray-600' : 'text-gray-700 hover:bg-gray-100 disabled:text-gray-400'}`}
                 >
                   <FiChevronRight />
                 </button>
               </div>
             </div> 
      <ProjectModal project={selectedProject} darkmode={darkmode} onClose={() => setSelectedProject(null)} />
    </div>
  );
}
