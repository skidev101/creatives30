
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

const SkeletonLoader = ({ count = 1, height = 20, width = '100%', circle = false }) => {
  return (
    <div>
      {Array.from({ length: count }).map((_, index) => (
        <Skeleton key={index} height={height} width={width} circle={circle} />
      ))}
    </div>
  );
};

export default SkeletonLoader;