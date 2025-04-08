import React from "react";
import { View, Text, ImageBackground, StyleSheet, TouchableOpacity } from "react-native";

export default function WelcomeScreen({ navigation }) {
  return (
    <ImageBackground source={require("../../assets/background.png")} style={styles.background}>
      <View style={styles.overlay}>
        <Text style={styles.title}>O app que equilibra sua alimentação!</Text>

        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate("Login")}>
          <Text style={styles.buttonText}>Fazer Login</Text>
        </TouchableOpacity>

        <TouchableOpacity style={[styles.button, styles.registerButton]} onPress={() => navigation.navigate("Register")}>
          <Text style={styles.buttonText}>Registre-se</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center",
  },
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)", // Adiciona um efeito escuro
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 48,
    fontWeight: "400",
    color: "white",
    textAlign: "start",
    marginBottom: 40,
  },
  button: {
    backgroundColor: "rgba(255,255,255,0.2)",
    padding: 15,
    width: "80%",
    alignItems: "center",
    borderTopLeftRadius: 12,
    borderTopRightRadius: 2,
    borderBottomLeftRadius: 2,
    borderBottomRightRadius: 10,
    marginBottom: 15,
  },
  buttonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
  registerButton: {
    backgroundColor: "green",
  },
});
