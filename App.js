import { StatusBar } from "expo-status-bar";
import Home from "./screens/Home";
import UserForm from "./screens/UserForm";
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
            component={UserForm}
            options={{ title: "User Screen" }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
}
