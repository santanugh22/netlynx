import { View, Text, Image, StyleSheet, Alert, Platform } from "react-native";
import React, { useEffect, useState } from "react";
import { globalStyles } from "../../../global.style";
import Header from "../common/Header";
import { images } from "../../utils/images";
import { colors } from "../../utils/colors";
import MainButton from "../common/MainButton";
import { useAppSelector } from "../../redux/hooks";
import { selectedAuth } from "../../redux/features/authSlice";
import { useGetProfileDetailQuery } from "../../redux/services/staffAndUser";
import NfcManager, { Ndef, NfcTech } from "react-native-nfc-manager";
import AsyncStorage from "@react-native-async-storage/async-storage";

const NfcScreen = () => {
  const authValue = useAppSelector(selectedAuth);
  const { data: profileDetail, isLoading } =
    useGetProfileDetailQuery(authValue);

  const checkProfile = async () => {
    let res = await AsyncStorage.getItem("profileSwitch");
    if (res && res == "on") {
    }
  };
  useEffect(() => {
    // Enable NFC when the component mounts
    checkProfile();
    // Clean up NFC when the component unmounts
    return () => {};
  }, []);

  return (
    <View style={globalStyles.container}>
      <View style={styles.container}>
        <Header title={`Hey, ${profileDetail?.personal_info?.fname}`} />
        <View style={styles.mainContainer}>
          <View>
            <Image
              source={{ uri: profileDetail?.personal_info?.image }}
              style={styles.image}
              resizeMode="contain"
            />
            <View style={styles.contentContainer}>
              <Text style={styles.infoText}>
                Your pod will be activated with username :
              </Text>
              <Text style={styles.nameText}>
                {profileDetail?.personal_info?.user_name}
              </Text>
            </View>
          </View>
          <MainButton onPress={() => {}} name="Activate Pod" />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  mainContainer: {
    justifyContent: "space-between",
    flex: 1,
    paddingTop: 20,
    paddingBottom: 26,
  },
  image: {
    width: 150,
    height: 150,
    borderRadius: 100,
    alignSelf: "center",
  },
  contentContainer: {
    alignItems: "center",
    paddingVertical: 34,
  },
  infoText: {
    fontSize: 18,
    textAlign: "center",
    color: colors.primary,
    fontFamily: "Avenir-Regular",
  },
  nameText: {
    fontSize: 22,
    marginTop: 8,
    fontFamily: "Avenir-Heavy",
  },
});

export default NfcScreen;
