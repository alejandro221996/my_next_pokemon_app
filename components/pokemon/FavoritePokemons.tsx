import { FC } from "react";
import { Grid } from "@nextui-org/react";

import { FavoriteCardPokemon } from "./";

interface Props {
  pokemons: string[];
}

export const FavoritePokemons: FC<Props> = ({ pokemons }) => {
  return (
    <Grid.Container gap={2} direction="row" justify="flex-start">
      {pokemons.map((name) => (
        <FavoriteCardPokemon key={name} pokemonId={name} />
      ))}
    </Grid.Container>
  );
};
