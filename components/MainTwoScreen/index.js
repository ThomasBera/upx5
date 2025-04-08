import React, { useState, useEffect } from "react";
import { View, Text, TextInput, StyleSheet, TouchableOpacity } from "react-native";
import { Picker } from '@react-native-picker/picker';
import RNPickerSelect from 'react-native-picker-select';
import { ActivityIndicator } from 'react-native';
const API_KEY = '1FyQcozyrNfTDHicCnfGPziSJubBADH61ojuyG5g'; // Substitua com sua chave de API da USDA

const alimentosComunsAlmocoJantarEmIngles = [
  'Dirty Rice', 'Beans', 'Chicken', 'Beef', 'Fish', 'Potato', 'Carrot', 'Lettuce', 'Tomato',
  'Zucchini', 'Eggplant', 'Cauliflower', 'Broccoli', 'Spinach', 'Pumpkin', 'Vegetable soup',
  'Fruit salad', 'Pasta', 'Steak', 'Pork ribs', 'Grilled chicken', 'Roast chicken',
  'Grilled fish', 'Fried fish', 'Meatballs', 'Beef stroganoff', 'Chicken stroganoff',
  'Black beans', 'Carioca beans', 'Brown rice', 'Sweet potato', 'Farofa', 'Potato salad',
  'Chicken risotto', 'Shrimp risotto', 'Lasagna', 'Barbecue', 'Salmon', 'Tilapia', 'Sausage',
  'Kebab', 'Baked kibbeh', 'Green salad', 'Couscous', 'Egg farofa', 'Baked fish', 'Shrimp',
  'Chicken parmesan', 'Spaghetti', 'Polenta', 'Hidden meat', 'Pancake', 'Savory pie',
  'Sushi', 'Temaki', 'Maki', 'Chicken croquette', 'Cheese bread', 'Tapioca', 'Codfish',
  'Vegetable lasagna', 'Beef lasagna', 'Beef stew', 'Tropeiro beans', 'Carreteiro rice',
  'Baked fish', 'Pork meat', 'Green beans', 'Ground beef', 'Spaghetti', 'Gnocchi', 'Bean broth',
  'Vaca atolada', 'Rice with chicken', 'Rice with fish', 'Chili', 'Chicken soup', 'Meat and vegetable soup',
  'Pumpkin soup', 'Sun-dried beef', 'Mocotó', 'Bean mash', 'Breaded chicken', 'Breaded steak',
  'Maminha (beef cut)', 'Pork loin', 'Chicken breast rice', 'Chickpeas', 'Lamb meat', 'White beans',
  'Cannelloni', 'Bacalhau à Brás', 'Grilled fish with vegetables', 'Chili with meat', 'Picanha (beef cut)',
  'Rice with beef', 'Hidden beef', 'Hidden chicken', 'Chicken pie', 'Beef pie', 'Codfish with cream',
  'Mixed beans', 'Roast beef', 'Chicken with okra', 'Ground beef rice', 'Feijoada', 'Mocotó with beans',
  'Rice with lentils', 'Rice with vegetables', 'Rice with shrimp', 'Fish with rice', 'Chicken hidden'
];

export default function MainTwoScreen({ navigation }) {
  const [alimentos, setAlimentos] = useState([]);
  const [alimentoSelecionado, setAlimentoSelecionado] = useState(null);
  const [peso, setPeso] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchAlimentos = async () => {
      setLoading(true);
      try {
        const alimentosDeBusca = alimentosComunsAlmocoJantarEmIngles.map(async (alimento) => {
          const response = await fetch(`https://api.nal.usda.gov/fdc/v1/foods/search?query=${alimento}&api_key=${API_KEY}`);
          const data = await response.json();
          return data.foods || [];
        });

        const alimentosResultados = await Promise.all(alimentosDeBusca);
        const todosAlimentos = alimentosResultados.flat();
        setAlimentos(todosAlimentos);
        if (todosAlimentos.length > 0) {
          setAlimentoSelecionado(todosAlimentos[0]);
        }
      } catch (error) {
        console.error('Erro ao buscar alimentos:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchAlimentos();
  }, []);

  const caloriasTotais = peso ? (
    parseFloat(peso) *
    (alimentoSelecionado?.foodNutrients?.find(nutrient => nutrient.nutrientName === 'Energy')?.value || 0) / 100
  ).toFixed(2) : "0.00";

  const voltarParaLogin = () => {
    navigation.reset({
      index: 0,
      routes: [{ name: 'Login' }],
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Selecione um alimento:</Text>

      {loading ? (
        <ActivityIndicator size="large" color="#1F8B24" />
      ) : (
        <View style={styles.pickerWrapper}>
          <RNPickerSelect
            onValueChange={(value) => setAlimentoSelecionado(value)}
            items={alimentos.map((alimento) => ({
              label: alimento.description,
              value: alimento,
            }))}
            placeholder={{ label: "Selecione um alimento...", value: null }}
            value={alimentoSelecionado}
            style={pickerSelectStyles}
          />
        </View>
      )}

      <Text style={styles.label}>Peso (g):</Text>
      <TextInput
        style={styles.input}
        keyboardType="numeric"
        placeholder="Digite o peso em gramas"
        value={peso}
        onChangeText={setPeso}
      />

      <Text style={styles.resultado}>Total de calorias: {caloriasTotais} kcal</Text>

      <TouchableOpacity style={styles.voltarButton} onPress={voltarParaLogin}>
        <Text style={styles.voltarButtonText}>Pesar Agora!</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8F8F8",
    padding: 20,
    paddingTop: 60,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 2,
    borderBottomLeftRadius: 2,
    borderBottomRightRadius: 12,
    alignItems: "center",
  },
  label: {
    fontSize: 20,
    color: "#1F8B24",
    fontWeight: "bold",
    marginBottom: 15,
    textAlign: "center",
  },
  pickerWrapper: {
    width: "100%",
    backgroundColor: "#E5E5E5",
    borderTopLeftRadius: 12,
    borderTopRightRadius: 2,
    borderBottomLeftRadius: 2,
    borderBottomRightRadius: 12,
    paddingHorizontal: 10,
    marginBottom: 20,
  },
  input: {
    width: "100%",
    height: 50,
    backgroundColor: "#E5E5E5",
    borderTopLeftRadius: 12,
    borderTopRightRadius: 2,
    borderBottomLeftRadius: 2,
    borderBottomRightRadius: 12,
    paddingHorizontal: 15,
    marginBottom: 20,
    textAlign: "center",
  },
  resultado: {
    fontSize: 16,
    fontWeight: "600",
    color: "#1F8B24",
    marginTop: 10,
    textAlign: "center",
  },
  voltarButton: {
    backgroundColor: "#1F8B24",
    paddingVertical: 14,
    paddingHorizontal: 50,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 2,
    borderBottomLeftRadius: 2,
    borderBottomRightRadius: 12,
    marginTop: 20,
    width: "100%",
    alignItems: "center",
  },
  voltarButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});

const pickerSelectStyles = {
  inputIOS: {
    height: 50,
    fontSize: 16,
    paddingVertical: 12,
    paddingHorizontal: 10,
    color: "#000",
  },
  inputAndroid: {
    height: 50,
    fontSize: 16,
    paddingVertical: 12,
    paddingHorizontal: 10,
    color: "#000",
  },
};