import './City.scss';
import { Outlet, useParams, NavLink } from 'react-router-dom';
import TrainStations from '../TrainStations/Trainstations';
import { ICityStations } from '../../@types';
import stationsDatas from '../../gares.json';

const stations: ICityStations = stationsDatas;

function City() {
  const { city } = useParams();

  if (!city || !(city in stations)) {
    return <div>Ville inconnue</div>;
  }
  const cityKey: keyof ICityStations = city;

  return (
    <div className="city">
      <NavLink className="train-stations__link" to={'/'}>
        Accueil
      </NavLink>
      <h2 className="city__name">{city}</h2>
      <TrainStations stations={stations[cityKey]} />
      <Outlet />
    </div>
  );
}

export default City;
