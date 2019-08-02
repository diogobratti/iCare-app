

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

//import AsyncStorage from '@react-native-community/async-storage';

import DataLocalidade from '../data/DataLocalidade';


export default class Localidade extends Component {
  static navigationOptions = navigationOptions;
    
    constructor() {
      super();
      this.state = {
		  uf : '',
		  municipio: '',
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
								style={{height: 50, width: 100}}
								onValueChange={(itemValue, itemIndex) =>
									this.setState({uf: itemValue})
								}>
								<Picker.Item label="Java" value="java" />
								<Picker.Item label="JavaScript" value="js" />
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