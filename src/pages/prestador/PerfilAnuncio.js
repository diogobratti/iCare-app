import React, { Component } from "react";
import { ActivityIndicator, View, BackHandler } from "react-native";
import firebase from "react-native-firebase";
import { Button } from "react-native-elements";
import Anuncio from "../componentes/Anuncio";
import { navigationOptions } from "../../styles/StyleBase";
import StyleAnuncio from "../../styles/StyleAnuncio";
import { ROUTES_LOADING, ASYNC_ITEM_USUARIO_ANUNCIO, ASYNC_ITEM_USUARIO_EMAIL, ASYNC_ITEM_USUARIO_FOTO, ASYNC_GRUPO_ITENS_ANUNCIO_COMPLETO, ASYNC_ITEM_USUARIO_NOME, ASYNC_ITEM_USUARIO_TELEFONE, ASYNC_ITEM_USUARIO_PROFISSAO, ASYNC_ITEM_USUARIO_PRECO } from "../../data/Constantes";
import LocalStorage from "../../services/LocalStorage";

export default class PerfilAnuncio extends Component {

  state = {
    anuncio: null
  }

  static navigationOptions = {
    ...navigationOptions
  };

  handleSignOut = () => {
    firebase
      .auth()
      .signOut()
      .then(() => {
        LocalStorage.clear();
        this.props.navigation.push(ROUTES_LOADING);
      });
  };

  async componentDidMount() {

    const values = await LocalStorage.multiGet(ASYNC_GRUPO_ITENS_ANUNCIO_COMPLETO)

    const anuncio = {
      foto: values[ASYNC_ITEM_USUARIO_FOTO],
      nome: values[ASYNC_ITEM_USUARIO_NOME],
      telefone: values[ASYNC_ITEM_USUARIO_TELEFONE],
      profissao: values[ASYNC_ITEM_USUARIO_PROFISSAO],
      preco: values[ASYNC_ITEM_USUARIO_PRECO],
      anuncio: values[ASYNC_ITEM_USUARIO_ANUNCIO]
    }

    this.setState({ anuncio:  anuncio });

  }

  render() {
    const { anuncio } = this.state;

    return (
      // <View style={styles.container}>
      <View style={StyleAnuncio.visualizarAnuncioContainer}>
        {anuncio != null ? (
          <Anuncio anuncio={anuncio} editavel={true} />
        ) : (
          <ActivityIndicator size="large" />
        )}

        {/* <View style={StyleAnuncio.visualizarAnuncioBotaoContainer}>
          <Button
            title="Sair"
            onPress={this.handleSignOut}
            style={StyleAnuncio.visualizarAnuncioBotaoButton}
          />
        </View> */}
      </View>
    );
  }
}
