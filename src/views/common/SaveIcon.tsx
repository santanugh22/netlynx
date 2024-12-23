import {
  View,
  Text,
  Pressable,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import React from "react";
import { FontAwesome } from "@expo/vector-icons";
import { colors } from "../../utils/colors";

interface ISaveIconProps {
  handleSubmit: (event: any) => void;
  IsUpdatingProfile: boolean;
}

const SaveIcon = ({ handleSubmit, IsUpdatingProfile }: ISaveIconProps) => {
  return (
    <Pressable style={styles.iconContainer} onPress={handleSubmit}>
      {IsUpdatingProfile ? (
        <ActivityIndicator />
      ) : (
        <FontAwesome name="save" size={24} color={colors.white} />
      )}
      <Text style={{ color: "white", fontSize: 12 }}>Save</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  iconContainer: {
    backgroundColor: colors.primary,
    padding: 10,
    width: 55,
    height: 55,
    position: "absolute",
    bottom: 15,
    right: 10,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    zIndex: 10,
  },
});
export default SaveIcon;
