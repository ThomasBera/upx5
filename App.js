import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginScreen from "./components/LoginScreen";
import MainScreen from "./components/MainScreen";
import { View, Text, StyleSheet } from "react-native";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <View style={styles.header}>
        <Text style={styles.title}>UPX5 - BALANÇA INTELIGENTE</Text>
      </View>

      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Main" component={MainScreen} options={{ title: "Calculadora de Calorias" }} />
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
