// Main.js
import React from 'react';
import { StyleSheet, Platform, Image, Text, View } from 'react-native';
import firebase from 'react-native-firebase';
import { Button } from 'react-native-elements';
import Anuncio from "../componentes/Anuncio";

import StyleAnuncio, { anuncioIconeTelefone } from "../../styles/StyleAnuncio";

export default class Main extends React.Component {
  state = { currentUser: null };

  anuncio = [];

  handleSignOut = () => {
    firebase
      .auth()
      .signOut()
      .then(() => {
        this.props.navigation.navigate('AuthLoading')});
  };

  componentDidMount() {
    const { currentUser } = firebase.auth();
    this.setState({ currentUser });



    this.anuncio.foto = currentUser.photoURL;
    this.anuncio.nome = currentUser.displayName;
    this.anuncio.telefone = currentUser.phoneNumber;
    this.anuncio.profissao = currentUser.photoURL;
    this.anuncio.anuncio = "xxxx";
    this.anuncio.preco = "f";

    console.log(this.state);
  }

  render() {
    const { currentUser } = this.state;
    return (
      // <View style={styles.container}>
      <View style={StyleAnuncio.visualizarAnuncioContainer}>
        <Anuncio anuncio={this.anuncio} />
        <View style={StyleAnuncio.visualizarAnuncioBotaoContainer}>
          <Button title="Sair" onPress={this.handleSignOut} />
          {/* <Text> Olá {currentUser && currentUser.email}!</Text> */}

          {/* <Text>Nome: {currentUser.nome}!</Text>
          <Text>Email: {currentUser.email}!</Text>
          <Text>CPF: {currentUser.cpf}!</Text>
          <Text>Telefone: {currentUser.telefone}!</Text>
          <Text>UF: {currentUser.uf}!</Text>
          <Text>Cidade: {currentUser.cidade}!</Text>
          <Text>Preço: {currentUser.preco}!</Text>
          <Text>Profissão: {currentUser.profissao}!</Text>
          <Text>URL Foto: {currentUser.foto}!</Text>
          <Text>Anuncio {currentUser.anuncio}!</Text>
          <Text>UID: {currentUser.id}!</Text>
          <Text>Anuncio {currentUser.versaoTermosServico}!</Text> */}
        </View>
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
