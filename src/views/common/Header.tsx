import { View, Text, StyleSheet } from "react-native";
import React from "react";
import { colors } from "../../utils/colors";
import { Ionicons } from "@expo/vector-icons";
import { Pressable } from "react-native";

interface IProps {
  title: string;
  hasBack?: boolean;
  onPress?: () => void;
}
const Header = ({ title, hasBack = false, onPress }: IProps) => {
  return (
    <View style={styles.headerContainer}>
      <Pressable onPress={onPress} style={styles.icon}>
        {hasBack ? (
          <Ionicons name="chevron-back" size={22} color={colors.white} />
        ) : null}
      </Pressable>
      <Text style={styles.headerText}>{title}</Text>
      <View style={styles.icon}></View>
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: colors.primary,
    marginHorizontal: -12,
    paddingVertical: 12,
    paddingHorizontal: 12,
    alignItems: "center",
  },
  icon: {
    width: 24,
  },
  headerText: {
    fontSize: 18,
    fontFamily: "Avenir-Heavy",
    color: colors.white,
  },
});

export default Header;
