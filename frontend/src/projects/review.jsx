import { FiThumbsUp } from "react-icons/fi";

export const Review = ({ review, darkmode, onLike }) => (
  <div className={`flex items-start gap-3 mb-4 ${darkmode ? 'text-gray-300' : 'text-gray-700'}`}>
    <div className="flex flex-col">
      <p className="font-medium">{review.userId?.username || 'Anonymous'}</p>
      <p className="text-sm">{review.comment}</p>
      <div className="flex items-center gap-2 mt-2">
        <button 
          onClick={() => onLike(review._id)} 
          className={`flex items-center gap-2 px-3 py-1 rounded-lg ${darkmode ? 'text-gray-300 hover:text-gray-500' : 'text-gray-700 hover:text-gray-900'}`}
        >
          <FiThumbsUp size={16} />
          {review.likes || 0} Like{review.likes !== 1 && 's'}
        </button>
      </div>
    </div>
  </div>
);