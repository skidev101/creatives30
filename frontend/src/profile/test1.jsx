/* eslint-disable no-unused-vars */

import React, { useEffect, useState } from 'react';

import { FiGithub, FiExternalLink,} from 'react-icons/fi';
import { motion } from 'framer-motion';
import { useSelector } from 'react-redux';





const ProfileProjects = () => {
  const [expandedProjects, setExpandedProjects] = useState(false);
  const darkmode = useSelector((state) => state.darkMode);

  // Mock data initialization
  useEffect(() => {
  

    // Mock projects data
    setProjects([
      {
        id: 1,
        title: "E-commerce Dashboard",
        day: "Day 3 of 30",
        description: "Built with React and Node.js",
        githubUrl: "#",
        liveUrl: "#",
        image: "https://via.placeholder.com/150",
      },
      {
        id: 2,
        title: "E-commerce Dashboard",
        day: "Day 3 of 30",
        description: "Built with React and Node.js",
        githubUrl: "#",
        liveUrl: "#",
        image: "https://via.placeholder.com/150",
      },
      // Add more projects...
    ]);


  }, []);

  const [projects, setProjects] = useState([]);
 
 

  return (
    <div className={`w-full max-w-4xl mx-auto p-4 ${darkmode ? 'bg-[#111313]' : 'bg-white'} rounded-[14px] font-grotesk`}>

      

  

  

      {/* Projects Section */}
      <div className="mb-8">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">Recent Projects</h2>
          <button 
            onClick={() => setExpandedProjects(!expandedProjects)}
            className={`text-sm ${darkmode ? 'text-blue-400' : 'text-blue-600'}`}
          >
            {expandedProjects ? 'Show Less' : 'View All'}
          </button>
        </div>
        
        <div className="space-y-4">
          {(expandedProjects ? projects : projects.slice(0, 3)).map((project) => (
            <motion.div
              key={project.id}
              whileHover={{ y: -2 }}
              className={`p-4 rounded-lg border ${darkmode ? 'border-neutral-800 bg-neutral-900' : 'border-gray-200 bg-white'}`}
            >
              <div className="flex flex-col md:flex-row gap-4">
                <div className="w-full md:w-32 h-32 bg-gray-200 rounded-lg overflow-hidden">
                  <img src={project.image} alt={project.title} className="w-full h-full object-cover" />
                </div>
                <div className="flex-1">
                  <h3 className="font-medium text-lg mb-1">{project.title}</h3>
                  <p className={`text-sm mb-3 ${darkmode ? 'text-neutral-400' : 'text-gray-600'}`}>
                    {project.day}
                  </p>
                  <p className="mb-4">{project.description}</p>
                  <div className="flex space-x-3">
                    {project.githubUrl && (
                      <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="flex items-center text-sm">
                        <FiGithub className="mr-1" /> Code
                      </a>
                    )}
                    {project.liveUrl && (
                      <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="flex items-center text-sm">
                        <FiExternalLink className="mr-1" /> Live Demo
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProfileProjects;