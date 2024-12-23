import {
  View,
  Text,
  Pressable,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import React, { ReactElement } from "react";
import { colors } from "../../utils/colors";

interface Props {
  onPress?: (e: any) => void;
  name: string;
  Icon?: JSX.Element;
  isLoading?: any;
  style?: object;
  fontSize?: number;
}

const MainButton = ({
  onPress,
  name,
  Icon,
  isLoading = false,
  style,
  fontSize = 16,
}: Props) => {
  return (
    <Pressable onPress={onPress} style={[styles.loginButton, style]}>
      {isLoading ? (
        <ActivityIndicator color="#fff" style={styles.loder} />
      ) : (
        <>
          {Icon}
          <Text
            style={[
              styles.buttonText,
              {
                fontSize: fontSize,
              },
            ]}
          >
            {name}
          </Text>
        </>
      )}
    </Pressable>
  );
};

const styles = StyleSheet.create({
  loder: {
    width: 16,
    height: 16,
  },
  buttonText: {
    fontFamily: "Avenir-Regular",
    color: colors.white,
  },
  loginButton: {
    backgroundColor: colors.primary,
    // paddingVertical: 10,
    height: 45,
    borderRadius: 30,
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "center",
    columnGap: 10,
  },
});
export default MainButton;
