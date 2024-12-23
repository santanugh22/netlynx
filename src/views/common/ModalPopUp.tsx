import React, { Children } from "react";
import { Modal, StyleSheet, View } from "react-native";
import { IBottomSheet } from "./CommonInterface";

const ModalPopUp = ({ children, show, setShow }: IBottomSheet) => {
  return (
    <Modal
      transparent={true}
      visible={show}
      onRequestClose={() => {
        setShow(false);
      }}
    >
      <View style={styles.modalView}>{children}</View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalView: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
  },
  modalBg: {
    paddingVertical: 20,
    paddingHorizontal: 12,
    backgroundColor: "#fff",
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
  },
});

export default ModalPopUp;
