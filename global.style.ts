import { StyleSheet } from "react-native";
import { colors } from "./src/utils/colors";

export const globalStyles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 12,
    backgroundColor: "#fff",
  },
  fontHeavy: {
    fontFamily: "Avenir-Regular",
  },
  card: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.15,
    shadowRadius: 2.5,
    elevation: 2,
    backgroundColor: colors.white,
    borderRadius: 8,
    marginHorizontal: 4,
    paddingVertical: 12,
    marginBottom: 8,
  },
  loaderContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff",
  },
  loader: {
    color: colors.primary,
    width: 20,
    height: 20,
  },
});
