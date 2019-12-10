import React, { Component } from 'react';
import {ScrollView} from 'react-native';
import {Icon, Input} from 'react-native-elements';
import InputNome from '../componentes/InputNome';
import InputCPF from '../componentes/InputCPF';
import InputTelefone from '../componentes/InputTelefone';
import InputEmail from '../componentes/InputEmail';
import Button from './components/Button';

export default class NewUserTelefone extends Component {
  state = this.props.navigation.state.params.state;

  componentDidMount() {
    this.setState({ telefone: "(00)00000-0000" });
    console.log(this.state);
  }

  render() {
    return (
      <ScrollView>
        <InputTelefone onChangeText={telefone => this.setState({ telefone: telefone })} />
        <Button
          onPress={() =>
            this.props.navigation.navigate("NewUserEstadoCidade", {
              state: this.state
            })
          }
        >
          Continuar
        </Button>
      </ScrollView>
    );
  }
}
