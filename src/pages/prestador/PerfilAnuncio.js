import React, { Component } from "react";
import { ActivityIndicator, View } from "react-native";
import firebase from "react-native-firebase";
import { Button } from "react-native-elements";
import Anuncio from "../componentes/Anuncio";
import { navigationOptions } from "../../styles/StyleBase";
import StyleAnuncio from "../../styles/StyleAnuncio";

export default class Main extends Component {

  constructor(props) {
    // console.log(this.props);
    super(props);
    this.state = {
      anuncio: null
    };
  }

  static navigationOptions = {
    ...navigationOptions,
    headerLeft: <View />
  };

  handleSignOut = () => {
    firebase
      .auth()
      .signOut()
      .then(() => {
        this.props.navigation.push("Loading");
      });
  };

  componentDidMount() {
    console.log("PerfilAnuncio componentDidMount");
    console.log(firebase.auth().currentUser);

    const { currentUser } = firebase.auth();
    console.log("usuario atual:" + currentUser);

    console.log("anuncio: " + this.props.navigation.getParam("anuncio", false));

    let anuncio = this.props.navigation.getParam("anuncio", false);
    if (anuncio == false) {
      //estado inconsistente
      this.props.navigation.push("Loading");
    }

    this.setState({ anuncio: anuncio.data() });
  }

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
