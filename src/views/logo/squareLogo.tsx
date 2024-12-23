import { View, Text, Image } from "react-native";
import React from "react";
import { images } from "../../utils/images";
import { colors } from "../../utils/colors";

interface Props {
  height?: number;
  width?: number;
  url?: string;
  withOutName?: boolean;
}
const SquareLogo = ({
  height = 60,
  width = 130,
  withOutName = true,
  url,
}: Props) => {
  return (
    <View
      style={{
        alignItems: "center",
        flexDirection: "row",
        justifyContent: "center",
        columnGap: 4,
      }}
    >
      <Image
        source={{ uri: url }}
        style={{
          height: height,
          width: width,
        }}
        resizeMode="contain"
      />
      {/* {withOutName && (
        <Text
          style={{
            fontFamily: "Avenir-Heavy",
            fontSize: 16,
          }}
        >
          NETLYNXS
        </Text>
      )} */}
    </View>
  );
};

export default SquareLogo;
