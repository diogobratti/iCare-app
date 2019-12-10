import React from 'react';
import {Input, Icon} from 'react-native-elements';

const InputTelefone = (props) => {
  const { onChangeText, children } = props;

  return (
    <Input
      label="Qual é o seu telefone de contato?"
      placeholder="ex: (00) 00000-0000"
      leftIcon={
        <Icon name="phone" type="antdesign" size={24} color="#007aff" />
      }
      errorMessage="Digite um número de telefone válido"
      onChangeText={onChangeText}
    />
  );
};

export default InputTelefone;
