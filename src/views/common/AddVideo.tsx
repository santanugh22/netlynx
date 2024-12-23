import {
  View,
  Text,
  Modal,
  StyleSheet,
  Pressable,
  Linking,
} from "react-native";
import React from "react";
import { colors } from "../../utils/colors";
import InputBorder from "./InputBorder";
import { AntDesign } from "@expo/vector-icons";
import MainButton from "./MainButton";
import BottomSheet from "./BottomSheet";
import { IAddVideo } from "./CommonInterface";
import * as yup from "yup";
import { Formik } from "formik";
import Toast from "react-native-toast-message";
import { useSaveVideoMutation } from "../../redux/services/staffAndUser";
import { useAppSelector } from "../../redux/hooks";
import { selectedAuth } from "../../redux/features/authSlice";

const validationSchema = yup.object().shape({
  title: yup.string().required("Title is Required!"),
  url: yup.string().required("Url is Required!"),
});

const AddVideo = ({ show, setShow }: IAddVideo) => {
  const { auth_key, id, role } = useAppSelector(selectedAuth);
  const [saveVideo, { isLoading }] = useSaveVideoMutation();

  const onSubmitHandler = async (values: { title: string; url: string }) => {
    const { data }: any = await saveVideo({
      auth_key,
      id,
      role,
      addVideoInfo: values,
    });
    if (data) {
      Toast.show({
        type: !data.error ? "success" : "error",
        text1: !data.error ? data.msg : data.msg,
      });
      setShow(!show);
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
              <Text style={styles.titleText}>Add Video</Text>
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
                <MainButton
                  Icon={<AntDesign name="download" size={18} color="#fff" />}
                  name="Save"
                  onPress={handleSubmit}
                  isLoading={isLoading}
                />
              </View>
            </View>
          </BottomSheet>
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

export default AddVideo;
