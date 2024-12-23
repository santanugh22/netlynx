import React from "react";
import {
  StyleSheet,
  Text,
  View,
  GestureResponderEvent,
  Pressable,
} from "react-native";
import { colors } from "../../utils/colors";

interface IProps {
  name: string;
  Icon?: JSX.Element;
  onPress?: (event: GestureResponderEvent) => void;
  style?: object;
}
const RoundIconContainer = ({ name, Icon, onPress, style }: IProps) => {
  return (
    <Pressable style={[styles.container, style]} onPress={onPress}>
      <View>{Icon}</View>
      <Text style={styles.text}>{name}</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.primary,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    columnGap: 6,
    paddingHorizontal: 14,
    borderRadius: 6,
  },
  text: {
    fontFamily: "Avenir-Regular",
    color: "#fff",
  },
});
export default RoundIconContainer;
