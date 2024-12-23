import React, { useEffect, useState } from "react";
import {
  ScrollView,
  Text,
  StyleSheet,
  View,
  Image,
  ImageBackground,
  PermissionsAndroid,
  ActivityIndicator,
  Platform,
} from "react-native";
import { globalStyles } from "../../../global.style";
import { colors } from "../../utils/colors";
import { styles } from "../home/HomeScreen.style";
import SquareLogo from "../logo/squareLogo";
import { images } from "../../utils/images";
import ShareContact from "./ShareContact";
import SearchBox from "../common/SearchBox";
import Card from "./Card";
import * as Contacts from "expo-contacts";
import * as Linking from "expo-linking";
import { useGetProfileDetailQuery } from "../../redux/services/staffAndUser";
import { selectedAuth } from "../../redux/features/authSlice";
import { useAppSelector } from "../../redux/hooks";

const CardScreen = ({ navigation }: any) => {
  const [contactsData, setContactsData] = useState<IContactsData[]>([]);
  const [callLogsData, setCallLogsData] = useState<ICallLogsData[]>([]);
  const [queryContactsData, setQueryContactsData] = useState<IContactsData[]>(
    []
  );
  const { auth_key, id, role } = useAppSelector(selectedAuth);
  const { data: profileDetail } = useGetProfileDetailQuery({
    auth_key,
    id,
    role,
  });
  const [isLoading, setIsLoading] = useState(false);

  const generateColorsArray = (length: number) => {
    const colors = [];

    for (let i = 0; i < length; i++) {
      const color = getRandomColor();
      colors.push(color);
    }

    return colors;
  };

  const getRandomColor = () => {
    const letters = "0123456789ABCDEF";
    let color = "#";

    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }

    return color;
  };

  const getTextColor = (backgroundColor: string) => {
    const hexColor = backgroundColor.replace("#", "");
    const red = parseInt(hexColor.substring(0, 2), 16);
    const green = parseInt(hexColor.substring(2, 4), 16);
    const blue = parseInt(hexColor.substring(4, 6), 16);
    const brightness = (red * 299 + green * 587 + blue * 114) / 1000;

    return brightness > 125 ? "#000000" : "#FFFFFF";
  };

  const randomColor = generateColorsArray(contactsData?.length);

  useEffect(() => {
    (async () => {
      try {
        setIsLoading(true);
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.READ_CONTACTS
        );
        const { status } = await Contacts.requestPermissionsAsync();
        if (status === "granted") {
          const { data } = await Contacts.getContactsAsync();
          if (data.length > 0) {
            setContactsData(data as any);
          }
        }
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          // CallLogs.load(3).then((c: any) => setCallLogsData(c));
        } else {
          console.log("Call Log permission denied");
        }
        setIsLoading(false);
      } catch (e) {
        console.log(e);
      }
    })();
  }, []);

  const [showEmail, setShowEmail] = useState(false);
  const handleSendEmail = () => {
    setShowEmail(true);
  };

  return (
    <View style={globalStyles.container}>
      <View style={styles.container}>
        <View style={[styles.blueBG, localStyles.container]}>
          <SquareLogo
            url={profileDetail?.personal_info?.logo}
            height={80}
            width={140}
            withOutName={false}
          />
          <Text style={[styles.titleText, { color: colors.white }]}>Cards</Text>
          <SearchBox
            contactsData={contactsData}
            setQueryContactsData={setQueryContactsData}
          />
        </View>
        <View
          style={[
            styles.scrollContainer,
            { marginBottom: 200, paddingTop: 10 },
          ]}
        >
          <ScrollView
            showsVerticalScrollIndicator={false}
            overScrollMode="never"
          >
            <Text
              onPress={() => {
                navigation.navigate("ContactList");
              }}
              style={styles.titleText}
            >
              {" "}
              Customers
            </Text>
            {isLoading ? (
              <ActivityIndicator size="large" />
            ) : (
              callLogsData?.map((item, index) => (
                <Card
                  color={randomColor?.[index]}
                  textColor={getTextColor(randomColor?.[index])}
                  key={index}
                  callItem={item}
                />
              ))
            )}
            <View style={localStyles.rowContainer}>
              <Text style={styles.titleText}> All Contacts</Text>
              {Platform.OS === "android" && (
                <Text
                  style={styles.redText}
                  onPress={() =>
                    Linking.openURL("content://com.android.contacts/contacts")
                  }
                >
                  View all
                </Text>
              )}
            </View>
            {isLoading ? (
              <ActivityIndicator size="large" />
            ) : (
              (!queryContactsData.length
                ? contactsData
                : queryContactsData
              )?.map((item, index) => (
                <Card
                  textColor={getTextColor(randomColor?.[index])}
                  color={randomColor?.[index]}
                  key={index}
                  item={item}
                />
              ))
            )}
          </ScrollView>
        </View>
      </View>
    </View>
  );
};

const localStyles = StyleSheet.create({
  container: {
    justifyContent: "space-between",
    paddingBottom: 12,
    paddingHorizontal: 12,
  },
  rowContainer: {
    marginTop: 12,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
});
export default CardScreen;
