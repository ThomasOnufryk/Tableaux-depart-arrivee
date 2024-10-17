export interface Ideparture {
  id: string;
  operator: string;
  transportationMode: string;
  trainNumber: number;
  baseDepartureTime: Date;
  realDepartureTime: Date;
  destination: string;
}

export interface ICityStations {
  [city: string]: {
    [stationName: string]: string;
  };
}
