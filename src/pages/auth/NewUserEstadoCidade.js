//ordernar menor distancia, melhor avaliacao e preco.
//filtrar por profissao preco e avaliacao
import React, { Component } from 'react';

import { View, Text, ScrollView, TouchableOpacity, Picker } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Slider, CheckBox } from 'react-native-elements';

import {
  navigationOptions,
  definicoesBase,
  Cabecalho,
} from '../../styles/StyleBase';
import StyleLocalidade from '../../styles/StyleLocalidade';

//import { AsyncStorage} from '@react-native-community/async-storage';

import DataLocalidade from '../../data/DataLocalidade.json';
import SelectEstados from '../componentes/SelectEstados';
import SelectCidades from '../componentes/SelectCidades';

export default class Localidade extends Component {
  static navigationOptions = navigationOptions;

  state = this.props.navigation.state.params.state;

  componentDidMount() {
    this.setState({
      ufS: [
        {
          sigla: 'AC',
          nome: 'Acre',
          cidades: ['Acrelândia', 'Assis Brasil', 'Brasiléia', 'Bujari'],
        },
        {
          sigla: 'AL',
          nome: 'Alagoas',
          cidades: ['Água Branca', 'Anadia', 'Arapiraca', 'Atalaia'],
        },
      ],
      selectedValueEstado: '',
      selectedValueCidade: '',
    });

    this.setState({ uf: "SC" });
    this.setState({ cidade: "Alguma cidade" });
    console.log(this.state);
  }

  renderValueChangeEstado = (value) => {
    console.warn(value.sigla);
    this.setState({
      selectedValueEstado: value,
    });
  };

  renderValueChangeCidade = (value) => {
    console.warn(value);
    this.setState({
      selectedValueCidade: value,
    });
  };
  render() {
    // const { selectedValueCidade, selectedValueEstado, ufS } = this.state;
    // const { destino } = this.props;
    return (
      <View style={StyleLocalidade.container}>
        {/* <View style={StyleLocalidade.cabecalhoContainer}>
          <Cabecalho />
        </View> */}
        {/* <View style={StyleLocalidade.corpoContainer}>
          <View style={StyleLocalidade.camposContainer}>
            <View style={StyleLocalidade.itemCamposContainer}>
              <Text style={StyleLocalidade.itemCamposTexto}>
                Escolha o estado
              </Text>
              <SelectEstados
                selectedValue={selectedValueEstado}
                data={ufS}
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
                onValueChange={this.renderValueChangeCidade}
              />
            </View>
          </View>
        </View> */}
        <View style={StyleLocalidade.botaoContainer}>
          <TouchableOpacity
            style={StyleLocalidade.botaoButton}
            onPress={() =>
              this.props.navigation.navigate("NewUserAnuncio", {
                state: this.state
              })
            }
          >
            <Text style={StyleLocalidade.botaoText}>Avançar</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}
