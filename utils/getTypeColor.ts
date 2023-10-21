export const getTextGradient = (type: string) => {
  switch (type) {
    case "fire":
      return "45deg, $yellow600 -20%, $red600 100%";
    case "grass":
      return "45deg, $green600 -20%, $yellow600 100%";
    case "water":
      return "45deg, $blue600 -20%, $green600 100%";
    case "bug":
      return "your-conditional-style-here"; // Add your conditional style for bug type
    default:
      return "default-gradient"; // Add a default style here
  }
};
