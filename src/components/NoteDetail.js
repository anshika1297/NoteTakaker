import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Dimensions,
  ImageBackground,
  StyleSheet,
} from "react-native";

const NoteDetail = ({ route, navigation }) => {
  const { note } = route.params;

  return (
    <ImageBackground
      source={{
        uri: "https://pub-static.fotor.com/assets/bg/91943916-cf00-4529-8ed4-3e47304cea73.jpg",
      }}
      style={{ width: "100%", height: "100%" }}
    >
      <View style={styles.container}>
        <Text style={styles.header}>Note Detail</Text>
        <View style={styles.noteContainer}>
          <Text style={styles.noteTitle}>{note.title}</Text>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              opacity: 0.5,
            }}
          >
            <Text>
              Category:{"  "} {note.category}
            </Text>
            <Text>
              {note.date} {note.time}
            </Text>
          </View>
          <Text style={styles.noteContent}>{note.content}</Text>
        </View>
        <TouchableOpacity
          style={styles.editButton}
          onPress={() => navigation.navigate("AddEditNote", { note })}
        >
          <Text style={styles.editButtonText}>Edit Note</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
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
  noteContainer: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 10,
    backgroundColor: "white",
  },
  noteTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#D29828",
  },
  noteContent: {
    fontSize: 17,
    paddingTop: 20,
    opacity: 0.8,
  },
  editButton: {
    backgroundColor: "#D29828",
    padding: 10,
    borderRadius: 5,
    marginTop: 20,
  },
  editButtonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
  },
});

export default NoteDetail;
