import React from 'react';
import {
  ActivityIndicator,
  StatusBar,
  View,
  Alert,
} from 'react-native';
//import firebase from "react-native-firebase";
import auth from "@react-native-firebase/auth"
import LocalStorage from '../../services/LocalStorage';
import AsyncStorage from '@react-native-community/async-storage';
// import Reactotron from 'reactotron-react-native';
import * as CONSTANTES from '../../data/Constantes';
import SincronizadorBanco from './AsyncStorageDadosBanco'
// import reactotron from 'reactotron-react-native';
import analytics from '@react-native-firebase/analytics';


export default class LoadingScreen extends React.Component {
  componentDidMount() {
    //Busca dados e faz redirect
    this._bootstrapAsync();
  }

  // Fetch the token from storage then navigate to our appropriate place
  _bootstrapAsync = async () => {

    try {

      //TODO: Adicionar atualizacao do cadastro da v1 pra v2 AsyncStorage
      await SincronizadorBanco.atualizaAsyncStorageDadosBanco()

      const userPerfil = await LocalStorage.getItem(CONSTANTES.ASYNC_ITEM_PERFIL);
      const userCadastroCompleto = await LocalStorage.getItem(CONSTANTES.ASYNC_ITEM_CADASTRO_COMPLETO);

      // ============ DEBUG AREA ============
      // auth().signOut();
      // await AsyncStorage.clear();
      // await LocalStorage.setItem(CONSTANTES.ASYNC_ITEM_PERFIL, CONSTANTES.ASYNC_USER_PERFIL_FORNECEDOR)
      if (__DEV__) LocalStorage.logCurrentStorage();
      // ========== FIM DEBUG AREA ==========

      if (userPerfil === null) {
        //Nao escolheu perfil, nao tem cadastro, escolhe perfil e depois login
        this.props.navigation.navigate(CONSTANTES.ROUTES_ESCOLHE_PERFIL);

        // } else if (userToken === null) {
        //   //Ja usou app antes, escolheu perfil mas nao fez login
        //   this.props.navigation.navigate('Auth');

      } else if (auth().currentUser === null) {
        //Ja usou app antes, escolheu perfil mas nao fez login
        //Ou nao está autenticado
        this.props.navigation.navigate(CONSTANTES.ROUTES_AUTENTICACAO);

      } else if (userCadastroCompleto === null) {
        //Ja usou app antes, fez login mas cadastro esta incompleto
        await Promise.all([
          analytics().setUserId(auth().currentUser.uid),
          analytics().setUserProperty('user_perfil', userPerfil),
        ]);

        (userPerfil == CONSTANTES.ASYNC_USER_PERFIL_CLIENTE) ?
          this.props.navigation.navigate(CONSTANTES.ROUTES_NEW_USER_CLIENTE) :
          this.props.navigation.navigate(CONSTANTES.ROUTES_NEW_USER_FORNECEDOR);

      } else {
        await Promise.all([
          analytics().setUserId(auth().currentUser.uid),
          analytics().setUserProperty('user_perfil', userPerfil),
        ]);

        this.props.navigation.navigate(CONSTANTES.ROUTES_APP);
      }

    } catch (e) {
      //TODO: tratar exception
      console.warn(e.message);
    }

  };

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
