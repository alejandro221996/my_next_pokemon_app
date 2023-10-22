import { FC, useEffect, useState } from "react";
import { useRouter } from "next/router";

import { Grid, Card, Row, Text } from "@nextui-org/react";

import { PropsPokemon, SmallPokemon } from "../../interfaces";
import { getStylesByType } from "../../utils/getTypeColor";
import { getPokemonInfo } from "../../utils";
interface Props {
  pokemon: SmallPokemon;
}

export const PokemonCard: FC<Props> = ({ pokemon }) => {
  const { id, img, name } = pokemon;
  const [pokemonInfo, setPokemonInfo] = useState<PropsPokemon | null>(null);
  const router = useRouter();
  const onClick = () => {
    router.push(`/name/${name}`);
  };
  /* const textGradient = getTextGradient(pokemon.types); */
  useEffect(() => {
    getPokemonInfo(id.toString()).then((data) => {
      if (data) {
        setPokemonInfo({
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
  }, [id]);
  return (
    <Grid xs={6} sm={3} md={2} xl={3} key={id}>
      <Card
        hoverable
        clickable
        onClick={onClick}
        css={{ border: "2px white solid" }}
      >
        <Card.Body css={{ p: 1 }}>
          <Card.Image src={img} width="100%" height={140} />
        </Card.Body>
        <Card.Footer>
          <Grid.Container gap={2} justify="center" direction="column">
            <Grid xs={12} justify="center">
              <Text weight="bold" transform="capitalize">
                {name}
              </Text>
            </Grid>
            <Grid xs={12}>
              <Grid.Container gap={1} justify="center">
                {pokemonInfo?.types.map((type) => (
                  <Grid xs={12} sm={6} key={type.type.name} justify="center">
                    <Text
                      style={getStylesByType(type.type.name)}
                      transform="capitalize"
                    >
                      {type.type.name}
                    </Text>
                  </Grid>
                ))}
              </Grid.Container>
            </Grid>
          </Grid.Container>
        </Card.Footer>
      </Card>
    </Grid>
  );
};
