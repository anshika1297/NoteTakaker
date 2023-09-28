// CategorySelector.js
import React, { useState } from "react";
import { Modal, Text, TouchableOpacity, View, StyleSheet } from "react-native";

const CategorySelector = ({
  selectedCategory,
  onCategoryChange,
  categories,
  isVisible,
  toggleModal,
}) => {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={isVisible}
      onRequestClose={toggleModal}
    >
      <View style={styles.categoryModal}>
        {categories.map((category) => (
          <TouchableOpacity
            key={category}
            onPress={() => {
              onCategoryChange(category);
              toggleModal();
            }}
          >
            <Text style={styles.categoryOption}>{category}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  categoryModal: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
  },
  categoryOption: {
    padding: 10,
  },
});

export default CategorySelector;
