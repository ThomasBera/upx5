import React, { useState } from "react";
import {
  View, TextInput, TouchableOpacity, Text, Alert,
  StyleSheet, ImageBackground, KeyboardAvoidingView, ScrollView, Platform
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import Checkbox from "expo-checkbox";

export default function LoginScreen() {
  const [login, setLogin] = useState("");
  const [senha, setSenha] = useState("");
  const [lembrar, setLembrar] = useState(false);
  const navigation = useNavigation();

  const handleLogin = () => {
    if (login === "123" && senha === "123") {
      navigation.replace("MainTwo");
    } else {
      Alert.alert("Login ou senha incorretos!");
    }
  };

  return (
    <ImageBackground source={require("../../assets/background.png")} style={styles.background}>
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <ScrollView
          contentContainerStyle={{ flexGrow: 1, justifyContent: "center", alignItems: "center" }}
          keyboardShouldPersistTaps="handled"
        >
          <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
            <Ionicons name="arrow-back" size={24} color="white" />
          </TouchableOpacity>

          <View style={styles.loginBox}>
            <Ionicons name="restaurant" size={40} color="#28a745" style={{ marginBottom: 15 }} />
            <Text style={styles.title}>Bem-vindo(a)</Text>
            <Text style={styles.subtitle}>Entre na sua conta</Text>

            <TextInput
              style={styles.input}
              placeholder="E-mail"
              keyboardType="email-address"
              value={login}
              onChangeText={setLogin}
            />

            <TextInput
              style={styles.input}
              placeholder="Senha"
              secureTextEntry
              value={senha}
              onChangeText={setSenha}
            />

            <View style={styles.optionsContainer}>
              <View style={styles.rememberContainer}>
                <Checkbox
                  value={lembrar}
                  onValueChange={setLembrar}
                  color={lembrar ? "#009206" : undefined}
                  style={{ marginTop: 2 }}
                />
                <Text style={styles.rememberText}>Lembrar-me</Text>
              </View>

              <TouchableOpacity onPress={() => Alert.alert("Função de recuperação de senha ainda não implementada!")}>
                <Text style={styles.forgotPassword}>Esqueceu a senha?</Text>
              </TouchableOpacity>
            </View>

            <TouchableOpacity style={styles.button} onPress={handleLogin}>
              <Text style={styles.buttonText}>Fazer Login</Text>
            </TouchableOpacity>

            <Text style={styles.createAccount}>
              Ainda não tem uma conta?{" "}
              <Text
                style={styles.createAccountLink}
                onPress={() => navigation.navigate("Register")}
              >
                Crie uma agora!
              </Text>
            </Text>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center",
  },
  container: {
    flex: 1,
  },
  backButton: {
    position: "absolute",
    top: 50,
    left: 20,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    padding: 10,
    borderRadius: 50,
    zIndex: 2,
  },
  loginBox: {
    width: "90%",
    backgroundColor: "#f1f1f1",
    paddingVertical: 30,
    paddingHorizontal: 25,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
    justifyContent: "center",
    borderTopLeftRadius: 80,
    borderTopRightRadius: 8,
    borderBottomLeftRadius: 8,
    borderBottomRightRadius: 80,
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#28a745",
  },
  subtitle: {
    fontSize: 15,
    color: "#666",
    marginBottom: 25,
  },
  input: {
    width: "100%",
    height: 50,
    borderWidth: 1,
    borderColor: "#ccc",
    borderTopLeftRadius: 12,
    borderTopRightRadius: 2,
    borderBottomLeftRadius: 2,
    borderBottomRightRadius: 10,
    paddingHorizontal: 12,
    marginBottom: 20,
    backgroundColor: "#f9f9f9",
  },
  optionsContainer: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 25,
  },
  rememberContainer: {
    flexDirection: "row",
    alignItems: "center",
    height: 50,
    paddingVertical: 2,
    paddingHorizontal: 2,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 2,
    borderBottomLeftRadius: 2,
    borderBottomRightRadius: 10,
  },
  rememberText: {
    marginLeft: 10,
    fontSize: 14,
    color: "#333",
  },
  forgotPassword: {
    fontSize: 14,
    color: "#009206",
    fontWeight: "bold",
  },
  button: {
    backgroundColor: "#009206",
    paddingVertical: 14,
    paddingHorizontal: 40,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 2,
    borderBottomLeftRadius: 2,
    borderBottomRightRadius: 10,
    marginTop: 5,
    marginBottom: 20,
    width: "95%",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
  },
  createAccount: {
    marginTop: 10,
    fontSize: 14,
    color: "#333",
    textAlign: "center",
  },
  createAccountLink: {
    color: "#009206",
    fontWeight: "bold",
    textDecorationLine: "underline",
  },
});
