import React, { Component } from "react";
import { ActivityIndicator, View, BackHandler } from "react-native";
import firebase from "react-native-firebase";
import { Button } from "react-native-elements";
import Anuncio from "../componentes/Anuncio";
import { navigationOptions } from "../../styles/StyleBase";
import StyleAnuncio from "../../styles/StyleAnuncio";
import { ROUTES_LOADING } from "../../data/Constantes";
import LocalStorage from "../../services/LocalStorage";

export default class Main extends Component {

  // state = {
  //   anuncio: null
  // }

  constructor() {
    super()
    //TODO: pegar anuncio do LocalStorage
    this.state = {
      anuncio: 'arraycomDadosDoAnuncio'
    }
  }

  static navigationOptions = {
    ...navigationOptions
  };

  handleSignOut = () => {
    firebase
      .auth()
      .signOut()
      .then(() => {
        AsyncStorage.clear();
        this.props.navigation.push(ROUTES_LOADING);
      });
  };

  // componentDidMount() {
  //   console.log("PerfilAnuncio componentDidMount");
  //   console.log(firebase.auth().currentUser);

  //   const { currentUser } = firebase.auth();
  //   console.log("usuario atual:" + currentUser);

  //   console.log("anuncio: " + this.props.navigation.getParam("anuncio", false));

  //   let anuncio = this.props.navigation.getParam("anuncio", false);
  //   if (anuncio == false) {
  //     estado inconsistente
  //     this.props.navigation.push(ROUTES_LOADING);
  //   }

  //   anuncio.get().then(doc => {
  //     this.setState({ anuncio: doc.data() });
  //   });
  // }

  render() {
    const { anuncio } = this.state;

    return (
      // <View style={styles.container}>
      <View style={StyleAnuncio.visualizarAnuncioContainer}>
        {this.state.anuncio != null ? (
          <Anuncio anuncio={anuncio} />
        ) : (
          <ActivityIndicator size="large" />
        )}

        <View style={StyleAnuncio.visualizarAnuncioBotaoContainer}>
          <Button
            title="Sair"
            onPress={this.handleSignOut}
            style={StyleAnuncio.visualizarAnuncioBotaoButton}
          />
        </View>
      </View>
    );
  }
}
