import './CityCard.scss';
import { Link } from 'react-router-dom';

interface CityCardProps {
  city: string;
}

function CityCard({ city }: CityCardProps) {
  return (
    <Link
      to={`${city}`}
      className="city-card"
      style={{
        backgroundImage: `url("src/Public/images/${city}.webp")`,
      }}
    >
      <h3 className="city-card__name">{city}</h3>
    </Link>
  );
}

export default CityCard;
