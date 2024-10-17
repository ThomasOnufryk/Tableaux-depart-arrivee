import './City.scss';
import { Outlet, useParams, NavLink } from 'react-router-dom';
import TrainStations from '../TrainStations/Trainstations';
import { ICityStations } from '../../@types';
import stations from '../../gares.json';

type CityParams = {
  // stations: ICityStations[];
  city?: string; // On déclare un type pour le paramètre `city`
};

function City() {
  const { city } = useParams<CityParams>();

  // if (!city || !(city in stations)) {
  //   return <div>Ville inconnue</div>;
  // }

  // const cityKey = city as keyof ICityStations;

  return (
    <div className="city">
      <NavLink className="train-stations__link" to={'/'}>
        Accueil
      </NavLink>
      <h2 className="city__name">{city}</h2>
      <TrainStations stations={stations[city]} />
      <Outlet />
    </div>
  );
}

export default City;
