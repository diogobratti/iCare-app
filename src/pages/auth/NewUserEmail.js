import React, { Component } from 'react';
import {ScrollView} from 'react-native';
import {Icon, Input} from 'react-native-elements';
import InputNome from '../componentes/InputNome';
import InputCPF from '../componentes/InputCPF';
import InputTelefone from '../componentes/InputTelefone';
import InputEmail from '../componentes/InputEmail';
import Button from './components/Button';

export default class NewUserEmail extends Component {
  state = this.props.navigation.state.params.state;

  render() {
    return (
      <ScrollView>
        <InputEmail onChangeText={email => this.setState({ email })} />
        <Button
          onPress={() =>
            this.props.navigation.navigate("NewUserTelefone", {
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
