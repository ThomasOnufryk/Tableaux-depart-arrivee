import './CityCards.scss';
import stationsDatas from '../../gares.json';
import CityCard from '../CityCard/CityCard';
import { ICityStations } from '../../@types';

const stations: ICityStations = stationsDatas;

type CityName = keyof ICityStations;

function CityCards() {
  const cities = Object.keys(stations) as CityName[];
  return (
    <div className="city-cards">
      {cities.map((city) => (
        <CityCard key={city} city={city} />
      ))}
    </div>
  );
}

export default CityCards;
