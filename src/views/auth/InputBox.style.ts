import { StyleSheet } from "react-native";
import { colors } from "../../utils/colors";

export const styles = StyleSheet.create({
  InputContainer: {
    backgroundColor: "#fff",
    borderBottomColor: "#868e96",
    borderBottomWidth: 1,
    paddingHorizontal: 18,
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4.84,
    elevation: 2.5,
    marginHorizontal: 4,
    // borderRadius: 30,
  },
  Input: {
    paddingVertical: 10,
    fontFamily: "Avenir-Book",
    flex: 1,
  },
});
