import { Sprites, Stat, Type } from "./pokemon-full";

export interface PropsPokemon {
  id: number;
  name: string;
  sprites: Sprites[];
  types: Type[];
  stats: Stat[];
  weight: number;
  height: number;
}
