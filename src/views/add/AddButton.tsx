import { View, Text, Pressable, StyleSheet } from "react-native";
import React from "react";
import { Feather } from "@expo/vector-icons";
import { globalStyles } from "../../../global.style";

interface Props {
  onPress: () => void;
}

const AddButton = ({ onPress }: Props) => {
  return (
    <Pressable onPress={onPress} style={styles.addButton}>
      <Feather name="plus" size={42} color="black" />
      <Text style={globalStyles.fontHeavy}>Add New</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  addButton: {
    padding: 8,
    alignSelf: "flex-start",
    alignItems: "center",
  },
});

export default AddButton;
