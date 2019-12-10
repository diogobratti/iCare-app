import React from 'react';
import { Input, Icon } from "react-native-elements";

const InputAnuncio = (props) => {
  const { onChangeText, children } = props;

  return (
    <Input
      label="Descreva o seu anúncio"
      placeholder="ex: Experiência com acamados e procedimentos cirúrgicos"
      leftIcon={<Icon name="user" type="antdesign" size={24} color="#007aff" />}
      errorMessage="O seu anúncio deve conter apenas texto"
      onChangeText={onChangeText}
    />
  );
};

export default InputAnuncio;
