import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  FlatList,
  TouchableOpacity,
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
import Button from "./Button";

const Form = () => {
  const [data, setData] = useState([]);
  const [searchText, setSearchText] = useState("");
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
    setSearchText("");
  };

  const searchById = async () => {
    getDoc(doc(db, "users", searchText))
      .then((docData) => {
        if (docData.exists()) {
          setId(searchText);
          setName(docData.data().name);
          setEmail(docData.data().email);
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
      <View>
        <TextInput
          style={styles.input}
          value={searchText}
          onChangeText={(text) => setSearchText(text)}
          placeholder="Search Id"
          onSubmitEditing={searchById}
          returnKeyType="search" // Set the return key to "Search"
        />
      </View>
      <View style={styles.viewManage}>
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
      </View>

      <View style={styles.fixToButton}>
        <Button onPress={addData} color="#2ed573" title="Add" />
        <Button onPress={updateData} color="#ffa502" title="Update" />
        <Button onPress={deleteData} color="#ff4757" title="Delete" />
      </View>

      <View style={styles.container2}>
        <View style={styles.header}>
          <Text style={styles.headerCell}>ID</Text>
          <Text style={styles.headerCell}>Name</Text>
          <Text style={styles.headerCell}>Age</Text>
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
  viewManage: {
    margin: 20,
  },
  viewManage2: {
    justifyContent: "space-around",
    flexDirection: "row",
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 12,
    paddingHorizontal: 8,
    fontSize: 16,
    borderRadius: 10,
  },
  fixToButton: {
    flexDirection: "row",
    gap: 10,
    justifyContent: "center",
  },
  header: {
    flexDirection: "row",
    backgroundColor: "#e0e0e0",
    paddingVertical: 10,
    paddingHorizontal: 5,
    borderBottomWidth: 1,
    borderBottomColor: "#bdbdbd",
  },
  container2: {
    justifyContent: "center",
    flex: 1,
    paddingHorizontal: 10,
    paddingVertical: 5,
    marginTop: 15,
  },
  headerCell: {
    flex: 1,
    fontWeight: "bold",
    textAlign: "center",
    fontSize: 17,
  },
  row: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: "#bdbdbd",
    paddingVertical: 10,
    paddingHorizontal: 5,
  },
  cell: {
    flex: 1,
    textAlign: "center",
    fontSize: 15,
  },
});

export default Form;
