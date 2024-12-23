import {
  View,
  Text,
  Modal,
  StyleSheet,
  Pressable,
  Linking,
} from "react-native";
import React, { useState } from "react";
import { colors } from "../../utils/colors";
import InputBorder from "./InputBorder";
import { AntDesign } from "@expo/vector-icons";
import MainButton from "./MainButton";
import BottomSheet from "./BottomSheet";
import { IAddVideo } from "./CommonInterface";
import * as yup from "yup";
import { Formik } from "formik";
import Choose from "./Choose";
import Toast from "react-native-toast-message";
import {
  useSaveReviewLinkMutation,
  useSaveSocialMediaLinkMutation,
} from "../../redux/services/staffAndUser";
import { useAppSelector } from "../../redux/hooks";
import { selectedAuth } from "../../redux/features/authSlice";

const validationSchema = yup.object().shape({
  title: yup.string().required("Title is Required!"),
  url: yup.string().required("Url is Required!"),
});

const AddSocialMedia = ({ show, setShow, openLocation }: IAddVideo) => {
  const { auth_key, id, role } = useAppSelector(selectedAuth);
  const [openCamera, setOpenCamera] = useState<boolean>(false);
  const [imageURI, setImageURI] = useState<string>("");
  const [saveSocialMediaLink, { isLoading }] = useSaveSocialMediaLinkMutation();
  const [saveReviewLink, { isLoading: IsReviewing }] =
    useSaveReviewLinkMutation();

  const onSubmitHandler = async (values: { title: string; url: string }) => {
    if (imageURI) {
      const { data }: any =
        openLocation === "reviewLinks"
          ? await saveReviewLink({
              auth_key,
              id,
              imageURI,
              socialMediaInfo: values,
            })
          : await saveSocialMediaLink({
              auth_key,
              id,
              role,
              imageURI,
              socialMediaInfo: values,
            });
      if (data) {
        Toast.show({
          type: !data.error ? "success" : "error",
          text1: !data.error ? data.msg : data.msg,
        });
        setShow(!show);
      }
    } else {
      Toast.show({
        type: "info",
        text1: "Image URI is Required!",
      });
    }
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
        <>
          <BottomSheet show={show} setShow={setShow}>
            <View>
              <Text style={styles.titleText}>
                {openLocation === "reviewLinks"
                  ? "Add Review Link"
                  : "Add Social Media"}
              </Text>
              <Pressable
                style={styles.searchContainer}
                onPress={() => Linking.openURL("https://google.com")}
              >
                <AntDesign name="earth" size={18} color={colors.white} />
                <Text style={styles.searchTitleText}>Search Browser</Text>
              </Pressable>
              <View style={styles.content}>
                <InputBorder
                  placeholder="Title"
                  onChangeText={handleChange("title")}
                  onBlur={handleBlur("title")}
                  value={values.title}
                />
                {errors.title && touched.title && (
                  <Text style={styles.errorMsg}>{errors.title}</Text>
                )}
                <InputBorder
                  placeholder="Insert URL here"
                  onChangeText={handleChange("url")}
                  onBlur={handleBlur("url")}
                  value={values.url}
                />
                {errors.url && touched.url && (
                  <Text style={styles.errorMsg}>{errors.url}</Text>
                )}
                <Pressable
                  style={styles.inputContainer}
                  onPress={() => setOpenCamera(!openCamera)}
                >
                  <View style={styles.uploadBox}>
                    <AntDesign name="upload" size={18} color={colors.white} />
                  </View>
                  <Text style={styles.uploadText}>
                    {!imageURI ? "Upload Thumbnail" : imageURI.split("/").pop()}
                  </Text>
                </Pressable>
                <MainButton
                  Icon={<AntDesign name="download" size={18} color="#fff" />}
                  name="Save"
                  onPress={handleSubmit}
                  isLoading={isLoading || IsReviewing}
                />
              </View>
            </View>
          </BottomSheet>
          <Choose
            show={openCamera}
            setShow={setOpenCamera}
            openLocation="addSocialMedia"
            setImageURI={setImageURI}
          />
        </>
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
    maxWidth: 150,
  },
  errorMsg: {
    marginTop: -16,
    fontSize: 12,
    color: colors.red,
    textAlign: "right",
    fontFamily: "Avenir-Regular",
  },
  searchContainer: {
    marginVertical: 12,
    paddingVertical: 8,
    alignSelf: "center",
    paddingHorizontal: 18,
    borderRadius: 4,
    backgroundColor: colors.primary,
    flexDirection: "row",
    alignItems: "center",
    columnGap: 10,
  },
  searchTitleText: {
    fontFamily: "Avenir-Regular",
    color: colors.white,
    textAlign: "center",
    fontSize: 14,
  },
});

export default AddSocialMedia;
