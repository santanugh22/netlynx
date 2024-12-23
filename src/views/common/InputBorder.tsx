import { View, Text, TextInput, StyleSheet } from "react-native";
import React from "react";
import { TextInputProps } from "react-native";
import { colors } from "../../utils/colors";
import { KeyboardTypeOptions } from "react-native";

interface Props extends TextInputProps {
  placeholder?: string;
  keyboardType?: KeyboardTypeOptions | undefined;
  multiLine?: boolean;
  numberOfLines?: number;
  disabled?: boolean;
}

const InputBorder = ({
  keyboardType,
  placeholder,
  multiLine = false,
  numberOfLines = 1,
  value,
  onChangeText,
  disabled,
  onBlur,
}: Props) => {
  return (
    <TextInput
      style={[
        styles.input,
        {
          textAlignVertical: multiLine ? "top" : "center",
          color: "black",
        },
        disabled && { backgroundColor: "#f1f3f5" },
      ]}
      placeholder={placeholder}
      keyboardType={keyboardType}
      placeholderTextColor={disabled ? "#111" : "#A4A4A4"}
      multiline={multiLine}
      numberOfLines={numberOfLines}
      value={value}
      editable={disabled ? false : true}
      onChangeText={onChangeText}
      onBlur={onBlur}
    />
  );
};

const styles = StyleSheet.create({
  input: {
    // height: 42,
    borderWidth: 1,
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: 4,
    fontFamily: "Avenir-Regular",
    borderColor: colors.border,
  },
});
export default InputBorder;
