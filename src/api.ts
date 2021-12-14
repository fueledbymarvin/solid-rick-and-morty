import axios from "axios";

// TODO: integrate https://github.com/ajv-validator/ajv

const BASE_URL = "https://rickandmortyapi.com/api";

export interface Location {
  id: number;
  name: string;
  residents: string[];
}

export interface Character {
  id: number;
  name: string;
  status: string;
  species: string;
  location: {
    name: string;
    url: string;
  };
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

export const searchCharacters = async ({
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

export const getCharacter = async ({
  id,
}: {
  id: number;
}): Promise<Character> => {
  const response = (await axios.get(`${BASE_URL}/character/${id}`))
    .data as Character;
  // check schema of result and alert
  return response;
};

export const getCharacters = async ({
  ids,
}: {
  ids: number[];
}): Promise<Character[]> => {
  const response = (await axios.get(`${BASE_URL}/character/${ids.join(",")}`))
    .data as Character[];
  // check schema of result and alert
  return response;
};

export const getLocation = async ({
  id,
}: {
  id: number;
}): Promise<Location> => {
  const response = (await axios.get(`${BASE_URL}/location/${id}`))
    .data as Location;
  // check schema of result and alert
  return response;
};
