import React, { Component } from 'react';
import {ScrollView} from 'react-native';
import {Icon, Input} from 'react-native-elements';
import InputNome from '../componentes/InputNome';
import InputCPF from '../componentes/InputCPF';
import InputTelefone from '../componentes/InputTelefone';
import InputEmail from '../componentes/InputEmail';
import Button from './components/Button';
import firebase from 'react-native-firebase';


export default class NewUserNome extends Component {
  // state = {
  //   // firebaseUid: '',
  //   // nome : '',
  //   // cpf : '',
  //   // email: '',
  //   // password: '',
  //   // telefone: '',
  //   // estado: '',
  //   // cidade: '',
  //   // errorMessage: null,
  //   cadastroCompleto: false
  // };

  componentDidMount() {
    this.setState({ nome: "nome da pessoa" });
    this.setState({ user: firebase.auth().currentUser });

    console.log(this.state);
  }

  render() {
    return (
      <ScrollView>
        <InputNome
          onChangeText={nome => this.setState({ nome: nome }) }
        />
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
