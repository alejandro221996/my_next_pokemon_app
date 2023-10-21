import { FC } from "react";
import { useRouter } from "next/router";

import { Grid, Card, Row, Text, Input } from "@nextui-org/react";

import { Pokemon, ReqResToken } from "../../interfaces";

interface Props {
  pokemon: Pokemon;
}

export const PokemonTypeCard: FC<Props> = ({ pokemon }) => {
  const router = useRouter();
  const onClick = () => {
    router.push(`/name/${pokemon.name}`);
  };

  return (
    <Grid xs={6} sm={3} md={2} xl={3} key={pokemon.id}>
      <Card hoverable clickable onClick={onClick}>
        <Card.Body css={{ p: 1 }}>
          {pokemon.sprites.front_default && (
            <Card.Image
              src={pokemon.sprites.front_default}
              alt={pokemon.name}
              width="100%"
              height={200}
            />
          )}
          {!pokemon.sprites.front_default && (
            <Card css={{ justifyContent: "center" }}>
              <Text
                h3
                transform="capitalize"
                css={{
                  textAlign: "center",
                }}
              >
                No hay imagen
              </Text>
            </Card>
          )}
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
