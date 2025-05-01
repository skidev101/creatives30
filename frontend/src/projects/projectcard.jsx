/* eslint-disable no-unused-vars */


import { useEffect, useState } from "react";
import { StarRating } from "./starrating";
import {  FiExternalLink,  } from 'react-icons/fi';
import { getProjectComments, getProjectRating } from "./api";
import { useDispatch, useSelector } from "react-redux";
import { setAverageRating, setReview } from "../action";
export const ProjectCard = ({ project, darkmode, onView }) => {
  // console.log('Project ID:', project._id); 
  // console.log('Project:', project);
  const [reviews, setReviews] = useState([]);
  const [averageRatings, setAverageRatings] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
   const dispatch = useDispatch();
   const averageRating = useSelector(state =>
    state.ratings.averages[project._id] || 0
  );
  const reviewLength = useSelector((state) => state.review);

  useEffect(() => {
    if (project) {
      loadRatingAndComments();
    }
  }, [project]);

  const loadRatingAndComments = async () => {
     try {
       setLoading(true);
       setError(null);
       
       // Get average rating
       const ratingResponse = await getProjectRating(project._id);
       console.log('rate response:', ratingResponse); 
       dispatch(setAverageRating(project._id, ratingResponse.averageRating || 0));
       console.log('av', averageRating)
       // Get comments
       const commentsResponse = await getProjectComments(project._id);
       console.log('Comments response:', commentsResponse); 
       const validReviews = Array.isArray(commentsResponse) ? commentsResponse : [];
       setReviews(validReviews);
       dispatch(setReview(validReviews.length));
     } catch (err) {
       setError(err.message || 'Failed to load data');
       console.error('Error loading data:', err);
     } finally {
       setLoading(false);
     }
   };
  return (
    <div className={`rounded-lg border ${darkmode ? 'border-gray-700 bg-[#1a1a1a]' : 'border-gray-200 bg-white'} p-4 mb-4`}>
    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
      <div className="flex-1">
        <h3 className={`text-lg font-medium ${darkmode ? 'text-white' : 'text-gray-900'}`}>
          {project?.title} (day {project?.day})
        </h3>
        <div className="flex items-center mt-1">
          <StarRating 
            rating={averageRating || 0} 
            darkmode={darkmode} 
            interactive={false}
            size="sm"
          />
        </div>
        <p className={`mt-1 md:text-ms text-xs line-clamp-2 ${darkmode ? 'text-gray-400' : 'text-gray-600'}`}>
          {project?.description}
        </p>
      </div>
  
      <div className="sm:ml-4 mt-2 sm:mt-0">
        <span className={`text-xs ${darkmode ? 'text-gray-300' : 'text-gray-700'}`}>
          ({reviewLength} reviews)
        </span>
      </div>
    </div>
  
    <div className="mt-3 flex flex-wrap gap-2">
  {project.languages
    .replace(/^"|"$/g, '') // Remove surrounding quotes if present
    .split(',') // Split by commas
    .filter(lang => lang.trim() !== '') // Filter out empty strings
    .map((language, index) => (
      <span
        key={index}
        className={`px-2 py-1 rounded-full text-xs ${
          darkmode ? 'bg-gray-800 text-gray-300' : 'bg-gray-100 text-gray-700'
        }`}
      >
        {language.trim()}
      </span>
    ))}
</div>

  
    <div className="mt-4 flex flex-row justify-between items-start  gap-2">
      <a
        href={project.livelink}
        target="_blank"
        rel="noopener noreferrer"
        className={`flex items-center text-sm ${darkmode ? 'text-green-400 hover:text-green-300' : 'text-green-600 hover:text-green-800'}`}
      >
        Live Demo <FiExternalLink className="ml-1" />
      </a>
  
      <div className="flex flex-col items-start sm:items-end text-left sm:text-right space-y-1">
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