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
    fetchFirestoreData();
  }, []);

  const addDataToFirestore = async () => {
    // await firestore().collection("users").add({
    //   name: name,
    //   email: email,
    // });
    // console.log(name);
    // console.log(email);
    // // Clear input fields and fetch updated data
    // setName("");
    // setEmail("");
    // fetchFirestoreData();
  };

  const fetchFirestoreData = async () => {
  getDoc(doc(db,"users",'ZIOKy0kLoZBySfpKHrPj')).then(docData=>{
    if(docData.exists()){
      console.log(docData.data());
    }else{}
  }).catch((error)=>{
    console.log(error);
  })
};


  return (
    <View style={styles.container}>
      <Text>Users:</Text>
      {data.map((user) => (
        <View key={user.id}>
          <Text>Name: {user.name}</Text>
          <Text>Email: {user.email}</Text>
          <Button title="Delete" onPress={() => deleteDataFromFirestore()} />
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
      <Button title="Add" onPress={addDataToFirestore} />
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
