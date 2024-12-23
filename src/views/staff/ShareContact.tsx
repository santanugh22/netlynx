import { View, Text, TextInput, Image, StyleSheet } from "react-native";
import React from "react";
import BottomSheet from "../common/BottomSheet";
import MainButton from "../common/MainButton";
import { FontAwesome } from "@expo/vector-icons";
import { colors } from "../../utils/colors";
import { images } from "../../utils/images";
import Toast from "react-native-toast-message";
import { selectedAuth } from "../../redux/features/authSlice";
import { useAppSelector } from "../../redux/hooks";
import {
  useGetProfileDetailQuery,
  useShareYourContactMutation,
} from "../../redux/services/staffAndUser";
import { Formik } from "formik";
import * as Yup from "yup";

const validationSchema = Yup.object({
  firstName: Yup.string().required("First name is Required!"),
  lastName: Yup.string().required("Last name is Required!"),
  email: Yup.string().email("Invalid email format"),
  phone: Yup.string(),
  jobTitle: Yup.string().required("Job title is Required!"),
  companyName: Yup.string().required("Company name is Required!"),
}).test("emailOrPhone", "Either email or phone is required", function (value) {
  // Check if both email and phone are not provided
  if (!value.email && !value.phone) {
    return this.createError({
      path: "email",
      message: "Either email or phone is required",
    });
  }
  // Ensure at least one is provided, return true otherwise
  return true;
});

interface Porps {
  show: boolean;
  setShow: (e: boolean) => void;
}

const ShareContact = ({ show, setShow }: Porps) => {
  const { auth_key, id, role } = useAppSelector(selectedAuth);
  const [shareYourContact, { isLoading }] = useShareYourContactMutation();
  const { data: profileDetail } = useGetProfileDetailQuery({
    auth_key,
    id,
    role,
  });
  const onSubmitHandler = async (values: {
    lastName: string;
    firstName: string;
    email: string;
    phone: string;
    jobTitle: string;
    companyName: string;
  }) => {
    const { data, error }: any = await shareYourContact({
      auth_key,
      id,
      shareInfo: values,
      companyId: profileDetail?.personal_info?.company_id,
    });
    if (data) {
      setShow(!show);
      Toast.show({
        type: !data.error ? "success" : "error",
        text1: !data.error ? data.msg : data.msg,
      });
    }
  };
  return (
    <Formik
      initialValues={{
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        jobTitle: "",
        companyName: "",
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
          <View style={styles.container}>
            <Image
              source={{ uri: profileDetail?.personal_info?.image }}
              style={styles.image}
            />
            <Text style={styles.title}>
              Share your contact{"\n"} information.
            </Text>
          </View>
          <View style={styles.inputMainContainer}>
            <View style={styles.inputContainer}>
              <TextInput
                style={[styles.input, styles.flex]}
                placeholder="First Name"
                onChangeText={handleChange("firstName")}
                onBlur={handleBlur("firstName")}
                value={values.firstName}
                placeholderTextColor="gray"
              />

              <TextInput
                style={[styles.input, styles.flex]}
                placeholder="Last Name"
                onChangeText={handleChange("lastName")}
                onBlur={handleBlur("lastName")}
                value={values.lastName}
              />
            </View>
            <View style={styles.inputContainer}>
              {errors.firstName && touched.firstName && (
                <Text style={styles.errorMsg}>{errors.firstName}</Text>
              )}
              {errors.lastName && touched.lastName && (
                <Text style={styles.errorMsg}>{errors.lastName}</Text>
              )}
            </View>
            <View style={styles.rowG}>
              <TextInput
                style={styles.input}
                placeholder="Email"
                onChangeText={handleChange("email")}
                onBlur={handleBlur("email")}
                value={values.email}
              />
              {errors.email && touched.email && (
                <Text style={styles.errorMsg}>{errors.email}</Text>
              )}
              <TextInput
                style={styles.input}
                placeholder="Phone Number"
                onChangeText={handleChange("phone")}
                onBlur={handleBlur("phone")}
                value={values.phone}
              />
              {errors.phone && touched.phone && (
                <Text style={styles.errorMsg}>{errors.phone}</Text>
              )}
              <TextInput
                style={styles.input}
                placeholder="Job Title"
                onChangeText={handleChange("jobTitle")}
                onBlur={handleBlur("jobTitle")}
                value={values.jobTitle}
              />
              {errors.jobTitle && touched.jobTitle && (
                <Text style={styles.errorMsg}>{errors.jobTitle}</Text>
              )}
              <TextInput
                style={styles.input}
                placeholder="Company Name"
                onChangeText={handleChange("companyName")}
                onBlur={handleBlur("companyName")}
                value={values.companyName}
              />
              {errors.companyName && touched.companyName && (
                <Text style={styles.errorMsg}>{errors.companyName}</Text>
              )}
            </View>
          </View>
          <MainButton
            onPress={handleSubmit}
            style={styles.bgReg}
            Icon={<FontAwesome name="send" size={18} color={colors.white} />}
            name="Send"
            isLoading={isLoading}
          />
        </BottomSheet>
      )}
    </Formik>
  );
};

const styles = StyleSheet.create({
  container: {
    alignSelf: "center",
    alignItems: "center",
    paddingBottom: 12,
  },
  image: {
    width: 60,
    height: 60,
  },
  title: {
    marginTop: 8,
    fontFamily: "Avenir-Regular",
    fontSize: 16,
    textAlign: "center",
  },
  inputMainContainer: {
    paddingHorizontal: 10,
    rowGap: 10,
    paddingBottom: 20,
  },
  inputContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    columnGap: 20,
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderBottomWidth: 1,
  },
  flex: {
    flex: 1,
  },
  rowG: {
    rowGap: 10,
  },
  bgReg: {
    backgroundColor: colors.red,
  },
  errorMsg: {
    fontSize: 12,
    color: colors.red,
    textAlign: "right",
    fontFamily: "Avenir-Regular",
  },
});
export default ShareContact;
