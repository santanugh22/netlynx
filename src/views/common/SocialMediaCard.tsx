import { View, Text, Image, StyleSheet } from "react-native";
import React from "react";
import { Pressable } from "react-native";
import { GestureResponderEvent } from "react-native";
import { Feather } from "@expo/vector-icons";
import { colors } from "../../utils/colors";
import { selectedAuth } from "../../redux/features/authSlice";
import { useAppSelector } from "../../redux/hooks";

interface Props {
  logo: string;
  name: string | undefined;
  onPress?: (event: GestureResponderEvent) => void;
  url: string | undefined;
}

const SocialMediaCard = ({ logo, name, onPress, url }: Props) => {
  const { role } = useAppSelector(selectedAuth);
  console.log(logo)
  return (
    <Pressable style={styles.cardContainer} onPress={onPress}>
      {url && role !== "staff"  && (
        <View style={styles.checkCard}>
          <Feather name="check" size={14} color="#fff" />
        </View>
      )}
      <View style={styles.card}>
        <Image
          source={{ uri: logo }}
          resizeMode="contain"
          style={styles.logo}
        />
      </View>
      <Text style={styles.text}>{name}</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  checkCard: {
    backgroundColor: colors.primary,
    borderRadius: 50,
    padding: 2,
    position: "absolute",
    right: 10,
    top: 0,
    zIndex: 111,
  },
  cardContainer: {
    alignItems: "center",
    flex: 1 / 4,
    marginBottom: 10,
  },
  card: {
    backgroundColor: "#fff",
    padding: 6,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    borderRadius: 8,
  },
  logo: {
    width: 45,
    height: 45,
  },
  text: {
    fontFamily: "Avenir-Book",
    fontSize: 13,
    marginTop: 5,
    textAlign: "center",
  },
});
export default SocialMediaCard;
