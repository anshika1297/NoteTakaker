import {
  StyleSheet,
  SafeAreaView,
  ScrollView,
  Text,
  View,
  Dimensions,
  FlatList,
} from "react-native";
import React from "react";
import SingleNote from "./SingleNote";
const { width } = Dimensions.get("window");

const NoteList = ({ notesData, setNotesData }) => {
  return (
    <SafeAreaView
      style={{
        paddingHorizontal: 5,
        paddingVertical: 30,
      }}
    >
      <FlatList
        data={notesData}
        renderItem={({ item }) => (
          <SingleNote item={item} setNotesData={setNotesData} />
        )}
        keyExtractor={(item) => item.id.toString()}
        numColumns={1}
        scrollEnabled={false}
      />
    </SafeAreaView>
  );
};

export default NoteList;

const styles = StyleSheet.create({});
