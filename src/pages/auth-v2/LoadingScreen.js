import React from 'react';
import {
  ActivityIndicator,
  StatusBar,
  View,
} from 'react-native';
import firebase from "react-native-firebase";
import LocalStorage from '../../services/LocalStorage';
import AsyncStorage from '@react-native-community/async-storage';
import Reactotron from 'reactotron-react-native';
import * as CONSTANTES from '../../data/Constantes';


export default class LoadingScreen extends React.Component {
  componentDidMount() {
    //Busca dados e faz redirect
    this._bootstrapAsync();
  }

  // Fetch the token from storage then navigate to our appropriate place
  _bootstrapAsync = async () => {

    const userPerfil = await LocalStorage.getItem(CONSTANTES.ASYNC_ITEM_PERFIL);
    const userCadastroCompleto = await LocalStorage.getItem(CONSTANTES.ASYNC_ITEM_CADASTRO_COMPLETO);

    // ============ DEBUG AREA ============
    // firebase.auth().signOut();
    // await LocalStorage.clear();
    // await LocalStorage.setItem(CONSTANTES.ASYNC_ITEM_PERFIL, CONSTANTES.ASYNC_USER_PERFIL_FORNECEDOR)
    this.logCurrentStorage();
    // ========== FIM DEBUG AREA ==========

    if (userPerfil === null) {
      //Nao escolheu perfil, nao tem cadastro, escolhe perfil e depois login
      this.props.navigation.navigate(CONSTANTES.ROUTES_ESCOLHE_PERFIL);

      // } else if (userToken === null) {
      //   //Ja usou app antes, escolheu perfil mas nao fez login
      //   this.props.navigation.navigate('Auth');

    } else if (firebase.auth().currentUser === null) {
      //Ja usou app antes, escolheu perfil mas nao fez login
      //Ou nao está autenticado
      this.props.navigation.navigate(CONSTANTES.ROUTES_AUTENTICACAO);

    } else if (userCadastroCompleto === null) {
      //Ja usou app antes, fez login mas cadastro esta incompleto
      (userPerfil == CONSTANTES.ASYNC_USER_PERFIL_CLIENTE) ?
        this.props.navigation.navigate(CONSTANTES.ROUTES_NEW_USER_CLIENTE) :
        this.props.navigation.navigate(CONSTANTES.ROUTES_NEW_USER_FORNECEDOR);

    } else {
      this.props.navigation.navigate(CONSTANTES.ROUTES_APP);
    }

  };

  // DEBUG ONLY
  logCurrentStorage() {
    AsyncStorage.getAllKeys().then((keyArray) => {
      AsyncStorage.multiGet(keyArray).then((keyValArray) => {
        let myStorage: any = {};
        for (let keyVal of keyValArray) {
          myStorage[keyVal[0]] = keyVal[1]
        }

        Reactotron.log(myStorage);
      })
    });
  }

  // Render any loading content that you like here
  render() {
    return (
      <View>
        <ActivityIndicator />
        <StatusBar barStyle="default" />
      </View>
    );
  }
}
