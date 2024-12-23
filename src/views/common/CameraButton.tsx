import * as React from "react";
import {
  Text,
  TouchableOpacity,
  StyleSheet,
  GestureResponderEvent,
} from "react-native";
import { Entypo } from "@expo/vector-icons";

interface Props {
  title?: string;
  onPress?: (event: GestureResponderEvent) => void;
  icon?: string;
  color?: string;
}

export default function Button({ title, onPress, icon, color }: Props) {
  return (
    <TouchableOpacity onPress={onPress} style={styles.button}>
      <Entypo
        name={icon ? (icon as any) : "camera"}
        size={28}
        color={color ? color : "#f1f1f1"}
      />
      <Text style={styles.text}>{title}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    height: 40,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    fontWeight: "bold",
    fontSize: 16,
    color: "#f1f1f1",
    marginLeft: 10,
  },
});
