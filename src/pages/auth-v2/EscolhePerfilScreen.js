import React, { Component } from "react";

import { View, Text, ScrollView, TouchableOpacity, ActivityIndicator, Picker, BackHandler } from "react-native";

import { navigationOptions, definicoesBase, Cabecalho } from "../../styles/StyleBase";
import StyleEscolhePerfil from "../../styles/StyleEscolhePerfil";

import AsyncStorage from '@react-native-community/async-storage';


export default class EscolhePerfilScreen extends Component {
  static navigationOptions = navigationOptions;

  state = { erro: null, isLoading: true }

  async componentDidMount() {
    //await AsyncStorage.clear();
    const perfil = await AsyncStorage.getItem('userPerfil');
    this.setState({
      isLoading: false,
    });
  }

  guardarPerfil = async perfil => {
    await AsyncStorage.setItem('userPerfil', { perfil });
  };

  render() {
    if (this.state.isLoading) {
      return (
        <ActivityIndicator />
      )
    }
    return (
      <View style={StyleEscolhePerfil.container}>
        <View style={StyleEscolhePerfil.cabecalhoContainer}>
          <Cabecalho />
        </View>

        <View style={StyleEscolhePerfil.espacoSuperiorContainer}>

        </View>
        <View style={StyleEscolhePerfil.corpoContainer}>
          <View style={StyleEscolhePerfil.conteudoContainer}>
            <View style={StyleEscolhePerfil.tituloContainer}>
              <Text style={StyleEscolhePerfil.tituloTexto}>
                Busco
							</Text>
            </View>
            <View style={StyleEscolhePerfil.botaoContainer}>
              <TouchableOpacity
                style={StyleEscolhePerfil.botaoButton}
                onPress={() => {
                  this.guardarPerfil('Fornecedor');
                  this.props.navigation.navigate("Auth");
                }}
              >
                <Text style={StyleEscolhePerfil.botaoText}>
                  Oferecer meus serviços
		                    </Text>
              </TouchableOpacity>
              <View style={StyleEscolhePerfil.botaoContainer}>
                <TouchableOpacity
                  style={StyleEscolhePerfil.botaoButton}
                  onPress={() => {
                    this.guardarPerfil('Cliente');
                    this.props.navigation.navigate("Auth");
                  }}
                >
                  <Text style={StyleEscolhePerfil.botaoText}>
                    Encontrar um profissional
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
