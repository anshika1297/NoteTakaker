import { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
  ImageBackground,
  Dimensions,
  ScrollView,
} from "react-native";
import React from "react";
import { AntDesign, FontAwesome } from "@expo/vector-icons";
import NoteInput from "../components/NoteInput";
import NoteList from "../components/NoteList";
import NoteFolder from "./NoteFolder";
import AsyncStorage from "@react-native-async-storage/async-storage";
import RNPickerSelect from "react-native-picker-select";

const { width } = Dimensions.get("window");
const NoteScreen = () => {
  const [search, setSearch] = useState("");
  const [modal, setModal] = useState(false);
  const [notesData, setNotesData] = useState([]);
  const [noSearch, setnoSearch] = useState(false);
  const [Notecategory, setCategory] = React.useState("All");

  const onSubmit = async (title, note, category) => {
    const userData = {
      id: Date.now(),
      title: title,
      noteDesc: note,
      category: category,
      time: new Date().toLocaleTimeString(),
      date: new Date().toLocaleDateString(),
      isUpdated: false,
    };

    const updatedNotes = [...notesData, userData];
    await AsyncStorage.setItem("userNotes", JSON.stringify(updatedNotes));
    setNotesData(updatedNotes);
  };

  const filterfunc = () => {
    if (Notecategory === "All") {
      getNotes();
    } else {
      const filteredData = notesData.filter(
        (note) => note.category === Notecategory
      );
      setNotesData(filteredData);
    }
  };
  const handleOnSearch = (e) => {
    setnoSearch(false);
    setSearch(e);
    if (e.length === 0) {
      getNotes();
    }
    const searchNote = notesData.filter((note) => {
      if (note.noteDesc.toLowerCase().includes(e.toLowerCase())) return note;
    });

    searchNote.length > 0 ? setNotesData([...searchNote]) : setnoSearch(true);
  };

  const getNotes = async () => {
    try {
      const getUserNotes = (await AsyncStorage.getItem("userNotes")) || [];
      if (getUserNotes !== null) setNotesData(JSON.parse(getUserNotes));
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    getNotes();
  }, []);
  return (
    <ImageBackground
      source={{
        uri: "https://imgv3.fotor.com/images/share/Free-blue-gradient-pattern-background-from-Fotor.jpg",
      }}
      style={{ width: width, height: "100%" }}
    >
      <SafeAreaView style={{ alignSelf: "center" }}>
        <View style={styles.searchBox}>
          <TextInput
            placeholder="Search your Notes by Content...."
            placeholderTextColor="#ECECEC"
            value={search}
            onChangeText={handleOnSearch}
            style={styles.inputBox}
          />
          {search.length > 0 ? (
            <TouchableOpacity
              onPress={() => {
                setSearch("");
                setnoSearch(false);
                getNotes();
              }}
            >
              <AntDesign
                name="close"
                size={22}
                color="#ECECEC"
                onp
                style={{ marginTop: 13 }}
              />
            </TouchableOpacity>
          ) : (
            <AntDesign
              name="search1"
              size={22}
              color="#ECECEC"
              style={{ marginTop: 13 }}
            />
          )}
        </View>
        <Text style={styles.GreetText}>Trust The Magic!</Text>
        <View style={[styles.CategoryBox, { height: 50 }]}>
          <RNPickerSelect
            onValueChange={(value) => {
              setCategory(value);
              filterfunc();
            }}
            items={[
              { label: "All", value: "All" },
              { label: "Work", value: "Work" },
              { label: "Personal", value: "Personal" },
              { label: "Daily", value: "Daily" },
              { label: "Others", value: "Others" },
            ]}
            value={Notecategory}
            placeholder={{
              label: "See Notes According to Category",
              value: null,
              color: "black",
            }}
          />
        </View>
        {noSearch === true ? (
          <View style={styles.emptyContainer}>
            <Text
              style={{
                color: "#7D93AE",
                fontWeight: "bold",
                fontSize: 23,
                padding: 15,
              }}
            >
              OOPS! No Results Found
            </Text>
            <Text
              style={{ fontWeight: "bold", color: "#7D93AE", fontSize: 17 }}
            >
              Try A New Search
            </Text>
          </View>
        ) : (
          <ScrollView>
            {notesData.length === 0 ? (
              <View style={styles.emptyContainer}>
                <Text
                  style={{
                    color: "#7D93AE",
                    fontSize: 17,
                    paddingTop: 200,
                    padding: 15,
                  }}
                >
                  No Notes Found
                </Text>
                <Text
                  style={{ fontWeight: "bold", color: "#7D93AE", fontSize: 25 }}
                >
                  ADD NOTES
                </Text>
              </View>
            ) : (
              <ScrollView>
                <NoteList notesData={notesData} setNotesData={setNotesData} />
              </ScrollView>
            )}
          </ScrollView>
        )}

        <TouchableOpacity
          style={[
            styles.button,
            {
              position: "absolute",
              alignSelf: "baseline",
              zIndex: 1,
              right: 15,
              bottom: 100,
            },
          ]}
        >
          <FontAwesome
            name="pencil"
            size={30}
            color="white"
            onPress={() => setModal(true)}
          />
        </TouchableOpacity>
        <NoteInput
          visible={modal}
          onClose={() => setModal(false)}
          onSubmit={onSubmit}
        />
      </SafeAreaView>
    </ImageBackground>
  );
};

export default NoteScreen;

const styles = StyleSheet.create({
  searchBox: {
    flexDirection: "row",
    marginVertical: 30,
    marginHorizontal: 10,
    paddingHorizontal: 20,
    borderRadius: 30,
    backgroundColor: "#7D93AE",
    justifyContent: "space-around",
  },
  inputBox: {
    width: 220,
    height: 50,
    fontSize: 15,
  },
  GreetText: {
    fontSize: 18,
    fontWeight: "bold",
    alignSelf: "center",
    fontStyle: "italic",
    color: "#D2796C",
  },
  emptyContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
  },
  button: {
    width: 60,
    backgroundColor: "#72B2C9",
    height: 60,
    borderRadius: 30,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 30,
    zIndex: 1,
  },
  CategoryBox: {
    width: 320,
    height: 60,
    fontSize: 17,
    marginTop: 20,
    paddingHorizontal: 20,
    borderRadius: 30,
    backgroundColor: "#7D93AE",
    color: "#7D93AE",
    opacity: 0.5,
  },
});
