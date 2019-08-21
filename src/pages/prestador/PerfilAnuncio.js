// Main.js
import React from "react";
import { ActivityIndicator, View } from "react-native";
import firebase from "react-native-firebase";
import { Button } from "react-native-elements";
import Anuncio from "../componentes/Anuncio";
import { navigationOptions } from "../../styles/StyleBase";
import StyleAnuncio from "../../styles/StyleAnuncio";

export default class Main extends React.Component {
  state = { currentUser: null, anuncio: null };

  static navigationOptions = {
    ...navigationOptions,
    headerLeft: <View />
  };

  handleSignOut = () => {
    firebase
      .auth()
      .signOut()
      .then(() => {
        this.props.navigation.navigate("AuthLoading");
      });
  };

  componentDidMount() {
    const { currentUser } = firebase.auth();

    this.setState({ usuario: currentUser });

    firebase
      .firestore()
      .collection("anuncios")
      .where("uid", "==", currentUser.uid)
      .get()
      .then(dados => {
        this.setState({ anuncio: dados.docs[0].data() });
      });
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
