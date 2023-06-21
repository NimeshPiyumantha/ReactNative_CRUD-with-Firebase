import React, { useState } from "react";
import { View, TextInput, Button, StyleSheet } from "react-native";

const Form = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  // Add more state variables for other form fields if needed

  const handleInputChange = (inputName, inputValue) => {
    if (inputName === "name") {
      setName(inputValue);
    } else if (inputName === "email") {
      setEmail(inputValue);
    }
  };

  const handleSubmit = () => {
    // Handle form submission
    console.log("Name:", name);
    console.log("Email:", email);
    // Add code to send data to server or perform other operations
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Name"
        value={name}
        onChangeText={(value) => handleInputChange("name", value)}
      />
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={(value) => handleInputChange("email", value)}
      />

      {/* Add more TextInput components for other form fields if needed */}
      <Button title="Submit" onPress={handleSubmit} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    justifyContent: "center",
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 12,
    paddingHorizontal: 8,
  },
});

export default Form;
