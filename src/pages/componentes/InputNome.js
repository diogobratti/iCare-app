import React from 'react';
import {Input, Icon} from 'react-native-elements';

const InputNome = (props) => {
  const { onChangeText, children } = props;

  return (
    <Input
      label="Qual é o seu nome completo?"
      placeholder="ex: Fulano da Silva"
      leftIcon={<Icon name="user" type="antdesign" size={24} color="#007aff" />}
      errorMessage="Digite o nome completo"
      onChangeText={onChangeText}
    />
  );
};

export default InputNome;
