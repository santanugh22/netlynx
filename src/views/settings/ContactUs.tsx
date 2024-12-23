import { View, Text, StyleSheet, Platform, Image } from "react-native";
import React, { useCallback } from "react";
import { globalStyles } from "../../../global.style";
import { styles } from "../home/HomeScreen.style";
import { colors } from "../../utils/colors";
import MainButton from "../common/MainButton";
import {
  Feather,
  AntDesign,
  MaterialIcons,
  Ionicons,
} from "@expo/vector-icons";
import { useAppSelector } from "../../redux/hooks";
import { selectedAuth } from "../../redux/features/authSlice";
import { useGetProfileDetailQuery } from "../../redux/services/staffAndUser";
import RoundIconContainer from "../common/RoundIconContainer";
import * as Linking from "expo-linking";
import YoutubePlayer from "react-native-youtube-iframe";
import Toast from "react-native-toast-message";
import SquareLogo from "../logo/squareLogo";

const ContactUs = () => {
  const authValue = useAppSelector(selectedAuth);
  const { data: profileDetail } = useGetProfileDetailQuery(authValue);

  const openMapsApp = useCallback(async (searchQuery: string) => {
    const encodedQuery = encodeURIComponent(searchQuery);
    if (Platform.OS === "ios") {
      return await Linking.openURL(`http://maps.apple.com/?q=${encodedQuery}`);
    } else if (Platform.OS === "android") {
      return await Linking.openURL(
        `https://www.google.com/maps/search/?api=1&query=${encodedQuery}`
      );
    } else {
      return Toast.show({
        type: "info",
        text1: "Maps app is not available for this platform",
      });
    }
  }, []);

  const getYouTubeVideoId = React.useCallback((url: string) => {
    const regex =
      /(?:\?v=|&v=|youtu\.be\/|\/embed\/|\/v\/|\/\d{1,2}\/|\/\d{1,2}\/index\=)([^#\&\?]*).*/;
    const match = url.match(regex);
    return match && match[1] ? match[1] : "";
  }, []);

  return (
    <View style={globalStyles.container}>
      <View style={styles.container}>
        <View style={[styles.blueBG]}>
          <SquareLogo />
          <Text
            style={{
              fontFamily: "Avenir-Heavy",
              fontSize: 26,
              textAlign: "center",
              color: "#fff",
            }}
          >
            Turn INNOVATION & {"\n"} TECHNOLOGY into REAL {"\n"} CUSTOMERS.
          </Text>
        </View>
        <View style={{ height: 15 }} />
        <YoutubePlayer
          videoId={getYouTubeVideoId("https://youtu.be/CRBteWOkmbY")}
          width={"100%" as unknown as number}
          height={180}
        />
        <View style={localStyle.scrollContainer}>
          <View style={localStyle.scrollViewChild}>
            <Text style={localStyle.title}>Contact Us</Text>
            <View style={localStyle.contactContainer}>
              <RoundIconContainer
                style={localStyle.flex}
                name="Phone"
                Icon={<Feather name="phone" size={20} color={colors.white} />}
                onPress={() => Linking.openURL(`tel:6474913188`)}
              />
              <RoundIconContainer
                style={localStyle.flex}
                name="Email"
                Icon={<Feather name="mail" size={20} color={colors.white} />}
                onPress={() => Linking.openURL(`mailto:info@netlynxs.com`)}
              />
            </View>
            <View style={[localStyle.contactContainer, localStyle.nextRow]}>
              <RoundIconContainer
                style={localStyle.flex}
                name="Message"
                onPress={() => Linking.openURL(`sms:6474913188`)}
                Icon={
                  <MaterialIcons
                    name="message"
                    size={20}
                    color={colors.white}
                    onPress={() => Linking.openURL(`sms:6474913188`)}
                  />
                }
              />
              <RoundIconContainer
                style={localStyle.flex}
                name="Location"
                Icon={
                  <Ionicons
                    name="location-outline"
                    size={20}
                    color={colors.white}
                  />
                }
                onPress={() =>
                  openMapsApp(
                    (authValue.role === "staff"
                      ? profileDetail?.personal_info?.business_address
                      : profileDetail?.personal_info?.address) as string
                  )
                }
              />
            </View>
            <View style={[localStyle.contactContainer, localStyle.nextRow]}>
              <RoundIconContainer
                style={localStyle.locationBtn}
                name="Website"
                Icon={<AntDesign name="earth" size={20} color={colors.white} />}
                onPress={() => Linking.openURL(`http://www.netlynxs.com/`)}
              />
            </View>
            <Text style={[styles.titleText, localStyle.downloadText]}>
              Download Netlynxs {"\n"} Corporate Card
            </Text>
          </View>
          <MainButton
            onPress={() =>
              Linking.openURL(`https://netlynxs.com/staff/digital-card/MTE=`)
            }
            name="Netlynxs Card"
            // Icon={<AntDesign name="qrcode" size={24} color={colors.white} />}
            style={{
              borderRadius: 10,
              width: 150,
              marginVertical: 10,
              alignSelf: "center",
            }}
          />
        </View>
      </View>
    </View>
  );
};

const localStyle = StyleSheet.create({
  scrollContainer: {
    paddingHorizontal: 4,
    flex: 1,
  },
  scrollViewChild: {
    marginTop: 10,
  },
  flex: {
    flex: 1,
  },
  liftedImg: {
    marginTop: 18,
    height: 160,
    marginHorizontal: 26,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.51,
    shadowRadius: 13.16,
    elevation: 20,
  },
  locationBtn: {
    paddingHorizontal: 32,
  },
  cardImg: {
    borderRadius: 12,
    height: "100%",
  },
  contactContainer: {
    paddingVertical: 8,
    paddingHorizontal: 14,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    columnGap: 12,
  },
  nextRow: {
    justifyContent: "center",
  },
  downloadText: {
    fontSize: 20,
    fontFamily: "Avenir-Heavy",
    color: "#000",
  },
  title: {
    fontSize: 20,
    fontFamily: "Avenir-Heavy",
    // color: colors.primary,
    textAlign: "center",
  },
  imageContainer: {
    alignItems: "center",
  },
  image: {
    width: 220,
    height: 240,
  },
});

export default ContactUs;
