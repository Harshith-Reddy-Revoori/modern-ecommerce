import { FaStar, FaStarHalfAlt, FaRegStar } from 'react-icons/fa';

export default function RatingStars({ value, count }) {
  const stars = [];
  for(let i=1;i<=5;i++){
    const diff = value - i;
    if(diff >= 0) stars.push(<FaStar key={i} />);
    else if(diff > -1 && diff < 0) stars.push(<FaStarHalfAlt key={i} />);
    else stars.push(<FaRegStar key={i} />);
  }
  return (
    <span className='rating-stars' title={`Rated ${value} out of 5`}>
      {stars}
      {typeof count === 'number' && <span className='rating-count'> ({count.toLocaleString()})</span>}
    </span>
  );
}