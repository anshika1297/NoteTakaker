import { useState, useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, SafeAreaView, Text, View } from "react-native";
import Constants from "expo-constants";
import NoteScreen from "./src/Screens/NoteScreen";
import NoteDetail from "./src/components/NoteDetail";
import NoteInput from "./src/components/NoteInput";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={NoteScreen} />
        <Stack.Screen name="NoteDetail" component={NoteDetail} />
        <Stack.Screen name="AddEditNote" component={NoteInput} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    paddingTop: Constants.statusBarHeight,
  },
});
