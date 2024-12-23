import React, { useState } from "react";
import {
  TouchableOpacity,
  View,
  Text,
  StyleSheet,
  Pressable,
} from "react-native";
import { colors } from "../../utils/colors";
import { Feather } from "@expo/vector-icons";

interface IProps {
  label: string;
  onCheck: (e: any) => any;
  initialState: boolean;
}
const CustomCheckbox = ({ label, onCheck, initialState = false }: IProps) => {
  const [isChecked, setIsChecked] = useState(initialState);

  const toggleCheckbox = () => {
    const newState = !isChecked;
    setIsChecked(newState);
    if (onCheck) {
      onCheck(newState);
    }
  };

  return (
    <Pressable style={styles.container} onPress={toggleCheckbox}>
      <View style={[styles.checkbox, isChecked && styles.checked]}>
        {isChecked && <Feather name="check" size={16} color="#fff" />}
      </View>
      {label && label}
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
  },
  checkbox: {
    height: 20,
    width: 20,
    borderRadius: 3,
    borderWidth: 2,
    borderColor: colors.primary,
    justifyContent: "center",
    alignItems: "center",
  },
  checked: {
    backgroundColor: colors.primary,
  },
  innerCheck: {
    height: 12,
    width: 12,
    backgroundColor: "#fff",
  },
  label: {
    marginLeft: 12,
    fontSize: 12,
    flex: 1,
    fontFamily: "Avenir-Regular",
    color: "#868e96",
  },
});

export default CustomCheckbox;
