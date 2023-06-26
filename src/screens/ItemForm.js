import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  FlatList,
  Alert,
  Image,
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
import { db } from "../components/config";
import Button from "../components/Button";
import { StatusBar } from "expo-status-bar";

const ItemForm = () => {
  const [data, setData] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [qty, setQty] = useState("");

  useEffect(() => {
    loadAllData();
  }, []);

  const addData = async () => {
    setDoc(doc(db, "items", id), { name: name, qty: qty })
      .then(() => {
        Alert.alert("Successfully Add..!");
      })
      .catch((error) => {
        Alert.alert(error);
      });

    clear();
    loadAllData();
  };

  const clear = async () => {
    setId("");
    setName("");
    setQty("");
    setSearchText("");
  };

  const loadAllData = async () => {
    getDocs(collection(db, "items")).then((docSnap) => {
      let items = [];
      docSnap.forEach((doc) => {
        items.push({ ...doc.data(), id: doc.id });
      });
      setData(items);
    });
  };

  const searchById = async () => {
    getDoc(doc(db, "items", searchText))
      .then((docData) => {
        if (docData.exists()) {
          setId(searchText);
          setName(docData.data().name);
          setQty(docData.data().qty);
        } else {
          Alert.alert("Empty Data..!");
        }
      })
      .catch((error) => {
        Alert.alert(error);
      });
  };


  const renderItem = ({ item }) => (
    <View style={styles.row}>
      <Text style={styles.cell}>{item.id}</Text>
      <Text style={styles.cell}>{item.name}</Text>
      <Text style={styles.cell}>{item.qty}</Text>
    </View>
  );
  return (
    <View style={styles.container1}>
      <StatusBar style="light" />
      <Image
        blurRadius={70}
        source={require("../assets/images/bg.png")}
        style={styles.imageContainer}
      />
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
            placeholder="Qty"
            value={qty}
            onChangeText={(text) => setQty(text)}
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
            <Text style={styles.headerCell}>Qty</Text>
          </View>
          <FlatList
            data={data}
            renderItem={renderItem}
            keyExtractor={(item) => item.id.toString()}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container1: {
    flex: 1,
    position: "relative",
  },
  imageContainer: {
    position: "absolute",
    width: "100%",
    height: "100%",
    opacity: 0.5,
  },
  container: {
    flex: 1,
    marginVertical: 30,
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
    borderColor: "#2c3e50",
    borderWidth: 1.5,
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
    borderBottomColor: "#2c3e50",
    paddingVertical: 10,
    paddingHorizontal: 5,
  },
  cell: {
    flex: 1,
    textAlign: "center",
    fontSize: 15,
  },
});

export default ItemForm;
