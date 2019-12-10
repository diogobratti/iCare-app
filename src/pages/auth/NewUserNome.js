import React, { Component } from 'react';
import {ScrollView} from 'react-native';
import {Icon, Input} from 'react-native-elements';
import InputNome from '../componentes/InputNome';
import InputCPF from '../componentes/InputCPF';
import InputTelefone from '../componentes/InputTelefone';
import InputEmail from '../componentes/InputEmail';
import Button from './components/Button';

export default class NewUserNome extends Component {
  state = {
    nome : '',
    cpf : '',
    email: '',
    password: '',
    telefone: '',
    errorMessage: null,
    cadastroCompleto: false
    idToken: '';
    uid: '';
  };

  render() {
    return (
      <ScrollView>
        <InputNome onChangeText={nome => this.setState({ nome })} />
        <Button
          onPress={() =>
            this.props.navigation.navigate("NewUserCPF", { state: this.state })
          }
        >
          Continuar
        </Button>
      </ScrollView>
    );
  }
}
