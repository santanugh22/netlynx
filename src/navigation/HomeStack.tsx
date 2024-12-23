import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { colors } from "../utils/colors";
import HomeScreen from "../views/home/HomeScreen";
import Bookings from "../views/home/Bookings";
import Payment from "../views/home/Payment";
import CardScreen from "../views/staff/CardScreen";
import Reviews from "../views/staff/Reviews";
import ContactList from "../views/staff/ContactList";
import CustomerDetails from "../views/staff/CustomerDetails";

const Stack = createNativeStackNavigator();

export const HomeStack = (): JSX.Element => {
  return (
    <Stack.Navigator
      screenOptions={{
        animation: "none",
      }}
    >
      <Stack.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={{
          headerStyle: {
            backgroundColor: colors.primary,
          },
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="CardScreen"
        component={CardScreen}
        options={{
          headerStyle: {
            backgroundColor: colors.primary,
          },
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="Reviews"
        component={Reviews}
        options={{
          headerStyle: {
            backgroundColor: colors.primary,
          },
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="Bookings"
        component={Bookings}
        options={{
          headerStyle: {
            backgroundColor: colors.primary,
          },
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="Payment"
        component={Payment}
        options={{
          headerStyle: {
            backgroundColor: colors.primary,
          },
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="ContactList"
        component={ContactList}
        options={{
          headerStyle: {
            backgroundColor: colors.primary,
          },
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="CustomerDetails"
        component={CustomerDetails}
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
