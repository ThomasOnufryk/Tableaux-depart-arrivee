export interface Ideparture {
  id: string;
  operator: string;
  transportationMode: string;
  trainNumber: number;
  baseDepartureTime: Date;
  realDepartureTime: Date;
  destination: string;
}

export interface IStationInfo {
  [stationName: string]: string; // Chaque clé est le nom de la gare, et la valeur est l'identifiant de type string
}

export interface ICityStations {
  [city: string]: StationInfo; // Chaque clé est une ville, et la valeur est un objet contenant les informations des gares de la ville
}
