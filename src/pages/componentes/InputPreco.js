import React from 'react';
import { View, Text } from 'react-native';
import { Input, Icon } from 'react-native-elements';
import { TextInputMask } from 'react-native-masked-text'

const InputPreco = (props) => {
  const { onChangeText, value, children } = props;

  return (
    <View>
      
      <Text>Quanto você cobra por turno (12 horas)?</Text>
      <TextInputMask
        type={"money"}
        options={{
          precision: 2,
          separator: ',',
          delimiter: '.',
          unit: 'R$',
          suffixUnit: ''
        }}
        label="Quanto você cobra por turno (12 horas)?"
        placeholder="ex: R$ 120,00"
        // leftIcon={<Icon name="user" type="antdesign" size={24} color="#007aff" />}
        errorMessage="Digite um valor numérico válido"
        onChangeText={onChangeText}
        value={value}
      />
    </View>
  );
};

export default InputPreco;
