import './CityCard.scss';
import images from '../../Public/';
interface CityCardProps {
  city: string;
}

function CityCard({ city }: CityCardProps) {
  return (
    <div
      className="city-card"
      style={{
        backgroundImage: `url("src/Public/images/${city}.webp")`,
      }}
    >
      <h3 className="city-card__name">{city}</h3>
    </div>
  );
}

export default CityCard;
