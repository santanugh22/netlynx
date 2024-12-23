import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import { AntDesign } from "@expo/vector-icons";
import { colors } from "../../utils/colors";

interface Props {
  setQueryContactsData: React.Dispatch<React.SetStateAction<IContactsData[]>>;
  contactsData: IContactsData[];
}

const SearchBox = ({ setQueryContactsData, contactsData }: Props) => {
  const [query, setQuery] = useState<string>("");
  const queryHandler = () => {
    setQueryContactsData(
      contactsData.filter((item) =>
        item?.name?.toLowerCase().includes(query.toLowerCase())
      )
    );
  };
  return (
    <View style={styles.search}>
      <TextInput
        style={styles.textInput}
        placeholder="search"
        value={query}
        onChangeText={setQuery}
      />
      <TouchableOpacity style={styles.inputBox} onPress={queryHandler}>
        <AntDesign name="search1" size={24} color={colors.white} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  search: {
    backgroundColor: colors.white,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 2,
    paddingLeft: 12,
    borderRadius: 12,
  },
  textInput: {
    height: 40,
    flex: 1,
    placeholderTextColor: "gray",
  },
  inputBox: {
    padding: 8,
    backgroundColor: colors.primary,
    borderRadius: 10,
  },
});
export default SearchBox;
