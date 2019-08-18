import React, { Component } from 'react';
import {View, Text, ActivityIndicator, StyleSheet} from 'react-native';
import firebase from 'react-native-firebase';
import {ScrollView} from 'react-native';
import {Icon, Input} from 'react-native-elements';
import InputNome from '../componentes/InputNome';
import InputCPF from '../componentes/InputCPF';
import InputTelefone from '../componentes/InputTelefone';
import InputEmail from '../componentes/InputEmail';
import Button from './components/Button';
import ApiDb from '../../services/ApiDb';


export default class NewUserCadastrar extends Component {

  state = this.props.navigation.state.params.state;

  componentDidMount() {
    console.log(this.state);
    console.log(this.state.user.uid);
    console.log(this.state.user.photoURL);

    let api = new ApiDb('anuncios');
    api.add({
      id: this.state.user.uid,
      uid: this.state.user.uid,
      nome: this.state.nome,
      cpf: this.state.cpf,
      email: this.state.email,
      telefone: this.state.telefone,
      uf: this.state.uf,
      cidade: this.state.cidade,
      anuncio: this.state.anuncio,
      preco: this.state.preco,
      profissao: this.state.profissao,
      foto: this.state.user.photoURL,
      versaoTermosServico: this.state.versaoTermosServico
    });
  }

  // constructor(props) {
  //   super(props);
  //   this._bootstrapAsync();
  // }

  // // Fetch the token from storage then navigate to our appropriate place
  // _bootstrapAsync = async () => {
  //   // const userToken = await AsyncStorage.getItem('userToken');
  //   // const currentUser = firebase.auth().currentUser;
  // };

  render() {
    return (
      <View style={styles.container}>
        <Text>Salvando dados...</Text>
        <ActivityIndicator size="large" />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  }
});
