import { View, Text, StyleSheet } from "react-native";
import React from "react";
import { colors } from "../../utils/colors";

interface Props {
  name: string;
  setShow: React.Dispatch<React.SetStateAction<boolean>>;
}

const BorderContainer = ({ name, setShow }: Props) => {
  return (
    <View style={styles.inputContainer}>
      <View style={styles.videoContainer}>
        <Text style={styles.videoText}>Add New {name}</Text>
        <Text onPress={() => setShow(true)} style={styles.videoButton}>
          Add
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    paddingBottom: 4,
    rowGap: 10,
  },
  socialMediaRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  videoContainer: {
    borderWidth: 1,
    borderColor: "#979797",
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 18,
  },
  videoText: {
    fontFamily: "Avenir-Regular",
    textAlign: "center",
    fontSize: 15,
  },
  videoButton: {
    marginTop: 5,
    fontFamily: "Avenir-Book",
    textAlign: "center",
    color: colors.red,
    textDecorationLine: "underline",
  },
});
export default BorderContainer;
