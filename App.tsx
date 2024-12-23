import { StatusBar } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { Navigation } from "./src/navigation";
import { colors } from "./src/utils/colors";
import { useFonts } from "expo-font";
import { Provider } from "react-redux";
import { store } from "./src/redux/store";
import Toast from "react-native-toast-message";
import React from "react";

export default function App() {
  const [fontsLoaded] = useFonts({
    ["Avenir-Heavy"]: require("./assets/fonts/Avenir-Heavy.ttf"),
    ["Avenir-Book"]: require("./assets/fonts/Avenir-Book.ttf"),
    ["Avenir-Black"]: require("./assets/fonts/Avenir-Black.ttf"),
    ["Avenir-Light"]: require("./assets/fonts/Avenir-Light.ttf"),
    ["Avenir-Regular"]: require("./assets/fonts/Avenir-Regular.ttf"),
  });

  if (!fontsLoaded) {
    return null;
  }

  return (
    <SafeAreaProvider>
      <Provider store={store}>
        <NavigationContainer>
          <SafeAreaView
            style={{
              flex: 1,
              backgroundColor: colors.primary,
            }}
          >
            <StatusBar
              barStyle="light-content"
              backgroundColor={colors.primary}
            />
            <Navigation />
            <Toast />
          </SafeAreaView>
        </NavigationContainer>
      </Provider>
    </SafeAreaProvider>
  );
}
