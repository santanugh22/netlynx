import {
  View,
  Text,
  StyleSheet,
  Pressable,
  Image,
  Linking,
} from "react-native";
import React, { useState } from "react";
import { colors } from "../../utils/colors";
import InputBorder from "./InputBorder";
import { AntDesign } from "@expo/vector-icons";
import { globalStyles } from "../../../global.style";
import MainButton from "./MainButton";
import BottomSheet from "./BottomSheet";
import { ISocialMediaProps } from "./CommonInterface";
import {
  useDeleteReviewLinkMutation,
  useDeleteSocialMediaLinkMutation,
  useUpdateReviewLinkMutation,
  useUpdateSocialMediaLinkMutation,
} from "../../redux/services/staffAndUser";
import { useAppSelector } from "../../redux/hooks";
import { selectedAuth } from "../../redux/features/authSlice";
import Toast from "react-native-toast-message";

const SocialMediaPopUp = ({
  show,
  setShow,
  itemData,
  openLocation,
}: ISocialMediaProps) => {
  const { auth_key, id, role } = useAppSelector(selectedAuth);
  const [deleteSocialMediaLink] = useDeleteSocialMediaLinkMutation();
  const [updateSocialMediaLink, { isLoading }] =
    useUpdateSocialMediaLinkMutation();
  const [updateReviewLink, { isLoading: IsUpdatingReview }] =
    useUpdateReviewLinkMutation();
  const [deleteReviewLink] = useDeleteReviewLinkMutation();
  const [url, setUrl] = useState<string | undefined>(itemData?.url);

  const deleteSocialMediaLinkHandler = async () => {
    let { data }: any =
      openLocation === "reviewLinks"
        ? await deleteReviewLink({
            auth_key,
            id,
            linkId: itemData?.id as string,
          })
        : await deleteSocialMediaLink({
            auth_key,
            id,
            linkId: itemData?.id as string,
            role,
            isMasterSocialMedia: itemData?.isMasterSocialMedia as boolean,
          });
    if (data) {
      setShow(!show);
      Toast.show({
        type: !data.error ? "success" : "error",
        text1: !data.error ? data.msg : data.msg,
      });
    }
  };

  const updateSocialMediaLinkHandler = async () => {
    const { data }: any =
      openLocation === "reviewLinks"
        ? await updateReviewLink({
            auth_key,
            id,
            role,
            title: (itemData?.title || itemData?.type) as string,
            url: url as string,
            linkId: itemData?.id as string,
          })
        : await updateSocialMediaLink({
            auth_key,
            id,
            role,
            title: (itemData?.title || itemData?.type) as string,
            url: url as string,
            socialId: itemData?.id as string,
            isMasterSocialMedia: itemData?.isMasterSocialMedia as boolean,
          });
    if (data) {
      Toast.show({
        type: !data.error ? "success" : "error",
        text1: !data.error ? data.msg : data.msg,
      });
      setShow(!setShow);
    } else {
      Toast.show({
        type: "info",
        text1: "Please enter url",
      });
    }
  };

  return (
    <BottomSheet show={show} setShow={setShow}>
      <View>
        <Image source={{ uri: itemData?.image }} style={styles.image} />
        <Pressable
          style={styles.searchContainer}
          onPress={() => Linking.openURL("https://google.com")}
        >
          <AntDesign name="earth" size={18} color={colors.white} />
          <Text style={styles.titleText}>Search Browser</Text>
        </Pressable>
        <View style={styles.content}>
          {itemData && (
            <InputBorder
              placeholder={
                itemData?.url ? itemData?.url : `Please enter your profile link`
              }
              onChangeText={setUrl}
              defaultValue={itemData?.url}
            />
          )}
          {itemData && itemData.url && (
            <View style={styles.openContainer}>
              <Pressable
                style={[globalStyles.card, styles.flex]}
                onPress={() =>
                  itemData?.url
                    ? Linking.openURL(
                        itemData.url?.startsWith("https" || "http")
                          ? itemData.url
                          : `https://${itemData.url}`
                      )
                    : null
                }
              >
                <Text style={styles.text}>Open</Text>
              </Pressable>
              <Pressable
                style={[globalStyles.card, styles.flex]}
                onPress={deleteSocialMediaLinkHandler}
              >
                <Text style={styles.text}>Delete</Text>
              </Pressable>
            </View>
          )}
          <MainButton
            Icon={<AntDesign name="download" size={18} color="#fff" />}
            name="Save"
            onPress={updateSocialMediaLinkHandler}
            isLoading={isLoading || IsUpdatingReview}
          />
        </View>
      </View>
    </BottomSheet>
  );
};

const styles = StyleSheet.create({
  titleText: {
    fontFamily: "Avenir-Regular",
    color: colors.white,
    textAlign: "center",
    fontSize: 14,
  },
  content: {
    marginTop: 15,
    rowGap: 20,
  },
  image: {
    width: 100,
    height: 100,
    alignSelf: "center",
  },
  text: {
    color: colors.primary,
    fontFamily: "Avenir-Heavy",
    fontSize: 15,
    textAlign: "center",
  },
  openContainer: {
    flexDirection: "row",
    columnGap: 20,
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
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    columnGap: 20,
    paddingTop: 20,
  },
  flex: {
    flex: 1,
  },
});

export default SocialMediaPopUp;
