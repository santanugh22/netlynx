 import {
  View,
  Text,
  ActivityIndicator,
  StyleSheet,
  FlatList,
} from "react-native";
import React, { useState } from "react";
import { globalStyles } from "../../../global.style";
import { styles } from "../home/HomeScreen.style";
import Header from "../common/Header";
import {
  useGetContactListQuery,
  useGetProfileDetailQuery,
} from "../../redux/services/staffAndUser";
import { useAppSelector } from "../../redux/hooks";
import { selectedAuth } from "../../redux/features/authSlice";
import ContactCard from "./ContactCard";
import WebView from "react-native-webview";

const CustomerDetails = ({ navigation, route }: any) => {
  const url = route?.params?.url;
  const onDelete = route?.params?.onDelete;
  const [loading, setLoading] = useState(true);
  const webview = React.useRef(null);
  const { auth_key, id, role } = useAppSelector(selectedAuth);
  const { data: profileDetail } = useGetProfileDetailQuery({
    auth_key,
    id,
    role,
  });

  const handleMessage = (event: any) => {
    const message = event.nativeEvent.data;
    console.log("Message received from WebView:", message);

    if (message === "goToNativeScreen") {
      onDelete();
      navigation.goBack();
    }
  };

  return (
    <View style={globalStyles.container}>
      <View style={styles.container}>
        <Header
          onPress={() => navigation.goBack()}
          title="Customer Card Details"
          hasBack={true}
        />
        <View style={localStyles.mainContainer}>
          <WebView
            showsVerticalScrollIndicator={false}
            bounces={false}
            source={{
              uri: url,
            }}
            ref={webview}
            originWhitelist={[
              "https://*",
              "http://*",
              "file://*",
              "sms://*",
              "tel://*",
            ]}
            onLoad={() => {
              setLoading(false);
            }}
            onLoadProgress={(e) => {
              console.log(e.nativeEvent.url);
            }}
            setBuiltInZoomControls={false}
            onMessage={handleMessage}
          />
        </View>
      </View>
    </View>
  );
};

const localStyles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  mainContainer: {
    marginHorizontal: -12,
    flex: 1,
  },
});
export default CustomerDetails;