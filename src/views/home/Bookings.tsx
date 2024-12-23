import React, { useEffect, useRef } from "react";
import { StyleSheet, View } from "react-native";
import { globalStyles } from "../../../global.style";
import Header from "../common/Header";
import WebView from "react-native-webview";
import { styles as navigationStyle } from "../../navigation/navigation.style";
import { goBackNavigation } from "../common/GoBackFunction";
import { selectedAuth } from "../../redux/features/authSlice";
import { useAppSelector } from "../../redux/hooks";
import { useGetProfileDetailQuery } from "../../redux/services/staffAndUser";

const Bookings = ({ navigation }: any) => {
  const webview = React.useRef(null);
  const { auth_key, id, role } = useAppSelector(selectedAuth);
  const { data: profileDetail } = useGetProfileDetailQuery({
    auth_key,
    id,
    role,
  });

  useEffect(() => {
    navigation.getParent()?.setOptions({
      tabBarStyle: {
        display: "none",
      },
    });
    return () =>
      navigation.getParent()?.setOptions({
        tabBarStyle: {
          ...navigationStyle.tabBar,
        },
      });
  }, [navigation]);

  return (
    <View style={globalStyles.container}>
      <View style={styles.container}>
        <Header
          onPress={() => goBackNavigation(navigation)}
          title="Bookings"
          hasBack={true}
        />
        <View style={styles.mainContainer}>
          <WebView
            showsVerticalScrollIndicator={false}
            bounces={false}
            source={{
              uri: `https://netlynxs.com/staff/app-booking-calender/${auth_key}`,
            }}
            ref={webview}
            originWhitelist={[
              "https://*",
              "http://*",
              "file://*",
              "sms://*",
              "tel://*",
            ]}
            onLoadProgress={(e) => {
              console.log(e.nativeEvent.url);
            }}
            setBuiltInZoomControls={false}
          />
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
    marginHorizontal: -12,
    flex: 1,
  },
});

export default Bookings;
