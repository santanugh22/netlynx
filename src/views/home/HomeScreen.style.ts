import { StyleSheet } from "react-native";
import { colors } from "../../utils/colors";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  pt12: {
    paddingTop: 12,
  },
  image: {
    marginTop: 12,
    height: 200,
    borderRadius: 12,
    marginHorizontal: 6,
  },
  blueBG: {
    backgroundColor: colors.primary,
    height: 189,
    paddingVertical: 6,
    marginHorizontal: -12,
    paddingHorizontal: 8,
    zIndex: 11,
  },
  scrollContainer: {
    paddingTop: 80,
    paddingHorizontal: 4,
    marginBottom: 220,
  },
  addContainer: {
    paddingTop: 12,
    paddingHorizontal: 12,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  videoContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingBottom: 6,
  },
  infoContainer: {
    paddingVertical: 8,
  },
  titleText: {
    color: colors.primary,
    fontSize: 18,
    fontFamily: "Avenir-Regular",
    textAlign: "center",
  },
  redText: {
    fontFamily: "Avenir-Regular",
    textAlign: "center",
    color: colors.red,
  },
  buttonContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    columnGap: 12,
    flexWrap: "wrap",
    flex: 1,
    paddingTop: 12,
    paddingBottom: 8,
  },
  socialMediaContainer: {
    justifyContent: "flex-start",
    columnGap: 20,
  },
  button: {
    flex: 1,
  },
  icons: {
    height: 50,
    width: 50,
  },
  videoText: {
    fontSize: 18,
    color: colors.primary,
    fontFamily: "Avenir-Heavy",
  },
  ft12: {
    fontSize: 12,
  },
  pdfRowG: {
    rowGap: 18,
  },
  pdfContent: {
    flexDirection: "row",
    alignItems: "center",
    columnGap: 10,
  },
  editText: {
    fontSize: 12,
  },
  editContainer: {
    paddingHorizontal: 6,
    alignSelf: "flex-end",
    rowGap: 10,
    marginTop: -18,
  },
});
