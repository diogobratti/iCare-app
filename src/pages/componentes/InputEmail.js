import React from 'react';
import {Input, Icon} from 'react-native-elements';

const InputEmail = (props) => {
  const { onChangeText, value, children } = props;

  return (
    <Input
      label="Qual é o seu e-mail de contato?"
      placeholder="ex: fulano@gmail.com"
      leftIcon={<Icon name="mail" type="antdesign" size={24} color="#007aff" />}
      errorMessage="Digite um e-mail válido"
      onChangeText={onChangeText}
      value={value}
    />
  );
};

export default InputEmail;
