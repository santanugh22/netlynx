import {
  View,
  Text,
  StyleSheet,
  Pressable,
  ActivityIndicator,
} from "react-native";
import React from "react";
import { colors } from "../../utils/colors";

interface IProps {
  onPress: () => void;
  text: string;
  isLoading?: boolean;
}
const SmallButton = ({ onPress, text, isLoading }: IProps) => {
  return (
    <Pressable onPress={onPress} style={styles.container}>
      {!isLoading ? (
        <Text style={styles.text}>{text}</Text>
      ) : (
        <ActivityIndicator color={"#fff"} style={styles.loder} />
      )}
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.primary,
    borderRadius: 2,
    marginTop: 14,
    paddingVertical: 8,
    paddingHorizontal: 28,
    alignItems: "center",
  },
  text: {
    color: "#fff",
    fontFamily: "Avenir-Regular",
    fontSize: 15,
  },
  loder: {
    width: 20,
    height: 20,
    marginVertical: 2,
  },
});

export default SmallButton;
