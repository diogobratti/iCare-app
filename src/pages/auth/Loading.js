// Loading.js
import React from "react";
import { View, Text, ActivityIndicator, StyleSheet } from "react-native";

import firebase from "react-native-firebase";

export default class Loading extends React.Component {
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
      console.log("id ususario:" + currentUser.uid);
      //verifica se já possui anuncio cadastrado, e "atuliza" dados da consulta

      this.anuncio = this.props.navigation.getParam("anuncio", false);

      console.log(this.anuncio);

      if (this.anuncio === false) {
        //busca no banco se nao tiver
        console.log("buscando anuncio no banco");
        await this.collection
          .where("user_uid", "==", currentUser.uid)
          .get()
          .then(data => {
            this.anuncio = data;
            console.log(data);
          });
      }

      this.cadastroCompleto =
        this.anuncio.docs[0] != undefined &&
        this.anuncio.docs[0].get("anuncio") != undefined
          ? true
          : false;

      console.log(this.cadastroCompleto);

      console.log(this.anuncio);

      this.props.navigation.navigate(
        this.cadastroCompleto ? "PerfilAnuncio" : "NewUserNome",
        {
          anuncio: this.anuncio.docs[0]
        }
      );
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
