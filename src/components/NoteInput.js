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
  ImageBackground,
} from "react-native";
import React from "react";
import { AntDesign } from "@expo/vector-icons";
import RNPickerSelect from "react-native-picker-select";

const NoteInput = ({ visible, item, isEdit, onClose, onSubmit }) => {
  const [title, setTitle] = React.useState("");
  const [note, setNote] = React.useState("");
  const [category, setCategory] = React.useState("");

  React.useEffect(() => {
    if (isEdit) {
      setTitle(item.title);
      setCategory(item.category);
      setNote(item.noteDesc);
    }
  }, [isEdit]);
  const handleModalClose = () => {
    Keyboard.dismiss();
  };

  const handleSubmit = () => {
    if (!title.trim() || !note.trim()) {
      setNote("");
      return onClose();
    } else {
      onSubmit(title, note, category);
      if (!isEdit) {
        setNote("");
        setTitle("");
      }
      onClose();
    }
  };

  const closeModal = () => {
    if (!isEdit) {
      setTitle("");
      setNote("");
    }

    onClose();
  };
  return (
    <Modal visible={visible} animationType="slide">
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <View style={styles.InputView}>
          <Text
            style={{
              fontSize: 17,
              marginTop: 20,
              fontStyle: "italic",
              alignSelf: "center",
              color: "#7D93AE",
            }}
          >
            Create New Note
          </Text>
          <TextInput
            placeholder="Enter the Title...."
            placeholderTextColor="#7D93AE"
            value={title}
            onChangeText={(e) => setTitle(e)}
            style={styles.inputBox}
          />
          <View style={[styles.inputBox, { height: 50 }]}>
            <RNPickerSelect
              onValueChange={(value) => setCategory(value)}
              items={[
                { label: "Work", value: "Work" },
                { label: "Personal", value: "Personal" },
                { label: "Daily", value: "Daily" },
                { label: "Others", value: "Others" },
              ]}
              value={category}
              placeholder={{
                label: "Choose the Note Category...",
                value: null,
              }}
            />
          </View>

          <TextInput
            placeholder="Write Here...."
            placeholderTextColor="#7D93AE"
            multiline
            value={note}
            onChangeText={(e) => setNote(e)}
            style={[styles.inputBox, { height: 150 }]}
          />
          <Text style={{ color: "#7D93AE", alignSelf: "center", opacity: 0.5 }}>
            Minimum 10 characters Required
          </Text>
          <View
            style={{ flexDirection: "row", justifyContent: "space-around" }}
          >
            {note.length > 10 ? (
              <TouchableOpacity style={styles.button} onPress={handleSubmit}>
                <AntDesign name="check" size={30} color="white" />
              </TouchableOpacity>
            ) : null}
            <TouchableOpacity style={styles.button}>
              <AntDesign
                name="close"
                size={30}
                color="white"
                onPress={closeModal}
              />
            </TouchableOpacity>
          </View>
        </View>

        <TouchableWithoutFeedback onPress={handleModalClose}>
          <View style={[StyleSheet.absoluteFillObject, styles.bgModal]}></View>
        </TouchableWithoutFeedback>
      </View>
    </Modal>
  );
};

export default NoteInput;

const styles = StyleSheet.create({
  InputView: {
    marginVertical: 30,
    alignSelf: "center",
    paddingHorizontal: 20,
  },
  inputBox: {
    width: 320,
    height: 60,
    fontSize: 17,
    marginTop: 20,
    paddingHorizontal: 20,
    borderRadius: 30,
    backgroundColor: "#ECECEC",
    color: "#7D93AE",
    opacity: 0.5,
  },
  bgModal: {
    flex: 1,
    zIndex: -1,
    backgroundColor: "#182746",
  },
  button: {
    width: 60,
    backgroundColor: "#7D93AE",
    height: 60,
    borderRadius: 30,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 30,
    alignSelf: "center",
  },
});
