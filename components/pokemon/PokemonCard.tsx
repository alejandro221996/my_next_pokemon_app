import { FC } from "react";
import { useRouter } from "next/router";

import { Grid, Card, Row, Text } from "@nextui-org/react";

import { SmallPokemon } from "../../interfaces";
import { getTextGradient } from "../../utils/getTypeColor";
interface Props {
  pokemon: SmallPokemon;
}

export const PokemonCard: FC<Props> = ({ pokemon }) => {
  console.log(pokemon);
  const router = useRouter();
  const onClick = () => {
    router.push(`/name/${pokemon.name}`);
  };
  /* const textGradient = getTextGradient(pokemon.types); */

  return (
    <Grid xs={6} sm={3} md={2} xl={3} key={pokemon.id}>
      <Card hoverable clickable onClick={onClick}>
        <Card.Body css={{ p: 1 }}>
          <Card.Image src={pokemon.img} width="100%" height={140} />
        </Card.Body>
        <Card.Footer>
          <Row justify="center">
            <Text weight="bold" transform="capitalize">
              {pokemon.name}
            </Text>
          </Row>
        </Card.Footer>
      </Card>
    </Grid>
  );
};
