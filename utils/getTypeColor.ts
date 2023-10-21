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
