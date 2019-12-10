import React, { Component } from "react";

import { View, Text, ScrollView, TouchableOpacity, ActivityIndicator, Picker, BackHandler } from "react-native";

import { navigationOptions, definicoesBase, Cabecalho } from "../../styles/StyleBase";
import StyleEscolhePerfil from "../../styles/StyleEscolhePerfil";

import AsyncStorage from '@react-native-community/async-storage';


export default class EscolhePerfil extends Component {
  static navigationOptions = navigationOptions;

  state = { erro: null, isLoading: true }
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

  async componentDidMount() {
    BackHandler.addEventListener('hardwareBackPress', this.handleBackButtonClick);
    //await AsyncStorage.clear();
    const termoservico = await AsyncStorage.getItem('termoservico');
    const estado = await AsyncStorage.getItem('estado');
    const municipio = await AsyncStorage.getItem('municipio');
    const regiao = await AsyncStorage.getItem('microrregiao');
    const perfil = await AsyncStorage.getItem('perfil');
    if (termoservico != null) {
      if (estado != null && municipio != null && regiao != null) {
        if (perfil != null) {
          this.props.navigation.navigate("ListagemAnuncio", {});
        }
      } else {
        this.props.navigation.navigate("Localidade", {});
      }
    }
    this.setState({
      isLoading: false,
    });
  }
  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.handleBackButtonClick);
  }
  guardarPerfilCliente = async () => {
    const timestamp = new Date();

    await AsyncStorage.setItem('perfil', 'Cliente');

  };
  guardarPerfilFornecedor = async () => {
    const timestamp = new Date();

    await AsyncStorage.setItem('perfil', 'Fornecedor');

  };
  render() {
    if (this.state.isLoading) {
      return (
        <ActivityIndicator />
      )
    }
    const { selectedValueCidade, selectedValueEstado, uf } = this.state;
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
                this.guardarPerfilFornecedor();
                this.props.navigation.navigate("Loading", {});
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
                  this.guardarPerfilCliente();
                  this.props.navigation.navigate("ListagemAnuncio", {});
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