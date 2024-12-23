import {
  View,
  Text,
  StyleSheet,
  GestureResponderEvent,
  Image,
} from "react-native";
import React from "react";
import { globalStyles } from "../../../global.style";
import { colors } from "../../utils/colors";
import { Entypo } from "@expo/vector-icons";

interface Props {
  onPress?: (event: GestureResponderEvent) => void;
  title?: string;
  fileUrl: string;
}

const PdfCard = ({ onPress, title, fileUrl }: Props) => {
  let fileType = fileUrl?.substring(fileUrl?.lastIndexOf(".") + 1);
  return (
    <View style={globalStyles.card}>
      <View style={styles.pdfContainer}>
        <View style={styles.pdfContent}>
          <Image
            source={
              (fileType === "pdf" &&
                require("../../../assets/icons/icons8-pdf-50.png")) ||
              (fileType === "doc" &&
                require("../../../assets/icons/icons8-doc-50.png"))
                ||
              (fileType === "xlsx" &&
                require("../../../assets/icons/icons8-xlsx-80.png"))
                ||
              (fileType === "xls" &&
                require("../../../assets/icons/icons8-xls-50.png"))
                ||
              (fileType === "docx" &&
                require("../../../assets/icons/icons8-docs-50.png"))
            }
            style={{ height: 24, width: 24, resizeMode: "contain" }}
          />
          <Text style={styles.pdfCText}>{title}</Text>
        </View>
        <Entypo
          onPress={onPress}
          name="dots-three-horizontal"
          size={18}
          color={colors.docText}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  pdfContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    columnGap: 10,
    paddingHorizontal: 12,
  },
  pdfContent: {
    flexDirection: "row",
    alignItems: "center",
    columnGap: 10,
  },
  pdfCText: {
    fontSize: 14,
    textAlign: "center",
    fontFamily: "Avenir-Regular",
    color: colors.docText,
  },
});

export default PdfCard;
