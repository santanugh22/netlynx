import { View, Text, Pressable, StyleSheet } from "react-native";
import React from "react";
import { MaterialIcons } from "@expo/vector-icons";
import { colors } from "../../utils/colors";

interface Props {
  placeholder?: string;
  onPress: () => void;
}

const Select = ({ placeholder = "Select Date" , onPress }: Props) => {
  return (
    <Pressable onPress={onPress} style={styles.selectContainer}>
      <Text style={styles.selectText}>{placeholder}</Text>
      <MaterialIcons
        name="keyboard-arrow-down"
        size={22}
        color={colors.docText}
      />
    </Pressable>
  );
};

const styles = StyleSheet.create({
  selectContainer: {
    flex: 1,
    borderWidth: 1,
    borderColor: colors.border,
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 4,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    columnGap: 10,
  },
  selectText: {
    fontFamily: "Avenir-Regular",
    color: colors.docText,
  },
});
export default Select;
