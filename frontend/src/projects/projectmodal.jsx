/* eslint-disable no-unused-vars */
import { useEffect, useState } from 'react';
import { FiX, FiExternalLink, FiGithub, FiCalendar, FiStar, FiThumbsUp } from 'react-icons/fi';

import { StarRating } from './starrating';
import { Review } from './review';
import { AnimatePresence, motion } from 'framer-motion';
import { FadeInUp, FadeUp } from '../components/framer';

import { 
  rateProject, 
  getProjectRating, 
  submitComment, 
  getProjectComments 
} from './api';
import { useDispatch, useSelector } from 'react-redux';
import { setAverageRating, setRating, setReview } from '../action';



export const ProjectModal = ({ project, darkmode, onClose }) => {
  const [reviews, setReviews] = useState([]);
  const [rating, setRatings] = useState(0); 
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [reviewText, setReviewText] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const reviewLength = useSelector((state) => state.review);
   console.log("uid", user.uid)
   
   const userRating = useSelector(state => {
    const userId = state.user?.uid;  // Get from Redux state directly
    return userId && project?._id 
      ? state.ratings.userRatings[userId]?.[project._id] || 0
      : 0;
  });
  console.log("rn", userRating)
  useEffect(() => {
    if (project) {
      loadComments();
    }
  }, [project]);
  
  const loadComments = async () => {
    try {
      setLoading(true);
      setError(null);
      
  
      
      // Get comments
      const commentsResponse = await getProjectComments(project._id);
      console.log('Comments response:', commentsResponse); // Add this for debugging
      setReviews(Array.isArray(commentsResponse) ? commentsResponse : []);
     
    } catch (err) {
      setError(err.message || 'Failed to load data');
      console.error('Error loading data:', err);
    } finally {
      setLoading(false);
    }
  };
      const handleRate = async (newRating) => {
        try {
          dispatch(setRating(user.uid, project._id, newRating));
          await rateProject({ projectId: project._id, rating: newRating, userId: user.uid });
       
        
          setShowReviewForm(true);
        } catch (err) {
          setError(err.message || 'Rating failed');
          dispatch(setRating(user.uid, project._id, userRating));
          console.error('Error rating project:', err);
        }
      };


      const submitReview = async () => {
        if (!reviewText.trim()) {
          setError('Please enter a comment');
          return;
        }
        
        try {
          setLoading(true);
           await submitComment(project._id, reviewText);
          
          
          const commentsResponse = await getProjectComments(project._id);
          setReviews(commentsResponse || []);
          
          setReviewText('');
          setShowReviewForm(false);
        } catch (err) {
          setError(err.message || 'Review submission failed');
          console.error('Error submitting review:', err);
        } finally {
          setLoading(false);
        }
      };
  
      // const handleLike = (reviewId) => {
      //   // Implement like functionality if needed
      //   setReviews(prevReviews =>
      //     prevReviews.map(review =>
      //       review.id === reviewId ? { ...review, likes: review.likes + 1 } : review
      //     )
      //   );
      // };
  
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
              className={`relative max-w-4xl w-full rounded-2xl overflow-hidden shadow-2xl border ${darkmode ? 'bg-[#111613] border-gray-700 ' : 'bg-white border-gray-200'}`}
            >
             
              <button 
                onClick={onClose} 
                className={`absolute top-4 right-4 z-10 p-2 rounded-full ${darkmode ? 'hover:bg-gray-800' : 'hover:bg-gray-100'}`}
              >
                <FiX size={24} className={darkmode ? 'text-gray-300' : 'text-gray-700'} />
              </button>
  
              <div className="p-6 md:p-8 max-h-[80vh] overflow-y-auto scrollbar-hide ">
               
                <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 mb-6 pt-7">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h2 className={`text-2xl md:text-3xl font-bold ${darkmode ? 'text-gray-200':''} `}>{project.title}</h2>
                    
                    </div>
                    
                    {project.day && (
                      <div className="flex items-center gap-2 text-sm mb-3">
                        <FiCalendar className={darkmode ? 'text-blue-400' : 'text-blue-600'} />
                        <span className={` ${darkmode ? "text-gray-200":''}`}>Day {project.day} of 30</span>
                      </div>
                    )}
                    
                    <div className="mb-3">
                      <p className={`text-sm mb-1 ${darkmode ? 'text-gray-300' : 'text-gray-600'}`}></p>
                      <StarRating 
                     rating={userRating} // Show rating
                     darkmode={darkmode} 
                     onRate={handleRate} 
                     interactive={true}
         
                      />
                    </div>
                  </div>
             
                  {error && (
  <div className={`mb-4 p-3 rounded-lg ${darkmode ? 'bg-red-900/30 text-red-300' : 'bg-red-100 text-red-800'}`}>
    {error}
  </div>
)}
                  <div className="flex gap-3">
                    {project.livelink && (
                      <a 
                        href={project.livelink} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className={`flex items-center gap-2 px-4 py-2 rounded-lg ${darkmode ? 'bg-blue-800 hover:bg-blue-700 text-white' : 'bg-blue-100 hover:bg-blue-200 text-blue-800'}`}
                      >
                        <FiExternalLink size={16} />
                        Live Demo
                      </a>
                    )}
                    {project.repolink && (
                      <a 
                        href={project.repolink} 
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
                {showReviewForm && (
  <div className={`mb-6 p-4 rounded-lg ${darkmode ? 'bg-gray-800' : 'bg-gray-50'}`}>
    <h4 className={`font-medium mb-2 ${darkmode ? 'text-gray-200' : 'text-gray-800'}`}>
      Write a review (rated {userRating} stars)
    </h4>
    <textarea
      value={reviewText}
      onChange={(e) => setReviewText(e.target.value)}
      className={`w-full p-3 rounded-lg mb-3 ${darkmode ? 'bg-gray-700 text-white' : 'bg-white border'}`}
      rows="3"
      placeholder="Share your experience with this project..."
    />
    <div className="flex justify-end gap-2">
      <button
        onClick={() => setShowReviewForm(false)}
        className={`px-4 py-2 rounded-lg ${darkmode ? 'text-gray-300 hover:bg-gray-700' : 'text-gray-600 hover:bg-gray-200'}`}
      >
        Cancel
      </button>
      <button
        onClick={submitReview}
        className={`px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700`}
      >
        Submit Review
      </button>
    </div>
  </div>
)}

             
                <div className="mb-6">
                  <h3 className={`text-lg font-semibold mb-2 ${darkmode ? 'text-gray-200' : 'text-gray-800'}`}>Description</h3>
                  <p className={`${darkmode ? 'text-gray-300' : 'text-gray-700'}`}>
                    {project.description}
                  </p>
                </div>
  
              
                {project.languages && (
                  <div className="mb-6">
                    <h3 className={`text-lg font-semibold mb-2 ${darkmode ? 'text-gray-200' : 'text-gray-800'}`}>Languages & Technologies</h3>
                    <div className="flex flex-wrap gap-2">
                      {project.languages.split(',').map((language, index) => (
                        <span 
                          key={index}
                          className={`px-3 py-1 rounded-full text-sm ${darkmode ? 'bg-gray-700 text-blue-400' : 'bg-blue-100 text-blue-800'}`}
                        >
                          {language.trim()}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
                   {project.framework && (
                  <div className="mb-6">
                    <h3 className={`text-lg font-semibold mb-2 ${darkmode ? 'text-gray-200' : 'text-gray-800'}`}>Frameworks</h3>
                    <div className="flex flex-wrap gap-2">
                      {project.framework.split(',').map((frame, index) => (
                        <span 
                          key={index}
                          className={`px-3 py-1 rounded-full text-sm ${darkmode ? 'bg-gray-700 text-blue-400' : 'bg-blue-100 text-blue-800'}`}
                        >
                          {frame.trim()}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              {project.images?.length > 0 && (
  <div className="mb-6">
    <h3 className={`text-lg font-semibold mb-3 ${darkmode ? 'text-gray-200' : 'text-gray-800'}`}>
      Project Screenshots
    </h3>
    <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
      {project.images.map((img, idx) => {
        const isSvg = img?.endsWith('.svg') || img?.includes('.svg?');
        
        return (
          <motion.div 
            key={idx}
            whileHover={{ scale: 1.03 }}
            className={`overflow-hidden rounded-lg cursor-pointer ${isSvg ? 'bg-white p-2' : ''}`}
          >
            {isSvg ? (
              <div 
                className="w-full h-32 md:h-40 flex items-center justify-center"
                dangerouslySetInnerHTML={{
                  __html: `<img src="${img}" class="w-full h-full object-contain" />`
                }}
              />
            ) : (
              <img
                src={img}
                alt={`Screenshot ${idx + 1}`}
                className="w-full h-32 md:h-40 object-cover"
              />
            )}
          </motion.div>
        );
      })}
    </div>
  </div>
)}

                <div className="mb-6">
                  <h3 className={`text-lg font-semibold mb-2 ${darkmode ? 'text-gray-200' : 'text-gray-800'}`}>Reviews  ({reviews.length})</h3>
                  {reviews.length === 0 ? (
    <p className={`${darkmode ? 'text-gray-500' : 'text-gray-400'}`}>
      No reviews yet. Be the first to review!
    </p>
  ) : (
                  reviews.map((review) => (
                    <Review key={review.id} review={review} darkmode={darkmode}  />
                  ))
                )}
                </div>
              </div>
            </div>
            </FadeInUp>
          
          </motion.div>
      
        )}
      </AnimatePresence>
    );
  };
