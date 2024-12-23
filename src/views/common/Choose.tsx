import { View, Text, StyleSheet, Pressable } from "react-native";
import React, { useState } from "react";
import ModalPopUp from "./ModalPopUp";
import { Entypo, FontAwesome5 } from "@expo/vector-icons";
import { colors } from "../../utils/colors";
import * as ImagePicker from "expo-image-picker";
import {
  useUpdateBackgroundImageMutation,
  useUpdateProfileImageMutation,
} from "../../redux/services/staffAndUser";
import { useAppSelector } from "../../redux/hooks";
import { selectedAuth } from "../../redux/features/authSlice";
import CameraScreen from "./CameraModal";
import Toast from "react-native-toast-message";

interface Props {
  show: boolean;
  setShow: React.Dispatch<React.SetStateAction<boolean>>;
  openLocation?: string;
  setImageURI?: React.Dispatch<React.SetStateAction<string>>;
  setBgImageURI?: React.Dispatch<React.SetStateAction<string>>;
}

const Choose = ({
  show,
  setShow,
  openLocation,
  setImageURI,
  setBgImageURI,
}: Props) => {
  const [IsCameraVisible, setIsCameraVisible] = useState(false);
  const { auth_key, id, role } = useAppSelector(selectedAuth);
  const [updateProfileImage, { isLoading }] = useUpdateProfileImageMutation();
  const [updateBackgroundImage] = useUpdateBackgroundImageMutation();

  const handleCancel = () => {
    setShow(false);
  };

  const closeCameraHandle = () => {
    setIsCameraVisible(!IsCameraVisible);
    setShow(!show);
  };

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      if (openLocation === "addSocialMedia") {
        setImageURI && setImageURI(result.assets[0].uri);
        handleCancel();
        Toast.show({
          type: "success",
          text1: "Image",
          text2: "Image added successfully",
        });
      } else if (openLocation === "addVideo") {
        setImageURI && setImageURI(result.assets[0].uri);
        handleCancel();
        Toast.show({
          type: "success",
          text1: "Image",
          text2: "Image added successfully",
        });
      } else if (openLocation === "profileImage") {
        setImageURI && setImageURI(result.assets[0].uri);
        updateProfileImage({
          auth_key,
          id,
          imageURI: result.assets[0].uri,
          role,
        });
        handleCancel();
        Toast.show({
          type: "success",
          text1: "Image",
          text2: "Image added successfully",
        });
      } else if (openLocation === "profileBackgroundImage") {
        setBgImageURI && setBgImageURI(result.assets[0].uri);
        updateBackgroundImage({
          auth_key,
          id,
          imageURI: result.assets[0].uri,
          role,
        });
        handleCancel();
        Toast.show({
          type: "success",
          text1: "Image",
          text2: "Image added successfully",
        });
      }
    }
  };

  return (
    <>
      <ModalPopUp show={show} setShow={setShow}>
        <View style={styles.modal}>
          <View style={styles.titleContainer}>
            <Text style={styles.title}>Choose</Text>
          </View>
          <View style={styles.chooseContainer}>
            <Pressable
              style={styles.choose}
              onPress={() => {
                setIsCameraVisible(true);
              }}
            >
              <Entypo name="camera" size={40} color="black" />
              <Text style={styles.chooseText}>Camera</Text>
            </Pressable>
            <Pressable style={styles.choose} onPress={pickImage}>
              <FontAwesome5 name="photo-video" size={40} color="black" />
              <Text style={styles.chooseText}>Gallery</Text>
            </Pressable>
          </View>
          <View style={styles.cancelContainer}>
            <Text onPress={handleCancel} style={styles.text}>
              Cancel
            </Text>
          </View>
        </View>
      </ModalPopUp>
      {IsCameraVisible && (
        <CameraScreen
          closeCameraHandle={closeCameraHandle}
          openLocation={openLocation}
          setImageURI={setImageURI}
          setBgImageURI={setBgImageURI}
        />
      )}
    </>
  );
};

const styles = StyleSheet.create({
  modal: {
    backgroundColor: "#fff",
    borderRadius: 5,
    marginHorizontal: 12,
  },
  titleContainer: {
    paddingVertical: 18,
    alignItems: "center",
  },
  title: {
    fontFamily: "Avenir-Heavy",
    fontSize: 16,
  },
  chooseContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 12,
  },
  choose: {
    flex: 1,
    padding: 20,
    alignItems: "center",
  },
  chooseText: {
    marginTop: 5,
    fontFamily: "Avenir-Regular",
  },
  cancelContainer: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    alignItems: "flex-end",
  },
  text: {
    fontFamily: "Avenir-Regular",
    color: colors.primary,
    paddingHorizontal: 8,
  },
});
export default Choose;
