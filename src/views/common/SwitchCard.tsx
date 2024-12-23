import { View, Text, Pressable, StyleSheet } from "react-native";
import React, { useEffect, useState } from "react";
import { globalStyles } from "../../../global.style";
import { colors } from "../../utils/colors";
import AsyncStorage from "@react-native-async-storage/async-storage";

const SwitchCard = () => {
  const [click, setClick] = useState("on");
  const handleClick = (value: string): void => {
    setClick(value);
    AsyncStorage.setItem("profileSwitch", value);
  };

  const getProfileSwitch = async () => {
    let res = await AsyncStorage.getItem("profileSwitch");
    if (res) {
      setClick(res);
    }
  };

  useEffect(() => {
    getProfileSwitch();
  }, []);

  return (
    <View style={[globalStyles.card, styles.card]}>
      <Pressable
        onPress={() => handleClick("on")}
        style={[
          styles.switch,
          {
            backgroundColor: click === "on" ? colors.primary : colors.white,
          },
        ]}
      >
        <Text
          style={[
            styles.switchText,
            {
              color: click === "on" ? colors.white : colors.primary,
            },
          ]}
        >
          Profile On
        </Text>
      </Pressable>
      <Pressable
        onPress={() => handleClick("off")}
        style={[
          styles.switch,
          {
            backgroundColor: click === "off" ? colors.primary : colors.white,
          },
        ]}
      >
        <Text
          style={[
            styles.switchText,
            {
              color: click === "off" ? colors.white : colors.primary,
            },
          ]}
        >
          Profile Off
        </Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    columnGap: 20,
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 30,
  },
  switch: {
    flex: 1,
    paddingVertical: 8,
    borderRadius: 20,
  },
  switchText: {
    fontFamily: "Avenir-Heavy",
    textAlign: "center",
  },
});

export default SwitchCard;
