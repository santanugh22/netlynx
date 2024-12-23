import { FontAwesome5, MaterialIcons } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import React, { useEffect, useState } from "react";
import { View, Text, ActivityIndicator, Image } from "react-native";
import { styles } from "./navigation.style";
import { AuthStack } from "./AuthStack";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { saveAuthInfo, selectedAuth } from "../redux/features/authSlice";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { SettingStack } from "./SettingStack";
import ScannerScreen from "../views/scanner/ScannerScreen";
import { globalStyles } from "../../global.style";
import NfcScreen from "../views/nfc/NfcScreen";
import { HomeStack } from "./HomeStack";
import EmailScreen from "../views/email/EmailScreen";
import { images } from "../utils/images";

const Tab = createBottomTabNavigator();

export function Navigation(): JSX.Element {
  const [isAppLoading, setIsAppLoading] = useState(false);
  const authValue = useAppSelector(selectedAuth);
  const dispatch = useAppDispatch();

  useEffect(() => {
    (async () => {
      setIsAppLoading(true);
      const jsonValue = await AsyncStorage.getItem("@Auth_Key");
      dispatch(saveAuthInfo(jsonValue !== null ? JSON.parse(jsonValue) : null));
      setIsAppLoading(false);
    })();
  }, []);

  if (isAppLoading)
    return (
      <View style={globalStyles.loaderContainer}>
        <ActivityIndicator size="large" style={globalStyles.loader} />
      </View>
    );

  return !authValue ? (
    <AuthStack />
  ) : (
    <Tab.Navigator
      // initialRouteName="Home"
      screenOptions={({ route }) => ({
        tabBarActiveTintColor: "white",
        tabBarInactiveTintColor: "#adb5bd",
        tabBarStyle: {
          ...styles.tabBar,
        },
        tabBarHideOnKeyboard: true,
        unmountOnBlur: true,
        tabBarIcon: ({ color, focused }) => {
          switch (route.name) {
            case "home":
              return focused ? (
                <View style={styles.tabBarIcon}>
                  <FontAwesome5 name="user-alt" size={18} color={color} />
                </View>
              ) : (
                <FontAwesome5 name="user-alt" size={18} color={color} />
              );

            case "scanner":
              return focused ? (
                <View style={styles.tabBarIcon}>
                  <Image
                    source={images.qrLogo}
                    style={{ width: 26 }}
                    resizeMode="contain"
                  />
                </View>
              ) : (
                <Image
                  source={images.qrLogo}
                  style={{ width: 26 }}
                  resizeMode="contain"
                />
              );

            case "nfc":
              return focused ? (
                <View style={styles.tabBarIcon}>
                  <FontAwesome5 name="wifi" size={18} color={color} />
                </View>
              ) : (
                <FontAwesome5 name="wifi" size={18} color={color} />
              );

            case "email":
              return focused ? (
                <View style={styles.tabBarIcon}>
                  <MaterialIcons name="email" size={20} color={color} />
                </View>
              ) : (
                <MaterialIcons name="email" size={20} color={color} />
              );

            case "settings":
              return focused ? (
                <View style={styles.tabBarIcon}>
                  <FontAwesome5 name="cog" size={20} color={color} />
                </View>
              ) : (
                <FontAwesome5 name="cog" size={20} color={color} />
              );
          }
        },
        tabBarLabel: ({ focused, color }) => {
          let label: any;

          switch (route.name) {
            case "home":
              return (label = focused ? (
                <Text style={styles.label}>HOME</Text>
              ) : null);

            case "scanner":
              return (label = focused ? (
                <Text style={styles.label}>QR</Text>
              ) : null);

            case "nfc":
              return (label = focused ? (
                <Text style={styles.label}>NFC</Text>
              ) : null);

            case "email":
              return (label = focused ? (
                <Text style={styles.label}>EMAIL</Text>
              ) : null);

            case "settings":
              return (label = focused ? (
                <Text style={styles.label}>SETTINGS</Text>
              ) : null);
          }

          return label;
        },
      })}
    >
      <Tab.Screen
        name="home"
        component={HomeStack}
        options={{
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="scanner"
        component={ScannerScreen}
        options={{
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="nfc"
        component={NfcScreen}
        options={{
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="email"
        component={EmailScreen}
        options={{
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="settings"
        component={SettingStack}
        options={{
          headerShown: false,
        }}
      />
    </Tab.Navigator>
  );
}
