import React from 'react';
import {Input, Icon} from 'react-native-elements';

const InputPreco = (props) => {
  const { onChangeText, value, children } = props;

  return (
    <Input
      label="Quanto você cobra por turno (12 horas)?"
      placeholder="ex: R$ 120,00"
      // leftIcon={<Icon name="user" type="antdesign" size={24} color="#007aff" />}
      errorMessage="Digite um valor numérico válido"
      onChangeText={onChangeText}
      value={value}
    />
  );
};

export default InputPreco;
