import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React from "react";
import { Entypo } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

const NoteFolder = () => {
  const navigation = useNavigation();
  const onFolderSelect = (type) => {
    console.log(type);
  };
  return (
    <View style={{ paddingTop: 20 }}>
      <TouchableOpacity style={styles.folder} onPress={onFolderSelect("Work")}>
        <Entypo name="folder" size={70} color="#F7C427" />
        <Text style={styles.text}>Work Notes</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.folder}
        onPress={onFolderSelect("Personal")}
      >
        <Entypo name="folder" size={70} color="#F7C427" />

        <Text style={styles.text}>Personal Notes</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.folder} onPress={onFolderSelect("Daily")}>
        <Entypo name="folder" size={70} color="#F7C427" />

        <Text style={styles.text}>Daily Notes</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.folder} onPress={onFolderSelect("Other")}>
        <Entypo name="folder" size={70} color="#F7C427" />

        <Text style={styles.text}>Other Notes</Text>
      </TouchableOpacity>
    </View>
  );
};

export default NoteFolder;

const styles = StyleSheet.create({
  folder: {
    borderRadius: 10,
    borderWidth: 2,
    borderColor: "#F1F3F4",
    padding: 15,
    marginBottom: 15,
    flexDirection: "column",
    alignItems: "center",
  },
  text: {
    fontSize: 17,
  },
});
