import React from "react";
import Home from "../screens/Home";
import UserForm from "../screens/UserForm";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { LogBox } from "react-native";

const Stack = createNativeStackNavigator();

LogBox.ignoreLogs([
  "Non-serializable values were found in the navigation state",
]);

export default function AppNavigation() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Dashboard"
        screenOptions={{
          headerStyle: { backgroundColor: "#351f44" },
          headerTintColor: "#fff",
          headerTitleStyle: { fontWeight: "bold" },
          contentStyle: { backgroundColor: "#f1f2f6" },
        }}
      >
        <Stack.Screen
          name="HomeForm"
          component={Home}
          options={{ title: "Home Screen" }}
        />
        <Stack.Screen
          name="UserForm"
          component={UserForm}
          options={{ title: "User Screen" }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
