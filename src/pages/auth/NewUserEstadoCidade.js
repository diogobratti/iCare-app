//ordernar menor distancia, melhor avaliacao e preco.
//filtrar por profissao preco e avaliacao
import React, { Component } from "react";

import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  Picker
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { Slider, CheckBox } from "react-native-elements";

import {
  navigationOptions,
  definicoesBase,
  Cabecalho
} from "../../styles/StyleBase";
import StyleLocalidade from "../../styles/StyleLocalidade";

import AsyncStorage from "@react-native-community/async-storage";

//fazer foreach
import DataLocalidade from "../../data/DataLocalidade.json";
import SelectEstados from "../componentes/SelectEstados";
import SelectCidades from "../componentes/SelectCidades";

export default class Localidade extends Component {
  static navigationOptions = navigationOptions;

  state = this.props.navigation.state.params.state;

  constructor() {
    this.setState({
      uf: null,
      selectedValueEstado: null,
      selectedValueCidade: null,
      erro: null,
      isLoading: true
    });
  }

  async componentDidMount() {
    const estado = await AsyncStorage.getItem("estado");
    const municipio = await AsyncStorage.getItem("municipio");
    const regiao = await AsyncStorage.getItem("microrregiao");
    // if (estado != null && municipio != null && regiao != null) {
    //   this.props.navigation.navigate("ListagemAnuncio", {});
    // }
    this.setState({
      uf: DataLocalidade,
      selectedValueEstado: "",
      selectedValueCidade: "",
      estado: estado,
      municipio: municipio,
      regiao: regiao,
      isLoading: false
    });
  }
  renderValueChangeEstado = value => {
    this.setState({
      selectedValueEstado: value,
      estado: value.nome
    });
  };

  renderValueChangeCidade = value => {
    this.setState({
      selectedValueCidade: value,
      municipio: value.Município,
      regiao: value.Microrregião
    });
  };

  render() {
    if (this.state.isLoading) {
      return <ActivityIndicator />;
    }
    const { selectedValueCidade, selectedValueEstado, uf } = this.state;
    return (
      <View style={StyleLocalidade.container}>
        <View style={StyleLocalidade.cabecalhoContainer}>
          <Cabecalho />
        </View>
        <View style={StyleLocalidade.corpoContainer}>
          <View style={StyleLocalidade.camposContainer}>
            <View style={StyleLocalidade.itemCamposContainer}>
              <Text style={StyleLocalidade.itemCamposTexto}>
                Escolha o estado
              </Text>
              <SelectEstados
                selectedValue={selectedValueEstado}
                data={uf}
                style={StyleLocalidade.itemCamposPicker}
                itemStyle={StyleLocalidade.itemCamposPickerItem}
                onValueChange={this.renderValueChangeEstado}
              />
            </View>
            <View style={StyleLocalidade.itemCamposEspacoContainer}>
              <Text />
            </View>
            <View style={StyleLocalidade.itemCamposContainer}>
              <Text style={StyleLocalidade.itemCamposTexto}>
                Escolha o município
              </Text>
              <SelectCidades
                selectedValue={selectedValueCidade}
                data={selectedValueEstado}
                style={StyleLocalidade.itemCamposPicker}
                itemStyle={StyleLocalidade.itemCamposPickerItem}
                onValueChange={this.renderValueChangeCidade}
              />
            </View>
          </View>
          <View style={StyleLocalidade.erroContainer}>
            <Text style={StyleLocalidade.erroTexto}>{this.state.erro}</Text>
          </View>
        </View>

        <View style={StyleLocalidade.botaoContainer}>
          <TouchableOpacity
            style={StyleLocalidade.botaoButton}
            onPress={() => {
              var mensagem = "";
              if (selectedValueEstado != "" && selectedValueCidade != "") {
                // this.guardarLocalidade();
                this.props.navigation.navigate("NewUserAnuncio", {
                  state: this.state
                });
              } else {
                mensagem = "Por favor, escolha o estado e o município.";
                this.setState({ erro: mensagem });
              }
            }}
          >
            <Text style={StyleLocalidade.botaoText}>Avançar</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}
