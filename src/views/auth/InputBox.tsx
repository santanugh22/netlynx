import { View, Text, TextInput, TextInputProps } from "react-native";
import React from "react";
import { colors } from "../../utils/colors";
import { MaterialIcons } from "@expo/vector-icons";
import { styles } from "./InputBox.style";
import { Entypo } from "@expo/vector-icons";

interface Props extends TextInputProps {
  icon: string;
  secureText?: boolean;
  onPress?: (e: any) => void;
  hasSecureText?: boolean;
}

const InputBox = ({
  icon,
  placeholder,
  defaultValue,
  onChangeText,
  secureText = false,
  hasSecureText = false,
  onPress,
}: Props) => {
  return (
    <View style={styles.InputContainer}>
      <MaterialIcons name={icon as any} size={24} color={colors.icon} />
      <TextInput
        secureTextEntry={secureText}
        style={styles.Input}
        placeholder={placeholder}
        placeholderTextColor={colors.info}
        defaultValue={defaultValue}
        onChangeText={onChangeText}
      />
      {hasSecureText && (
        <Entypo
          onPress={onPress}
          name={!secureText ? "eye" : "eye-with-line"}
          size={20}
          color={colors.primary}
        />
      )}
    </View>
  );
};

export default InputBox;
