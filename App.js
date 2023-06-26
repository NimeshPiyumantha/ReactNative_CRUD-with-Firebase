import { StatusBar } from "expo-status-bar";
import Home from "./screens/Home";
import UserForm from "./screens/UserForm";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { View, Image } from "react-native";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <>
      <View className="flex-1 relative">
        <StatusBar style="light"></StatusBar>
        <Image
          blurRadius={70}
          source={require("./assets/bg.png")}
          className="absolute w-full h-full"
        />
      </View>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="Dashboard"
          screenOptions={{
            headerStyle: { backgroundColor: "#351f44" },
            headerTintColor: "#fff",
            headerTitleStyle: { fontWeight: "bold" },
            contentStyle: { backgroundColor: "rgba(255,255,255,0.2)" },
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
