import React from 'react';
import {ScrollView} from 'react-native';
import {Icon, Input} from 'react-native-elements';
import InputNome from '../componentes/InputNome';
import InputCPF from '../componentes/InputCPF';
import InputTelefone from '../componentes/InputTelefone';
import InputEmail from '../componentes/InputEmail';
import Button from './components/Button';

const NewUserDadosBasicos = () => {
  return (
    <ScrollView>
      <InputNome />
      <InputCPF />
      <InputTelefone />
      <InputEmail />
      <Button onPress={() => this.props.navigation.navigate('SignUp')}>
        Cadastre-se
      </Button>
    </ScrollView>
  );
};

export default NewUserDadosBasicos;
