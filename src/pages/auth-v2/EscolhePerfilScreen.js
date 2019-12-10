import React, { Component } from "react";
import { View, Text, TouchableOpacity, ActivityIndicator } from "react-native";
import { navigationOptions, Cabecalho } from "../../styles/StyleBase";
import StyleEscolhePerfil from "../../styles/StyleEscolhePerfil";
import LocalStorage from '../../services/LocalStorage';
import * as CONSTANTES from "../../data/Constantes";
import analytics from '@react-native-firebase/analytics';

export default class EscolhePerfilScreen extends Component {
  static navigationOptions = navigationOptions;

  // state = { erro: null, isLoading: true }

  // async componentDidMount() {
  //   //await AsyncStorage.clear();
  //   const perfil = await LocalStorage.getItem(CONSTANTES.ASYNC_ITEM_PERFIL);
  //   this.setState({
  //     isLoading: false,
  //   });
  // }

  async componentDidMount() {
    await analytics().setCurrentScreen('EscolhePerfilScreen', 'EscolhePerfilScreen')
  }

  guardarPerfil = async perfil => {
    await LocalStorage.setItem(CONSTANTES.ASYNC_ITEM_PERFIL, perfil);
    await analytics().logJoinGroup({group_id: perfil})
  };

  render() {
    // if (this.state.isLoading) {
    //   return (
    //     <ActivityIndicator />
    //   )
    // }
    return (
      <View style={StyleEscolhePerfil.container}>
        <View style={StyleEscolhePerfil.cabecalhoContainer}>
          <Cabecalho />
        </View>

        <View style={StyleEscolhePerfil.espacoSuperiorContainer}>

        </View>
        <View style={StyleEscolhePerfil.corpoContainer}>
          <View style={StyleEscolhePerfil.conteudoContainer}>
            <View style={StyleEscolhePerfil.botaoContainer}>
              <TouchableOpacity
                style={StyleEscolhePerfil.botaoButton}
                onPress={() => {
                  this.guardarPerfil(CONSTANTES.ASYNC_USER_PERFIL_FORNECEDOR);
                  this.props.navigation.navigate(CONSTANTES.ROUTES_AUTENTICACAO);
                }}
              >
                <Text style={StyleEscolhePerfil.botaoText}>
                  QUERO TRABALHAR
		                    </Text>
              </TouchableOpacity>
              <View style={StyleEscolhePerfil.botaoContainer}>
                <TouchableOpacity
                  style={StyleEscolhePerfil.botaoButton}
                  onPress={() => {
                    this.guardarPerfil(CONSTANTES.ASYNC_USER_PERFIL_CLIENTE);
                    this.props.navigation.navigate(CONSTANTES.ROUTES_AUTENTICACAO);
                  }}
                >
                  <Text style={StyleEscolhePerfil.botaoText}>
                    QUERO CONTRATAR
		                    </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
        <View style={StyleEscolhePerfil.espacoInferiorContainer}></View>
      </View>
    )
  }
}
