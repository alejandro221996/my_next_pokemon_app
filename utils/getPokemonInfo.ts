import { pokeApi } from "../api";
import { Pokemon } from "../interfaces";

export const getPokemonInfo = async (nameOrId: string) => {
  try {
    const { data } = await pokeApi.get<Pokemon>(`/pokemon/${nameOrId}`);

    return {
      id: data.id,
      name: data.name,
      sprites: data.sprites,
      types: data.types,
      stats: data.stats,
      weight: data.weight,
      height: data.height,
    };
  } catch (error) {
    return null;
  }
};
