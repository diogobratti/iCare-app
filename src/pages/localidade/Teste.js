import React, { Component } from "react";
import { Picker, View, TextInput, Text, Button } from "react-native";
//import { estados } from './cidades-estados/cidades-estados.json'
import SelectEstados from '../componentes/SelectEstados'
import SelectCidades from '../componentes/SelectCidades'

export default class Teste extends Component {

      state = { uf: null, selectedValueEstado: null, selectedValueCidade: null }

      componentDidMount() {
        this.setState({
          uf: [
            {
              "sigla": "AC",
              "nome": "Acre",
              "cidades": [
                "Acrelândia",
                "Assis Brasil",
                "Brasiléia",
                "Bujari",
              ]
            }, 
            {
              "sigla": "AL",
              "nome": "Alagoas",
              "cidades": [
                "Água Branca",
                "Anadia",
                "Arapiraca",
                "Atalaia",
              ]
            }
          ],
          selectedValueEstado: '',
          selectedValueCidade: ''
        })
      }

      renderValueChangeEstado = (value) => {
        console.warn(value.sigla)
        this.setState({
          selectedValueEstado: value
        })
      }


      renderValueChangeCidade = (value) => {
        console.warn(value)
        this.setState({
          selectedValueCidade: value
        })
      }

      render() {
        const { selectedValueCidade, selectedValueEstado, uf } = this.state;
        return (
          <View>
            <View >
              <SelectEstados
                selectedValue={selectedValueEstado}
                data={uf}
                onValueChange={this.renderValueChangeEstado} />
            </View>
            <View>
              <SelectCidades selectedValue={selectedValueCidade}
                data={selectedValueEstado}
                onValueChange={this.renderValueChangeCidade} />
            </View>
          </View>
        );
      }
    }