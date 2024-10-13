import './City.scss';
import { Outlet, useParams, NavLink } from 'react-router-dom';
import TrainStations from '../TrainStations/Trainstations';

import stations from '../../gares.json';

function City() {
  const { city } = useParams();
  return (
    <div className="city">
      <NavLink className="train-stations__link" to={`/`}>
        Accueil
      </NavLink>
      <h2 className="city__name">{city}</h2>
      <TrainStations stations={stations[city]} />
      <Outlet />
    </div>
  );
}

export default City;
