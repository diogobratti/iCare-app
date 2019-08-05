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

  state = { uf: null, selectedValueEstado: null, selectedValueCidade: null };

  componentDidMount() {
    this.setState({
      uf: [
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
    const { selectedValueCidade, selectedValueEstado, uf } = this.state;
    const { destino } = this.props;
    return (
      <View style={StyleLocalidade.container}>
        {/* <View style={StyleLocalidade.cabecalhoContainer}>
          <Cabecalho />
        </View> */}
        <View style={StyleLocalidade.corpoContainer}>
          <View style={StyleLocalidade.camposContainer}>
            <View style={StyleLocalidade.itemCamposContainer}>
              <Text style={StyleLocalidade.itemCamposTexto}>
                Escolha o estado
              </Text>
              <SelectEstados
                selectedValue={selectedValueEstado}
                data={uf}
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
        </View>
        <View style={StyleLocalidade.botaoContainer}>
          <TouchableOpacity
            style={StyleLocalidade.botaoButton}
            onPress={() => {
              this.props.navigation.navigate('NewUserDadosBasicos', {});
              //   this.props.navigation.navigate(destino, {});
            }}
          >
            <Text style={StyleLocalidade.botaoText}>Avançar</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}
