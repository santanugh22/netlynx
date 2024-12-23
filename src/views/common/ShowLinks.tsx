import { View, Text, Linking, Pressable, StyleSheet } from "react-native";
import React, { useState } from "react";
import { AntDesign, FontAwesome5 } from "@expo/vector-icons";
import { colors } from "../../utils/colors";
import AddLink from "./AddLink";
import PdfCard from "./PdfCard";
import Toast from "react-native-toast-message";
import { selectedAuth } from "../../redux/features/authSlice";
import { useAppSelector } from "../../redux/hooks";
import {
  useGetProfileDetailQuery,
  useGetFileQuery,
  useDeleteFileMutation,
} from "../../redux/services/staffAndUser";
import RenameModal from "./RenameModal";

const ShowLinks = () => {
  const { auth_key, id, role } = useAppSelector(selectedAuth);
  const [edit, setEdit] = useState(false);
  const { data: files, isLoading: IsFileLoading } = useGetFileQuery({
    auth_key,
    id,
    role,
  });
  const [fileId, setFileId] = useState<string>("");
  const [deleteFile] = useDeleteFileMutation();
  const [rename, setRename] = useState(false);

  const deleteCardFileHandler = async () => {
    let { data }: any = await deleteFile({ auth_key, id, fileId, role });
    if (data) {
      Toast.show({
        type: !data.error ? "success" : "error",
        text1: !data.error ? data.msg : data.msg,
      });
    }
  };

  const handlePdfEdit = (item: any) => {
    setFileId(item.id);
    setEdit(!edit);
  };

  return (
    <>
      {files?.data?.map((item, index) => (
        <View style={styles.pdfRowG} key={index}>
          <PdfCard title={item.title} onPress={() => handlePdfEdit(item)} fileUrl={item.file_url} />
          {edit && item.id === fileId ? (
            <View style={styles.editContainer}>
              <Pressable
                style={styles.pdfContent}
                onPress={() => Linking.openURL(item.file_url)}
              >
                <AntDesign name="folderopen" size={16} color={colors.docText} />
                <Text style={[styles.editText]}>Open Document</Text>
              </Pressable>
              <Pressable
                onPress={() => setRename(!rename)}
                style={styles.pdfContent}
              >
                <FontAwesome5 name="edit" size={14} color={colors.docText} />
                <Text style={[styles.editText]}>Rename Document</Text>
              </Pressable>
              <Pressable
                style={styles.pdfContent}
                onPress={deleteCardFileHandler}
              >
                <AntDesign name="delete" size={15} color={colors.docText} />
                <Text style={[styles.editText]}>Delete Document</Text>
              </Pressable>
            </View>
          ) : null}
        </View>
      ))}
      <RenameModal rename={rename} setRename={setRename} fileId={fileId} />
    </>
  );
};

export default ShowLinks;

export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  pt12: {
    paddingTop: 12,
  },
  image: {
    marginTop: 12,
    height: 200,
    borderRadius: 12,
    marginHorizontal: 6,
  },
  blueBG: {
    backgroundColor: colors.primary,
    height: 189,
    paddingVertical: 6,
    marginHorizontal: -12,
    paddingHorizontal: 8,
    zIndex: 11,
  },
  scrollContainer: {
    paddingTop: 80,
    paddingHorizontal: 4,
    marginBottom: 220,
  },
  addContainer: {
    paddingTop: 12,
    paddingHorizontal: 12,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  videoContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingBottom: 6,
  },
  infoContainer: {
    paddingVertical: 8,
  },
  titleText: {
    color: colors.primary,
    fontSize: 18,
    fontFamily: "Avenir-Regular",
    textAlign: "center",
  },
  redText: {
    fontFamily: "Avenir-Regular",
    textAlign: "center",
    color: colors.red,
  },
  buttonContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    columnGap: 12,
    flexWrap: "wrap",
    flex: 1,
    paddingTop: 12,
    paddingBottom: 8,
  },
  socialMediaContainer: {
    justifyContent: "flex-start",
    columnGap: 20,
  },
  button: {
    flex: 1,
  },
  icons: {
    height: 50,
    width: 50,
  },
  videoText: {
    fontSize: 18,
    color: colors.primary,
    fontFamily: "Avenir-Heavy",
  },
  ft12: {
    fontSize: 12,
  },
  pdfRowG: {
    rowGap: 18,
  },
  pdfContent: {
    flexDirection: "row",
    alignItems: "center",
    columnGap: 10,
  },
  editText: {
    fontSize: 12,
  },
  editContainer: {
    paddingHorizontal: 6,
    alignSelf: "flex-end",
    rowGap: 10,
    marginTop: -18,
  },
});
