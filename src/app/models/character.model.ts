export interface Character {
  id: number;
  name: string;
  species: string;
  gender: string;
  image: string;
}

export interface ResultPaginatorCharacter { 
  results: Character[];
  info: { 
    next: string | null;
    count: number;
  } 
}

export interface FullCharacter {
  id: number;
  name: string;
  species: string;
  status: string;
  gender: string;
  image: string;
  origin: { name: string };
  location: { name: string };
}