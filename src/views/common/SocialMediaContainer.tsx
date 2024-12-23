import {
  FlatList,
  Pressable,
  StyleSheet,
  View,
  Text,
  Image,
  Linking,
} from "react-native";
import React, { useState } from "react";
import SocialMediaCard from "./SocialMediaCard";
import { useAppSelector } from "../../redux/hooks";
import { selectedAuth } from "../../redux/features/authSlice";
import { useGetProfileDetailQuery } from "../../redux/services/staffAndUser";
import { images } from "../../utils/images";
import AddSocialMedia from "./AddSocialMedia";

interface Props {
  showSocialMedia: boolean;
  setShowSocialMedia: React.Dispatch<React.SetStateAction<boolean>>;
  setSocialMediaData: React.Dispatch<
    React.SetStateAction<IProfileDetailSocialMedia | null>
  >;
  openLocation?: string;
}

const SocialMediaContainer = ({
  setSocialMediaData,
  showSocialMedia,
  setShowSocialMedia,
  openLocation,
}: Props) => {
  const authValue = useAppSelector(selectedAuth);
  const { data: profileDetail, isLoading } =
    useGetProfileDetailQuery(authValue);
  const [addSocialMediaPopUp, setAddSocialMediaPopUp] = useState(false);

  // const renderData =
  //   openLocation === "reviewLinks"
  //     ? profileDetail?.staff_review_links
  //     : authValue?.role !== "staff" ? [
  //         ...(profileDetail?.master_social_media?.map((item) => ({
  //           ...item,
  //           isMasterSocialMedia: true,
  //         })) ?? []),
  //         ...(profileDetail?.social_media?.filter(
  //           (item) => item.master_id === "0"
  //         ) ?? []),
  //       ] : [
  //         ...(profileDetail?.master_social_media?.map((item) => ({
  //           ...item,
  //           isMasterSocialMedia: true,
  //         })) ?? []),
  //         ...(profileDetail?.social_media ?? []),
  //       ];
const renderData =
  openLocation === "reviewLinks"
    ? profileDetail?.staff_review_links?.map((item) => ({
        ...item,
        isMasterSocialMedia: item?.review_link_id !== "0", // Add the isMasterSocialMedia flag if review_link_id is not "0"
      }))
    : authValue?.role !== "staff"
    ? [
        ...(profileDetail?.master_social_media?.map((item) => ({
          ...item,
          isMasterSocialMedia: true,
        })) ?? []),
        ...(profileDetail?.social_media?.filter(
          (item) => item.master_id === "0"
        ) ?? []),
      ]
    : [
        ...(profileDetail?.master_social_media?.map((item) => ({
          ...item,
          isMasterSocialMedia: true,
        })) ?? []),
        ...(profileDetail?.social_media ?? []),
      ];

  const onSocialMediaHandler = (item: IProfileDetailSocialMedia) => {
    if (item?.isMasterSocialMedia && authValue?.role === "staff") {
      Linking.openURL(
        item.url?.startsWith("https" || "http")
          ? item.url
          : `https://${item.url}`
      );
    } else if (item?.type === "Add" || item?.title === "Add") {
      setAddSocialMediaPopUp(!addSocialMediaPopUp);
    } else {
      setSocialMediaData(item), setShowSocialMedia(!showSocialMedia);
    }
  };

  const Item = ({ item }: { item: IProfileDetailSocialMedia }) => {
    return (
      <SocialMediaCard
        onPress={() => onSocialMediaHandler(item)}
        name={item?.title || item?.type}
        logo={item?.image as string}
        url={item?.url}
      />
    );
  };

  const FooterItem = () => (
    <>
      <Pressable
        style={styles.cardContainer}
        onPress={() => setAddSocialMediaPopUp(!addSocialMediaPopUp)}
      >
        <View style={styles.card}>
          <Image
            source={images.plus}
            resizeMode="contain"
            style={styles.logo}
          />
        </View>
        <Text style={styles.text}>Add New</Text>
      </Pressable>
      <AddSocialMedia
        show={addSocialMediaPopUp}
        setShow={setAddSocialMediaPopUp}
        openLocation={openLocation}
      />
    </>
  );

  return (
    <>
      <FlatList
        showsVerticalScrollIndicator={false}
        overScrollMode="never"
        data={renderData}
        numColumns={4}
        style={styles.socialIcon}
        renderItem={({ item }) => <Item item={item} />}
        ListFooterComponent={() => <FooterItem />}
      />
      <AddSocialMedia
        show={addSocialMediaPopUp}
        setShow={setAddSocialMediaPopUp}
        openLocation={openLocation}
      />
    </>
  );
};

const styles = StyleSheet.create({
  socialIcon: {
    paddingVertical: 10,
  },
  cardContainer: {
    alignItems: "flex-start",
    flex: 1,
    paddingHorizontal: 14,
    marginBottom: 10,
  },
  card: {
    backgroundColor: "#fff",
    padding: 6,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    borderRadius: 8,
  },
  logo: {
    width: 45,
    height: 45,
  },
  text: {
    fontFamily: "Avenir-Book",
    fontSize: 13,
    marginTop: 5,
    textAlign: "center",
  },
});
export default SocialMediaContainer;
