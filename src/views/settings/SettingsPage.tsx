import {
  AntDesign,
  Entypo,
  MaterialCommunityIcons,
  MaterialIcons,
} from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import React from "react";
import { Platform, Pressable, StyleSheet, Text, View } from "react-native";
import Toast from "react-native-toast-message";
import { globalStyles } from "../../../global.style";
import { saveAuthInfo, selectedAuth } from "../../redux/features/authSlice";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { colors } from "../../utils/colors";
import BottomSheet from "../common/BottomSheet";
import Header from "../common/Header";
import SwitchCard from "../common/SwitchCard";
import ClickAbleList from "./ClickAbleList";
import LottieView from "lottie-react-native";
import { useDeleteUserMutation } from "../../redux/services/staffAndUser";

const SettingsPage = ({ navigation }: any) => {
  const dispatch = useAppDispatch();
  const { role, auth_key, id } = useAppSelector(selectedAuth);
  const [deleteUser] = useDeleteUserMutation();
  const [show, setShow] = React.useState(false);
  const logoutBtn = async () => {
    dispatch(saveAuthInfo(null as any));
    await AsyncStorage.removeItem("@Auth_Key");
    Toast.show({
      type: "success",
      text1: "logged out",
    });
  };
  const handleNavigation = (params: string) => {
    navigation.navigate(params);
  };

  const handleDeleteAccount = () => {
    setShow(!show);
  };

  const deleteUserHandler = async () => {
    let { data }: any = await deleteUser({ auth_key, id });
    if (data) {
      dispatch(saveAuthInfo(null as any));
      await AsyncStorage.removeItem("@Auth_Key");
      Toast.show({
        type: !data.error ? "success" : "error",
        text1: !data.error ? data.msg : data.msg,
      });
    }
  };

  return (
    <View style={globalStyles.container}>
      <Header title="Settings" />
      <BottomSheet show={show} setShow={setShow}>
        <View style={localStyle.main}>
          <View style={localStyle.sheet_header}>
            <Entypo
              onPress={() => setShow(false)}
              name="cross"
              size={26}
              color="#111"
            />
          </View>
          {role === "staff" ? (
            <Text style={localStyle.text}>
              No Permission. Contact admin to delete account
            </Text>
          ) : (
            <View>
              <View>
                <Text style={localStyle.text}>
                  If you delete your account now, all your bookings history will
                  be deleted and you will have no option to recover it.
                </Text>
              </View>
              <View>
                <Text style={localStyle.text_c}>
                  Are you sure want to delete account ?
                </Text>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  marginTop: 15,
                  justifyContent: "center",
                }}
              >
                <Pressable
                  onPress={() => {
                    setShow(false);
                  }}
                  style={localStyle.cancel}
                >
                  <Text style={localStyle.text}>Cancel</Text>
                </Pressable>
                <Pressable
                  onPress={deleteUserHandler}
                  style={localStyle.delete_acc}
                >
                  <Text style={localStyle.text_}>Delete Account</Text>
                </Pressable>
              </View>
            </View>
          )}
        </View>
      </BottomSheet>
      <View
        style={{
          flex: 1,
          paddingVertical: 16,
          rowGap: 10,
        }}
      >
        <ClickAbleList
          onPress={() => handleNavigation("TermsCondition")}
          name="Terms & Conditions"
          ListIcon={
            <MaterialCommunityIcons
              name="file-certificate-outline"
              size={24}
              color={colors.primary}
            />
          }
        />
        <ClickAbleList
          onPress={() => handleNavigation("PrivacyPolicy")}
          name="Privacy Policy"
          ListIcon={
            <MaterialIcons
              name="privacy-tip"
              size={24}
              color={colors.primary}
            />
          }
        />
        <ClickAbleList
          onPress={() => handleNavigation("ContactUs")}
          name="Contact Us"
          ListIcon={
            <MaterialIcons
              name="contact-phone"
              size={24}
              color={colors.primary}
            />
          }
        />
        <ClickAbleList
          onPress={logoutBtn}
          name="Logout"
          ListIcon={
            <MaterialIcons name="logout" size={24} color={colors.red} />
          }
        />
        <ClickAbleList
          onPress={handleDeleteAccount}
          name="Delete Account"
          ListIcon={<AntDesign name="delete" size={24} color={colors.red} />}
        />
      </View>
      <View
        style={{
          paddingTop: 10,
          paddingBottom: 30,
        }}
      >
        <SwitchCard />
      </View>
    </View>
  );
};

const localStyle = StyleSheet.create({
  main: {
    paddingHorizontal: 10,
    height: 250,
  },
  sheet_header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
    paddingBottom: 15,
    paddingHorizontal: 10,
  },
  text: {
    fontFamily: "Avenir-Regular",
    textAlign: "justify",
  },
  text_: {
    fontFamily: "Avenir-Regular",
    textAlign: "justify",
    color: "#fff",
  },
  text_c: {
    fontFamily: "Avenir-Heavy",
    textAlign: "center",
    marginVertical: 20,
  },
  cancel: {
    borderColor: colors.primary,
    borderWidth: 2,
    borderRadius: 4,
    paddingHorizontal: 30,
    paddingVertical: 8,
    backgroundColor: "#fff",
  },
  delete_acc: {
    borderColor: colors.primary,
    marginLeft: 20,
    borderWidth: 2,
    borderRadius: 4,
    paddingHorizontal: 30,
    paddingVertical: 8,
    backgroundColor: colors.primary,
  },
});

export default SettingsPage;
