import {
  View,
  Text,
  StyleSheet,
  Pressable,
  Linking,
  ActivityIndicator,
} from "react-native";
import React, { useState } from "react";
import { colors } from "../../utils/colors";
import { AntDesign, Entypo, FontAwesome5 } from "@expo/vector-icons";
import { globalStyles } from "../../../global.style";
import MainButton from "./MainButton";
import BottomSheet from "./BottomSheet";
import { IAddVideo } from "./CommonInterface";
import Toast from "react-native-toast-message";
import { useAppSelector } from "../../redux/hooks";
import { selectedAuth } from "../../redux/features/authSlice";
import {
  useDeleteFileMutation,
  useGetFileQuery,
  useSaveFileMutation,
} from "../../redux/services/staffAndUser";
import * as DocumentPicker from "expo-document-picker";
import InputBorder from "./InputBorder";
import { Formik } from "formik";
import * as Yup from "yup";
import PdfCard from "./PdfCard";

const validationSchema = Yup.object().shape({
  title: Yup.string().required("Title is Required!"),
});

const AddLink = ({ show, setShow }: IAddVideo) => {
  const [doc, setDoc] = useState<{
    name: string;
    uri: string;
    mimeType: string;
    size: number;
  } | null>(null);
  const [edit, setEdit] = useState(true);
  const { auth_key, id, role } = useAppSelector(selectedAuth);
  const [saveFile, { isLoading }] = useSaveFileMutation();
  const { data: files, isLoading: IsFileLoading } = useGetFileQuery({
    auth_key,
    id,
    role,
  });
  const [fileId, setFileId] = useState(0);
  const [deleteFile] = useDeleteFileMutation();

  const pickDocument = async () => {
    let result = await DocumentPicker.getDocumentAsync({
      type: [
        "application/pdf",
        "application/vnd.ms-excel",
        "application/msword",
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      ],
    });
    if (result) {
      setDoc(result as any);
    }
  };

  const onSubmitHandler = async ({ title }: { title: string }) => {
    if (doc) {
      if (doc.size <= 2104704) {
        const { data }: any = await saveFile({
          auth_key,
          id,
          doc,
          role,
          title,
        });
        if (data) {
          setDoc(null);
          Toast.show({
            type: !data.error ? "success" : "error",
            text1: !data.error ? data.msg : data.msg,
          });
          setShow(!show);
        }
      } else {
        Toast.show({
          type: "info",
          text1: "The File Size Is Maximum 2MB",
        });
      }
    } else {
      Toast.show({
        type: "info",
        text1: "Please enter the Browse File",
      });
    }
  };

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
    setFileId(Number(item.id));
    setEdit(!edit);
  };

  return (
    <Formik
      initialValues={{
        title: "",
        url: "",
      }}
      validationSchema={validationSchema}
      onSubmit={onSubmitHandler}
    >
      {({
        handleChange,
        handleBlur,
        handleSubmit,
        values,
        errors,
        touched,
      }) => (
        <BottomSheet show={show} setShow={setShow}>
          <View>
            <Text style={styles.titleText}>Add Links</Text>
            <Pressable style={globalStyles.card} onPress={pickDocument}>
              <View style={styles.browseFiles}>
                <Text style={styles.browseFilesText}>
                  {!doc ? "Browse file" : doc.name}
                </Text>
              </View>
              <Text style={styles.dropContainer}>
                Drag & Drops file here click to upload
              </Text>
              <InputBorder
                placeholder="Title"
                onChangeText={handleChange("title")}
                onBlur={handleBlur("title")}
                value={values.title}
              />
              {errors.title && touched.title && (
                <Text style={styles.errorMsg}>{errors.title}</Text>
              )}
            </Pressable>
            <View style={styles.redContainer}>
              <Text style={styles.redContainerText}>
                Note : (.docs,.doc,.xls,xlxs,pdf) files are only allowed & file
                size maximum is 2 mb
              </Text>
            </View>
            {files?.data?.map((item, index) => (
              <View style={styles.pdfRowG} key={item.id}>
                <PdfCard
                  onPress={() => handlePdfEdit(item)}
                  title={item.title}
                  fileUrl={item.file_url}
                />
                {edit && Number(item.id) === fileId ? (
                  <View style={styles.editContainer}>
                    <Pressable
                      style={styles.pdfContent}
                      onPress={() => Linking.openURL(item.file_url)}
                    >
                      <AntDesign
                        name="folderopen"
                        size={16}
                        color={colors.docText}
                      />
                      <Text style={[styles.editText]}>Open Document</Text>
                    </Pressable>
                    <Pressable style={styles.pdfContent}>
                      <FontAwesome5
                        name="edit"
                        size={14}
                        color={colors.docText}
                      />
                      <Text style={[styles.editText]}>Rename Document</Text>
                    </Pressable>
                    <Pressable
                      style={styles.pdfContent}
                      onPress={deleteCardFileHandler}
                    >
                      <AntDesign
                        name="delete"
                        size={15}
                        color={colors.docText}
                      />
                      <Text style={[styles.editText]}>Delete Document</Text>
                    </Pressable>
                  </View>
                ) : null}
              </View>
            ))}
            {IsFileLoading && <ActivityIndicator size="large" />}
            <View style={styles.content}>
              <MainButton
                Icon={<AntDesign name="download" size={18} color="#fff" />}
                name="Save"
                onPress={handleSubmit}
                isLoading={isLoading}
              />
            </View>
          </View>
        </BottomSheet>
      )}
    </Formik>
  );
};

const styles = StyleSheet.create({
  titleText: {
    fontFamily: "Avenir-Heavy",
    color: colors.primary,
    textAlign: "center",
    fontSize: 18,
    marginBottom: 10,
  },
  content: {
    marginTop: 15,
    rowGap: 20,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    columnGap: 20,
    paddingTop: 20,
  },
  uploadBox: {
    backgroundColor: colors.primary,
    padding: 8,
    borderRadius: 6,
  },
  uploadText: {
    fontFamily: "Avenir-Book",
    textAlign: "center",
    color: colors.red,
    textDecorationLine: "underline",
  },
  browseFiles: {
    paddingVertical: 8,
    paddingHorizontal: 18,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 4,
    alignSelf: "center",
  },
  browseFilesText: {
    fontFamily: "Avenir-Regular",
    fontSize: 15,
  },
  dropContainer: {
    marginTop: 12,
    fontFamily: "Avenir-Regular",
    color: colors.primary,
    textAlign: "center",
  },
  redContainer: {
    backgroundColor: "#FF1725CC",
    paddingHorizontal: 12,
    paddingVertical: 6,
    marginVertical: 12,
    borderRadius: 4,
  },
  redContainerText: {
    fontSize: 12,
    textAlign: "center",
    color: colors.white,
    fontFamily: "Avenir-Regular",
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
  errorMsg: {
    marginTop: -16,
    fontSize: 12,
    color: colors.red,
    textAlign: "right",
    fontFamily: "Avenir-Regular",
  },
});

export default AddLink;
