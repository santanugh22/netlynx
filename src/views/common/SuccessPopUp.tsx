import { View, Text, StyleSheet, Pressable } from "react-native";
import React from "react";
import ModalPopUp from "./ModalPopUp";
import InputBorder from "./InputBorder";
import { colors } from "../../utils/colors";
import { Feather } from "@expo/vector-icons";

interface Props {
  show: boolean;
  setShow: (e: boolean) => void;
}
const SuccessPopUp = ({ show, setShow }: Props) => {
  return (
    <ModalPopUp show={show} setShow={setShow}>
      <View style={styles.container}>
        <View style={styles.main}>
          <Feather name="check-circle" size={30} color={colors.white} />
        </View>
        <View style={styles.success}>
          <Text style={styles.text}>Success</Text>
          <Text style={styles.profileText}>Profile Updated Successfully</Text>
          <Pressable style={styles.okContainer}>
            <Text style={styles.okText}>ok</Text>
          </Pressable>
        </View>
      </View>
    </ModalPopUp>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    marginHorizontal: 16,
    borderRadius: 8,
    // paddingHorizontal: 12,
  },
  title: {
    fontFamily: "Avenir-Heavy",
    marginBottom: 14,
    paddingTop: 6,
    textAlign: "center",
  },
  main: {
    backgroundColor: "#2b8a3e",
    paddingVertical: 16,
    paddingHorizontal: 12,
    alignContent: "center",
    justifyContent: "center",
    flexDirection: "row",
  },
  success: {
    backgroundColor: "#fff",
    paddingHorizontal: 8,
    paddingVertical: 8,
  },
  text: {
    fontFamily: "Avenir-Heavy",
    fontSize: 16,
    textAlign: "center",
  },
  profileText: {
    fontFamily: "Avenir-Regular",
    fontSize: 14,
    marginVertical: 6,
    textAlign: "center",
  },
  okContainer: {
    backgroundColor: "#2b8a3e",
    paddingHorizontal: 58,
    alignSelf: "center",
    marginVertical: 8,
  },
  okText: {
    fontFamily: "Avenir-Regular",
    fontSize: 16,
    marginVertical: 6,
    color: colors.white,
    textAlign: "center",
  },
});
export default SuccessPopUp;
