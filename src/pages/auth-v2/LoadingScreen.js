import React from 'react';
import {
  ActivityIndicator,
  StatusBar,
  View,
  Alert
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';

export default class LoadingScreen extends React.Component {
  componentDidMount() {
    //Busca dados e faz redirect
    this._bootstrapAsync();
  }

  // Fetch the token from storage then navigate to our appropriate place
  _bootstrapAsync = async () => {

    const userToken = await AsyncStorage.getItem('userToken');
    const userPerfil = await AsyncStorage.getItem('userPerfil');
    const userCadastroCompleto = await AsyncStorage.getItem('userCadastroCompleto');

    if (userPerfil === null) {
      //Nao escolheu perfil, nao tem cadastro, escolhe perfil e depois login
      this.props.navigation.navigate('EscolhePerfil');

    } else if (userToken === null) {
      //Ja usou app antes, escolheu perfil mas nao fez login
      this.props.navigation.navigate('Auth');

    } else {
      //tenta autenticar com o token, se for invalido (catch), vai pra tela
      //de login para tentar gerar um novo token ou nova autenticacao
      await firebase
        .auth()
        .signInWithCredential(userToken)
        .catch(() => this.props.navigation.navigate('Auth'));

      if (userCadastroCompleto === null || userCadastroCompleto == false) {
        //Ja usou app antes, fez login mas cadastro esta incompleto
        this.props.navigation.navigate('NewUser', { userPerfil });
      } else {
        this.props.navigation.navigate('App');
      }

      // This will switch to the App screen or Auth screen and this loading
      // screen will be unmounted and thrown away.
      this.props.navigation.navigate(userToken ? 'App' : 'Auth');
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
