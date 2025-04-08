import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ImageBackground,
  Alert,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { KeyboardAvoidingView, Platform, ScrollView } from "react-native";


export default function RegisterScreen() {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const navigation = useNavigation();

  const handleRegister = () => {
    if (nome && email && senha) {
      Alert.alert("Cadastro realizado com sucesso!");
      navigation.replace("Login");
    } else {
      Alert.alert("Preencha todos os campos.");
    }
  };

  return (
    <ImageBackground
    source={require("../../assets/background.png")}
    style={styles.background}
  >
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1 }}
    >
      <ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps="handled">
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="white" />
        </TouchableOpacity>
  
        <View style={styles.loginBox}>
          <Ionicons name="restaurant" size={40} color="#28a745" style={{ marginBottom: 15 }} />
          <Text style={styles.title}>Registre-se</Text>
          <Text style={styles.subtitle}>Crie sua conta agora</Text>
  
          <TextInput
            style={styles.input}
            placeholder="Nome"
            value={nome}
            onChangeText={setNome}
          />
          <TextInput
            style={styles.input}
            placeholder="E-mail"
            keyboardType="email-address"
            value={email}
            onChangeText={setEmail}
          />
          <TextInput
            style={styles.input}
            placeholder="Senha"
            secureTextEntry
            value={senha}
            onChangeText={setSenha}
          />
  
          <TouchableOpacity style={styles.button} onPress={handleRegister}>
            <Text style={styles.buttonText}>Registre-se</Text>
          </TouchableOpacity>
  
          <Text style={styles.createAccount}>
            Já possui conta?{" "}
            <Text style={styles.createAccountLink} onPress={() => navigation.navigate("Login")}>
              Entrar agora!
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
    alignItems: "center",
    justifyContent: "center",
  },
  backButton: {
    position: "absolute",
    top: 50,
    left: 20,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    padding: 10,
    borderRadius: 50,
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
    marginTop: 100,
    marginBottom: 40,
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
    borderBottomRightRadius: 12,
    paddingHorizontal: 12,
    marginBottom: 20,
    backgroundColor: "#f9f9f9",
  },
  button: {
    backgroundColor: "#28a745",
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
    color: "#28a745",
    fontWeight: "bold",
  },
});
