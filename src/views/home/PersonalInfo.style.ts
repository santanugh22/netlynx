import { StyleSheet, Dimensions } from "react-native";
import { colors } from "../../utils/colors";

export const personalInfostyles = StyleSheet.create({
  accordianContainer: {
    paddingVertical: 12,
    paddingHorizontal: 4,
    rowGap: 10,
  },
  inputContainer: {
    paddingBottom: 4,
    rowGap: 10,
  },
  selectContainer: {
    flexDirection: "row",
    alignItems: "center",
    columnGap: 20,
  },
  errorMsg: {
    marginTop: -12,
    fontSize: 12,
    color: colors.red,
    textAlign: "right",
    fontFamily: "Avenir-Regular",
  },
});
