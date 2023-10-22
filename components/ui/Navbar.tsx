/* eslint-disable jsx-a11y/alt-text */
import Image from "next/image";
import NextLink from "next/link";
import {
  Text,
  useTheme,
  Link,
  Grid,
  Row,
  Button,
  Card,
} from "@nextui-org/react";
import { useRouter } from "next/router";
import { getStylesByType } from "../../utils/getTypeColor";

const types = ["fire", "water", "grass", "electric", "ground", "rock", "ice"];
export const Navbar = () => {
  const { theme } = useTheme();
  const router = useRouter();
  const onSelectType = (type: string) => {
    router.push(`/type/${type}`);
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
        <Grid xs={12} sm={8} justify="space-between">
          {types.map((type) => (
            <Button
              size="sm"
              key={type}
              auto
              onClick={() => onSelectType(type)}
              style={getStylesByType(type)}
            >
              {type}
            </Button>
          ))}
        </Grid>

        <Grid xs={12} sm={2} justify="flex-end">
          <NextLink href="/favorites" passHref>
            <Link css={{ marginRight: "10px" }}>
              <Image
                src="https://cdn-icons-png.flaticon.com/512/2589/2589175.png"
                width={50}
                height={50}
              />
            </Link>
          </NextLink>
        </Grid>
      </Grid.Container>
    </div>
  );
};
