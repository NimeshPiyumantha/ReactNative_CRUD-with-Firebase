import React from "react";
import {
  StyleSheet,
  Button,
  View,
  SafeAreaView,
  Text,
  Alert,
} from "react-native";

const Home = ({ navigation }) => {
  const onPressUser = () => {
    navigation.navigate("UserForm");
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.fixToButton}>
        <Button
          title="User Manage"
          onPress={onPressUser}
          color="#841584"
        />
        <Button
          title="Item Manage"
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
