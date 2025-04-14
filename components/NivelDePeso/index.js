import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Svg, { Path } from 'react-native-svg';

export default function NivelDePeso({ peso, pesoMaximo = 200 }) {
  const anguloMaximo = 180; // semicírculo
  const proporcao = Math.min(peso / pesoMaximo, 1);
  const anguloPreenchido = proporcao * anguloMaximo;
  const raio = 80;

  const corVerde = '#1F8B24';

  const createArc = (startAngle, sweepAngle, color) => {
    const startRadians = (Math.PI * startAngle) / 180;
    const endRadians = (Math.PI * (startAngle + sweepAngle)) / 180;

    const x1 = raio + raio * Math.cos(startRadians);
    const y1 = raio - raio * Math.sin(startRadians);

    const x2 = raio + raio * Math.cos(endRadians);
    const y2 = raio - raio * Math.sin(endRadians);

    const largeArcFlag = sweepAngle > 180 ? 1 : 0;

    return (
      <Path
        d={`M${x1},${y1} A${raio},${raio} 0 ${largeArcFlag} 1 ${x2},${y2}`}
        stroke={color}
        strokeWidth={15}
        fill="none"
      />
    );
  };

  return (
    <View style={styles.container}>
      <Svg width={raio * 2} height={raio + 20}>
        {/* Fundo branco */}
        {createArc(0, 180, '#EDEDED')}
        {/* Arco preenchido verde */}
        {createArc(0, anguloPreenchido, corVerde)}
      </Svg>
  
      <Text style={styles.label}>Peso:</Text>
      <Text style={styles.peso}>{peso}g</Text>
    </View>
  );
};  

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginTop: 20,
  },
  label: {
    fontSize: 18,
    color: '#A0A0A0',
    marginTop: -5,
  },
  peso: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#1F8B24',
  },
});
