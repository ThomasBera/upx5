import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import WelcomeScreen from "./components/WelcomeScreen";
import RegisterScreen from "./components/RegisterScreen";
import LoginScreen from "./components/LoginScreen";
import ResultadoScreen from "./components/ResultadoScreen";
import MainTwoScreen from "./components/MainTwoScreen";
import { View, Text, StyleSheet } from "react-native";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Welcome">
        <Stack.Screen name="Welcome" component={WelcomeScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Resultado" component={ResultadoScreen} options={{ headerShown: false }} />
        <Stack.Screen name="MainTwo" component={MainTwoScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Register" component={RegisterScreen} options={{ headerShown: false }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  header: {
    justifyContent: "center",
    alignItems: "center",
    paddingTop: 40,
    paddingBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "black",
  },
});
