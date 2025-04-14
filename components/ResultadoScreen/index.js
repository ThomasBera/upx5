import React from "react";
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

// Componente principal da tela de resultado
export default function ResultadoScreen({ route }) {
  const navigation = useNavigation();
  const { peso, alimentoSelecionado, tipoSelecionado } = route.params;

  const calorias = peso
    ? (
        parseFloat(peso) *
        (alimentoSelecionado?.foodNutrients?.find(nutrient => nutrient.nutrientName === 'Energy')?.value || 0) / 100
      ).toFixed(2)
    : "0.00";

  return (
    <SafeAreaView style={styles.container}>
      {/* Topo Verde com seta de voltar */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={28} color="white" />
        </TouchableOpacity>
      </View>

      {/* Conteúdo principal */}
      <View style={styles.content}>
        <Text style={styles.title}>Pesagem do alimento</Text>

        <View style={styles.infoBox}>
          <Text style={styles.infoLabel}>Alimento:</Text>
          <Text style={styles.infoValue}>{alimentoSelecionado?.description}</Text>
        </View>

        <View style={styles.infoBox}>
          <Text style={styles.infoLabel}>Tipo:</Text>
          <Text style={styles.infoValue}>{tipoSelecionado || "Não especificado"}</Text>
        </View>

        <Text style={styles.calorias}>{calorias} kcal</Text>

        {/* Medidor novo */}
        <NivelDePeso peso={parseFloat(peso)} pesoMaximo={200} />
      </View>
    </SafeAreaView>
  );
}

// Estilos da tela
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8F8F8",
  },
  header: {
    backgroundColor: "#1F8B24",
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 15,
  },
  content: {
    flex: 1,
    alignItems: "center",
    padding: 20,
  },
  title: {
    fontSize: 22,
    color: "#1F8B24",
    fontWeight: "bold",
    marginBottom: 30,
  },
  infoBox: {
    backgroundColor: "#E5E5E5",
    borderTopLeftRadius: 12,
    borderTopRightRadius: 2,
    borderBottomLeftRadius: 2,
    borderBottomRightRadius: 12,
    paddingHorizontal: 20,
    paddingVertical: 12,
    marginVertical: 8,
    width: "100%",
  },
  infoLabel: {
    color: "#555",
    fontWeight: "600",
    fontSize: 14,
  },
  infoValue: {
    color: "#000",
    fontSize: 16,
    fontWeight: "bold",
  },
  calorias: {
    marginTop: 30,
    fontSize: 24,
    color: "#1F8B24",
    fontWeight: "bold",
  },
});

// Componente de medidor visual do peso
function NivelDePeso({ peso, pesoMaximo = 200 }) {
  const porcentagem = Math.min((peso / pesoMaximo) * 100, 100);

  return (
    <View style={nivelStyles.container}>
      <View style={nivelStyles.arcContainer}>
        <View style={nivelStyles.arc}>
          <View style={[nivelStyles.fill, { width: `${porcentagem}%` }]} />
        </View>
      </View>
      <Text style={nivelStyles.label}>Peso: {peso}g</Text>
    </View>
  );
}

// Estilo do componente NivelDePeso
const nivelStyles = StyleSheet.create({
  container: {
    marginTop: 40,
    alignItems: "center",
  },
  arcContainer: {
    width: 160,
    height: 80,
    overflow: "hidden",
  },
  arc: {
    width: "100%",
    height: 160,
    borderRadius: 80,
    borderWidth: 12,
    borderColor: "#1F8B24",
    backgroundColor: "#EE8E8",
    position: "relative",
    transform: [{ rotate: "180deg" }],
  },
  fill: {
    position: "absolute",
    bottom: 0,
    left: 0,
    height: "100%",
    backgroundColor: "#1F8B24",
  },
  label: {
    marginTop: 10,
    fontSize: 18,
    fontWeight: "bold",
    color: "#1F8B24",
  },
});
