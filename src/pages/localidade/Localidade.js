

//ordernar menor distancia, melhor avaliacao e preco. 
//filtrar por profissao preco e avaliacao
import React, { Component } from "react";

import { View, Text, ScrollView, TouchableOpacity, ActivityIndicator, Picker, BackHandler } from "react-native";
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Slider, CheckBox } from 'react-native-elements';

import { navigationOptions, definicoesBase, Cabecalho } from "../../styles/StyleBase";
import StyleLocalidade from "../../styles/StyleLocalidade";

import AsyncStorage from '@react-native-community/async-storage';

//fazer foreach
import DataLocalidade from '../../data/DataLocalidade.json';
import SelectEstados from '../componentes/SelectEstados';
import SelectCidades from '../componentes/SelectCidades';


export default class Localidade extends Component {
	static navigationOptions = navigationOptions;

	state = { uf: null, selectedValueEstado: null, selectedValueCidade: null, erro: null, isLoading: true }
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
		const estado = await AsyncStorage.getItem('estado');
		const municipio = await AsyncStorage.getItem('municipio');
		const regiao = await AsyncStorage.getItem('microrregiao');
		const perfil = await AsyncStorage.getItem('perfil');
		if (estado != null && municipio != null && regiao != null) {
			if(perfil != null){
				this.props.navigation.navigate("ListagemAnuncio", {});
			} else {
				this.props.navigation.navigate("EscolhePerfil", {});
			}
		}
		this.setState({
			uf: DataLocalidade,
			selectedValueEstado: '',
			selectedValueCidade: '',
			estado: estado,
			municipio: municipio,
			regiao: regiao,
			isLoading: false,
		});
	}

	componentWillUnmount() {
			BackHandler.removeEventListener('hardwareBackPress', this.handleBackButtonClick);
	}

	renderValueChangeEstado = (value) => {
		this.setState({
			selectedValueEstado: value,
			estado: value.nome,
		})
	}


	renderValueChangeCidade = (value) => {
		this.setState({
			selectedValueCidade: value,
			municipio: value.Município,
			regiao: value.Microrregião,
		})
	}

	guardarLocalidade = async () => {
		const { estado, municipio, regiao } = this.state;

		await AsyncStorage.setItem('estado', `${estado}`);
		await AsyncStorage.setItem('municipio', `${municipio}`);
		await AsyncStorage.setItem('microrregiao', `${regiao}`);

	};
	render() {
		if (this.state.isLoading) {
			return (
				<ActivityIndicator />
			)
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
								onValueChange={this.renderValueChangeEstado} />
						</View>
						<View style={StyleLocalidade.itemCamposEspacoContainer}>
							<Text></Text>
						</View>
						<View style={StyleLocalidade.itemCamposContainer}>
							<Text style={StyleLocalidade.itemCamposTexto}>
								Escolha o município
							</Text>
							<SelectCidades selectedValue={selectedValueCidade}
								data={selectedValueEstado}
								style={StyleLocalidade.itemCamposPicker}
								itemStyle={StyleLocalidade.itemCamposPickerItem}
								onValueChange={this.renderValueChangeCidade} />
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
								this.guardarLocalidade();
								this.props.navigation.navigate("EscolhePerfil", {});
							} else {
								mensagem = "Por favor, escolha o estado e o município.";
								this.setState({ erro: mensagem });
							}
						}}
					>
						<Text style={StyleLocalidade.botaoText}>
							Avançar
		                    </Text>
					</TouchableOpacity>
				</View>
			</View>
		)
	}
}