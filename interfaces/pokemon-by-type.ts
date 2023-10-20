import { Pokemon } from "./pokemon-full";

export interface PokemonByType {
  id: number;
  name: string;
  pokemon: PokemonElement[];
}
export interface PokemonElement {
  slot: number;
  pokemon: PokemonPokemon;
}

export interface PokemonPokemon {
  name: string;
  url: string;
}
