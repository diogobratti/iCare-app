import React from 'react';
import {Input, Icon} from 'react-native-elements';

const InputInstagram = (props) => {
  const { onChangeText, value, children, erro } = props;

  return (
    <Input
      label="Qual é o seu instagram?"
      placeholder="ex: @icarecuidadores"
      leftIcon={<Icon name="instagram" type="antdesign" size={24} color="#007aff" />}
      // errorMessage="Digite um e-mail válido"
      errorMessage={erro}
      onChangeText={onChangeText}
      value={value}
    />
  );
};

export default InputInstagram;
