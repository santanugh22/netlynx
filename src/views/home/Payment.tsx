// import React, { useEffect, useState } from "react";
// import { StyleSheet, View, ActivityIndicator } from "react-native";
// import { globalStyles } from "../../../global.style";
// import Header from "../common/Header";
// import WebView from "react-native-webview";
// import { styles as navigationStyle } from "../../navigation/navigation.style";
// import { goBackNavigation } from "../common/GoBackFunction";
// import { selectedAuth } from "../../redux/features/authSlice";
// import { useAppSelector } from "../../redux/hooks";
// import { useGetProfileDetailQuery } from "../../redux/services/staffAndUser";

// const Payment = ({ navigation }: any) => {
//   const { auth_key, id, role } = useAppSelector(selectedAuth);
//   const { data: profileDetail } = useGetProfileDetailQuery({
//     auth_key,
//     id,
//     role,
//   });
//   const [isLoading, setIsLoading] = useState<boolean>(true);
//   const webview = React.useRef(null);

//   useEffect(() => {
//     navigation.getParent()?.setOptions({
//       tabBarStyle: {
//         display: "none",
//       },
//     });
//     return () =>
//       navigation.getParent()?.setOptions({
//         tabBarStyle: {
//           ...navigationStyle.tabBar,
//         },
//       });
//   }, [navigation]);

//   return (
//     <View style={globalStyles.container}>
//       <View style={styles.container}>
//         <Header
//           onPress={() => goBackNavigation(navigation)}
//           title="Payment"
//           hasBack={true}
//         />
//         {isLoading && <ActivityIndicator size="large" style={styles.loading} />}
//         <View style={styles.mainContainer}>
//           <WebView
//             showsVerticalScrollIndicator={false}
//             bounces={false}
//             source={{
//               uri: `https://netlynxs.com/netlynxs-wp/wp-login.php?booknetic-payments=${profileDetail?.personal_info?.email}`,
//             }}
//             ref={webview}
//             originWhitelist={[
//               "https://*",
//               "http://*",
//               "file://*",
//               "sms://*",
//               "tel://*",
//             ]}
//             onLoadProgress={(e) => {
//               console.log(e.nativeEvent.url);
//             }}
//             setBuiltInZoomControls={false}
//             onLoadEnd={() => {
//               setIsLoading(!isLoading);
//             }}
//           />
//         </View>
//       </View>
//     </View>
//   );
// };
// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//   },
//   mainContainer: {
//     marginHorizontal: -12,
//     flex: 1,
//   },
//   loading: {
//     flex: 1,
//     justifyContent: "center",
//     alignItems: "center",
//   },
// });

// export default Payment;

import React, { useEffect, useState } from "react";
import { StyleSheet, View, ActivityIndicator, Alert } from "react-native";
import { globalStyles } from "../../../global.style";
import Header from "../common/Header";
import WebView from "react-native-webview";
import { styles as navigationStyle } from "../../navigation/navigation.style";
import { goBackNavigation } from "../common/GoBackFunction";
import { selectedAuth } from "../../redux/features/authSlice";
import { useAppSelector } from "../../redux/hooks";
import { useGetProfileDetailQuery } from "../../redux/services/staffAndUser";

const Payment = ({ navigation }: any) => {
  const { auth_key, id, role, enable_payment } = useAppSelector(selectedAuth);
  const { data: profileDetail } = useGetProfileDetailQuery({
    auth_key,
    id,
    role,
  });
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const webview = React.useRef(null);

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

  useEffect(() => {
    if (enable_payment === '0') {
      Alert.alert(
        "Coming Soon", // Title
        "More information will be available shortly", // Message
        [{ text: "OK", onPress: () => goBackNavigation(navigation) }] // Button
      );
    }
  }, [enable_payment, navigation]);

  return (
    <View style={globalStyles.container}>
      <View style={styles.container}>
        <Header
          onPress={() => goBackNavigation(navigation)}
          title="Payment"
          hasBack={true}
        />
        {isLoading && <ActivityIndicator size="large" style={styles.loading} />}
        <View style={styles.mainContainer}>
          {enable_payment === '1' && (
            <WebView
              showsVerticalScrollIndicator={false}
              bounces={false}
              source={{
                uri: `https://netlynxs.com/staff/app-payment-list/${auth_key}`,
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
              onLoadEnd={() => {
                setIsLoading(!isLoading);
              }}
            />
          )}
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
  loading: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default Payment;
