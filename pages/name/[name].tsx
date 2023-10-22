import { FC, useEffect, useState } from "react";
import { GetStaticProps, NextPage, GetStaticPaths } from "next";
import { Card, Grid, Text, Button } from "@nextui-org/react";
import confetti from "canvas-confetti";
import { pokeApi } from "../../api";
import { Layout } from "../../components/layouts";
import { Pokemon, ReqResToken, PokemonListResponse } from "../../interfaces";
import { getPokemonInfo, localFavorites } from "../../utils";
import axios from "axios";
import { useRouter } from "next/router";
import { getTextGradient } from "../../utils/getTypeColor";

// Define CSS constants
const evoStyles = {
  padding: 20,
  backgroundColor: "rgb(50 35 35)",
  border: "2px white solid",
};
const mainStyles = {
  padding: 20,
  border: "2px white solid",
};

interface Props {
  pokemon: Pokemon;
}

// Function to get Pokemon image URL
const getPokemonImageURL = (pokemonId: number) => {
  return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${pokemonId}.svg`;
};

// Function to handle favoriting
const handleFavorite = (pokemon: Pokemon, isInFavorites: boolean) => {
  localFavorites.toggleFavorite(pokemon.id);
  if (!isInFavorites) {
    confetti({
      zIndex: 999,
      particleCount: 100,
      spread: 160,
      angle: -100,
      origin: {
        x: 1,
        y: 0,
      },
    });
  }
};

// Function to fetch evolutions
const fetchEvolutions = async (
  pokemon: Pokemon,
  setEvolutions: (evolutions: ReqResToken[]) => void
) => {
  const evolutionsInfo: ReqResToken[] = [];
  const { data } = await pokeApi.get<ReqResToken>(
    `pokemon-species/${pokemon.name}`
  );
  const evolutions = await axios({
    method: "GET",
    url: data.evolution_chain.url,
  });

  let evoChain = [];
  let evoData = evolutions.data.chain;

  do {
    var evoDetails = evoData["evolution_details"][0];

    evoChain.push({
      species_name: evoData.species.name,
      min_level: !evoDetails ? 1 : evoDetails.min_level,
      trigger_name: !evoDetails ? null : evoDetails.trigger.name,
      item: !evoDetails ? null : evoDetails.item,
    });

    evoData = evoData["evolves_to"][0];
  } while (!!evoData && evoData.hasOwnProperty("evolves_to"));

  for (const evo of evoChain) {
    const { data } = await pokeApi.get<any>(`pokemon/${evo.species_name}`);
    evolutionsInfo.push(data);
  }

  setEvolutions(evolutionsInfo);
};

const PokemonByNamePage: NextPage<Props> = ({ pokemon }) => {
  const router = useRouter();
  const [isInFavorites, setIsInFavorites] = useState(
    localFavorites.existInFavorites(pokemon.id)
  );

  const onToggleFavorite = () => {
    handleFavorite(pokemon, isInFavorites);
    setIsInFavorites(!isInFavorites);
    router.replace(router.asPath); // Refresh the page
  };

  const [evolutions, setEvolutions] = useState<ReqResToken[] | undefined>(
    undefined
  );

  useEffect(() => {
    fetchEvolutions(pokemon, setEvolutions);
  }, [pokemon]);

  const textGradient = getTextGradient(pokemon.types[0].type.name);

  return (
    <Layout title={pokemon.name}>
      <Grid.Container css={{ marginTop: "5px" }} gap={2}>
        <Grid xs={12} sm={6} md={4} lg={4}>
          <Card hoverable css={mainStyles} key={pokemon.id}>
            <Card.Body css={{ justifyContent: "center", textAlign: "center" }}>
              <Card.Image
                src={getPokemonImageURL(pokemon.id)}
                alt={pokemon.name}
                width="100%"
                height={200}
              />
              <Text h2 transform="capitalize" css={{ textGradient }}>
                Name: {pokemon.name}
              </Text>
              <Text h2 transform="capitalize">
                Weight: {pokemon.weight}gr.
              </Text>
              <Text h2 transform="capitalize">
                Height: {pokemon.height}cm.
              </Text>
              <Text h2 transform="capitalize" css={{ textGradient }}>
                Type: {pokemon.types[0].type.name}
              </Text>
            </Card.Body>
          </Card>
        </Grid>
        <Grid xs={12} sm={6} md={8} lg={8}>
          <Card css={{ border: "2px white solid" }}>
            <Card.Header
              css={{
                display: "flex",
                justifyContent: "space-between",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <Text h1 transform="capitalize">
                Evoluciones
              </Text>
              <Button
                color="gradient"
                ghost={!isInFavorites}
                onClick={onToggleFavorite}
              >
                {isInFavorites ? "En Favoritos" : "Guardar en favoritos"}
              </Button>
            </Card.Header>
            <Card.Body>
              <Grid.Container gap={2}>
                {evolutions?.map((evo) => (
                  <Grid xs={12} sm={12} md={6} key={evo.name}>
                    <Card hoverable css={evoStyles}>
                      <Card.Body css={{ textAlign: "center" }}>
                        <Card.Image
                          src={getPokemonImageURL(evo.id)}
                          alt={evo.name}
                          width="100%"
                          height={200}
                        />
                        <Text h3 transform="capitalize" css={{ textGradient }}>
                          Name: {evo.name}
                        </Text>
                        <Text h3 transform="capitalize">
                          Weight: {evo.weight}gr.
                        </Text>
                        <Text h3 transform="capitalize" css={{ textGradient }}>
                          Type: {evo.types[0].type.name}
                        </Text>
                      </Card.Body>
                    </Card>
                  </Grid>
                ))}
              </Grid.Container>
            </Card.Body>
          </Card>
        </Grid>
      </Grid.Container>
    </Layout>
  );
};

export const getStaticPaths: GetStaticPaths = async (ctx) => {
  const { data } = await pokeApi.get<PokemonListResponse>("/pokemon?limit=151");
  const pokemonNames: string[] = data.results.map((pokemon) => pokemon.name);

  return {
    paths: pokemonNames.map((name) => ({
      params: { name },
    })),
    fallback: "blocking",
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { name } = params as { name: string };

  try {
    const pokemon = await getPokemonInfo(name);

    if (!pokemon) {
      return {
        notFound: true,
      };
    }

    return {
      props: {
        pokemon,
      },
    };
  } catch (error) {
    console.error("Error fetching Pokemon data:", error);
    return {
      notFound: true,
    };
  }
};

export default PokemonByNamePage;
