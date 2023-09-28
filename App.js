import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import NoteScreen from "./src/Screens/NoteScreen";
import NoteFolder from "./src/Screens/NoteFolder";
import { createStackNavigator } from "@react-navigation/stack";
import { SafeAreaView } from "react-native-safe-area-context";

const Stack = createStackNavigator();

export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      <NoteScreen />

      <StatusBar style="auto" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
