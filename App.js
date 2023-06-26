import { StatusBar } from "expo-status-bar";

import { View, Image } from "react-native";



export default function App() {
  return (
      <View className="flex-1 relative">
        <StatusBar style="light"></StatusBar>
        <Image
          blurRadius={70}
          source={require("./src/assets/images/bg.png")}
          className="absolute w-full h-full"
        />
      </View>
  );
}
