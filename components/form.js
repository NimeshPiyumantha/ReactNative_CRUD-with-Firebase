import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  FlatList,
} from "react-native";
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

  const deleteData = async () => {
    deleteDoc(doc(db, "users", id))
      .then(() => {
        console.log("Successfully Delete");
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
      setData(users);
      console.log("Document data: ", users);
    });
  };

  const renderItem = ({ item }) => (
    <View style={styles.row}>
      <Text style={styles.cell}>{item.id}</Text>
      <Text style={styles.cell}>{item.name}</Text>
      <Text style={styles.cell}>{item.email}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.text}>User</Text>
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
      <Button
        title="Add"
        color="#2ed573"
        style={styles.button}
        onPress={addData}
      />
      <Button
        title="Update"
        color="#ffa502"
        style={styles.button}
        onPress={updateData}
      />
      <Button
        title="Delete"
        color="#ff4757"
        style={styles.button}
        onPress={deleteData}
      />
      <Text style={styles.text}>Users Data Load</Text>
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerText}>ID</Text>
          <Text style={styles.headerText}>Name</Text>
          <Text style={styles.headerText}>Age</Text>
        </View>
        <FlatList
          data={data}
          renderItem={renderItem}
          keyExtractor={(item) => item.id.toString()}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    margin: 15,
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
    borderRadius: 8,
    padding: 10,
    margin: 20,
  },
  text: {
    fontSize: 20,
    margin: 20,
    textAlign: "center",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  headerText: {
    fontWeight: "bold",
    flex: 1,
    textAlign: "center",
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  cell: {
    flex: 1,
    textAlign: "center",
  },
});

export default Form;
