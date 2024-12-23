import React, { useState } from "react";
import { ScrollView, Text, View, StyleSheet, Image } from "react-native";
import { globalStyles } from "../../../global.style";
import { colors } from "../../utils/colors";
import { styles } from "../home/HomeScreen.style";
import SquareLogo from "../logo/squareLogo";
import { images } from "../../utils/images";
import { personalInfostyles } from "../home/PersonalInfo.style";
import Accordian from "../common/Accordian";
import SocialMediaContainer from "../common/SocialMediaContainer";
import SocialMediaPopUp from "../common/SocialMediaPopUp";
import CustomerManagement from "./CustomerManagement";
import { useAppSelector } from "../../redux/hooks";
import { selectedAuth } from "../../redux/features/authSlice";
import { useGetProfileDetailQuery } from "../../redux/services/staffAndUser";

const MyBusinessCard = ({ navigation }: any) => {
  const authValue = useAppSelector(selectedAuth);
  const { data: profileDetail } = useGetProfileDetailQuery(authValue);
  const [show, setShow] = useState<string>("");
  const handleAccordian = (value: string) => {
    if (show == value) {
      setShow("");
    } else {
      setShow(value);
    }
  };
  const [socialMediaData, setSocialMediaData] =
    useState<IProfileDetailSocialMedia | null>(null);

  const [showSocialMedia, setShowSocialMedia] = useState(false);
  const handleClick = (value: string) => {
    navigation.navigate(value);
  };
  return (
    <View style={globalStyles.container}>
      <View style={styles.container}>
        <View style={[styles.blueBG, localStyles.blueBg]}>
          <SquareLogo height={60} width={60} withOutName={false} />
          <View style={localStyles.imageContainer}>
            <Text style={localStyles.titleText}>My Business Card</Text>
            <Image
              source={
                profileDetail?.personal_info?.qr_code
                  ? { uri: profileDetail?.personal_info?.qr_code }
                  : images.qr
              }
              style={localStyles.image}
              resizeMode="contain"
            />
          </View>
        </View>
        <ScrollView showsVerticalScrollIndicator={false} overScrollMode="never">
          <View style={personalInfostyles.accordianContainer}>
            <Accordian
              name="Review Links"
              onPress={() => handleAccordian("Review Links")}
              show={show}
            />
            {show === "Review Links" ? (
              <>
                <SocialMediaContainer
                  openLocation="reviewLinks"
                  showSocialMedia={showSocialMedia}
                  setShowSocialMedia={setShowSocialMedia}
                  setSocialMediaData={setSocialMediaData}
                />
                <SocialMediaPopUp
                  openLocation="reviewLinks"
                  itemData={socialMediaData}
                  show={showSocialMedia}
                  setShow={setShowSocialMedia}
                />
              </>
            ) : null}
            <Accordian
              name="Customer Management"
              onPress={() => handleAccordian("Customer Management")}
              show={show}
            />
            {show === "Customer Management" ? (
              <CustomerManagement
                onPress={(value: string) => handleClick(value)}
              />
            ) : null}
          </View>
        </ScrollView>
      </View>
    </View>
  );
};

const localStyles = StyleSheet.create({
  scrollContaniner: {
    paddingHorizontal: 4,
    marginBottom: 220,
  },
  blueBg: {
    height: 290,
  },
  titleText: {
    color: colors.white,
    fontSize: 22,
    fontFamily: "Avenir-Regular",
    textAlign: "center",
  },
  image: {
    width: 150,
    height: 150,
    borderRadius: 12,
  },
  imageContainer: {
    alignItems: "center",
    rowGap: 15,
  },
});

export default MyBusinessCard;
