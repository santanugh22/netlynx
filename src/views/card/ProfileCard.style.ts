import { StyleSheet } from "react-native";
import { colors } from "../../utils/colors";

export const styles = StyleSheet.create({
  cardContainer: {
    height: 200,
  },
  card: {
    // backgroundColor: colors.card,
    paddingVertical: 6,
    height: 200,
    paddingRight: 12,
    paddingLeft: 12,
    borderRadius: 12,
    flexDirection: "row",
    position: "absolute",
    top: 0,
    left: 12,
    right: 12,
    overflow: "hidden",
  },
  shade: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    height: 200,
    backgroundColor: "rgba(0, 0, 0, .5)", // Adjust the opacity as needed
  },
  bgImage: {
    left: 0,
    right: 0,
  },
  backCard: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 9,
    },
    shadowOpacity: 0.5,
    shadowRadius: 12.35,
    elevation: 10,
    backgroundColor: colors.primary,
  },
  ImgContainer: {
    alignSelf: "center",
    flexDirection: "row",
    justifyContent: "center",
    borderRadius: 10,
  },
  border: {
    borderWidth: 2,
    borderColor: "#fff",
  },
  backCardImg: {
    width: 120,
    height: 180,
  },
  profileImg: {
    width: 140,
    height: 180,
    borderRadius: 8,
  },
  nameContainer: {
    flex: 1,
    alignItems: "center",
    paddingTop: 48,
    paddingBottom: 18,
  },
  cardText: {
    fontFamily: "Avenir-Heavy",
    fontSize: 18,
    color: colors.white,
  },
  camIcon: {
    position: "absolute",
    right: -5,
    top: 5,
    padding: 2,
  },
  barCodeIcon: {
    position: "absolute",
    right: 5,
    bottom: 5,
    width: 40,
    height: 50,
  },
});
