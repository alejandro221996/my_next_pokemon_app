/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";

import { GetStaticProps, NextPage, GetStaticPaths } from "next";
import { Grid, Input, Row } from "@nextui-org/react";

import { pokeApi } from "../../api";
import { Layout } from "../../components/layouts";
import {
  Pokemon,
  PokemonByType,
  ReqResToken,
  SmallPokemon,
} from "../../interfaces";
import { useRouter } from "next/router";
import { PokemonTypeCard } from "../../components/pokemon/PokemonTypeCard";

interface Props {}
const PokemonByTypePage: NextPage<Props> = ({}) => {
  const router = useRouter();
  //get params from url
  const { type } = router.query;
  const [pokemons, setPokemons] = useState<Pokemon[]>([]);
  const getPokemonByType = async () => {
    if (!type) return;
    const { data } = await pokeApi.get<PokemonByType>(`/type/${type}`);
    const promises = data.pokemon.map(async (pokemon) => {
      const { data } = await pokeApi.get<Pokemon>(pokemon.pokemon.url);
      return data;
    });
    const results = await Promise.all(promises);
    setPokemons(results);
  };

  useEffect(() => {
    getPokemonByType();
  }, [type]);
  return (
    <Layout title="Listado de Pokémons">
      <Grid.Container gap={2} justify="flex-start">
        {pokemons.map((pokemon) => (
          <PokemonTypeCard key={pokemon.id} pokemon={pokemon} />
        ))}
      </Grid.Container>
    </Layout>
  );
};

export default PokemonByTypePage;
