import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Button,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  Dimensions,
  ImageBackground,
} from "react-native";
import {
  AntDesign,
  FontAwesome,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import CategorySelector from "../components/CategorySelector";

const { width } = Dimensions.get("window");
const NoteScreen = ({ navigation }) => {
  const [notes, setNotes] = useState([]);
  const [search, setSearch] = useState("");
  const [noSearch, setnoSearch] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [isCategoryModalVisible, setCategoryModalVisible] = useState(false);

  const toggleCategoryModal = () => {
    setCategoryModalVisible(!isCategoryModalVisible);
  };

  // Function to handle category selection
  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    fetchNotes();
  };

  // Function to fetch notes from AsyncStorage
  const fetchNotes = async () => {
    try {
      const savedNotes = await AsyncStorage.getItem("notes");
      if (savedNotes) {
        const parsedNotes = JSON.parse(savedNotes);
        console.log(selectedCategory);
        if (selectedCategory === "All") {
          console.log(parsedNotes);
          setNotes(parsedNotes);
        } else {
          const filteredNotes = selectedCategory
            ? parsedNotes.filter((note) => note.category === selectedCategory)
            : parsedNotes;
          console.log(filteredNotes);
          setNotes(filteredNotes);
        }
      }
    } catch (error) {
      console.error("Error fetching notes:", error);
    }
  };

  const handleOnSearch = (e) => {
    setnoSearch(false);
    setSearch(e);
    if (e.length === 0) {
      fetchNotes();
    }
    const searchNote = notes.filter((note) => {
      if (note.content.toLowerCase().includes(e.toLowerCase())) return note;
    });

    searchNote.length > 0 ? setNotes([...searchNote]) : setnoSearch(true);
  };

  // Fetch notes on component mount
  useEffect(() => {
    fetchNotes();
  }, []);

  // Function to delete a note by ID
  const deleteNote = async (id) => {
    try {
      const updatedNotes = notes.filter((note) => note.id !== id);
      await AsyncStorage.setItem("notes", JSON.stringify(updatedNotes));
      setNotes(updatedNotes);
    } catch (error) {
      console.error("Error deleting note:", error);
    }
  };

  return (
    <ImageBackground
      source={{
        uri: "https://imgv3.fotor.com/images/share/Free-blue-gradient-pattern-background-from-Fotor.jpg",
      }}
      style={{ width: width, height: "100%" }}
    >
      <View style={styles.container}>
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
                setNotes();
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
        {/* Category Selection Button */}
        <TouchableOpacity
          onPress={toggleCategoryModal}
          style={styles.categoryButton}
        >
          <Text
            style={{
              fontSize: 17,
              backgroundColor: "#F1EAB3",
              width: 250,
              height: 30,
              marginTop: 20,
              padding: 5,
              alignSelf: "center",
              textAlign: "center",
              color: "black",
            }}
          >
            filter By Category: {selectedCategory}{" "}
            <MaterialCommunityIcons
              name="arrow-down-drop-circle"
              size={20}
              color="black"
            />
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
            "All",
          ]}
        />

        <Text style={styles.header}> </Text>
        <FlatList
          data={notes}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.noteItem}
              onPress={() => navigation.navigate("NoteDetail", { note: item })}
            >
              <View>
                <Text style={{ fontWeight: "bold", fontSize: 15 }}>
                  {item.title}
                </Text>
                <View
                  style={{
                    flexDirection: "row",
                    opacity: 0.5,
                  }}
                >
                  <Text styles={{ opacity: 0.5, color: "#7D93AE" }}>
                    {item.date}
                    {", "}
                    {item.time}
                  </Text>
                </View>
                <Text>{item.content}</Text>
              </View>
              <TouchableOpacity onPress={() => deleteNote(item.id)}>
                <MaterialCommunityIcons
                  name="delete-circle-outline"
                  size={35}
                  color="red"
                />
              </TouchableOpacity>
            </TouchableOpacity>
          )}
        />
        <Button
          title="Create New Note"
          onPress={() => navigation.navigate("AddEditNote", { setNotes })}
        />
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
  noteItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
    padding: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    backgroundColor: "#F1EAB3",
    borderRadius: 5,
  },
});

export default NoteScreen;
