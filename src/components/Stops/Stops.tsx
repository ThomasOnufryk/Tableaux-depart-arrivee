import './Stops.scss';
import { useCallback, useEffect, useState, useRef } from 'react';
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
  const [isLoading, setIsloading] = useState(true);
  const stopsRef = useRef<HTMLUListElement>(null);

  const getStops = useCallback(async () => {
    setIsloading(true);
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
    setIsloading(false);
  }, [codeStation, idDeparture]);

  useEffect(() => {
    getStops();
  }, [getStops]);

  useEffect(() => {
    if (stopsRef.current && !isLoading) {
      const scrollWidth = stopsRef.current.scrollWidth;
      const duration = Math.max(scrollWidth / 90, 30); // Au moins 30 secondes
      stopsRef.current.style.animationDuration = `${duration}s`;
    }
  }, [nextStations, isLoading]);

  if (isLoading) {
    return <div className="departure__stops">Chargement des arrêts...</div>;
  }

  if (nextStations.length === 0) {
    return <div className="departure__stops">Aucun arrêt suivant</div>;
  }

  const renderStationBlock = (stations: string[], blockIndex: number) => (
    <div key={`block-${blockIndex}`} className="stops__block">
      {stations.map((stop, index) => (
        <li
          className="stops__station"
          key={`station-${blockIndex}-${index}-${stop}`}
        >
          {stop}
          <img
            src="/src/Public/images/yellow.jpg"
            alt="yellow point"
            style={{
              display: index === stations.length - 1 ? 'none' : 'inline',
            }}
          />
        </li>
      ))}
      {blockIndex < 3 && (
        <li className="stops__separator" key={`separator-${blockIndex}`}>
          <p id="spanList">Gares desservies : </p>
        </li>
      )}
    </div>
  );

  // On crée quatre blocs de stations
  return (
    <div className="departure__stops">
      <ul className="stops" ref={stopsRef}>
        {[0, 1, 2, 3].map((blockIndex) =>
          renderStationBlock(nextStations, blockIndex),
        )}
      </ul>
    </div>
  );
}

export default Stops;
