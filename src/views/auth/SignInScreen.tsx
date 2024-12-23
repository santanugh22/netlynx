import { View, Text, ScrollView, Pressable } from "react-native";
import React, { useState } from "react";
import { globalStyles } from "../../../global.style";
import SquareLogo from "../logo/squareLogo";
import InputBox from "./InputBox";
import { styles } from "./SignInScreen.style";
import { useLoginMutation } from "../../redux/services/staffAndUser";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useAppDispatch } from "../../redux/hooks";
import { saveAuthInfo } from "../../redux/features/authSlice";
import Toast from "react-native-toast-message";
import { ErrorMessage, Formik } from "formik";
import * as yup from "yup";
import ForgotPass from "../common/ForgotPass";
import SmallButton from "../common/SmallButton";
import { useStatusBar } from "../../hooks/StatusBar";

const validationSchema = yup.object().shape({
  email: yup
    .string()
    .email("Please enter a valid email")
    .required("Email Address is Required"),
  password: yup
    .string()
    .min(5, ({ min }) => `Password must be at least ${min} characters`)
    .required("Password is Required"),
});

const SignInScreen = ({ navigation }: any) => {
  const [userLogin, { isLoading: IsLogining }] = useLoginMutation();
  const [forgotPass, setForgotPass] = useState(false);
  const [role, setRole] = useState("");
  const [secureText, setSecureText] = useState(true);
  const dispatch = useAppDispatch();

  useStatusBar("dark-content", "#fff");
  const handleLogin = async ({
    email,
    password,
  }: {
    email: string;
    password: string;
  }) => {
    let { data }: any = await userLogin({
      email,
      password,
      role: role,
    });
    if (data && !data.error) {
      dispatch(
        saveAuthInfo({
          auth_key: data.personal_info.auth_key,
          id: data.personal_info.id,
          role: data.personal_info.role, 
          enable_payment: data.enable_payment
        })
      );
      await AsyncStorage.setItem(
        "@Auth_Key",
        JSON.stringify({
          auth_key: data.personal_info.auth_key,
          id: data.personal_info.id,
          role: data.personal_info.role,
        })
      );
      Toast.show({
        type: "success",
        text1: "Login Successfully",
      });
    } else {
      Toast.show({
        type: "error",
        text1: data?.data || data.msg,
      });
    }
  };
  const handleForgotPass = (): void => {
    setForgotPass(true);
  };
  const handlePasswordShowHide = (): void => {
    setSecureText(!secureText);
  };

  return (
    <Formik
      initialValues={{ email: "", password: "" }}
      validationSchema={validationSchema}
      onSubmit={handleLogin}
    >
      {({ handleChange, handleBlur, handleSubmit, values }) => (
        <View style={globalStyles.container}>
          <View style={styles.container}>
            <ForgotPass show={forgotPass} setShow={setForgotPass} role="user" />
            <ScrollView
              overScrollMode="never"
              showsVerticalScrollIndicator={false}
            >
              <View>
                <View style={styles.logoContainer}>
                  <SquareLogo />
                </View>
                <View style={styles.titleContainer}>
                  <Text style={styles.titleText}>
                    Welcome back,
                    {"\n"}
                    Sign in your account
                  </Text>
                </View>
                <View>
                  <View style={styles.inputContainer}>
                    <InputBox
                      icon="email"
                      placeholder="Email Address"
                      onChangeText={handleChange("email")}
                      onBlur={handleBlur("email")}
                      value={values.email}
                    />
                    <ErrorMessage
                      name="email"
                      render={(msg) => (
                        <Text style={styles.errorMsg}>{msg}</Text>
                      )}
                    />
                    <InputBox
                      onPress={handlePasswordShowHide}
                      secureText={secureText}
                      hasSecureText={true}
                      icon="lock"
                      placeholder="Password"
                      onChangeText={handleChange("password")}
                      onBlur={handleBlur("password")}
                      value={values.password}
                    />
                    <ErrorMessage
                      name="password"
                      render={(msg) => (
                        <Text style={styles.errorMsg}>{msg}</Text>
                      )}
                    />
                  </View>
                  <View style={styles.forgotPassContainer}>
                    <Text onPress={handleForgotPass} style={styles.forgotText}>
                      Forgot Password ?
                    </Text>
                  </View>
                  <View style={styles.buttonContainer}>
                    <SmallButton
                      onPress={() => {
                        handleSubmit(), setRole("user");
                      }}
                      text="Login - FREE CARD"
                      isLoading={IsLogining && role === "user"}
                    />
                    <SmallButton
                      onPress={() => {
                        handleSubmit(), setRole("staff");
                      }}
                      text="Login - CORPORATE CARD"
                      isLoading={IsLogining && role === "staff"}
                    />
                  </View>
                </View>
              </View>
            </ScrollView>
            <View style={styles.loginContainer}>
              <Pressable style={styles.infoContainer}>
                <Text style={styles.infoText}>Don't have an account ?</Text>
                <Text
                  style={[styles.infoText, styles.heavy]}
                  onPress={() => navigation.navigate("CreateAccount")}
                >
                  Sign Up
                </Text>
              </Pressable>
            </View>
          </View>
        </View>
      )}
    </Formik>
  );
};

export default SignInScreen;
