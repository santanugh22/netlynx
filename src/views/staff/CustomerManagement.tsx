import { View, Text } from "react-native";
import React from "react";
import { styles } from "../home/HomeScreen.style";
import MainButton from "../common/MainButton";
import { Feather, Fontisto, SimpleLineIcons } from "@expo/vector-icons";
import { colors } from "../../utils/colors";

interface IProps {
  onPress: (e: string) => void;
}
const CustomerManagement = ({ onPress }: IProps) => {
  const handleOnPress = (value: string) => {
    onPress(value);
  };
  return (
    <View>
      <View style={styles.buttonContainer}>
        <MainButton
          onPress={() => handleOnPress("Bookings")}
          fontSize={14}
          style={styles.button}
          name="Bookings"
          Icon={<Feather name="phone" size={18} color={colors.white} />}
        />
        <MainButton
          onPress={() => handleOnPress("Reviews")}
          fontSize={14}
          style={styles.button}
          name="Reviews"
          Icon={<Fontisto name="email" size={18} color={colors.white} />}
        />
      </View>
      <View style={styles.buttonContainer}>
        <MainButton
          onPress={() => handleOnPress("CardScreen")}
          fontSize={14}
          style={styles.button}
          name="Cards"
          Icon={
            <SimpleLineIcons
              name="credit-card"
              size={18}
              color={colors.white}
            />
          }
        />
        <MainButton
          onPress={() => handleOnPress("Payment")}
          fontSize={14}
          style={styles.button}
          name="Payment"
          Icon={<Fontisto name="email" size={18} color={colors.white} />}
        />
      </View>
    </View>
  );
};

export default CustomerManagement;
