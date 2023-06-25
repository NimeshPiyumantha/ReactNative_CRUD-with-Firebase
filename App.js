// import React from "react";
// import { View } from "react-native";
// import Home from "./screens/Home";

// const App = () => {
//   return (
//     <View style={{ flex: 1 }}>
//       <Home />
//     </View>
//   );
// };

// export default App;

import { StatusBar } from "expo-status-bar";
import Home from "./screens/Home";
import Form from "./components/form";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <>
      <StatusBar style="light"></StatusBar>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="Dashboard"
          screenOptions={{
            headerStyle: { backgroundColor: "#351f44" },
            headerTintColor: "#fff",
            headerTitleStyle: { fontWeight: "bold" },
            contentStyle: { backgroundColor: "#ecf0f1" },
          }}
        >
          <Stack.Screen
            name="HomeForm"
            component={Home}
            options={{ title: "Home Screen" }}
          />
          <Stack.Screen
            name="UserForm"
            component={Form}
            options={{ title: "User Screen" }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
}
