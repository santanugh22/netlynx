import { View, StyleSheet, Text, ScrollView } from "react-native";
import React from "react";
import Header from "../common/Header";
import { globalStyles } from "../../../global.style";
import data from "./TermsCondition.json";

const TermsCondition = () => {
  return (
    <View style={globalStyles.container}>
      <Header title="Terms And Condition" />
      <ScrollView overScrollMode="never" showsVerticalScrollIndicator={false}>
        {data?.terms?.map((item: any, index: number) => {
          return (
            <View key={item?.id}>
              <Text style={localStyle.title}>{item?.title}</Text>
              <Text style={localStyle.text}>{item?.content}</Text>
              {item?.bulletPoints?.map((item: any) => (
                <Text style={localStyle.bulletPoint}>{item}</Text>
              ))}
              {item?.contentEnd && (
                <Text style={[localStyle.text, localStyle.contentEnd]}>
                  {item?.contentEnd}
                </Text>
              )}
            </View>
          );
        })}
      </ScrollView>
    </View>
  );
};

const localStyle = StyleSheet.create({
  title: {
    color: "#111",
    fontFamily: "Avenir-Heavy",
    fontSize: 18,
    marginTop: 12,
    marginBottom: 4,
  },
  text: {
    color: "#111",
    fontFamily: "Avenir-Regular",
    fontSize: 14,
    textAlign: "justify",
  },
  bulletPoint: {
    color: "#111",
    fontSize: 15,
    fontFamily: "Avenir-Regular",
    marginTop: 12,
    textAlign: "justify",
  },
  contentEnd: {
    marginTop: 12,
  },
});
export default TermsCondition;
