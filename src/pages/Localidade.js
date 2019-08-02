

//ordernar menor distancia, melhor avaliacao e preco. 
//filtrar por profissao preco e avaliacao
import React, { Component } from "react";

import { View, Text, ScrollView, TouchableOpacity, Picker } from "react-native";
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Slider, CheckBox } from 'react-native-elements';

import { navigationOptions, definicoesBase } from "../styles/StyleBase";
import StyleAnuncio, { 
	anuncioIconeAvaliacao,
} from "../styles/StyleAnuncio";
import StyleLocalidade from "../styles/StyleLocalidade";

//import AsyncStorage from '@react-native-community/async-storage';

import DataLocalidade from '../data/DataLocalidade';


export default class Localidade extends Component {
  static navigationOptions = navigationOptions;
    
    constructor() {
	  super();
	  this.lista_uf = DataLocalidade.UF;
	  this.lista_municipio = DataLocalidade.Municípios;
      this.state = {
		  uf : '',
		  municipio: '',
		  uf_id : null,
		  municipio_id: null,
      };
    }
/*
    storeData = async () => {
      try {
        await AsyncStorage.setItem('teste', "valor qualquer");
        await AsyncStorage.setItem('uf', this.uf);
        await AsyncStorage.setItem('municipio', this.municipio);
      } catch (e) {
        // saving error
      }
    }
*/  
	render() {
		let ufItens = this.lista_uf.map( (s, i) => {
            return <Picker.Item key={i} value={s} label={s} />
        });
		let municipioItens = this.lista_municipio.map( (s, i) => {
            return <Picker.Item key={i} value={s.Município} label={s.Município} />
        });

		return (
		    <View style={StyleAnuncio.FiltrarContainer}>
		        <View style={StyleAnuncio.scrollViewFiltrarContainer}>
		                <View style={StyleAnuncio.orderByContainer}>
		                    <View style={StyleAnuncio.orderByCabecalhoContainer}>
		                        <Text style={StyleAnuncio.orderByTexto}>
		                            Escolha a unidade federativa {this.state.uf}
		                        </Text>
								<Picker
								selectedValue={this.state.uf}
								style={{height: 50}}
								onValueChange={(itemValue, itemIndex) => {
									this.setState({uf: itemValue});
									this.setState({uf_id: itemIndex});
									}
								}>
								{ufItens}
								</Picker>
		                    </View>
		                    <View style={StyleAnuncio.orderByCabecalhoContainer}>
		                        <Text style={StyleAnuncio.orderByTexto}>
		                            Escolha o município {this.state.municipio_id}{this.state.municipio}
		                        </Text>
								<Picker
								selectedValue={this.state.municipio}
								style={{height: 50}}
								onValueChange={(itemValue, itemIndex) => {
									this.setState({municipio: itemValue});
									this.setState({municipio_id: itemIndex});
									}
								}>
								{municipioItens}
								</Picker>
		                    </View>
		                </View>
		        </View>
		        <View style={StyleAnuncio.aplicarFiltroContainer}>
		            <TouchableOpacity 
		                    style={StyleAnuncio.aplicarFiltroButton} 
		                    onPress={() => {
		                        this.props.navigation.navigate("ListagemAnuncio",{ 
														});
		                    }}
		                >
		                    <Text style={StyleAnuncio.aplicarFiltroText}>
		                        Avançar
		                    </Text>
		                </TouchableOpacity>
		        </View>
		    </View>
		)
  }
}