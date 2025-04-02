import React, { useState, useEffect } from "react";
import { View, Text, TextInput, StyleSheet, TouchableOpacity } from "react-native";
import { Picker } from '@react-native-picker/picker';

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

export default function MainScreen({ navigation }) {
  const [alimentos, setAlimentos] = useState([]); // Estado para armazenar alimentos
  const [alimentoSelecionado, setAlimentoSelecionado] = useState(null); // Estado para o alimento selecionado
  const [peso, setPeso] = useState("");
  const [loading, setLoading] = useState(false);

  // Requisição à API da USDA
  useEffect(() => {
    const fetchAlimentos = async () => {
      setLoading(true);
      try {
        const alimentosDeBusca = alimentosComunsAlmocoJantarEmIngles.map(async (alimento) => {
          const response = await fetch(`https://api.nal.usda.gov/fdc/v1/foods/search?query=${alimento}&api_key=${API_KEY}`);
          const data = await response.json();
          return data.foods || [];
        });

        // Espera todas as requisições finalizarem e atualiza o estado com os resultados
        const alimentosResultados = await Promise.all(alimentosDeBusca);
        const todosAlimentos = alimentosResultados.flat();
        setAlimentos(todosAlimentos); // Atualiza o estado com todos os alimentos encontrados
        if (todosAlimentos.length > 0) {
          setAlimentoSelecionado(todosAlimentos[0]); // Seleciona o primeiro alimento por padrão
        }
      } catch (error) {
        console.error('Erro ao buscar alimentos:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchAlimentos();
  }, []);

  // Calcular calorias totais (ajustado para 100g)
  const caloriasTotais = peso ? (
    parseFloat(peso) *
    (alimentoSelecionado?.foodNutrients?.find(nutrient => nutrient.nutrientName === 'Energy')?.value || 0) / 100
  ).toFixed(2) : "0.00";

  // Função para voltar à tela de login
  const voltarParaLogin = () => {
    navigation.reset({
      index: 0,
      routes: [{ name: 'Login' }],  // Corrigido para 'Login', que é o nome da tela de login
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Selecione um alimento:</Text>
      
      {/* Verifica se os alimentos estão sendo carregados */}
      {loading ? (
        <Text>Carregando alimentos...</Text>
      ) : (
        <Picker
          selectedValue={alimentoSelecionado}
          style={styles.picker}
          onValueChange={(itemValue) => setAlimentoSelecionado(itemValue)}
        >
          {alimentos.map((alimento, index) => (
            <Picker.Item key={index} label={alimento.description} value={alimento} />
          ))}
        </Picker>
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

      {/* Botão de Voltar */}
      <TouchableOpacity style={styles.voltarButton} onPress={voltarParaLogin}>
        <Text style={styles.voltarButtonText}>Voltar</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f5f5f5",
    padding: 20,
  },
  label: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
  },
  picker: {
    width: "80%",
    height: 50,
    marginBottom: 20,
    backgroundColor: "#fff",
  },
  input: {
    width: "80%",
    height: 50,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
    paddingHorizontal: 10,
    backgroundColor: "#fff",
    marginBottom: 20,
    textAlign: "center",
  },
  resultado: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#007bff",
  },
  voltarButton: {
    backgroundColor: "#007bff",
    paddingVertical: 12,
    paddingHorizontal: 40,
    borderRadius: 10,
    marginTop: 20,
  },
  voltarButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});
