import { FiStar } from 'react-icons/fi';

export const StarRating = ({ 
  rating = 0, 
  darkmode, 
  onRate, 
  interactive = true 
}) => {
  return (
    <div className="flex text-yellow-400 gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        interactive ? (
          <button
            key={star}
            onClick={() => onRate && onRate(star)}
            className="focus:outline-none"
          >
            <FiStar
              className={`${star <= rating ? 'text-yellow-400 fill-yellow-400' : darkmode ? 'text-gray-600' : 'text-gray-300'}`}
            />
          </button>
        ) : (
          <FiStar
            key={star}
            className={`${star <= rating ? 'text-yellow-400 fill-yellow-400' : darkmode ? 'text-gray-600' : 'text-gray-300'}`}
          />
        )
      ))}
    </div>
  );
};