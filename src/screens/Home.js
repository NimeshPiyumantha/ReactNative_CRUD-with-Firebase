import React from "react";
import {
  StyleSheet,
  View,
  SafeAreaView,
  Alert,
  Image,
} from "react-native";
import Button from "../components/Button";
import { StatusBar } from "expo-status-bar";

const Home = ({ navigation }) => {
  const onPressUser = () => {
    navigation.navigate("UserForm");
  };

  return (
    <View style={styles.container1}>
      <StatusBar style="light" />
      <Image
        blurRadius={70}
        source={require("../assets/images/bg.png")}
        style={styles.imageContainer}
      />
      <SafeAreaView style={styles.container}>
        <View style={styles.fixToButton}>
          <Button onPress={onPressUser} color="#841584" title="User Manage" />
          <Button
            title="Item Manage"
            color="#841524"
            onPress={() => Alert.alert("Right button pressed")}
          />
        </View>
      </SafeAreaView>
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
  },
  container: {
    marginVertical: 30,
    justifyContent: "center",
    marginHorizontal: 16,
  },
  title: {
    textAlign: "center",
    marginVertical: 8,
  },
  fixToButton: {
    flexDirection: "column",
    gap: 10,
    justifyContent: "space-around",
  },
});

export default Home;
