import React, { useCallback } from "react";
import { StatusBar, Platform } from "react-native";
import { useFocusEffect } from "@react-navigation/native";

export const useStatusBar = (style: string, color: string = "#fff") => {
  useFocusEffect(
    useCallback(() => {
      if (Platform.OS == "ios") {
        StatusBar.setBarStyle("light-content");
      } else {
        StatusBar.setBarStyle(style);
      }
      StatusBar.setBackgroundColor(color);
    }, [])
  );
};

// uses
// useStatusBar("light-content", "#3F0275");
