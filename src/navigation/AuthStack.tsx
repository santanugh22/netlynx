import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { colors } from "../utils/colors";
import SignInScreen from "../views/auth/SignInScreen";
import CreateAccount from "../views/auth/CreateAccount";

const Stack = createNativeStackNavigator();

export const AuthStack = (): JSX.Element => {
  return (
    <Stack.Navigator
      screenOptions={{
        animation: "none",
      }}
    >
      <Stack.Screen
        name="SignInScreen"
        component={SignInScreen}
        options={{
          headerStyle: {
            backgroundColor: colors.primary,
          },
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="CreateAccount"
        component={CreateAccount}
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
