import React, { useEffect } from "react";
import { Platform, Text, View } from "react-native";
import { selectedAuth } from "../../redux/features/authSlice";
import { useAppSelector } from "../../redux/hooks";
import { useGetProfileDetailQuery } from "../../redux/services/staffAndUser";
import RNFetchBlob from "rn-fetch-blob";
import Share, { Social } from "react-native-share";

const EmailScreen = () => {
  const { auth_key, id, role } = useAppSelector(selectedAuth);
  const { data: profileDetail, isLoading } = useGetProfileDetailQuery({
    auth_key,
    id,
    role,
  });

  const fullname = `${profileDetail?.personal_info?.fname} ${profileDetail?.personal_info?.lname}`;
  let imagePath;

  const shareImage = async () => {
    const msg = [
      "\n".repeat(6), // Adds 5 line breaks at the top
      toBold(fullname),
      toBold(profileDetail?.personal_info?.company_name),
      `${toBold(`Phone`)}: ${profileDetail?.personal_info?.phone}`,
      `${toBold(`Email`)}: ${profileDetail?.personal_info?.email}`,
      `${toBold(`Website`)}: ${profileDetail?.personal_info?.website}`,
      `${toBold(`Address`)}: ${profileDetail?.personal_info?.address}`,
      `${toBold(`Digital Card`)}: ${
        profileDetail?.personal_info?.digital_card
      }\n`,
      // `${toBold(`Social Media`)}:`,
      // "\n",
      // profileDetail?.master_social_media
      //   ?.filter((social) => (social.title || social.type) && social.url) // Filter out any entries without a title or url
      //   .map(
      //     (social) => `${toBold(social.title || social.type)}: ${social.url}`
      //   )
      //   .join("\n"),
    ]
      .filter((line) => line) // This will remove any undefined or null values resulting from optional chaining
      .join("\n"); // Use a single newline for separation

    const options = {
      title: `${fullname}'s Digital Card`,
      subject: `${fullname}'s Digital Card`,
      message: msg,
      email: profileDetail?.personal_info?.email,
      social: Share.Social.EMAIL,
    };

    try {
      const result = await Share.shareSingle(options);
      console.log("Share was successful", result);
    } catch (error) {
      console.log("Error sharing", error);
    }
  };

  useEffect(() => {
    shareImage();
  }, []);

  return (
    <View>
      <Text>EmailScreen</Text>
    </View>
  );
};

const toBold = (text: string) => {
  const charSet = [
    "a",
    "b",
    "c",
    "d",
    "e",
    "f",
    "g",
    "h",
    "i",
    "j",
    "k",
    "l",
    "m",
    "n",
    "o",
    "p",
    "q",
    "r",
    "s",
    "t",
    "u",
    "v",
    "w",
    "x",
    "y",
    "z",
    "A",
    "B",
    "C",
    "D",
    "E",
    "F",
    "G",
    "H",
    "I",
    "J",
    "K",
    "L",
    "M",
    "N",
    "O",
    "P",
    "Q",
    "R",
    "S",
    "T",
    "U",
    "V",
    "W",
    "X",
    "Y",
    "Z",
    "0",
    "1",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "!",
    "?",
    ".",
    ",",
    '"',
    "'",
  ];
  const targetCharSet = [
    "𝐚",
    "𝐛",
    "𝐜",
    "𝐝",
    "𝐞",
    "𝐟",
    "𝐠",
    "𝐡",
    "𝐢",
    "𝐣",
    "𝐤",
    "𝐥",
    "𝐦",
    "𝐧",
    "𝐨",
    "𝐩",
    "𝐪",
    "𝐫",
    "𝐬",
    "𝐭",
    "𝐮",
    "𝐯",
    "𝐰",
    "𝐱",
    "𝐲",
    "𝐳",
    "𝐀",
    "𝐁",
    "𝐂",
    "𝐃",
    "𝐄",
    "𝐅",
    "𝐆",
    "𝐇",
    "𝐈",
    "𝐉",
    "𝐊",
    "𝐋",
    "𝐌",
    "𝐍",
    "𝐎",
    "𝐏",
    "𝐐",
    "𝐑",
    "𝐒",
    "𝐓",
    "𝐔",
    "𝐕",
    "𝐖",
    "𝐗",
    "𝐘",
    "𝐙",
    "𝟎",
    "𝟏",
    "𝟐",
    "𝟑",
    "𝟒",
    "𝟓",
    "𝟔",
    "𝟕",
    "𝟖",
    "𝟗",
    "❗",
    "❓",
    ".",
    ",",
    '"',
    "'",
  ];
  const textArray = text.split("");
  let boldText = "";
  textArray.forEach((letter) => {
    const index = charSet.findIndex((_letter) => _letter === letter);
    if (index !== -1) {
      boldText = boldText + targetCharSet[index];
    } else {
      boldText = boldText + letter;
    }
  });
  return boldText;
};

export default EmailScreen;
