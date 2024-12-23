import { View, Text, StyleSheet, Pressable } from "react-native";
import React from "react";
import { colors } from "../../utils/colors";
import { MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";
import { globalStyles } from "../../../global.style";

interface Props {
  ListIcon: any;
  name: string;
  onPress?: () => void;
}

const ClickAbleList = ({ ListIcon, name, onPress }: Props) => {
  return (
    <Pressable
      onPress={onPress}
      style={[styles.listContainer, globalStyles.card]}
    >
      <View style={styles.content}>
        {ListIcon}
        <Text
          style={{
            fontFamily: "Avenir-Regular",
            color: colors.primary,
            fontSize: 15,
          }}
        >
          {name}
        </Text>
      </View>
      <MaterialIcons
        name="keyboard-arrow-right"
        size={24}
        color={colors.primary}
      />
    </Pressable>
  );
};

const styles = StyleSheet.create({
  listContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 12,
    paddingHorizontal: 12,
  },
  content: {
    flexDirection: "row",
    alignItems: "center",
    columnGap: 10,
  },
});

export default ClickAbleList;
