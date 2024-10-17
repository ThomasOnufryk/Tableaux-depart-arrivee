import './TrainStations.scss';
import { NavLink } from 'react-router-dom';
import { ICityStations } from '../../@types';

interface TrainStationsProps {
  stations: ICityStations[keyof ICityStations];
  // stationName: ICityStations[keyof ICityStations];
}

function TrainStations({ stations }: TrainStationsProps) {
  return (
    <div className="train-stations">
      {Object.keys(stations).map((stationName) => (
        <NavLink
          key={stationName}
          className={({ isActive }) =>
            `train-stations__link ${isActive ? 'train-stations__link--active' : ''}`
          }
          to={`${stations[stationName]}`}
        >
          <span>{stationName}</span>
        </NavLink>
      ))}
    </div>
  );
}

export default TrainStations;
