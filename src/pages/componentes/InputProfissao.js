import React from 'react';
import {Input, Icon} from 'react-native-elements';

const InputProfissao = (props) => {
  const { onChangeText, value, children } = props;

  return (
    <Input
      label="Qual é a sua profissão ?"
      placeholder="ex: Enfermeiro"
      // leftIcon={<Icon name="user" type="antdesign" size={24} color="#007aff" />}
      errorMessage="Digite um nome válido"
      onChangeText={onChangeText}
      value={value}
    />
  );
};

export default InputProfissao;
