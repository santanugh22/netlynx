import React, { useState } from "react";
import { Linking, StyleSheet, Text, View } from "react-native";
import { colors } from "../../utils/colors";
import CustomCheckbox from "./CheckBox";
import ModalPopUp from "./ModalPopUp";

interface IProps {
  show: boolean;
  setShow: (e: any) => void;
  onPress: (e: any) => void;
}

const PrivacyCard = ({ show, setShow, onPress = () => {} }: IProps) => {
  const [check, setCheck] = useState(false);
  return (
    <ModalPopUp show={show} setShow={setShow}>
      <View style={styles.container}>
        <Text style={styles.text}>
          It is essential that you understand what information our app collects
          and utilizes.{"\n"}
        </Text>
        <Text style={styles.text}>
          <Text style={styles.title}>● Full Name</Text>
          {"\n"}
          The app uses your full name for personalization and identification
          within the service.
          {"\n"}
        </Text>
        <Text style={styles.text}>
          <Text style={styles.title}>● Email ID </Text>
          {"\n"}The app uses your email for account verification, password
          recovery, and to send important notifications related to the service.
          {"\n"}
        </Text>
        <Text style={styles.text}>
          <Text style={styles.title}>● Mobile Phone</Text> {"\n"}
          Your mobile phone number is used for account security, enabling
          two-factor authentication, and for urgent communications.
        </Text>
        <Text style={styles.text}>
          {"\n"}
          <Text style={styles.title}>● Profile Picture </Text>
          Your profile picture helps personalize your experience and allows
          other users to recognize you within the app. Important: Rest assured
          that our app prioritizes your privacy and security.
          {"\n"}
        </Text>
        <Text style={styles.text}>
          We do not sell or share any of your personal or sensitive data with
          third parties. By continuing, you agree to our Privacy Policy and
          Terms of Service.
          {"\n"}
          {"\n"}
        </Text>
        <CustomCheckbox
          onCheck={(e) => setCheck(e)}
          label={
            <Text style={[styles.infoText, { textAlign: "left" }]}>
              By Continuing you agree to our
              <Text
                onPress={() => {
                  Linking.openURL("https://netlynxs.com/privacy-policy/");
                }}
                style={styles.heavy}
              >
                {"\t"} Privacy Policy {"\t"}
              </Text>
              and{"\t"}
              <Text
                onPress={() => {
                  Linking.openURL("https://netlynxs.com/terms-of-use/");
                }}
                style={styles.heavy}
              >
                Terms of use.
              </Text>
            </Text>
          }
        />
        <View style={styles.btnRow}>
          <Text onPress={() => onPress(false)} style={styles.blueText}>
            Decline
          </Text>
          <Text
            onPress={() => {
              if (check) {
                onPress(true);
              }
            }}
            style={[styles.blueText, !check && styles.textDisable]}
          >
            Agree
          </Text>
        </View>
      </View>
    </ModalPopUp>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white,
    paddingTop: 12,
    paddingHorizontal: 12,
    marginHorizontal: 12,
    borderRadius: 4,
    paddingBottom: 16,
  },
  infoText: {
    color: colors.info,
    fontSize: 12,
    fontFamily: "Avenir-Regular",
    textAlign: "right",
    marginLeft: 12,
  },
  heavy: {
    fontFamily: "Avenir-Heavy",
    color: colors.primary,
  },
  text: {
    fontFamily: "Avenir-Regular",
    fontSize: 14,
    color: "#868e96",
  },
  title: {
    fontFamily: "Avenir-Heavy",
    color: "#000",
  },
  btnRow: {
    flexDirection: "row",
    alignItems: "center",
    columnGap: 24,
    marginTop: 12,
    paddingVertical: 8,
    paddingHorizontal: 14,
    justifyContent: "flex-end",
  },
  blueText: {
    fontFamily: "Avenir-Heavy",
    color: colors.primary,
  },
  textDisable: {
    opacity: 0.5,
  },
});

export default PrivacyCard;
