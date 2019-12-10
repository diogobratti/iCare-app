import React, { Component } from "react";
import { View, Text, ActivityIndicator, StyleSheet, Alert } from "react-native";
import * as CONSTANTES from '../../data/Constantes';
import { navigationOptions } from "../../styles/StyleBase";
import AsyncStorage from '@react-native-community/async-storage';
import firebase from 'react-native-firebase';



export default class NewUserCadastrar extends Component {
  static navigationOptions = {
    ...navigationOptions
  };

  async componentDidMount() {
    try {




      AsyncStorage.getAllKeys().then((keyArray) => {
        AsyncStorage.multiGet(keyArray).then((keyValArray) => {
          let myStorage: any = {};
          for (let keyVal of keyValArray) {
            myStorage[keyVal[0]] = keyVal[1]
          }

          if (__DEV__) Reactotron.log(myStorage);
        })
      });



      // let anuncioOriginal = this.state.anuncioOriginal;

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


      Alert.alert(
        'Sucesso',
        'Parabéns, seu anúncio foi cadastrado com sucesso! Ele estará disponível para todos que acessarem o ICare a partir de agora.',
        [
          { text: 'OK', onPress: () => { } },
        ],
        { cancelable: false },
      );

      //TODO: tratar para mostrar mensagem de erro quando não conseguiu salvar

      this.props.navigation.navigate("PerfilAnuncio", {
        anuncio: anuncioOriginal
      });
    } catch (error) {
      console.error(error.code + error);
    }
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
