import { useCallback, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { parseDate, getFullMinutes, calculateDelay } from './utils';
import { Ideparture } from '../../@types';
import './Dapartures.scss';

function Departures() {
  const { codeStation } = useParams();
  const [nextDepartures, setNextDepartures] = useState<Ideparture[]>([]);
  const getApiDatas = useCallback(async () => {
    const apiKey = import.meta.env.VITE_API_KEY;
    const response = await fetch(
      `https://api.sncf.com/v1/coverage/sncf/stop_areas/${codeStation}/departures`,
      {
        headers: {
          Authorization: `${apiKey}`,
        },
      },
    );
    const data = await response.json();
    const apiDeparture = data.departures.map((departure: any) => ({
      id: departure.links[1].id,
      operator: '',
      transportationMode: departure.display_informations.network,
      trainNumber: departure.display_informations.headsign,
      baseDepartureTime: parseDate(
        departure.stop_date_time.base_departure_date_time,
      ),
      realDepartureTime: parseDate(
        departure.stop_date_time.departure_date_time,
      ),
      destination: departure.display_informations.direction.split(' (')[0],
    }));
    console.log(apiDeparture);
    setNextDepartures(apiDeparture);
  }, []);

  useEffect(() => {
    getApiDatas();
  }, [codeStation, getApiDatas]);

  const [isTimeDisplayed, setIsTimeDisplayed] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsTimeDisplayed((prevIsTimeDisplayed) => !prevIsTimeDisplayed);
    }, 5000);
    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <div className="departures">
      {nextDepartures.map((departure, index) => (
        <div
          key={departure.id}
          className={`departure ${index % 2 ? '' : 'departure--light'}`}
        >
          <p className="departure__operator">{departure.operator}</p>
          <p className="departure__train-type">
            {departure.transportationMode}
          </p>
          <p className="departure__train-number">{departure.trainNumber}</p>
          <p
            className={`departure__time ${isTimeDisplayed ? '' : 'departure__time--disappear'}`}
          >
            {departure.baseDepartureTime.getHours()}h
            {getFullMinutes(departure.baseDepartureTime)}
          </p>
          <p
            className={`departure__delay ${isTimeDisplayed ? 'departure__delay--disappear' : ''}`}
          >
            {calculateDelay(
              departure.baseDepartureTime,
              departure.realDepartureTime,
            )}
          </p>
          <p className="departure__destination">{departure.destination}</p>
        </div>
      ))}
    </div>
  );
}

export default Departures;
