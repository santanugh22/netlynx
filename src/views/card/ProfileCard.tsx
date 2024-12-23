import {
  View,
  Text,
  Image,
  Animated,
  Pressable,
  TouchableOpacity,
  ImageBackground,
} from "react-native";
import React, { useEffect, useRef, useState } from "react";
import {
  MaterialIcons,
  Ionicons,
  Feather,
  AntDesign,
} from "@expo/vector-icons";
import { styles } from "./ProfileCard.style";
import { globalStyles } from "../../../global.style";
import { images } from "../../utils/images";
import { colors } from "../../utils/colors";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { saveAuthInfo, selectedAuth } from "../../redux/features/authSlice";
import { useGetProfileDetailQuery } from "../../redux/services/staffAndUser";
import Choose from "../common/Choose";
import AsyncStorage from "@react-native-async-storage/async-storage";

const ProfileCard = () => {
  const [openLocation, setOpenLocation] = useState("");
  const authValue = useAppSelector(selectedAuth);
  const { data: profileDetail } = useGetProfileDetailQuery(authValue);
  const [imageURI, setImageURI] = useState<string>("");
  const [bgImageURI, setBgImageURI] = useState<string>("");
  const dispatch = useAppDispatch();

  useEffect(() => {
    (async () => {
      if (profileDetail?.error && profileDetail?.msg === "Invalid auth key") {
        dispatch(saveAuthInfo(null as any));
        await AsyncStorage.removeItem("@Auth_Key");
      }
    })();
  }, []);

  const [show, setShow] = useState(false);
  const flipAnimation = useRef(new Animated.Value(0)).current;

  let flipRotation = 0;
  flipAnimation.addListener(({ value }) => (flipRotation = value));

  const flipToFrontStyle = {
    transform: [
      {
        rotateX: flipAnimation.interpolate({
          inputRange: [0, 180],
          outputRange: ["0deg", "180deg"],
        }),
      },
    ],
  };
  const flipToBackStyle = {
    transform: [
      {
        rotateX: flipAnimation.interpolate({
          inputRange: [0, 180],
          outputRange: ["180deg", "360deg"],
        }),
      },
    ],
  };

  const flipToFront = () => {
    Animated.timing(flipAnimation, {
      toValue: 180,
      duration: 300,
      useNativeDriver: true,
    }).start();
  };
  const flipToBack = () => {
    Animated.timing(flipAnimation, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true,
    }).start();
  };

  return (
    <Pressable
      style={styles.cardContainer}
      // onPress={() => {
      //   !!flipRotation ? flipToBack() : flipToFront();
      // }}
    >
      <Choose
        show={show}
        setShow={setShow}
        openLocation={openLocation}
        setImageURI={setImageURI}
        setBgImageURI={setBgImageURI}
      />
      <Animated.View style={[styles.card, flipToBackStyle, styles.backCard]}>
        <View style={styles.ImgContainer}>
          <Image
            source={
              profileDetail?.personal_info?.qr_code
                ? { uri: profileDetail?.personal_info?.qr_code }
                : images.qr
            }
            style={styles.backCardImg}
            resizeMode="contain"
          />
        </View>
      </Animated.View>
      <Animated.View
        style={[
          styles.card,
          flipToFrontStyle,
          {
            backfaceVisibility: "hidden",
            zIndex: 20,
          },
        ]}
      >
        <ImageBackground
          source={{
            uri: !bgImageURI
              ? profileDetail?.personal_info?.background_image
              : bgImageURI,
          }}
          style={[styles.card, styles.bgImage]}
        >
          <View style={styles.shade} />
        </ImageBackground>
        <Pressable
          style={[styles.ImgContainer, styles.border]}
          onPress={() => {
            setShow(true), setOpenLocation("profileImage");
          }}
        >
          <Image
            source={{
              uri: !imageURI ? profileDetail?.personal_info?.image : imageURI,
            }}
            style={styles.profileImg}
            resizeMode="cover"
          />
        </Pressable>
        <View style={styles.nameContainer}>
          <Text style={styles.cardText}>
            {profileDetail?.personal_info?.fname}{" "}
            {profileDetail?.personal_info?.lname}{" "}
          </Text>
          {/* <Feather
            onPress={() => {
              setShow(true), setOpenLocation("profileBackgroundImage");
            }}
            style={styles.camIcon}
            name="camera"
            size={14}
            color={colors.white}
          /> */}
          <Ionicons
            name="copy-outline"
            onPress={() => {
              setShow(true), setOpenLocation("profileBackgroundImage");
            }}
            style={styles.camIcon}
            size={18}
            color={colors.white}
          />
        </View>
      </Animated.View>
    </Pressable>
  );
};

export default ProfileCard;
