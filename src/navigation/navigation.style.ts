import { StyleSheet } from "react-native";
import { colors } from "../utils/colors";

export const styles = StyleSheet.create({
  tabBar: {
    height: 60,
    paddingBottom: 8,
    paddingTop: 8,
    paddingHorizontal: 6,
    backgroundColor: colors.primary,
  },
  tabBarIcon: {
    backgroundColor: colors.primary,
    borderWidth: 4,
    borderColor: colors.white,
    height:50,
    width:50,
    alignItems:'center',
    justifyContent:'center',
    top: -30,
    borderRadius: 100,
    left: 8,
    position: "absolute",
  },
  label : {
    color : colors.white,
    fontSize:12,
    fontFamily:'Avenir-Book'
  }
});
