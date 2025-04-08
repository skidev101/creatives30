import {  FiStar,} from 'react-icons/fi';
export const StarRating = ({ rating, darkmode }) => {
  const fullStars = Math.floor(rating);
  const emptyStars = 5 - fullStars;

  return (
    <div className="flex text-yellow-400">
      {Array(fullStars).fill().map((_, i) => (
        <FiStar key={`filled-${i}`} className="text-yellow-400" />
      ))}
      {Array(emptyStars).fill().map((_, i) => (
        <FiStar key={`empty-${i}`} className={`${darkmode ? 'text-gray-600' : 'text-gray-300'}`} />
      ))}
    </div>
  );
};