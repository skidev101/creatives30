/* eslint-disable no-unused-vars */

import React, { useEffect, useState } from 'react';

import { FiGithub, FiExternalLink, FiChevronRight, FiChevronLeft,} from 'react-icons/fi';
import { motion } from 'framer-motion';
import { useSelector } from 'react-redux';
import img from '../assets/test.jpg'
import { getUser } from './api';
import SkeletonLoader from '../components/skeleton';


const UserProjects = () => {
  const darkmode = useSelector((state) => state.darkMode);
  const user = useSelector((state) => state.user);
  const [projects, setProjects] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const rowsPerPage = 1;

  const pageCount = Math.ceil(projects.length / rowsPerPage);
  const paginatedprojects = projects.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );

  const handlePageChange = (page) => setCurrentPage(page);




 const [loading, setLoading] = useState(false);
   const [error, setError] = useState();
   
 
 
   useEffect(() => {
     const loadUser = async () => {
       try {
         setLoading(true);
         const data = await getUser(user.username);
         console.log("users", data)
         console.log("project", data.projects)
         setProjects(data.projects);
       
       } catch (err) {
         setError(err.message);
       } finally {
         setLoading(false);
       }
     };
 
     loadUser();
   }, [user]);

   if (loading) {
    return (
      <div className={`w-full max-w-4xl mx-auto p-4 ${darkmode ? 'bg-[#111313]' : 'bg-white'} rounded-[14px] font-grotesk`}>
        <div className="mb-8">
          <div className="flex justify-between items-center mb-4">
            <SkeletonLoader width={150} height={24} />
          </div>
         
          <div className="space-y-4">
            <motion.div className={`p-4 rounded-lg border ${darkmode ? 'border-neutral-800 bg-neutral-900' : 'border-gray-200 bg-white'}`}>
              <div className="flex flex-col md:flex-row gap-4">
            
                <div className="w-full md:w-32 h-32 bg-gray-200 rounded-lg overflow-hidden">
                  <SkeletonLoader height={128} className="h-full" />
                </div>
                
               
                <div className="flex-1 space-y-3">
                  <SkeletonLoader width={120} height={24} />
                  <SkeletonLoader width={80} height={16} />
                  <SkeletonLoader count={3} height={12} />
                  
                  
                  <div className="flex space-x-3">
                    <SkeletonLoader width={60} height={20} />
                    <SkeletonLoader width={80} height={20} />
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
          
        
        </div>
      </div>
    );
  }

  return (
    <div className={`w-full max-w-4xl mx-auto p-4 ${darkmode ? 'bg-[#111313]' : 'bg-white'} rounded-[14px] font-grotesk`}>  
      <div className="mb-8">
        <div className="flex justify-between items-center mb-4">
          <h2 className={`text-lg font-semibold ${darkmode ? "text-white":''}`}>Recent Projects</h2>
      
        </div>
         {paginatedprojects.length > 0 ? (

        <div className="space-y-4">
          {paginatedprojects.map((project) => (
            <motion.div
              key={project.id}
              whileHover={{ y: -2 }}
              className={`p-4 rounded-lg border ${darkmode ? 'border-neutral-800 bg-neutral-900' : 'border-gray-200 bg-white'}`}
            >
              <div className="flex flex-col md:flex-row gap-4">
                <div className="w-full md:w-32 h-32 bg-gray-200 rounded-lg overflow-hidden">
                  <img src={img} alt={project.title} className="w-full h-full object-cover" />
                </div>
                <div className="flex-1">
                  <h3 className={` text-md mb-1 ${darkmode ? "text-neutral-100":''}`}> {project.title.toUpperCase()}</h3>
                  <p className={`text-sm mb-3 ${darkmode ? 'text-neutral-400' : 'text-gray-600'}`}>
                   Day {project.day} of 30
                  </p>
                  <p className={`mb-4 ${darkmode ?"text-white":''}`}>built with {project.languages}</p>
                  <div className="flex space-x-3">
                    {project.repolink && (
                      <a href={project.repolink} target="_blank" rel="noopener noreferrer" className={`flex items-center text-sm ${darkmode ? "text-white":''}`} >
                        <FiGithub className={`mr-1 ${darkmode ?"text-white":''}`}  /> Code
                      </a>
                    )}
                    {project.livelink && (
                      <a href={project.livelink} target="_blank" rel="noopener noreferrer" className={`flex items-center text-sm ${darkmode ? "text-white":''}`}>
                        <FiExternalLink className={`mr-1 ${darkmode ?"text-white":''}`}  /> Live Demo
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
         ) : (
          <p className={` text-center space-y-4 ${darkmode ? 'text-white':''}`}>
            No projects added yet
          </p>
)}
         <div className="flex flex-col md:flex-row justify-between items-center gap-4 mt-4">
               <div className={`text-sm ${darkmode ? 'text-gray-400' : 'text-gray-600'}`}>
                 {(currentPage - 1) * rowsPerPage + 1} to {Math.min(currentPage * rowsPerPage, projects.length)} of {projects.length} projects
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
      </div>
    </div>
  );
};

export default UserProjects;