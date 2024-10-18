import { useState } from 'react';
import Departures from '../Departures/Departures';
import Arrials from '../Arrivals/Arrivals';

import './TrainStation.scss';

function TrainStation() {
  const [departureMode, setDepartureMode] = useState<boolean>(true);
  return (
    <div className="train-station">
      <div className="directions">
        <button
          type="button"
          className={`directions__departures ${departureMode ? 'directions__departures--active' : ''}`}
          onClick={() => setDepartureMode(true)}
          onKeyPress={() => setDepartureMode(true)}
        >
          Départs
        </button>
        <button
          type="button"
          className={`directions__arrivals ${departureMode ? '' : 'directions__arrivals--active'}`}
          onClick={() => setDepartureMode(false)}
          onKeyPress={() => setDepartureMode(false)}
        >
          Arrivées
        </button>
      </div>
      {departureMode && <Departures />}
      {!departureMode && <Arrials />}
    </div>
  );
}

export default TrainStation;
