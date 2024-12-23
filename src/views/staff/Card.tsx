import { View, Text, Image, StyleSheet, Pressable } from "react-native";
import React from "react";
import * as Linking from "expo-linking";
import { colors } from "../../utils/colors";

interface Props {
  item?: IContactsData;
  callItem?: ICallLogsData;
  color?: string;
  textColor?: string;
}

const Card = ({ item, callItem, color, textColor }: Props) => {
  return (
    <Pressable
      style={[
        styles.card,
        {
          backgroundColor: color,
        },
      ]}
      onPress={() =>
        Linking.openURL(
          `tel:${
            callItem?.phoneNumber ||
            (item?.phoneNumbers && item?.phoneNumbers[0]?.number)
          }`
        )
      }
    >
      <View style={styles.cardContant}>
        {item?.imageAvailable ? (
          <Image
            style={styles.img}
            resizeMode="contain"
            source={{
              uri: item?.image?.uri || "https://picsum.photos/536/354",
            }}
          />
        ) : (
          <View
            style={{
              height: 40,
              width: 40,
              backgroundColor: colors.white,
              borderRadius: 100,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Image
              style={{
                width: 26,
                height: 26,
              }}
              source={require("../../../assets/icons/person.png")}
            />
          </View>
        )}
        <View style={styles.cardTextContant}>
          <Text
            style={[
              styles.contactNameText,
              {
                color: textColor,
              },
            ]}
          >
            {callItem?.name === null ? "Unknown" : item?.name || callItem?.name}
          </Text>
          <Text
            style={{
              color: textColor,
            }}
          >
            {callItem?.phoneNumber ||
              (item?.phoneNumbers && item?.phoneNumbers[0]?.number)}
          </Text>
        </View>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  card: {
    marginTop: 4,
    paddingHorizontal: 12,
    borderTopRightRadius: 12,
    borderTopLeftRadius: 12,
    paddingVertical: 8,
  },
  img: {
    width: 40,
    height: 40,
    borderRadius: 40,
  },
  cardTextAvatar: {
    backgroundColor: "#eee",
    padding: 10,
    width: 40,
    textAlign: "center",
    borderRadius: 40,
    fontWeight: "bold",
  },
  cardContant: {
    display: "flex",
    flexDirection: "row",
  },
  cardTextContant: {
    paddingHorizontal: 10,
  },
  contactNameText: {
    fontSize: 14,
    fontWeight: "600",
  },
});
export default Card;
