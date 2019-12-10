import React from 'react';
import {Input, Icon} from 'react-native-elements';

const InputCPF = (props) => {
  const { onChangeText, children } = props;

  return (
    <Input
      label="Qual é o seu número de CPF?"
      placeholder="ex: 000.000.000-00"
      leftIcon={
        <Icon name="idcard" type="antdesign" size={24} color="#007aff" />
      }
      errorMessage="Digite um CPF válido"
      onChangeText={onChangeText}
    />
  );
};

export default InputCPF;
