import React, { Component } from "react";
import { View, Text, ActivityIndicator, StyleSheet } from "react-native";

import firebase from "react-native-firebase";

export default class Loading extends Component {
  constructor(props) {
    super(props);
    this.collection = firebase.firestore().collection("anuncios");
    this._bootstrapAsync();
  }

  // Fetch the token from storage then navigate to our appropriate place
  _bootstrapAsync = async () => {
    // const userToken = await AsyncStorage.getItem('userToken');
    const currentUser = firebase.auth().currentUser;

    if (currentUser == null) {
      console.log("usuario nao logado, chamando Login");
      this.props.navigation.navigate("Login");
    } else {
      // firebase
      // .auth()
      // .signOut();
      console.log("usuario logado");
      console.log("id usuario:" + currentUser.uid);
      //verifica se já possui anuncio cadastrado, e "atuliza" dados da consulta

      this.anuncio = this.props.navigation.getParam("anuncio", false);

      console.log("anuncio em cache: " + this.anuncio);

      //assume que quem está logado já possui dados basicos cadastrados
      this.cadastroBasico = true;

      if (this.anuncio === false) {
        //busca no banco se nao tiver
        console.log("buscando anuncio no banco");
        await this.collection
          .where("user_uid", "==", currentUser.uid)
          .get()
          .then(data => {
            if (data.empty) {
              //estado inconsistente usuario logado, e sem dados basicos?
              //força login novamente
              this.cadastroBasico = false;
            }
            this.anuncio = data;
            console.log(data);
          });
      }

      console.log("cadastro basico: " + this.cadastroBasico);

      if (this.cadastroBasico == true) {
        this.cadastroCompleto =
          this.anuncio.docs[0] != undefined &&
          this.anuncio.docs[0].get("anuncio") != undefined
            ? true
            : false;

        console.log("cadastro completo: " + this.cadastroCompleto);

        console.log(this.anuncio);

        console.log(firebase.auth().currentUser);

        this.props.navigation.navigate(
          this.cadastroCompleto ? "PerfilAnuncio" : "NewUserNome",
          {
            anuncio: this.anuncio.docs[0]
          }
        );
      } else {
        //força login, deveria ter dados básicos cadastrados já
        firebase.auth().signOut();
        this.props.navigation.push("Login");
      }
    }
  };

  render() {
    return (
      <View style={styles.container}>
        <Text>Carregando...</Text>
        <ActivityIndicator size="large" />
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  }
});
