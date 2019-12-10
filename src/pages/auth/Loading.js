import React, { Component } from "react";
import { View, Text, ActivityIndicator, StyleSheet } from "react-native";
import { navigationOptions } from "../../styles/StyleBase";

import firebase from "react-native-firebase";

export default class Loading extends Component {
  // static navigationOptions = {
  //   ...navigationOptions,
  //   headerLeft: <View />
  // };

  constructor(props) {
    super(props);
    this.collection = firebase.firestore().collection("anuncios");
    this._bootstrapAsync();
  }

  // Fetch the token from storage then navigate to our appropriate place
  _bootstrapAsync = async () => {
    const currentUser = firebase.auth().currentUser;

    if (currentUser == null) {
      console.log("usuario nao logado, chamando Login");
      this.props.navigation.navigate("Login");
    } else {
      console.log("usuario logado");
      console.log("id usuario:" + currentUser.uid);
      //verifica se já possui anuncio cadastrado, e "atuliza" dados da consulta

      this.anuncio = this.props.navigation.getParam("anuncio", false);

      console.log("anuncio em cache: ");
      console.log(this.anuncio);

      //assume que quem está logado já possui dados basicos cadastrados
      this.temCadastroBasico = true;

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
              this.temCadastroBasico = false;
              console.log("nao tem cadastro basico, erro");
            } else {
              this.anuncio = data.docs[0].ref;
            }
            // console.log(data);
          });
      }

      console.log(this.anuncio);

      console.log("cadastro basico: " + this.temCadastroBasico);

      if (this.temCadastroBasico == true) {
        let docSnapshot = await this.anuncio.get().then(doc => {
          return doc;
        });

        console.log(docSnapshot);

        this.cadastroCompleto =
          docSnapshot.get("anuncio") != undefined ? true : false;

        console.log("cadastro completo: " + this.cadastroCompleto);

        console.log(this.anuncio);

        console.log(firebase.auth().currentUser);

        this.props.navigation.navigate(
          this.cadastroCompleto ? "PerfilAnuncio" : "NewUserNome",
          {
            anuncio: this.anuncio
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
