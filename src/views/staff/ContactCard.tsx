 import { View, Text, Image, StyleSheet, Pressable } from "react-native";
import React from "react";
import * as Linking from "expo-linking";
import { colors } from "../../utils/colors";
import Toast from "react-native-toast-message";
import { useNavigation } from "@react-navigation/native";

interface Props {
  item?: IContactsData;
  callItem?: ICallLogsData;
  color?: string;
  textColor?: string;
  onDelete: () => void;
}

const ContactCard = ({ item, onDelete }: Props) => {
  const navigation = useNavigation();
  const color = `#${item?.color}`;
  const textColor = "#000";

  const openContact = (url: string) => {
    navigation.navigate("CustomerDetails", {
      url: `https://netlynxs.com/${url}`,
      onDelete
    });
  };

  return (
    <Pressable
      style={[
        styles.card,
        {
          backgroundColor: color,
        },
      ]}
      onPress={() => openContact(item?.data?.vcard)}
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
            {item?.data?.fname + " "}
            {item?.data?.lanme ? item?.data?.lname : ""}
          </Text>
        </View>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  card: {
    marginTop: 6,
    paddingHorizontal: 12,
    borderTopRightRadius: 12,
    borderTopLeftRadius: 12,
    paddingVertical: 8,
    backgroundColor: "red",
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
    justifyContent: "center",
  },
  contactNameText: {
    fontSize: 14,
    fontWeight: "600",
  },
});
export default ContactCard;