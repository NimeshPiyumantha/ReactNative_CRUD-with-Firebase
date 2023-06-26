import React from "react";
import { StyleSheet, View, SafeAreaView, Text, Alert } from "react-native";
import Button from "../components/Button";

const Home = ({ navigation }) => {
  const onPressUser = () => {
    navigation.navigate("UserForm");
  };

  return (
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
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
