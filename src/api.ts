import axios from "axios";

const BASE_URL = "https://rickandmortyapi.com/api";

export interface Location {
  id: number;
  name: string;
}

export interface Character {
  id: number;
  name: string;
  status: string;
  species: string;
  location: Location;
  episode: string[];
  image: string;
}

export interface SearchResponse {
  info: {
    count: number;
    pages: number;
  };
  results: Character[];
}

export const search = async ({
  name,
  page = 1,
}: {
  name: string;
  page: number;
}): Promise<SearchResponse> => {
  const response = (
    await axios.get(`${BASE_URL}/character/`, {
      params: { name, page },
    })
  ).data as SearchResponse;
  // check schema of result and alert
  return response;
};
