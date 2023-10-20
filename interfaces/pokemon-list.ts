
export interface PokemonListResponse {
    count:     number;
    next?:     string;
    previous?: string;
    results:   SmallPokemon[];
}

export interface SmallPokemon {
  types: any;
  name: string;
  url: string;
  id: number;
  img: string;
}
