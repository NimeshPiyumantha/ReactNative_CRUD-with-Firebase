import React, { useEffect, useState } from "react";
import { View, Text, TextInput, Button, StyleSheet } from "react-native";
import {
  collection,
  doc,
  setDoc,
  updateDoc,
  deleteDoc,
  getDoc,
  getDocs,
} from "firebase/firestore";
import { db } from "./config";

const Form = () => {
  const [data, setData] = useState([]);
  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  useEffect(() => {
    loadAllData();
  }, []);

  const addData = async () => {
    setDoc(doc(db, "users", id), { name: name, email: email })
      .then(() => {
        console.log("Successfully Add");
      })
      .catch((error) => {
        console.log(error);
      });

    clear();
    loadAllData();
  };

  const updateData = async () => {
    updateDoc(doc(db, "users", id), { name: name, email: email })
      .then(() => {
        console.log("Successfully Update");
      })
      .catch((error) => {
        console.log(error);
      });

    clear();
    loadAllData();
  };

  const clear = async () => {
    setId("");
    setName("");
    setEmail("");
  };

  const searchById = async () => {
    getDoc(doc(db, "users", "C001"))
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

  const loadAllData = async () => {
    getDocs(collection(db, "users")).then((docSnap) => {
      let users = [];
      docSnap.forEach((doc) => {
        users.push({ ...doc.data(), id: doc.id });
      });
      console.log("Document data: ", users);
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
        placeholder="ID"
        value={id}
        onChangeText={(text) => setId(text)}
      />
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
      <Button title="Add" style={styles.button} onPress={addData} />
      <Button title="Update" style={styles.button} onPress={updateData} />
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
  button: {
    marginTop: 12,
  },
});

export default Form;
