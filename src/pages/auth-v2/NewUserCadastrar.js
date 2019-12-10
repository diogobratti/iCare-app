import React, { Component } from "react";
import { View, Text, ActivityIndicator, StyleSheet, Alert } from "react-native";
import * as CONSTANTES from '../../data/Constantes';
import { navigationOptions } from "../../styles/StyleBase";
// import AsyncStorage from '@react-native-community/async-storage';
import firebase from 'react-native-firebase';
// import Reactotron from 'reactotron-react-native';
import LocalStorage from "../../services/LocalStorage";


export default class NewUserCadastrar extends Component {
  static navigationOptions = {
    ...navigationOptions
  };

  async componentDidMount() {
    try {

      const keyArray = [
        CONSTANTES.ASYNC_ITEM_PERFIL,
        CONSTANTES.ASYNC_ITEM_USUARIO_TOKEN,
        CONSTANTES.ASYNC_ITEM_USUARIO_UID,
        CONSTANTES.ASYNC_ITEM_USUARIO_PROVIDER_ID,
        CONSTANTES.ASYNC_ITEM_USUARIO_NOME,
        CONSTANTES.ASYNC_ITEM_USUARIO_EMAIL,
        CONSTANTES.ASYNC_ITEM_USUARIO_FOTO,
        CONSTANTES.ASYNC_ITEM_USUARIO_TELEFONE,
        CONSTANTES.ASYNC_ITEM_USUARIO_PROFISSAO,
        CONSTANTES.ASYNC_ITEM_USUARIO_PRECO,
        CONSTANTES.ASYNC_ITEM_USUARIO_ANUNCIO,
        CONSTANTES.ASYNC_ITEM_USUARIO_ESTADO,
        CONSTANTES.ASYNC_ITEM_USUARIO_MUNICIPIO,
        CONSTANTES.ASYNC_ITEM_USUARIO_REGIAO,
        CONSTANTES.ASYNC_ITEM_AUTH_PROVIDER_TOKEN,
        CONSTANTES.ASYNC_ITEM_AUTH_PROVIDER_NAME,
        CONSTANTES.ASYNC_ITEM_TERMO_SERVICO,
        CONSTANTES.ASYNC_ITEM_CADASTRO_COMPLETO,
        CONSTANTES.ASYNC_ITEM_USUARIO_INSTAGRAM
      ];

      const asyncStorageValues = await LocalStorage.multiGet(keyArray);

      // Reactotron.log(asyncStorageValues);

      // Reactotron.log(asyncStorageValues[CONSTANTES.ASYNC_ITEM_USUARIO_UID]);

      const getResult = await firebase.firestore()
        .collection(CONSTANTES.FIRESTORE_COLLECTION_ANUNCIOS)
        .where("user_uid", "==", asyncStorageValues[CONSTANTES.ASYNC_ITEM_USUARIO_UID])
        .get()

      // Reactotron.log(getResult);

      const docs = getResult.docs;

      // Reactotron.log(docs);

      if (docs.length === 1) {

        let dados;

        if (LocalStorage.getItem(CONSTANTES.ASYNC_ITEM_PERFIL) == CONSTANTES.ASYNC_USER_PERFIL_CLIENTE) {
          dados = {
            telefone: asyncStorageValues[CONSTANTES.ASYNC_ITEM_USUARIO_TELEFONE],
            uf: asyncStorageValues[CONSTANTES.ASYNC_ITEM_USUARIO_ESTADO],
            cidade: asyncStorageValues[CONSTANTES.ASYNC_ITEM_USUARIO_MUNICIPIO],
            microrregiao: asyncStorageValues[CONSTANTES.ASYNC_ITEM_USUARIO_REGIAO],
            cadastroCompleto: 'true',
          }

        } else {
          dados = {
            nome: asyncStorageValues[CONSTANTES.ASYNC_ITEM_USUARIO_NOME],
            email: asyncStorageValues[CONSTANTES.ASYNC_ITEM_USUARIO_EMAIL],
            telefone: asyncStorageValues[CONSTANTES.ASYNC_ITEM_USUARIO_TELEFONE],
            uf: asyncStorageValues[CONSTANTES.ASYNC_ITEM_USUARIO_ESTADO],
            cidade: asyncStorageValues[CONSTANTES.ASYNC_ITEM_USUARIO_MUNICIPIO],
            microrregiao: asyncStorageValues[CONSTANTES.ASYNC_ITEM_USUARIO_REGIAO],
            anuncio: asyncStorageValues[CONSTANTES.ASYNC_ITEM_USUARIO_ANUNCIO],
            preco: asyncStorageValues[CONSTANTES.ASYNC_ITEM_USUARIO_PRECO],
            profissao: asyncStorageValues[CONSTANTES.ASYNC_ITEM_USUARIO_PROFISSAO],
            foto: asyncStorageValues[CONSTANTES.ASYNC_ITEM_USUARIO_FOTO],
            versaoTermosServico: asyncStorageValues[CONSTANTES.ASYNC_ITEM_TERMO_SERVICO],
            //novos atributos auth-v2
            instagram: asyncStorageValues[CONSTANTES.ASYNC_ITEM_USUARIO_INSTAGRAM],
            cadastroCompleto: 'true',
          }
        }

        const result = await docs[0].ref.update(dados)

        await LocalStorage.setItem(CONSTANTES.ASYNC_ITEM_CADASTRO_COMPLETO, 'true');

        const perfil = await LocalStorage.getItem(CONSTANTES.ASYNC_ITEM_PERFIL)
        if (perfil == CONSTANTES.ASYNC_USER_PERFIL_FORNECEDOR) {
          Alert.alert(
            'Sucesso',
            'Parabéns, seu anúncio foi cadastrado com sucesso! Ele estará disponível para todos que acessarem o ICare a partir de agora.',
            [
              { text: 'OK', onPress: () => { } },
            ],
            { cancelable: false },
          );
          this.props.navigation.navigate(CONSTANTES.ROUTES_ANUNCIO_PERFIL_ANUNCIO);
        } else {
          this.props.navigation.navigate(CONSTANTES.ROUTES_APP);
        }

      } else {
        console.warn ("Erro interno: user_uid cadastrado em mais de um documento");
        //TODO: arrumar aqui, tratar exception
      }


    } catch (error) {
      console.error(error);
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

