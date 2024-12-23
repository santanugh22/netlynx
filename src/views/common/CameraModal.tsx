import React, { useState, useEffect, useRef } from "react";
import {
  Text,
  View,
  StyleSheet,
  Image,
  Modal,
  ActivityIndicator,
} from "react-native";
import Constants from "expo-constants";
import { Camera, CameraType } from "expo-camera";
import Toast from "react-native-toast-message";
import Button from "./CameraButton";
import { useAppSelector } from "../../redux/hooks";
import { selectedAuth } from "../../redux/features/authSlice";
import {
  useUpdateBackgroundImageMutation,
  useUpdateProfileImageMutation,
} from "../../redux/services/staffAndUser";

interface Props {
  closeCameraHandle: () => void;
  openLocation?: string;
  setImageURI?: React.Dispatch<React.SetStateAction<string>>;
  setBgImageURI?: React.Dispatch<React.SetStateAction<string>>;
}

export default function CameraScreen({
  closeCameraHandle,
  openLocation,
  setImageURI,
  setBgImageURI,
}: Props) {
  const [hasCameraPermission, setHasCameraPermission] = useState(false);
  const [image, setImage] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.back);
  const [flash, setFlash] = useState(Camera.Constants.FlashMode.off);
  const cameraRef = useRef<any>(null);
  const { auth_key, id, role } = useAppSelector(selectedAuth);
  const [updateProfileImage, { isLoading }] = useUpdateProfileImageMutation();
  const [updateBackgroundImage, { isLoading: IsBackgroundImageUpdating }] =
    useUpdateBackgroundImageMutation();

  useEffect(() => {
    (async () => {
      const cameraStatus = await Camera.requestCameraPermissionsAsync();
      setHasCameraPermission(cameraStatus.status === "granted");
    })();
  }, []);

  const takePicture = async () => {
    if (cameraRef) {
      const data = await cameraRef.current.takePictureAsync();
      setImage(data.uri);
    }
  };

  const savePicture = async () => {
    if (image) {
      if (openLocation === "addSocialMedia") {
        setImageURI && setImageURI(image);
        closeCameraHandle();
        Toast.show({
          type: "success",
          text1: "Image",
          text2: "Image added successfully",
        });
      } else if (openLocation === "addVideo") {
        setImageURI && setImageURI(image);
        closeCameraHandle();
        Toast.show({
          type: "success",
          text1: "Image",
          text2: "Image added successfully",
        });
      } else if (openLocation === "profileImage") {
        setImageURI && setImageURI(image);
        updateProfileImage({
          auth_key,
          id,
          imageURI: image,
          role,
        });
        closeCameraHandle();
        Toast.show({
          type: "success",
          text1: "Image",
          text2: "Image added successfully",
        });
      } else if (openLocation === "profileBackgroundImage") {
        setBgImageURI && setBgImageURI(image);
        updateBackgroundImage({
          auth_key,
          id,
          imageURI: image,
          role,
        });
        closeCameraHandle();
        Toast.show({
          type: "success",
          text1: "Image",
          text2: "Background Image added successfully",
        });
      }
    }
  };

  if (hasCameraPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <Modal visible={true}>
      <View style={styles.container}>
        {!image ? (
          <Camera
            style={styles.camera}
            type={type}
            ref={cameraRef}
            flashMode={flash}
          >
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                paddingHorizontal: 30,
              }}
            >
              <Button
                icon="retweet"
                onPress={() => {
                  setType(
                    type === CameraType.back
                      ? CameraType.front
                      : CameraType.back
                  );
                }}
                color={undefined}
              />
              <Button
                onPress={() =>
                  setFlash(
                    flash === Camera.Constants.FlashMode.off
                      ? Camera.Constants.FlashMode.on
                      : Camera.Constants.FlashMode.off
                  )
                }
                icon="flash"
                color={
                  flash === Camera.Constants.FlashMode.off ? "gray" : "#fff"
                }
              />
            </View>
          </Camera>
        ) : (
          <Image source={{ uri: image }} style={styles.camera} />
        )}

        <View style={styles.controls}>
          {image ? (
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                paddingHorizontal: 50,
              }}
            >
              <Button
                title="Re-take"
                onPress={() => setImage(null)}
                icon="retweet"
              />
              {isLoading || IsBackgroundImageUpdating ? (
                <ActivityIndicator size="large" />
              ) : (
                <Button title="Save" onPress={savePicture} icon="check" />
              )}
            </View>
          ) : (
            <Button
              title="Take a picture"
              onPress={takePicture}
              icon="camera"
            />
          )}
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    paddingTop: Constants.statusBarHeight,
    backgroundColor: "#000",
    padding: 8,
  },
  controls: {
    flex: 0.5,
  },
  button: {
    height: 40,
    borderRadius: 6,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    fontWeight: "bold",
    fontSize: 16,
    color: "#E9730F",
    marginLeft: 10,
  },
  camera: {
    flex: 5,
    borderRadius: 20,
  },
  topControls: {
    flex: 1,
  },
});
