import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { colors } from "../utils/colors";
import SignInScreen from "../views/auth/SignInScreen";
import SettingsPage from "../views/settings/SettingsPage";
import ContactUs from "../views/settings/ContactUs";
import TermsCondition from "../views/settings/TermsCondition";
import PrivacyPolicy from "../views/settings/PrivacyPolicy";

const Stack = createNativeStackNavigator();

export const SettingStack = (): JSX.Element => {
  return (
    <Stack.Navigator
      screenOptions={{
        animation: "none",
      }}
    >
      <Stack.Screen
        name="SettingsPage"
        component={SettingsPage}
        options={{
          headerStyle: {
            backgroundColor: colors.primary,
          },
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="ContactUs"
        component={ContactUs}
        options={{
          headerStyle: {
            backgroundColor: colors.primary,
          },
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="TermsCondition"
        component={TermsCondition}
        options={{
          headerStyle: {
            backgroundColor: colors.primary,
          },
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="PrivacyPolicy"
        component={PrivacyPolicy}
        options={{
          headerStyle: {
            backgroundColor: colors.primary,
          },
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
};
