import { AntDesign } from "@expo/vector-icons";
import React from "react";
import { Pressable, Text, StyleSheet } from "react-native";
import { colors } from "../../utils/colors";

interface Props {
  name: string;
  onPress?: () => void;
  show?: string;
}
const Accordian = ({ name, onPress, show }: Props) => {
  return (
    <Pressable onPress={onPress} style={styles.accordian}>
      <Text style={styles.accordianText}>{name}</Text>
      <AntDesign
        name={show === name ? "down" : "up"}
        size={18}
        color={colors.primary}
      />
    </Pressable>
  );
};

const styles = StyleSheet.create({
  accordian: {
    backgroundColor: "#fff",
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderRadius: 4,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 2,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  accordianText: {
    fontFamily: "Avenir-Heavy",
    color: colors.primary,
  },
});
export default Accordian;
