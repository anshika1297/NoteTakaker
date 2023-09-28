import {
  StyleSheet,
  Text,
  View,
  Modal,
  TouchableOpacity,
  TextInput,
  TouchableWithoutFeedback,
  Keyboard,
  Dimensions,
  ScrollView,
  ImageBackground,
  Alert,
} from "react-native";
import React from "react";
import { AntDesign, FontAwesome, MaterialIcons } from "@expo/vector-icons";
import NoteInput from "./NoteInput";
import AsyncStorage from "@react-native-async-storage/async-storage";

const NoteDetail = ({ item, visible, onClose, setNotesData }) => {
  const [modal, setModal] = React.useState(false);
  const [isEdit, setEdit] = React.useState(false);

  const onUpdate = async (title, note) => {
    const getUserNotes = await AsyncStorage.getItem("userNotes");
    let notes = [];
    if (getUserNotes !== null) notes = JSON.parse(getUserNotes);
    const updatedNotes = notes.filter((n) => {
      if (item.id === n.id) {
        (n.title = title),
          (n.noteDesc = note),
          (n.time = new Date().toLocaleTimeString()),
          (n.date = new Date().toLocaleDateString()),
          (n.isUpdate = true);
      }
      return n;
    });

    await AsyncStorage.setItem("userNotes", JSON.stringify(updatedNotes));
    setNotesData(updatedNotes);
  };

  const deleteNote = async () => {
    try {
      const getUserNotes = await AsyncStorage.getItem("userNotes");
      let notes = [];
      if (getUserNotes !== null) notes = JSON.parse(getUserNotes);
      console.log(notes);

      const updatedNotes = notes.filter((n) => item.id !== n.id);
      await AsyncStorage.setItem("userNotes", JSON.stringify(updatedNotes));
      setNotesData(updatedNotes);
    } catch (e) {
      console.log(e);
    }
  };

  const handleDelete = () => {
    Alert.alert(
      "Are you Sure?",
      "This Action Will Delete your Note Permanently.",
      [
        {
          text: "Delete",
          onPress: deleteNote,
        },
        {
          text: "Cancel",
          onPress: () => {
            console.log("Cancel");
          },
        },
      ],
      {
        cancelable: true,
      }
    );
  };
  const closeModal = () => {
    onClose();
  };

  return (
    <Modal visible={visible} animationType="slide">
      <ImageBackground
        source={{
          uri: "https://pub-static.fotor.com/assets/bg/91943916-cf00-4529-8ed4-3e47304cea73.jpg",
        }}
        style={{ width: "100%", height: "100%" }}
      >
        <TouchableOpacity
          style={{ alignSelf: "flex-end", padding: 15 }}
          onPress={closeModal}
        >
          <AntDesign name="close" size={24} color="black" />
        </TouchableOpacity>

        <View style={{ flex: 1, justifyContent: "center", padding: 20 }}>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              paddingBottom: 40,
            }}
          >
            <View>
              <Text
                style={{
                  fontSize: 25,
                  fontStyle: "italic",
                  fontWeight: "bold",
                }}
              >
                {item.title}
              </Text>
              <View style={{ flexDirection: "row" }}>
                <Text style={{ fontSize: 13, opacity: 0.7 }}>
                  {item.date},{"   "}
                </Text>
                <Text style={{ fontSize: 13, opacity: 0.7 }}>{item.time}</Text>
              </View>
              <Text>Category: {item.category} Notes</Text>
            </View>
            <View style={{ paddingTop: 10, opacity: 0.7 }}></View>
          </View>
          <ScrollView>
            <Text style={{ fontSize: 17, alignSelf: "auto", padding: 5 }}>
              {item.noteDesc}
            </Text>
          </ScrollView>
        </View>
        <TouchableOpacity
          style={[
            styles.button,
            {
              position: "absolute",
              alignSelf: "baseline",
              zIndex: 1,
              right: 20,
              bottom: 190,
            },
          ]}
          onPress={() => setModal(true)}
        >
          <FontAwesome name="pencil-square-o" size={30} color="black" />
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.button,
            {
              position: "absolute",
              alignSelf: "baseline",
              zIndex: 1,
              right: 20,
              bottom: 120,
            },
          ]}
          onPress={handleDelete}
        >
          <MaterialIcons name="delete" size={30} color="black" />
        </TouchableOpacity>
      </ImageBackground>
      <NoteInput
        visible={modal}
        item={item}
        isEdit={true}
        onClose={() => setModal(false)}
        onSubmit={onUpdate}
      />
    </Modal>
  );
};

export default NoteDetail;

const styles = StyleSheet.create({
  button: {
    width: 50,
    backgroundColor: "#C8AA74",
    height: 50,
    borderRadius: 25,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 30,
    zIndex: 1,
  },
});
