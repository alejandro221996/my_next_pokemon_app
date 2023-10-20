/* eslint-disable jsx-a11y/alt-text */
import Image from "next/image";
import NextLink from "next/link";
import {
  Spacer,
  Text,
  useTheme,
  Link,
  Card,
  Grid,
  Row,
  Col,
  Button,
  Input,
} from "@nextui-org/react";
import { useRouter } from "next/router";

import { ReqResToken } from "../../interfaces";
import { pokeApi } from "../../api";

export const Navbar = () => {
  const { theme } = useTheme();
  const router = useRouter();
  const onSelectType = (type: string) => {
    console.log(type);
    router.push(`type/${type}`);
  };

  const getPokemon = async (param: string) => {
    try {
      const { data } = await pokeApi.get<ReqResToken>(`pokemon/${param}`);

      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };
  const onSearch = (e: any) => {
    getPokemon(e.target.value);
  };

  return (
    <div
      style={{
        display: "flex",
        width: "100%",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "start",
        padding: "0x 50px",
        backgroundColor: theme?.colors.gray900.value,
      }}
    >
      <Grid.Container css={{ marginTop: "5px" }} gap={2}>
        <Grid xs={12} sm={2}>
          <NextLink href="/" passHref>
            <Link>
              <Text color="white" h2>
                P
              </Text>
              <Text color="white" h3>
                okémon API Test !
              </Text>
            </Link>
          </NextLink>
        </Grid>
        <Grid xs={12} sm={5}>
          <Row justify="space-between">
            <Button auto onClick={() => onSelectType("Fire")}>
              Fire
            </Button>
            <Button auto onClick={() => onSelectType("Water")}>
              Water
            </Button>
            <Button auto onClick={() => onSelectType("grass")}>
              Grass
            </Button>
            <Button auto onClick={() => onSelectType("Electric")}>
              Electric
            </Button>
            <Button auto onClick={() => onSelectType("Ground")}>
              Ground
            </Button>
            <Button auto onClick={() => onSelectType("Rock")}>
              Rock
            </Button>
            <Button auto onClick={() => onSelectType("Ice")}>
              Ice
            </Button>
          </Row>
        </Grid>
        <Grid xs={12} sm={2}>
          <Row justify="center">
            <Input
              css={{ justifyContent: "normal" }}
              clearable
              bordered
              size="md"
              placeholder="Search"
              onChange={onSearch}
            />
          </Row>
        </Grid>
        <Grid xs={12} sm={2}>
          <Row justify="flex-end">
            <NextLink href="/favorites" passHref>
              <Link css={{ marginRight: "10px" }}>
                <Image
                  src="https://cdn-icons-png.flaticon.com/512/2589/2589175.png"
                  width={50}
                  height={50}
                />
              </Link>
            </NextLink>
          </Row>
        </Grid>
      </Grid.Container>
    </div>
  );
};
