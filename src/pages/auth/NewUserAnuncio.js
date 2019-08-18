import React from 'react';
import {ScrollView} from 'react-native';
import {Icon, Input} from 'react-native-elements';
import InputNome from '../componentes/InputNome';
import InputCPF from '../componentes/InputCPF';
import InputTelefone from '../componentes/InputTelefone';
import InputEmail from '../componentes/InputEmail';
import Button from './components/Button';

const NewUserAnuncio = () => {
  return (
    <ScrollView>
      <InputNome />
      <Button onPress={() => this.props.navigation.navigate('Cadastrar')}>
        Continuar
      </Button>
    </ScrollView>
  );
};

export default NewUserAnuncio;
