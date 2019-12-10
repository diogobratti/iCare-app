import React from 'react';
import { View, Text } from 'react-native';
import {Input, Icon} from 'react-native-elements';
import { TextInputMask } from 'react-native-masked-text'

const InputTelefone = (props) => {
  const { onChangeText, value, children, ref } = props;

  return (
    <View>
      
      <Text>Qual é o seu telefone de contato?</Text>

      <TextInputMask
        type={"cel-phone"}
        value={value}
        ref={ref}
        onChangeText={onChangeText}
        label="Qual é o seu telefone de contato?"
        placeholder="ex: (00) 00000-0000"
        // leftIcon={
        //   <Icon name="phone" type="antdesign" size={24} color="#007aff" />
        // }
        // errorMessage="Digite um número de telefone válido"
        // onChangeText={onChangeText}
      />

    </View>
    // <Input
    //   label="Qual é o seu telefone de contato?"
    //   placeholder="ex: (00) 00000-0000"
    //   leftIcon={
    //     <Icon name="phone" type="antdesign" size={24} color="#007aff" />
    //   }
    //   errorMessage="Digite um número de telefone válido"
    //   onChangeText={onChangeText}
    // />
  );
};

export default InputTelefone;
