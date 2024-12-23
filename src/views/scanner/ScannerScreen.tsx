import { FontAwesome } from "@expo/vector-icons";
import React, { useEffect, useRef, useState } from "react";
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import Share from "react-native-share";
import ViewShot from "react-native-view-shot";
import RNFetchBlob from "rn-fetch-blob";
import { globalStyles } from "../../../global.style";
import { selectedAuth } from "../../redux/features/authSlice";
import { useAppSelector } from "../../redux/hooks";
import { useGetProfileDetailQuery } from "../../redux/services/staffAndUser";
import { colors } from "../../utils/colors";
import ProfileCard from "../card/ProfileCard";
import MainButton from "../common/MainButton";
import { styles } from "../home/HomeScreen.style";
import SquareLogo from "../logo/squareLogo";
import ShareContact from "../staff/ShareContact";

const ScannerScreen = () => {
  const authValue = useAppSelector(selectedAuth);
  const [showEmail, setShowEmail] = useState(false);
  const { data: profileDetail } = useGetProfileDetailQuery(authValue);
  const ref = useRef<any>();
  const fs = RNFetchBlob.fs;
  let imagePath;
  const fullname = `${profileDetail?.personal_info?.fname} ${profileDetail?.personal_info?.lname}`;

  const handleSendEmail = () => {
    setShowEmail(true);
  };

  const shareImage = async () => {
    try {
      RNFetchBlob.config({
        fileCache: true,
      })
        .fetch("GET", profileDetail?.personal_info?.qr_code)
        // the image is now dowloaded to device's storage
        .then((resp) => {
          // the image path you can use it directly with Image component
          imagePath = resp.path();
          return resp.readFile("base64");
        })
        .then(async (base64Data) => {
          var data = `data:image/png;base64,` + base64Data;
          // here's base64 encoded image
          console.log(data);
          let options =
            Platform.OS === "android"
              ? {
                  url: data,
                  subject: `${fullname} Digital card`,
                  title:
                    profileDetail?.personal_info?.company_name || "Netlynxs",
                  message: `Please find below the Digital card link for ${fullname}
                     ${profileDetail?.personal_info?.digital_card}`,
                }
              : {
                  urls: [profileDetail?.personal_info?.digital_card],
                  subject: `${fullname} Digital card`,
                  message: `Please find below the Digital card link for ${fullname}
                     ${profileDetail?.personal_info?.digital_card}`,
                };

          await Share.open({ ...options });
          // remove the file from storage
          // return fs.unlink(imagePath);
        });
      // const uri = await captureRef(ref, {
      //   format: "png",
      //   quality: 1,
      // });
      // await Sharing.shareAsync(uri);
    } catch (e) {
      console.log(e);
    }
  };
  useEffect(() => {
    // Enable NFC when the component mounts

    // Clean up NFC when the component unmounts
    return () => {};
  }, []);

  return (
    <View style={globalStyles.container}>
      <View style={styles.container}>
        <View style={styles.blueBG}>
          <SquareLogo url={profileDetail?.personal_info?.logo} />
          <ProfileCard />
        </View>
        <View style={localStyle.scrollContainer}>
          <ScrollView
            showsVerticalScrollIndicator={false}
            overScrollMode="never"
          >
            <View style={localStyle.scrollViewChild}>
              <Text style={localStyle.title}>My Business Card</Text>
              <View style={localStyle.imageContainer}>
                <ViewShot ref={ref}>
                  <Image
                    source={{ uri: profileDetail?.personal_info?.qr_code }}
                    resizeMode="contain"
                    style={localStyle.image}
                  />
                </ViewShot>
              </View>
            </View>
          </ScrollView>
          <ShareContact show={showEmail} setShow={setShowEmail} />
          <View style={localStyle.row}>
            <MainButton
              onPress={handleSendEmail}
              style={[localStyle.flex, localStyle.text]}
              name="Text / Email"
            />
            <MainButton
              onPress={shareImage}
              style={[localStyle.flex, localStyle.share]}
              name="Share"
              Icon={<FontAwesome name="send" size={20} color={colors.white} />}
            />
          </View>
        </View>
      </View>
    </View>
  );
};

const localStyle = StyleSheet.create({
  scrollContainer: {
    paddingTop: 110,
    paddingHorizontal: 4,
    flex: 1,
    marginBottom: 30,
  },
  scrollViewChild: {
    paddingVertical: 12,
  },
  text: {
    backgroundColor: "#2f9e44",
  },
  share: {
    backgroundColor: colors.red,
  },
  title: {
    fontSize: 20,
    fontFamily: "Avenir-Regular",
    color: colors.primary,
    textAlign: "center",
  },
  imageContainer: {
    paddingVertical: 6,
    alignItems: "center",
  },
  image: {
    width: 220,
    height: 240,
  },
  flex: {
    flex: 1,
  },
  row: {
    columnGap: 10,
    flexDirection: "row",
    alignItems: "center",
  },
});

export default ScannerScreen;
