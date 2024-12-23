import React, { Children } from "react";
import {
  Modal,
  ScrollView,
  StyleSheet,
  View,
  Pressable,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { colors } from "../../utils/colors";
import { IBottomSheet } from "./CommonInterface";

const BottomSheet = ({ children, show, setShow }: IBottomSheet) => {
  const handleShow = () => {
    setShow(false);
  };
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={show}
      onRequestClose={handleShow}
    >
      <Pressable onPress={handleShow} style={styles.clickAway} />
      <KeyboardAvoidingView
        enabled
        behavior={Platform.OS === "android" ? undefined : "position"}
      >
        <View style={styles.modalView}>
          <View style={styles.modalBg}>
            <ScrollView
              showsVerticalScrollIndicator={false}
              overScrollMode="never"
            >
              {children}
            </ScrollView>
          </View>
        </View>
      </KeyboardAvoidingView>
    </Modal>
  );
};

const styles = StyleSheet.create({
  clickAway: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalView: {
    // flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "flex-end",
  },
  modalBg: {
    paddingVertical: 20,
    paddingHorizontal: 12,
    backgroundColor: "#fff",
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
  },
});

export default BottomSheet;
