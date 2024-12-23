import React, { useState } from "react";
import {
  ScrollView,
  View,
  Text,
  Linking,
  Platform,
  Alert,
  KeyboardAvoidingView,
} from "react-native";
import { globalStyles } from "../../../global.style";
import ProfileCard from "../card/ProfileCard";
import SquareLogo from "../logo/squareLogo";
import { styles } from "./HomeScreen.style";
import { personalInfostyles } from "./PersonalInfo.style";
import Accordian from "../common/Accordian";
import InputBorder from "../common/InputBorder";
import AddVideo from "../common/AddVideo";
import BorderContainer from "../common/BorderContainer";
import AddLink from "../common/AddLink";
import { ErrorMessage, Formik } from "formik";
import { useAppSelector } from "../../redux/hooks";
import { selectedAuth } from "../../redux/features/authSlice";
import {
  useGetProfileDetailQuery,
  useUpdateProfileMutation,
} from "../../redux/services/staffAndUser";
import { ActivityIndicator } from "react-native";
import SocialMediaPopUp from "../common/SocialMediaPopUp";
import SaveIcon from "../common/SaveIcon";
import SocialMediaContainer from "../common/SocialMediaContainer";
import Toast from "react-native-toast-message";
import ShowLinks from "../common/ShowLinks";
import VideosContainer from "../common/VideosContainer";
import * as Yup from "yup";
import { Entypo } from "@expo/vector-icons";
import { colors } from "../../utils/colors";
import MainButton from "../common/MainButton";
import ShareContact from "../staff/ShareContact";
import CustomerManagement from "../staff/CustomerManagement";
import { useNavigation } from "@react-navigation/native";
import { useStatusBar } from "../../hooks/StatusBar";
import RNFetchBlob from "rn-fetch-blob";
import { PermissionsAndroid } from "react-native";
import RNFS from "react-native-fs";
import FileViewer from "react-native-file-viewer";

const PersonalInfo = () => {
  const navigation: any = useNavigation();
  const { auth_key, id, role } = useAppSelector(selectedAuth);
  const { data: profileDetail, isLoading } = useGetProfileDetailQuery({
    auth_key,
    id,
    role,
  });
  const [show, setShow] = useState<string>("");
  const [addVideo, setAddVideo] = useState(false);
  const [addLinks, setAddLinks] = useState(false);
  const [showSocialMedia, setShowSocialMedia] = useState(false);
  const [showEmail, setShowEmail] = useState(false);
  const [socialMediaData, setSocialMediaData] =
    useState<IProfileDetailSocialMedia | null>(null);
  const [updateProfile, { isLoading: IsUpdatingProfile }] =
    useUpdateProfileMutation();

  const handleAccordian = (value: string): void => {
    if (show == value) {
      setShow("");
    } else {
      setShow(value);
    }
  };

  console.log("profileDetail", profileDetail?.personal_info?.logo);

  const handleSendEmail = () => {
    setShowEmail(true);
  };

  const updateProfileHandler = async (values: IPersonalInfo) => {
    const data: any = await updateProfile({
      auth_key,
      id,
      role,
      ...values,
      wp_staff_id: profileDetail?.personal_info?.wp_staff_id,
    });
    console.log({
      auth_key,
      id,
      role,
      ...values,
      wp_staff_id: profileDetail?.personal_info?.wp_staff_id,
    });
    if (data) {
      if (!data.error) {
        Toast.show({
          type: "success",
          text1: "Personal information has been updated",
        });
      }
    }
  };

  const handleClick = (value: string) => {
    navigation.navigate(value);
  };

  const downloadFile = async (url, filename) => {
    try {
      // Extract filename from URL if not provided
      if (!filename) {
        const urlParts = url.split("/");
        filename = urlParts[urlParts.length - 1] || "defaultFilename.ext";
      }

      // Create a path for the file
      const filePath = `${RNFS.DocumentDirectoryPath}/${filename}`;

      // Fetch the file
      const response = await fetch(url);
      const fileData = await response.text(); // Assuming text data for simplicity; adjust based on actual data type

      // Write the file data directly
      await RNFS.writeFile(filePath, fileData, "utf8");
      console.log(`File written to ${filePath}`);
      console.log("RNFS.DocumentDirectoryPath", RNFS.DocumentDirectoryPath);
      const loc = "/data/user/0/com.netlynxs.avicenna/file";
      // Show popup to open the file or view its location
      Alert.alert(
        "Download Complete",
        "What would you like to do?",
        [
          {
            text: "No Thanks",
            onPress: () => console.log(filePath), // Implement as needed
          },
          {
            text: "Open File",
            onPress: () =>
              FileViewer.open(filePath).catch((err) => {
                // Handle errors or cases where the file can't be opened
                console.error("Failed to open file:", err);
              }),
          },
        ],
        { cancelable: true }
      );
    } catch (error) {
      console.error("Download file error:", error);
    }
  };

  const validationSchema =
    role === "staff"
      ? Yup.object().shape({
          fname: Yup.string().required("First name is Required"),
          lname: Yup.string().required("Last name is Required"),
          email: Yup.string()
            .email("Please enter a valid email")
            .required("Email Address is Required"),
          phone: Yup.string().required("Phone Number is Required"),
          mobile: Yup.string().required("Mobile Number is Required"),
          company_name: Yup.string().required("Company Name is Required"),
          address: Yup.string().required("Company Address is Required"),
          website: Yup.string().required("Company Website is Required"),
        })
      : Yup.object().shape({
          fname: Yup.string().required("First name is Required"),
          lname: Yup.string().required("Last name is Required"),
          email: Yup.string()
            .email("Please enter a valid email")
            .required("Email Address is Required"),
          phone: Yup.string().required("Phone Number is Required"),
          mobile: Yup.string().required("Mobile Number is Required"),
        });

  useStatusBar("light-content", colors.primary);
  // console.log(profileDetail);
  return isLoading ? (
    <View style={globalStyles.loaderContainer}>
      <ActivityIndicator size="large" style={globalStyles.loader} />
    </View>
  ) : (
    <Formik
      initialValues={{
        fname: profileDetail?.personal_info
          ? profileDetail?.personal_info?.fname
          : "",
        lname: profileDetail?.personal_info
          ? profileDetail?.personal_info?.lname
          : "",
        title: profileDetail?.personal_info
          ? profileDetail?.personal_info?.title
          : "",
        email: profileDetail?.personal_info
          ? profileDetail?.personal_info?.email
          : "",
        user_name: profileDetail?.personal_info
          ? profileDetail?.personal_info?.user_name || ""
          : "",
        address: profileDetail?.personal_info
          ? profileDetail?.personal_info?.address
          : "",
        phone: profileDetail?.personal_info
          ? profileDetail?.personal_info?.phone
          : "",
        mobile: profileDetail?.personal_info
          ? profileDetail?.personal_info?.mobile
          : "",
        about: profileDetail?.personal_info
          ? profileDetail?.personal_info?.about
          : "",
        website: profileDetail?.personal_info
          ? profileDetail?.personal_info?.website
          : "",
        company_name: profileDetail?.personal_info
          ? profileDetail?.personal_info?.company_name
          : "",
      }}
      validationSchema={validationSchema}
      onSubmit={updateProfileHandler}
    >
      {({ handleChange, handleBlur, handleSubmit, values }) => (
        <View style={globalStyles.container}>
          <SaveIcon
            handleSubmit={handleSubmit}
            IsUpdatingProfile={IsUpdatingProfile}
          />
          <View style={styles.container}>
            <View style={styles.blueBG}>
              <SquareLogo url={profileDetail?.personal_info?.logo} />
              <ProfileCard />
            </View>
            <View style={styles.scrollContainer}>
              <KeyboardAvoidingView
                enabled
                keyboardVerticalOffset={50}
                behavior={Platform.OS === "android" ? undefined : "position"}
              >
                <ScrollView
                  showsVerticalScrollIndicator={false}
                  overScrollMode="never"
                >
                  <View style={personalInfostyles.accordianContainer}>
                    <Accordian
                      onPress={() => handleAccordian("Personal Information")}
                      name="Personal Information"
                      show={show}
                    />
                    {show === "Personal Information" ? (
                      <View style={personalInfostyles.inputContainer}>
                        <InputBorder
                          placeholder={"First Name"}
                          onChangeText={handleChange("fname")}
                          onBlur={handleBlur("fname")}
                          value={values.fname}
                        />
                        <ErrorMessage
                          name="fname"
                          render={(msg) => (
                            <Text style={personalInfostyles.errorMsg}>
                              {msg}
                            </Text>
                          )}
                        />
                        <InputBorder
                          placeholder={"Last Name"}
                          onChangeText={handleChange("lname")}
                          onBlur={handleBlur("lname")}
                          value={values.lname}
                        />
                        <ErrorMessage
                          name="lname"
                          render={(msg) => (
                            <Text style={personalInfostyles.errorMsg}>
                              {msg}
                            </Text>
                          )}
                        />
                        <InputBorder
                          placeholder={"Email"}
                          keyboardType="email-address"
                          onChangeText={handleChange("email")}
                          onBlur={handleBlur("email")}
                          value={values.email}
                        />
                        <ErrorMessage
                          name="email"
                          render={(msg) => (
                            <Text style={personalInfostyles.errorMsg}>
                              {msg}
                            </Text>
                          )}
                        />
                        <InputBorder
                          placeholder={"Phone Number"}
                          keyboardType="numeric"
                          onChangeText={handleChange("phone")}
                          onBlur={handleBlur("phone")}
                          value={values.phone === "null" ? "" : values.phone}
                        />
                        <ErrorMessage
                          name="phone"
                          render={(msg) => (
                            <Text style={personalInfostyles.errorMsg}>
                              {msg}
                            </Text>
                          )}
                        />
                        <InputBorder
                          placeholder={"Mobile Number"}
                          keyboardType="numeric"
                          onChangeText={handleChange("mobile")}
                          onBlur={handleBlur("mobile")}
                          value={values.mobile === "null" ? "" : values.mobile}
                        />
                        <ErrorMessage
                          name="mobile"
                          render={(msg) => (
                            <Text style={personalInfostyles.errorMsg}>
                              {msg}
                            </Text>
                          )}
                        />
                        <InputBorder
                          placeholder={"About Yourself"}
                          multiLine={true}
                          numberOfLines={5}
                          onChangeText={handleChange("about")}
                          onBlur={handleBlur("about")}
                          value={values.about === "null" ? "" : values.about}
                        />
                        {/* {console.log(role)} */}
                        <InputBorder
                          placeholder={"Company Name"}
                          disabled={role === "staff" ? true : false}
                          onChangeText={handleChange("company_name")}
                          onBlur={handleBlur("company_name")}
                          value={
                            values.company_name === "null"
                              ? ""
                              : values.company_name
                          }
                        />
                        <ErrorMessage
                          name="company_name"
                          render={(msg) => (
                            <Text style={personalInfostyles.errorMsg}>
                              {msg}
                            </Text>
                          )}
                        />
                        <InputBorder
                          placeholder={"Company Address"}
                          onChangeText={handleChange("address")}
                          disabled={role === "staff" ? true : false}
                          onBlur={handleBlur("address")}
                          value={
                            values.address === "null" ? "" : values.address
                          }
                        />
                        <ErrorMessage
                          name="address"
                          render={(msg) => (
                            <Text style={personalInfostyles.errorMsg}>
                              {msg}
                            </Text>
                          )}
                        />
                        <InputBorder
                          placeholder={"Company Website"}
                          onChangeText={handleChange("website")}
                          onBlur={handleBlur("website")}
                          disabled={role === "staff" ? true : false}
                          value={
                            values.website === "null" ? "" : values.website
                          }
                        />
                        <ErrorMessage
                          name="website"
                          render={(msg) => (
                            <Text style={personalInfostyles.errorMsg}>
                              {msg}
                            </Text>
                          )}
                        />
                      </View>
                    ) : null}
                    <Accordian
                      name="Social Media"
                      onPress={() => handleAccordian("Social Media")}
                      show={show}
                    />
                    {show === "Social Media" ? (
                      <SocialMediaContainer
                        showSocialMedia={showSocialMedia}
                        setShowSocialMedia={setShowSocialMedia}
                        setSocialMediaData={setSocialMediaData}
                      />
                    ) : null}
                    <SocialMediaPopUp
                      itemData={socialMediaData}
                      show={showSocialMedia}
                      setShow={setShowSocialMedia}
                    />
                    <Accordian
                      onPress={() => handleAccordian("Video")}
                      name="Video"
                      show={show}
                    />
                    {show === "Video" ? (
                      <>
                        {(
                          profileDetail?.card_video ||
                          profileDetail?.staff_video
                        )?.map((item, index) => (
                          <VideosContainer key={index} item={item} />
                        ))}
                        <BorderContainer name="Videos" setShow={setAddVideo} />
                      </>
                    ) : null}
                    <AddVideo show={addVideo} setShow={setAddVideo} />
                    <Accordian
                      name="Documents"
                      onPress={() => handleAccordian("Links")}
                      show={show}
                    />
                    {show === "Links" ? (
                      <>
                        <ShowLinks />
                        <BorderContainer name="Links" setShow={setAddLinks} />
                      </>
                    ) : null}
                    <AddLink show={addLinks} setShow={setAddLinks} />
                    {role === "staff" && (
                      <>
                        <Accordian
                          name="Review Links"
                          onPress={() => handleAccordian("Review Links")}
                          show={show}
                        />
                        {show === "Review Links" ? (
                          <>
                            <SocialMediaContainer
                              openLocation="reviewLinks"
                              showSocialMedia={showSocialMedia}
                              setShowSocialMedia={setShowSocialMedia}
                              setSocialMediaData={setSocialMediaData}
                            />
                            <SocialMediaPopUp
                              openLocation="reviewLinks"
                              itemData={socialMediaData}
                              show={showSocialMedia}
                              setShow={setShowSocialMedia}
                            />
                          </>
                        ) : null}
                        <Accordian
                          name="Customer Management"
                          onPress={() => handleAccordian("Customer Management")}
                          show={show}
                        />
                        {show === "Customer Management" ? (
                          <CustomerManagement
                            onPress={(value: string) => handleClick(value)}
                          />
                        ) : null}
                      </>
                    )}
                  </View>
                  {role === "staff" && (
                    <>
                      <View style={[styles.buttonContainer]}>
                        <MainButton
                          onPress={() =>
                            downloadFile(profileDetail?.personal_info?.vcard)
                          }
                          style={[
                            styles.button,
                            {
                              backgroundColor: colors.red,
                            },
                          ]}
                          fontSize={14}
                          name="Save to contacts"
                          Icon={
                            <Entypo
                              name="location-pin"
                              size={18}
                              color="white"
                            />
                          }
                        />
                        <MainButton
                          onPress={handleSendEmail}
                          style={styles.button}
                          fontSize={14}
                          name="Send Email/SMS"
                          Icon={
                            <Entypo
                              name="location-pin"
                              size={18}
                              color="white"
                            />
                          }
                        />
                      </View>
                      <ShareContact show={showEmail} setShow={setShowEmail} />
                    </>
                  )}
                </ScrollView>
              </KeyboardAvoidingView>
            </View>
          </View>
        </View>
      )}
    </Formik>
  );
};

export default PersonalInfo;
