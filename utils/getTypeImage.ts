/* eslint-disable import/no-anonymous-default-export */
const getImageType = (type: string) => {
  let color = "";
  switch (type) {
    case "fire":
      color = "error";
      break;
    case "grass":
      color = "success";
      break;
    case "electric":
      color = "warning";
      break;
    case "water":
      color = "primary";
      break;
    case "ground":
      color = "brown";
      break;
    case "rock":
      color = "neutral";
      break;
    case "fairy":
      color = "secondary";
      break;
    default:
      color;
      break;
  }

  return color;
};

export default getImageType;
