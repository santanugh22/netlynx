import { View, Text, StyleSheet } from "react-native";
import React, { useEffect } from "react";
import { colors } from "../../utils/colors";
import { styles as navigationStyle } from "../../navigation/navigation.style";
import InputBorder from "../common/InputBorder";
import MainButton from "../common/MainButton";
import { globalStyles } from "../../../global.style";
import { Formik } from "formik";
import Toast from "react-native-toast-message";
import * as yup from "yup";
import { useAppSelector } from "../../redux/hooks";
import { selectedAuth } from "../../redux/features/authSlice";
import { useSendReviewRequestMutation } from "../../redux/services/staffAndUser";
import Header from "../common/Header";
import { goBackNavigation } from "../common/GoBackFunction";

const validationSchema = yup.object().shape({
  firstName: yup.string().required("First name is Required!"),
  lastName: yup.string().required("Last name is Required!"),
  email: yup.string().required("Email is Required!"),
  phone: yup.string().required("Phone is Required!"),
});
const Reviews = ({ navigation }: any) => {
  const { auth_key, id } = useAppSelector(selectedAuth);
  const [sendReviewRequest, { isLoading }] = useSendReviewRequestMutation();
  const onSubmitHandler = async (values: {
    lastName: string;
    firstName: string;
    email: string;
    phone: string;
  }) => {
    const { data }: any = await sendReviewRequest({
      auth_key,
      id,
      reviewInfo: values,
    });
    if (data) {
      Toast.show({
        type: !data.error ? "success" : "error",
        text1: !data.error ? data.msg : data.msg,
      });
    }
  };

  useEffect(() => {
    navigation.getParent()?.setOptions({
      tabBarStyle: {
        display: "none",
      },
    });
    return () =>
      navigation.getParent()?.setOptions({
        tabBarStyle: {
          ...navigationStyle.tabBar,
        },
      });
  }, [navigation]);

  return (
    <Formik
      initialValues={{
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
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
        <View style={[globalStyles.container, styles.main]}>
          <View style={styles.form}>
            <Header
              onPress={() => goBackNavigation(navigation)}
              title="Reviews"
              hasBack={true}
            />
            <Text style={styles.title}>Send a review request to customer</Text>
            <View style={styles.container}>
              <InputBorder
                placeholder="First Name"
                onChangeText={handleChange("firstName")}
                onBlur={handleBlur("firstName")}
                value={values.firstName}
              />
              {errors.firstName && touched.firstName && (
                <Text style={styles.errorMsg}>{errors.firstName}</Text>
              )}
              <InputBorder
                placeholder="Last Name"
                onChangeText={handleChange("lastName")}
                onBlur={handleBlur("lastName")}
                value={values.lastName}
              />
              {errors.lastName && touched.lastName && (
                <Text style={styles.errorMsg}>{errors.lastName}</Text>
              )}
              <InputBorder
                placeholder="Email"
                onChangeText={handleChange("email")}
                onBlur={handleBlur("email")}
                value={values.email}
              />
              {errors.email && touched.email && (
                <Text style={styles.errorMsg}>{errors.email}</Text>
              )}
              <InputBorder
                placeholder="Phone Number"
                onChangeText={handleChange("phone")}
                onBlur={handleBlur("phone")}
                value={values.phone}
              />
              {errors.phone && touched.phone && (
                <Text style={styles.errorMsg}>{errors.phone}</Text>
              )}
            </View>
          </View>
          <MainButton
            name="Send Email/SMS"
            onPress={handleSubmit}
            isLoading={isLoading}
          />
        </View>
      )}
    </Formik>
  );
};

const styles = StyleSheet.create({
  title: {
    marginTop: 16,
    fontSize: 22,
    color: colors.primary,
    textAlign: "center",
    fontFamily: "Avenir-Regular",
  },
  main: {
    flex: 1,
    justifyContent: "space-between",
    paddingBottom: 30,
  },
  container: {
    rowGap: 16,
    paddingVertical: 12,
  },
  form: {
    paddingBottom: 16,
  },
  errorMsg: {
    marginTop: -8,
    fontSize: 12,
    color: colors.red,
    textAlign: "right",
    fontFamily: "Avenir-Regular",
  },
});
export default Reviews;
