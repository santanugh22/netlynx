import {
  View,
  Text,
  Image,
  ScrollView,
  Pressable,
  Linking,
} from "react-native";
import React, { useState } from "react";
import { globalStyles } from "../../../global.style";
import SquareLogo from "../logo/squareLogo";
import InputBox from "./InputBox";
import { styles } from "./SignInScreen.style";
import MainButton from "../common/MainButton";
import { ErrorMessage, Formik } from "formik";
import * as yup from "yup";
import { useRegisterMutation } from "../../redux/services/staffAndUser";
import Toast from "react-native-toast-message";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { saveAuthInfo } from "../../redux/features/authSlice";
import { useAppDispatch } from "../../redux/hooks";
import PrivacyCard from "../common/PrivacyCard";

const validationSchema = yup
  .object()
  .shape({
    firstName: yup.string().required("First name is Required"),
    lastName: yup.string().required("Last name is Required"),
    userName: yup.string().required("User Name is Required"),
    email: yup
      .string()
      .email("Please enter a valid email")
      .required("Email Address is Required"),
    password: yup
      .string()
      .min(8, ({ min }) => `Password must be at least ${min} characters`)
      .required("Password is Required"),
    mobile: yup.string(),
    phone: yup.string(),
  })
  .test(
    "eitherMobileOrPhone",
    "Either mobile or phone number is required",
    function (value) {
      if (!value.mobile && !value.phone) {
        return this.createError({
          path: "phone",
          message: "Either mobile or phone is required",
        });
      }
      return true;
    }
  );

const CreateAccount = ({ navigation }: any) => {
  const [register, { isLoading }] = useRegisterMutation();
  const dispatch = useAppDispatch();
  const [secureText, setSecureText] = React.useState(true);
  const [termsPopUp, setTermsPopUp] = useState(false);
  const [vals, setVal] = useState<any>();

  const handleCreateAccount = async (values: IRegister) => {
    let { data } = (await register(values)) as any;
    if (data && !data.error) {
      dispatch(
        saveAuthInfo({
          auth_key: data.personal_info.auth_key,
          id: data.personal_info.id,
          role: data.personal_info.role,
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
        text1: "SignUp Successful",
      });
    } else if (data && data.msg) {
      Toast.show({
        type: "error",
        text1: data && data.msg,
      });
    } else {
      Toast.show({
        type: "success",
        text1: "SignUp Successful",
      });
    }
  };

  const handlePasswordShowHide = (): void => {
    setSecureText(!secureText);
  };
  return (
    <Formik
      initialValues={{
        email: "",
        password: "",
        firstName: "",
        lastName: "",
        userName: "",
        mobile: "",
        phone: "",
      }}
      validationSchema={validationSchema}
      onSubmit={(values) => {
        setVal(values);
        setTermsPopUp(!termsPopUp);
      }}
    >
      {({ handleChange, handleBlur, handleSubmit, values }) => (
        <View style={globalStyles.container}>
          <View style={styles.container}>
            <ScrollView
              overScrollMode="never"
              showsVerticalScrollIndicator={false}
              contentContainerStyle={{
                marginBottom: 50,
              }}
              style={{
                marginBottom: 50,
              }}
            >
              <View>
                <View style={styles.logoContainer}>
                  <SquareLogo />
                </View>
                <View style={styles.titleContainer}>
                  <Text style={styles.titleText}>
                    Create your account to join {"\n"} the network
                  </Text>
                </View>
                <View>
                  <View style={styles.inputContainer}>
                    <InputBox
                      icon="people"
                      placeholder="First Name"
                      onChangeText={handleChange("firstName")}
                      onBlur={handleBlur("firstName")}
                      value={values.firstName}
                    />
                    <ErrorMessage
                      name="firstName"
                      render={(msg) => (
                        <Text style={styles.errorMsg}>{msg}</Text>
                      )}
                    />
                    <InputBox
                      icon="people"
                      placeholder="Last Name"
                      onChangeText={handleChange("lastName")}
                      onBlur={handleBlur("lastName")}
                      value={values.lastName}
                    />
                    <ErrorMessage
                      name="lastName"
                      render={(msg) => (
                        <Text style={styles.errorMsg}>{msg}</Text>
                      )}
                    />
                    <InputBox
                      icon="people"
                      placeholder="Username"
                      onChangeText={handleChange("userName")}
                      onBlur={handleBlur("userName")}
                      value={values.userName}
                    />
                    <ErrorMessage
                      name="userName"
                      render={(msg) => (
                        <Text style={styles.errorMsg}>{msg}</Text>
                      )}
                    />
                    <InputBox
                      icon="email"
                      placeholder="Email address"
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
                      icon="phone"
                      placeholder="Mobile"
                      onChangeText={handleChange("mobile")}
                      onBlur={handleBlur("mobile")}
                      value={values.mobile}
                    />
                    <ErrorMessage
                      name="mobile"
                      render={(msg) => (
                        <Text style={styles.errorMsg}>{msg}</Text>
                      )}
                    />
                    <InputBox
                      icon="phone"
                      placeholder="Phone"
                      onChangeText={handleChange("phone")}
                      onBlur={handleBlur("phone")}
                      value={values.phone}
                    />
                    <ErrorMessage
                      name="phone"
                      render={(msg) => (
                        <Text style={styles.errorMsg}>{msg}</Text>
                      )}
                    />
                    <InputBox
                      secureText={secureText}
                      hasSecureText={true}
                      icon="lock"
                      placeholder="Password"
                      onChangeText={handleChange("password")}
                      onBlur={handleBlur("password")}
                      value={values.password}
                      onPress={handlePasswordShowHide}
                    />
                    <ErrorMessage
                      name="password"
                      render={(msg) => (
                        <Text style={styles.errorMsg}>{msg}</Text>
                      )}
                    />
                  </View>
                  <Pressable style={styles.forgotPassContainer}>
                    <Text style={styles.forgotText}>Forgot Password ?</Text>
                  </Pressable>
                  <View style={styles.instructionTextContainer}>
                    <Text style={styles.instructionText}>
                      <Text style={styles.heavy}>Username{"\t"}</Text>
                      can’t be changed once the account is created. Your email
                      will be shown to the other party when they add your
                      profile to contacts Your
                      <Text style={styles.heavy}> password{"\t"}</Text>
                      must be 6 digit or longer
                    </Text>
                  </View>
                </View>
              </View>
            </ScrollView>
            <View style={styles.loginContainer}>
              <MainButton
                onPress={handleSubmit}
                name="Create Account"
                isLoading={isLoading}
              />
              <Pressable style={[styles.infoContainer]}>
                <Text style={[styles.infoText, { textAlign: "center" }]}>
                  By signing up you agree to our{"\t"}
                  <Text
                    onPress={() => {
                      Linking.openURL("https://netlynxs.com/privacy-policy/");
                    }}
                    style={styles.heavy}
                  >
                    Privacy Policy {"\t"}
                  </Text>
                  and{"\t"}
                  <Text
                    onPress={() => {
                      Linking.openURL("https://netlynxs.com/terms-of-use/");
                    }}
                    style={styles.heavy}
                  >
                    Terms of use
                  </Text>
                </Text>
              </Pressable>
            </View>
            {termsPopUp && (
              <PrivacyCard
                onPress={(e) => {
                  if (e) {
                    handleCreateAccount(vals);
                  }
                  setTermsPopUp(false);
                }}
                show={termsPopUp}
                setShow={setTermsPopUp}
              />
            )}
          </View>
        </View>
      )}
    </Formik>
  );
};

export default CreateAccount;
