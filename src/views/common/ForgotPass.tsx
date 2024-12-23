import { View, Text, StyleSheet, Pressable } from "react-native";
import React, { useState } from "react";
import ModalPopUp from "./ModalPopUp";
import InputBorder from "./InputBorder";
import { colors } from "../../utils/colors";
import * as Yup from "yup";
import { ErrorMessage, Formik } from "formik";
import Toast from "react-native-toast-message";
import { useSendResetPasswordLinkMutation } from "../../redux/services/staffAndUser";

const validationSchema = Yup.object().shape({
  email: Yup.string().required("Email is Required!"),
});

interface Props {
  show: boolean;
  setShow: (e: boolean) => void;
  role: string;
}

const ForgotPass = ({ show, setShow, role }: Props) => {
  //const { auth_key, id, role } = useAppSelector(selectedAuth);
  const [sendResetPasswordLink, { isLoading }] =
    useSendResetPasswordLinkMutation();
  const onSubmitHandler = async (values: { email: string }) => {
    const { data }: any = await sendResetPasswordLink({
      role: role,
      email: values.email,
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
        email: "",
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
        <ModalPopUp show={show} setShow={setShow}>
          <View style={styles.container}>
            <View style={styles.colG}>
              <Text style={styles.title}>Please Enter Your Email</Text>
              <InputBorder
                placeholder="Enter Email"
                onChangeText={handleChange("email")}
                onBlur={handleBlur("email")}
                value={values.email}
              />
            </View>
            <ErrorMessage
              name="email"
              render={(msg) => <Text style={styles.errorMsg}>{msg}</Text>}
            />
            <View style={styles.main}>
              <Text onPress={() => setShow(false)} style={styles.text}>
                Cancel
              </Text>
              <Text style={styles.text} onPress={handleSubmit as any}>
                Continue
              </Text>
            </View>
          </View>
        </ModalPopUp>
      )}
    </Formik>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    marginHorizontal: 12,
    borderRadius: 8,
    paddingVertical: 14,
    paddingHorizontal: 12,
  },
  colG: {
    columnGap: 12,
  },
  title: {
    fontFamily: "Avenir-Heavy",
    marginBottom: 14,
    paddingTop: 6,
  },
  main: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
    columnGap: 18,
    paddingTop: 12,
    paddingBottom: 6,
  },
  text: {
    fontFamily: "Avenir-Heavy",
    color: colors.primary,
    paddingVertical: 4,
    paddingHorizontal: 8,
  },
  errorMsg: {
    marginTop: 4,
    fontSize: 12,
    color: colors.red,
    textAlign: "right",
    fontFamily: "Avenir-Regular",
  },
});
export default ForgotPass;
