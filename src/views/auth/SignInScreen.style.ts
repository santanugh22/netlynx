import { StyleSheet } from "react-native";
import { colors } from "../../utils/colors";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
  },
  logoContainer: {
    alignItems: "center",
    paddingTop: 48,
  },
  titleText: {
    fontFamily: "Avenir-Book",
    textAlign: "center",
    fontSize: 18,
  },
  titleContainer: {
    paddingTop: 20,
  },
  inputContainer: {
    paddingTop: 28,
    paddingBottom: 12,
    gap: 20,
  },
  forgotPassContainer: {
    paddingVertical: 4,
    paddingHorizontal: 4,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
  },
  forgotText: {
    color: colors.primary,
    fontFamily: "Avenir-Heavy",
    textAlign: "right",
  },
  loginContainer: {
    paddingTop: 15,
    paddingBottom: 30,
  },
  infoContainer: {
    paddingTop: 8,
    paddingHorizontal: 4,
    flexDirection: "row",
    alignSelf: "center",
    gap: 8,
  },
  infoText: {
    color: colors.info,
    fontFamily: "Avenir-Regular",
    textAlign: "right",
  },
  heavy: {
    fontFamily: "Avenir-Heavy",
    color: colors.primary,
  },
  instructionTextContainer: {
    paddingVertical: 10,
  },
  instructionText: {
    fontSize: 12,
    fontFamily: "Avenir-Regular",
    color: colors.info,
  },
  errorMsg: {
    marginTop: -12,
    fontSize: 12,
    color: colors.red,
    textAlign: "right",
    fontFamily: "Avenir-Regular",
  },
  buttonContainer: {
    marginTop: 12,
  },
});
