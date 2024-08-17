export type Position = {
  lat: number | undefined;
  lng: number | undefined
}

export type LocationTrack = {
  id: number;
  latitude: number;
  longitude: number;
  sent_at: string;
  created_at: string;
  updated_at: string;
}

export type MetaApiResponse = {
  total: number;
}

export type Vehicle = {
  id: number,
  model: string;
  brand: string;
  patent: string;
  created_at: string;
  updated_at: string;
  year: string;
  recent_location: LocationTrack | undefined
}

export type VehicleListApiResponse = {
  vehicles: Vehicle[],
  meta: MetaApiResponse
}

export type VehicleShowApiResponse = {
  vehicle: Vehicle
}
