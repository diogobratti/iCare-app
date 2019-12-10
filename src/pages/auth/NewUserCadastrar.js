import React, { Component } from "react";
import { View, Text, ActivityIndicator, StyleSheet, BackHandler } from "react-native";
import firebase from "react-native-firebase";
import { ScrollView } from "react-native";
import { Icon, Input } from "react-native-elements";
import InputNome from "../componentes/InputNome";
import InputCPF from "../componentes/InputCPF";
import InputTelefone from "../componentes/InputTelefone";
import InputEmail from "../componentes/InputEmail";
import Button from "./components/Button";
import ApiDb from "../../services/ApiDb";
import AsyncStorage from "@react-native-community/async-storage";
import { navigationOptions } from "../../styles/StyleBase";

export default class NewUserCadastrar extends Component {
  static navigationOptions = {
    ...navigationOptions,
    headerLeft: <View />
  };

  constructor(props) {
    super(props);
    this.handleBackButtonClick = (() => {
    //   if (this.navigator && this.navigator.getCurrentRoutes().length > 1){
    //     this.navigator.pop();
        return true; //avoid closing the app
    //   }
    //   return false; //close the app
    }).bind(this) //don't forget bind this, you will remember anyway.
  }
  
  state = this.props.navigation.state.params.state;

  async componentDidMount() {
    BackHandler.addEventListener('hardwareBackPress', this.handleBackButtonClick);
    console.log(this.state);
    console.log(this.state.user.uid);

    try {
      let anuncioOriginal = this.state.anuncioOriginal;

      const versaoTermos = await AsyncStorage.getItem("termoservico");
      const estado = await AsyncStorage.getItem("estado");
      const municipio = await AsyncStorage.getItem("municipio");
      const regiao = await AsyncStorage.getItem("microrregiao");

      anuncioOriginal.update({
        nome: this.state.nome,
        // cpf: this.state.cpf,
        email: this.state.email,
        telefone: this.state.telefone,
        uf: this.state.estado,
        cidade: this.state.municipio,
        microrregiao: this.state.regiao,
        anuncio: this.state.anuncio,
        preco: this.state.preco,
        profissao: this.state.profissao,
        foto: this.state.foto,
        versaoTermosServico: versaoTermos
      });

      //TODO: tratar para mostrar mensagem de erro quando não conseguiu salavar

      this.props.navigation.navigate("PerfilAnuncio", {
        anuncio: anuncioOriginal
      });
    } catch (error) {
      console.error(error.code + error);
    }
  }
  componentWillUnmount() {
      BackHandler.removeEventListener('hardwareBackPress', this.handleBackButtonClick);
  }

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
    justifyContent: "center",
    alignItems: "center"
  }
});
