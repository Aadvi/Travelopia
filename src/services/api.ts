import axios from "axios";

const BASE_URL = "https://flight-status-mock.core.travelopia.cloud";

export const fetchFlights = async () => {
  const response = await axios.get(`${BASE_URL}/flights`);
  return response.data;
};

export const fetchFlightsById = async (id: string) => {
  const response = await axios.get(`${BASE_URL}/flights/${id}`);
  return response.data;
};
