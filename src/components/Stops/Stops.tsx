import './Stops.scss';
import { useCallback, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { extractStationId } from '../Departures/utils';
interface StopsProps {
  idDeparture: string;
}

function Stops({ idDeparture }: StopsProps) {
  const { codeStation } = useParams<{ codeStation: string }>();
  if (!codeStation) {
    console.error("codeStation n'est pas défini");
    return <div>Station code non disponible</div>; // Un rendu alternatif en cas d'erreur
  }
  const [nextStations, setNextStations] = useState<string[]>([]);

  const getStops = useCallback(async () => {
    const apiKey = import.meta.env.VITE_API_KEY;
    const response = await fetch(
      `https://api.sncf.com/v1/coverage/sncf/vehicle_journeys/${idDeparture}`,
      {
        headers: {
          Authorization: `${apiKey}`,
        },
      },
    );

    const data = await response.json();
    const stops = data.vehicle_journeys[0].stop_times;
    const index = stops.findIndex((stop: any) => {
      return (
        extractStationId(stop.stop_point.id) === extractStationId(codeStation)
      );
    });

    const remainStops = stops
      .slice(index + 1)
      .map((stop: any) => stop.stop_point.name);

    setNextStations(remainStops);
  }, []);

  useEffect(() => {
    getStops();
  }, [getStops, codeStation]);

  return (
    <div className="departure__stops">
      <ul
        className="stops"
        style={{
          animationDuration: `${nextStations.length <= 2 ? '0' : nextStations.length * 2.5}s`,
        }}
      >
        {nextStations.map((stop, index) => (
          <li className="stops__station" key={stop}>
            {stop}
            <img
              src="/src/Public/images/yellow.jpg"
              alt="yellow point"
              style={{
                display: `${index === nextStations.length - 1 ? 'none' : 'inline'}`,
              }}
            />
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Stops;
