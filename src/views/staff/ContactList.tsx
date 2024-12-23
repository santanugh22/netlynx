 import {
  View,
  ActivityIndicator,
  StyleSheet,
  FlatList,
} from "react-native";
import React, { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { globalStyles } from "../../../global.style";
import { styles } from "../home/HomeScreen.style";
import Header from "../common/Header";
import {
  useGetContactListQuery,
  useGetProfileDetailQuery,
} from "../../redux/services/staffAndUser";
import { useAppSelector } from "../../redux/hooks";
import { selectedAuth } from "../../redux/features/authSlice";
import ContactCard from "./ContactCard";

// AsyncStorage keys
const DELETED_CONTACTS_KEY = 'deletedContacts';

const ContactList = ({ goBackNavigation, navigation }: any) => {
  const { auth_key, id, role } = useAppSelector(selectedAuth);
  const { data: profileDetail } = useGetProfileDetailQuery({
    auth_key,
    id,
    role,
  });

  const staff_id = profileDetail?.personal_info?.id;
  const { data: contactsData, error, isLoading } = useGetContactListQuery({
    id,
    auth_key,
  });

  // Local state to manage the contacts and deleted contacts
  const [contacts, setContacts] = useState<any[]>([]);
  const [deletedContacts, setDeletedContacts] = useState<number[]>([]); // Track deleted contact IDs

  // Load deleted contacts from AsyncStorage when the component mounts
  useEffect(() => {
    const loadDeletedContacts = async () => {
      try {
        const storedDeletedContacts = await AsyncStorage.getItem(DELETED_CONTACTS_KEY);
        if (storedDeletedContacts) {
          setDeletedContacts(JSON.parse(storedDeletedContacts));
        }
      } catch (error) {
        console.error("Failed to load deleted contacts from AsyncStorage:", error);
      }
    };

    loadDeletedContacts();
  }, []);

  // Populate local contacts when data is available and filter out deleted contacts
  useEffect(() => {
    if (contactsData?.data) {
      const transformedData = Object.keys(contactsData.data).flatMap((color: string) =>
        contactsData.data[color].map((data: any) => ({ color, data }))
      );
      // Filter out the deleted contacts before setting state
      const filteredData = transformedData.filter(
        (contact) => !deletedContacts.includes(contact.data.id)
      );
      setContacts(filteredData);
    }
  }, [contactsData, deletedContacts]); // Rerun when contactsData or deletedContacts change

  // Function to remove contact from the list and store the deleted ID in AsyncStorage
  const removeContact = async (contactId: number) => {
    try {
      // Add the deleted contact to the state
      const updatedDeletedContacts = [...deletedContacts, contactId];
      setDeletedContacts(updatedDeletedContacts);

      // Store the updated deleted contacts in AsyncStorage
      await AsyncStorage.setItem(DELETED_CONTACTS_KEY, JSON.stringify(updatedDeletedContacts));

      // Remove the contact from the local contacts state
      setContacts((prevContacts) =>
        prevContacts.filter((contact) => contact.data.id !== contactId)
      );
    } catch (error) {
      console.error("Failed to save deleted contact to AsyncStorage:", error);
    }
  };

  if (isLoading) {
    return (
      <View style={localStyles.container}>
        <ActivityIndicator size={28} />
      </View>
    );
  }

  return (
    <View style={globalStyles.container}>
      <View style={styles.container}>
        <Header
          onPress={() => navigation.goBack()}
          title="Customers"
          hasBack={true}
        />
        <FlatList
          data={contacts}
          style={{
            marginBottom: 20,
          }}
          renderItem={({ item }) => (
            <ContactCard
              item={item}
              onDelete={() => removeContact(item.data.id)} // Pass the delete handler to the ContactCard
            />
          )}
          keyExtractor={(item) => item.data.id.toString()}
          showsVerticalScrollIndicator={false}
          overScrollMode="never"
        />
      </View>
    </View>
  );
};

const localStyles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
export default ContactList;