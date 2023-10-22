import { FC, useEffect, useState } from "react";
import { useRouter } from "next/router";
import { Grid, Card } from "@nextui-org/react";
import { getPokemonInfo } from "../../utils";
import { PropsPokemon } from "../../interfaces";

interface Props {
  pokemonId: number;
}

export const FavoriteCardPokemon: FC<Props> = ({ pokemonId }) => {
  const router = useRouter();
  const [pokemon, setPokemon] = useState<PropsPokemon | null>(null);

  useEffect(() => {
    getPokemonInfo(pokemonId.toString()).then((data) => {
      if (data) {
        setPokemon({
          id: data.id,
          name: data.name,
          sprites: [data.sprites],
          types: data.types,
          stats: data.stats,
          weight: data.weight,
          height: data.height,
        });
      }
    });
  }, [pokemonId]);

  const onFavoriteClicked = () => {
    router.push(`/pokemon/${pokemonId}`);
  };
  return (
    <Grid
      xs={6}
      sm={3}
      md={2}
      xl={1}
      key={pokemonId}
      onClick={onFavoriteClicked}
    >
      <Card
        hoverable
        clickable
        css={{ padding: 10, border: "2px white solid" }}
      >
        <Card.Image
          src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${pokemonId}.svg`}
          width={"100%"}
          height={140}
        />
        <Card.Footer>
          <h4>{pokemon?.name}</h4>
        </Card.Footer>
      </Card>
    </Grid>
  );
};
