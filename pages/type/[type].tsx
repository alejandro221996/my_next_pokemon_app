/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";

import { GetStaticProps, NextPage, GetStaticPaths } from "next";
import {
  Button,
  Card,
  Container,
  Grid,
  Image,
  Row,
  Text,
} from "@nextui-org/react";

import confetti from "canvas-confetti";

import { pokeApi } from "../../api";
import { Layout } from "../../components/layouts";
import {
  Pokemon,
  PokemonByType,
  PokemonListResponse,
  SmallPokemon,
} from "../../interfaces";
import { localFavorites } from "../../utils";
import { getPokemonInfo } from "../../utils/getPokemonInfo";
import { useRouter } from "next/router";
import { PokemonCard } from "../../components/pokemon";

interface Props {
  pokemon: Pokemon;
}

const PokemonByTypePage: NextPage<Props> = ({}) => {
  const router = useRouter();
  //get params from url

  const [pokemons, setPokemons] = useState<Pokemon[]>([]);
  const getPokemonByType = async () => {
    const { type } = router.query;
    console.log(type);
    const { data } = await pokeApi.get<PokemonByType>(
      `/type/${type}?limit=151`
    );
    for (const pokemon of data.pokemon) {
      console.log(pokemon);
    }
  };
  const onClick = (pokemon: Pokemon) => {
    router.push(`/pokemon/${pokemon.name}`);
  };

  useEffect(() => {
    getPokemonByType();
  }, []);
  return <Layout title="Listado de Pokémons"></Layout>;
};

export default PokemonByTypePage;
