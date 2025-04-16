import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import Svg, { Circle } from "react-native-svg";

const TOKEN = 'fph0B4WXiwJ_exOYSrSwM4_VlYaGYGBy';
const VIRTUAL_PIN = 'V0';

export default function ResultadoScreen({ route }) {
  const navigation = useNavigation();
  const { alimentoSelecionado, tipoSelecionado } = route.params;

  const [peso, setPeso] = useState(0);
  const [calorias, setCalorias] = useState("0.00");
  const [errorPeso, setErrorPeso] = useState(null);

  const getPeso = async () => {
    setErrorPeso(null);
    try {
      const response = await fetch(`https://blynk.cloud/external/api/get?token=${TOKEN}&${VIRTUAL_PIN}`);
      console.log("Resposta da API:", response);
      if (!response.ok) {
        throw new Error(`Erro HTTP! status: ${response.status}`);
      }
      const data = await response.text();
      console.log("Dados recebidos:", data);
      const pesoAtual = parseFloat(data);
      console.log("Peso após parseFloat:", pesoAtual);
      if (isNaN(pesoAtual)) {
        throw new Error("Recebido dado não numérico do Blynk.");
      }
      setPeso(pesoAtual);

      const energyNutrient = alimentoSelecionado?.foodNutrients?.find(n => n.nutrientName === 'Energy');
      const caloriasCalculadas = (
        pesoAtual * (energyNutrient?.value || 0) / 100
      ).toFixed(2);
      setCalorias(caloriasCalculadas);
    } catch (error) {
      console.log("Erro ao buscar peso:", error);
      setErrorPeso(error.message);
      setPeso(0);
      setCalorias("0.00");
    }
  };

  useEffect(() => {
    getPeso();

    const interval = setInterval(() => {
      getPeso();
    }, 2000);

    return () => clearInterval(interval);
  }, [alimentoSelecionado]);

  useEffect(() => {
    console.log("Estado do peso:", peso);
  }, [peso]);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={28} color="white" />
        </TouchableOpacity>
      </View>

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

        {errorPeso ? (
          <Text style={{ color: 'red' }}>Erro ao buscar peso: {errorPeso}</Text>
        ) : (
          <Text style={styles.calorias}>{calorias} kcal</Text>
        )}

        <MedidorSemiCircular peso={peso} pesoMaximo={200} />
      </View>
    </SafeAreaView>
  );
}

function MedidorSemiCircular({ peso, pesoMaximo }) {
  const raio = 100;
  const circunferencia = Math.PI * raio;
  const progresso = Math.min(peso / pesoMaximo, 1);

  return (
    <View style={gaugeStyles.container}>
      <Svg width={220} height={110}>
        <Circle
          cx="110"
          cy="110"
          r={raio}
          stroke="#D9D9D9"
          strokeWidth="20"
          fill="none"
          strokeDasharray={`${circunferencia}`}
          strokeDashoffset={circunferencia / 2}
          strokeLinecap="round"
        />
        <Circle
          cx="110"
          cy="110"
          r={raio}
          stroke="#1F8B24"
          strokeWidth="20"
          fill="none"
          strokeDasharray={`${circunferencia}`}
          strokeDashoffset={circunferencia * (1 - progresso) + circunferencia / 2}
          strokeLinecap="round"
        />
      </Svg>
      <Text style={gaugeStyles.text}>{peso.toFixed(2)}g</Text>
    </View>
  );
}

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
    borderRadius: 12,
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

const gaugeStyles = StyleSheet.create({
  container: {
    marginTop: 30,
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    marginTop: 10,
    fontSize: 18,
    fontWeight: "bold",
    color: "#1F8B24",
    position: "absolute",
    top: 55,
  },
});