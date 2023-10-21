const toggleFavorite = (id: string) => {
  let favorites: string[] = JSON.parse(
    localStorage.getItem("favorites") || "[]"
  );

  if (favorites.includes(id)) {
    favorites = favorites.filter((pokeId) => pokeId !== id);
  } else {
    favorites.push(id);
  }

  localStorage.setItem("favorites", JSON.stringify(favorites));
};

const existInFavorites = (id: string): boolean => {
  if (typeof window === "undefined") return false;

  const favorites: string[] = JSON.parse(
    localStorage.getItem("favorites") || "[]"
  );
  console.log("Valor de favorite exist");
  console.log(favorites.includes(id));
  return favorites.includes(id);
};

const pokemons = (): string[] => {
  return JSON.parse(localStorage.getItem("favorites") || "[]");
};

export default {
  existInFavorites,
  toggleFavorite,
  pokemons,
};
