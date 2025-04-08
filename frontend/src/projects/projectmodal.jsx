/* eslint-disable no-unused-vars */
import { useState } from 'react';
import { FiX, FiExternalLink, FiGithub, FiCalendar, FiStar, FiThumbsUp } from 'react-icons/fi';

import { StarRating } from './starrating';
import { Review } from './review';
import { AnimatePresence, motion } from 'framer-motion';
import { FadeInUp, FadeUp } from '../components/framer';




export const ProjectModal = ({ project, darkmode, onClose }) => {
    const [reviews, setReviews] = useState([
      { id: 1, user: 'John Doe', text: 'This project is amazing!', likes: 12 },
      { id: 2, user: 'Jane Smith', text: 'Great work, very impressive!', likes: 8 },
    ]);
    
    const handleLike = (reviewId) => {
      setReviews((prevReviews) =>
        prevReviews.map((review) =>
          review.id === reviewId ? { ...review, likes: review.likes + 1 } : review
        )
      );
    };
  
    return (
      <AnimatePresence>
        {project && (
          
            <motion.div
            className="fixed inset-0 bg-opacity-70 flex items-center justify-center z-50 p-4 lg:pl-50 pt-20"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <FadeInUp duration={0.5} distance={50}>
            <div
              className={`relative max-w-4xl w-full rounded-2xl overflow-hidden shadow-2xl ${darkmode ? 'bg-black' : 'bg-white'}`}
            >
             
              <button 
                onClick={onClose} 
                className={`absolute top-4 right-4 z-10 p-2 rounded-full ${darkmode ? 'hover:bg-gray-800' : 'hover:bg-gray-100'}`}
              >
                <FiX size={24} className={darkmode ? 'text-gray-300' : 'text-gray-700'} />
              </button>
  
              <div className="p-6 md:p-8 max-h-[80vh] overflow-y-auto ">
               
                <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 mb-6 pt-7">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h2 className={`text-2xl md:text-3xl font-bold ${darkmode ? 'text-gray-200':''} `}>{project.name}</h2>
                      {project.version && (
                        <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${darkmode ? 'bg-blue-900 text-blue-300' : 'bg-blue-100 text-blue-800'}`}>
                          {project.version}
                        </span>
                      )}
                    </div>
                    
                    {project.day && (
                      <div className="flex items-center gap-2 text-sm mb-3">
                        <FiCalendar className={darkmode ? 'text-blue-400' : 'text-blue-600'} />
                        <span className={` ${darkmode ? "text-gray-200":''}`}>Day {project.day} of 30</span>
                      </div>
                    )}
                    
                    {project.rating && (
                      <StarRating rating={project.rating} darkmode={darkmode} />
                    )}
                  </div>
                  
                  <div className="flex gap-3">
                    {project.liveUrl && (
                      <a 
                        href={project.liveUrl} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className={`flex items-center gap-2 px-4 py-2 rounded-lg ${darkmode ? 'bg-blue-800 hover:bg-blue-700 text-white' : 'bg-blue-100 hover:bg-blue-200 text-blue-800'}`}
                      >
                        <FiExternalLink size={16} />
                        Live Demo
                      </a>
                    )}
                    {project.url && (
                      <a 
                        href={project.url} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className={`flex items-center gap-2 px-4 py-2 rounded-lg ${darkmode ? 'bg-gray-800 hover:bg-gray-700 text-white' : 'bg-gray-100 hover:bg-gray-200 text-gray-800'}`}
                      >
                        <FiGithub size={16} />
                        Code
                      </a>
                    )}
                  </div>
                </div>
  
             
                <div className="mb-6">
                  <h3 className={`text-lg font-semibold mb-2 ${darkmode ? 'text-gray-200' : 'text-gray-800'}`}>Description</h3>
                  <p className={`${darkmode ? 'text-gray-300' : 'text-gray-700'}`}>
                    {project.description}
                  </p>
                </div>
  
              
                {project.tags && (
                  <div className="mb-6">
                    <h3 className={`text-lg font-semibold mb-2 ${darkmode ? 'text-gray-200' : 'text-gray-800'}`}>Languages & Technologies</h3>
                    <div className="flex flex-wrap gap-2">
                      {project.tags.map((tech, index) => (
                        <span 
                          key={index}
                          className={`px-3 py-1 rounded-full text-sm ${darkmode ? 'bg-gray-700 text-blue-400' : 'bg-blue-100 text-blue-800'}`}
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
                {project.images?.length > 0 && (
                  <div className="mb-6">
                    <h3 className={`text-lg font-semibold mb-3 ${darkmode ? 'text-gray-200' : 'text-gray-800'}`}>Project Screenshots</h3>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                      {project.images.map((img, idx) => (
                        <motion.div 
                          key={idx}
                          whileHover={{ scale: 1.03 }}
                          className="overflow-hidden rounded-lg cursor-pointer"
                        >
                          <img
                            src={img}
                            alt={`Screenshot ${idx + 1}`}
                            className="w-full h-32 md:h-40 object-cover"
                          />
                        </motion.div>
                      ))}
                    </div>
                  </div>
                )}

                <div className="mb-6">
                  <h3 className={`text-lg font-semibold mb-2 ${darkmode ? 'text-gray-200' : 'text-gray-800'}`}>Reviews</h3>
                  {reviews.map((review) => (
                    <Review key={review.id} review={review} darkmode={darkmode} onLike={handleLike} />
                  ))}
                </div>
              </div>
            </div>
            </FadeInUp>
          
          </motion.div>
      
        )}
      </AnimatePresence>
    );
  };
