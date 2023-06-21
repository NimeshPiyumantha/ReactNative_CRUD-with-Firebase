import React, { useEffect, useState } from "react";
import { View, Text, TextInput, Button, StyleSheet } from "react-native";
import {
  collection,
  doc,
  setDoc,
  updateDoc,
  deleteDoc,
  getDoc,
} from "firebase/firestore";
import { db } from "./config";

const Form = () => {
  const [data, setData] = useState([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  useEffect(() => {
    // Fetch initial data from Firestore
    loadAllData();
  }, []);

  const addData = async () => {
    setDoc(doc(db, "users", "kd"), { name: name, email: email })
      .then(() => {
        console.log("Successfully");
      })
      .catch((error) => {
        console.log(error);
      });
    console.log(name);
    console.log(email);
    // // Clear input fields and fetch updated data
    setName("");
    setEmail("");
    loadAllData();
  };

  const loadAllData = async () => {
    getDoc(doc(db, "users", "ZIOKy0kLoZBySfpKHrPj"))
      .then((docData) => {
        if (docData.exists()) {
          console.log(docData.data());
        } else {
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <View style={styles.container}>
      <Text>Users:</Text>
      {data.map((user) => (
        <View key={user.id}>
          <Text>Name: {user.name}</Text>
          <Text>Email: {user.email}</Text>
          <Button title="Delete" onPress={() => deleteData()} />
        </View>
      ))}

      <Text>Add User:</Text>
      <TextInput
        style={styles.input}
        placeholder="Name"
        value={name}
        onChangeText={(text) => setName(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={(text) => setEmail(text)}
      />
      <Button title="Add" onPress={addData} />
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
