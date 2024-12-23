import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import React, { useCallback, useMemo } from "react";
import { colors } from "../../utils/colors";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { globalStyles } from "../../../global.style";
import Toast from "react-native-toast-message";
import { useDeleteVideoMutation } from "../../redux/services/staffAndUser";
import { selectedAuth } from "../../redux/features/authSlice";
import { useAppSelector } from "../../redux/hooks";
import YoutubePlayer from "react-native-youtube-iframe";

interface Props {
  item: IProfileDetailVideo;
}

const VideosContainer = ({ item }: Props) => {
  const { auth_key, id, role } = useAppSelector(selectedAuth);
  const [deleteVideo] = useDeleteVideoMutation();

  const deleteVideoHandler = async (videoId: string) => {
    let { data }: any = await deleteVideo({ auth_key, id, videoId, role });
    if (data) {
      Toast.show({
        type: !data.error ? "success" : "error",
        text1: !data.error ? data.msg : data.msg,
      });
    }
  };

  const getYouTubeVideoId = useCallback((url: string) => {
    const regex =
      /(?:\?v=|&v=|youtu\.be\/|\/embed\/|\/v\/|\/\d{1,2}\/|\/\d{1,2}\/index\=)([^#\&\?]*).*/;
    const match = url.match(regex);
    return match && match[1] ? match[1] : "";
  }, []);

  return (
    <View style={[globalStyles.card]}>
      <View style={styles.cardContainer}>
        <YoutubePlayer
          videoId={getYouTubeVideoId(item?.video_url)}
          width={"100%" as unknown as number}
          height={180}
        />
      </View>
      <View style={styles.colContainer}>
        <Text style={styles.text}>{item?.title}</Text>
        <MaterialCommunityIcons
          name="delete"
          size={20}
          color={colors.docText}
          onPress={() => deleteVideoHandler(item.id)}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    columnGap: 12,
  },
  image: {
    marginVertical: -8,
    borderTopLeftRadius: 8,
    borderBottomLeftRadius: 8,
    width: 140,
    height: 80,
  },
  colContainer: {
    flex: 1,
    flexDirection: "row",
    height: "100%",
    justifyContent: "space-between",
    paddingHorizontal: 12,
  },
  text: {
    fontFamily: "Avenir-Regular",
    fontSize: 12,
    flex: 0.9,
  },
});
export default VideosContainer;
