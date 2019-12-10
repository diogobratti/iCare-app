import React, { Component } from "react";
import { ActivityIndicator, View, BackHandler } from "react-native";
import firebase from "react-native-firebase";
import { Button } from "react-native-elements";
import Anuncio from "../componentes/Anuncio";
import { navigationOptions } from "../../styles/StyleBase";
import StyleAnuncio from "../../styles/StyleAnuncio";

export default class Main extends Component {
  
  constructor(props) {
      super(props);
      this.handleBackButtonClick = (() => {
      //   if (this.navigator && this.navigator.getCurrentRoutes().length > 1){
      //     this.navigator.pop();
          return true; //avoid closing the app
      //   }
      //   return false; //close the app
      }).bind(this) //don't forget bind this, you will remember anyway.
    this.handleBackButtonClick = (() => {
    //   if (this.navigator && this.navigator.getCurrentRoutes().length > 1){
    //     this.navigator.pop();
        return true; //avoid closing the app
    //   }
    //   return false; //close the app
    }).bind(this) //don't forget bind this, you will remember anyway.
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
    BackHandler.addEventListener('hardwareBackPress', this.handleBackButtonClick);
    // console.log("PerfilAnuncio componentDidMount");
    // console.log(firebase.auth().currentUser);

    const { currentUser } = firebase.auth();
    // console.log("usuario atual:" + currentUser);

    // console.log("anuncio: " + this.props.navigation.getParam("anuncio", false));

    let anuncio = this.props.navigation.getParam("anuncio", false);
    if (anuncio == false) {
      //estado inconsistente
      this.props.navigation.push("Loading");
    }

    anuncio.get().then(doc => {
      this.setState({ anuncio: doc.data() });
    });
  }

  componentWillUnmount() {
      BackHandler.removeEventListener('hardwareBackPress', this.handleBackButtonClick);
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
