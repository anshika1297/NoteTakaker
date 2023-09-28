import {
  StyleSheet,
  SafeAreaView,
  Text,
  Dimensions,
  TouchableOpacity,
  ImageBackground,
  View,
} from "react-native";
import React from "react";
import NoteDetail from "./NoteDetail";
const { width } = Dimensions.get("window");

const SingleNote = ({ item, setNotesData }) => {
  const [openEdit, setOpenEdit] = React.useState(false);
  return (
    <SafeAreaView style={{ width: "100%", padding: 3 }}>
      <ImageBackground
        source={{
          uri: "https://pub-static.fotor.com/assets/bg/91943916-cf00-4529-8ed4-3e47304cea73.jpg",
        }}
        style={{ width: "100%", height: 80 }}
      >
        <TouchableOpacity
          onPress={() => setOpenEdit(true)}
          style={{
            padding: 5,
            width: "95%",
            height: 120,
            paddingVertical: 10,
            opacity: 1,
            borderColor: "#7D93AE",
          }}
        >
          <Text
            numberOfLines={2}
            style={{ paddingTop: 20, paddingLeft: 10, fontSize: 15 }}
          >
            {item.noteDesc}
          </Text>
        </TouchableOpacity>
      </ImageBackground>
      <View
        style={{
          paddingTop: 5,
          paddingBottom: 10,
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <View>
          <Text numberOfLines={1} style={{ fontSize: 16, fontWeight: "bold" }}>
            {item.title}
          </Text>
        </View>
        <View style={{ flexDirection: "row", paddingVertical: 3 }}>
          <Text style={{ fontSize: 12, color: "#7D93AE" }}>{item.date}, </Text>
          <Text style={{ fontSize: 12, color: "#7D93AE" }}>{item.time}</Text>
        </View>
      </View>
      <NoteDetail
        visible={openEdit}
        item={item}
        onClose={() => setOpenEdit(false)}
        setNotesData={setNotesData}
      />
    </SafeAreaView>
  );
};

export default SingleNote;

const styles = StyleSheet.create({});
