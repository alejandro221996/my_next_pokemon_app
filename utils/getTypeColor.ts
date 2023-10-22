export const getTextGradient = (type: string) => {
  switch (type) {
    case "fire":
      return "45deg, $yellow600 -20%, $red600 100%";
    case "grass":
      return "45deg, $green600 -20%, $yellow600 100%";
    case "water":
      return "45deg, $blue600 -20%, $green600 100%";
    case "electric":
      return "45deg, $yellow200 -20%, $yellow600 100%";
    case "ground":
      return "45deg, $yellow600 -20%, $yellow100 100%";
    case "rock":
      return "45deg, $yellow300 -20%, $gray400 100%";
    case "ice":
      return "45deg, $blue600 -20%, $gray600 100%";
    default:
      return "45deg, $white -20%, $green600 100%"; // Add a default style here
  }
};

export const getStylesByType = (type: string) => {
  const typeStyles = {
    fire: {
      backgroundColor: "red",
      color: "white",
    },
    grass: {
      backgroundColor: "green",
      color: "white",
    },
    water: {
      backgroundColor: "#4592c4",
      color: "white",
    },
    electric: {
      backgroundColor: "yellow",
      color: "black",
    },
    ground: {
      backgroundColor: "#f7de3f",
      color: "black",
    },
    rock: {
      backgroundColor: "#a38c21",
      color: "white",
    },
    ice: {
      backgroundColor: "blue",
      color: "white",
    },
    fairy: {
      backgroundColor: "pink",
      color: "white",
    },
    poison: {
      backgroundColor: "purple",
      color: "white",
    },
    bug: {
      backgroundColor: "#9bcc50",
      color: "white",
    },
    fighting: {
      backgroundColor: "#d56723",
      color: "white",
    },
    psychic: {
      backgroundColor: "#f366b9",
      color: "white",
    },
    steel: {
      backgroundColor: "#9eb7b8",
      color: "white",
    },
    default: {
      backgroundColor: "white",
      color: "black",
    },
  };

  const selectedStyle =
    typeStyles[type as keyof typeof typeStyles] || typeStyles.default;

  // Merge the selected style with defaultStyle
  return {
    borderRadius: 5,
    paddingLeft: 8,
    paddingRight: 8,
    paddingTop: 4,
    paddingBottom: 4,
    ...selectedStyle,
  };
};
