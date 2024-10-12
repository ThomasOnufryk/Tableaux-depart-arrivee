import './CityCards.scss';
import stations from '../../gares.json';
import CityCard from '../CityCard/CityCard';

function CityCards() {
  const cities = Object.keys(stations);
  return (
    <div className="city-cards">
      {cities.map((city) => (
        <CityCard key={city} city={city} />
      ))}
      )
    </div>
  );
}

export default CityCards;
