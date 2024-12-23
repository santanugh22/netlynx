import { StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import InputBorder from "./InputBorder";
import MainButton from "./MainButton";
import ModalPopUp from "./ModalPopUp";
import Toast from "react-native-toast-message";
import { useAppSelector } from "../../redux/hooks";
import { selectedAuth } from "../../redux/features/authSlice";
import { useUpdateFileMutation } from "../../redux/services/staffAndUser";
import { string } from "yup";

interface Props {
  rename: boolean;
  setRename: React.Dispatch<React.SetStateAction<boolean>>;
  fileId: string;
}

const RenameModal = ({ rename, setRename, fileId }: Props) => {
  const { auth_key, id, role } = useAppSelector(selectedAuth);
  const [remameText, setRemameText] = useState<string>("");
  const [updateFile, { isLoading }] = useUpdateFileMutation();
  const renameHandler = async () => {
    let { data }: any = await updateFile({
      auth_key,
      id,
      fileId,
      role,
      title: remameText,
    });
    if (data) {
      setRename(!rename);
      Toast.show({
        type: !data.error ? "success" : "error",
        text1: !data.error ? data.msg : data.msg,
      });
    }
  };

  return (
    <ModalPopUp show={rename} setShow={setRename}>
      <View style={styles.renameContainer}>
        <InputBorder
          placeholder="Rename"
          onChangeText={setRemameText}
          value={remameText}
        />
        <MainButton name="Save" onPress={renameHandler} isLoading={isLoading} />
      </View>
    </ModalPopUp>
  );
};

export default RenameModal;

const styles = StyleSheet.create({
  renameContainer: {
    backgroundColor: "#fff",
    paddingVertical: 22,
    marginHorizontal: 12,
    paddingHorizontal: 12,
    borderRadius: 4,
    rowGap: 24,
  },
});
