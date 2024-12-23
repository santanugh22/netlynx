import { Dimensions } from "react-native";

const { height, width } = Dimensions.get("window");

// 410  568 768 1024

let paddingH = 10;
if (width > 400 && width << 500) {
  paddingH += 8;
} else if (width > 500) {
  paddingH += 4;
} else if (width < 325) {
  paddingH = 6;
}

export default paddingH;

// responsive wip
