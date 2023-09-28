import React, { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  View,
  Text,
  TextInput,
  Button,
  TouchableOpacity,
  Modal,
  StyleSheet,
} from "react-native";
import CategorySelector from "./CategorySelector";

const NoteInput = ({ route, navigation }) => {
  const { note } = route.params || { note: null };
  const [title, setTitle] = useState(note ? note.title : "");
  const [content, setContent] = useState(note ? note.content : "");
  const [selectedCategory, setSelectedCategory] = useState(
    note ? note.category : ""
  );
  const [isCategoryModalVisible, setCategoryModalVisible] = useState(false);

  const { setNotes } = route.params;

  const toggleCategoryModal = () => {
    setCategoryModalVisible(!isCategoryModalVisible);
  };

  // Function to handle category selection
  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
  };
  // Function to save the note
  const saveNote = async () => {
    try {
      const newNote = {
        id: Date.now(),
        title,
        content,
        category: selectedCategory,
        time: new Date().toLocaleTimeString(),
        date: new Date().toLocaleDateString(),
      };
      const savedNotes = await AsyncStorage.getItem("notes");
      let notes = savedNotes ? JSON.parse(savedNotes) : [];

      if (note) {
        // Update existing note if it exists
        const index = notes.findIndex((n) => n.id === note.id);
        console.log(index);
        if (index !== -1) {
          notes[index] = newNote;
        }
      } else {
        // Create a new note
        notes.push(newNote);
      }

      await AsyncStorage.setItem("notes", JSON.stringify(notes));
      setNotes(notes);
      navigation.navigate("Home");
    } catch (error) {
      console.error("Error saving note:", error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>
        {note ? "Edit Note" : "Create New Note"}
      </Text>
      <TextInput
        style={styles.input}
        placeholder="Title"
        value={title}
        onChangeText={setTitle}
      />

      {/* Category Selection Button */}
      <TouchableOpacity
        onPress={toggleCategoryModal}
        style={styles.categoryButton}
      >
        <Text
          style={{
            fontSize: 17,
            backgroundColor: "#7D93AE",
            width: 320,
            height: 30,
            paddingLeft: 20,
            marginBottom: 20,
            padding: 5,
            borderRadius: 30,

            color: "#ECECEC",
          }}
        >
          Category:{"  "} {selectedCategory}
        </Text>
      </TouchableOpacity>

      {/* Category Selector */}
      <CategorySelector
        isVisible={isCategoryModalVisible}
        toggleModal={toggleCategoryModal}
        selectedCategory={selectedCategory}
        onCategoryChange={handleCategoryChange}
        categories={[
          "Personal",
          "Work",
          "General Updates",
          "Shopping",
          "Other",
        ]}
      />

      <TextInput
        style={[styles.input, styles.multilineInput]}
        placeholder="Content"
        multiline
        value={content}
        onChangeText={setContent}
      />
      <Text style={{ color: "#7D93AE", opacity: 0.5 }}>
        Minimum 10 characters Required
      </Text>
      {content.length > 10 && title.length > 1 ? (
        <Button title="Save" onPress={saveNote} />
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  header: {
    fontSize: 24,
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 10,
    marginBottom: 20,
  },
  multilineInput: {
    minHeight: 100,
  },
});

export default NoteInput;
