export interface Character {
  id: number;
  name: string;
  species: string;
  status: string;
  gender: string;
  image: string;
  origin: { name: string };
  location: { name: string };
}

export interface ResultPaginatorCharacter { 
  results: Character[];
  info: { 
    count: number;
  } 
}