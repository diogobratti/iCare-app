import React, { Component } from "react";

import { View, Text, ScrollView, TouchableOpacity, ActivityIndicator, Picker, BackHandler } from "react-native";

import { navigationOptions, definicoesBase, Cabecalho } from "../../styles/StyleBase";
import StyleTermo from "../../styles/StyleTermo";

import AsyncStorage from '@react-native-community/async-storage';


export default class TermoServico extends Component {
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
		if (termoservico != null) {
			if (estado != null && municipio != null && regiao != null) {
				this.props.navigation.navigate("ListagemAnuncio", {});
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
	guardarTermo = async () => {
		const timestamp = new Date();

		await AsyncStorage.setItem('termoservico', `${timestamp}`);

	};
	render() {
		if (this.state.isLoading) {
			return (
				<ActivityIndicator />
			)
		}
		const { selectedValueCidade, selectedValueEstado, uf } = this.state;
		return (
			<View style={StyleTermo.container}>
				<View style={StyleTermo.cabecalhoContainer}>
					<Cabecalho />
				</View>
				<View style={StyleTermo.corpoContainer}>
					<ScrollView>
						<View style={StyleTermo.tituloContainer}>
							<Text style={StyleTermo.tituloTexto}>
								Isenção de responsabilidade
							</Text>
						</View>
						<View style={StyleTermo.descricaoContainer}>
							<Text style={StyleTermo.descricaoTexto}>

								As informações e manifestações do ICare não são de responsabilidade dos idealizadores do aplicativo. A finalidade do ICare é restrita a aproximar cuidadores e pessoas que busquem por seus serviços.

								Se você ignorar este aviso e fornecer informações confidenciais em mensagens privadas ou públicas, não haverá obrigação por parte do ICare em manter a informação sigilosa ou de renunciar a atuação contrária a seus interesses.

								Consulte um advogado antes de fazer algo que possa afetar seus direitos.
							</Text>
						</View>
						<View style={StyleTermo.erroContainer}>
							<Text style={StyleTermo.erroTexto}>{this.state.erro}</Text>
						</View>
					</ScrollView>
				</View>
				<View style={StyleTermo.botaoContainer}>
					<TouchableOpacity
						style={StyleTermo.botaoButton}
						onPress={() => {
							this.guardarTermo();
							this.props.navigation.navigate("Localidade", {});
						}}
					>
						<Text style={StyleTermo.botaoText}>
							Concordo com os Termos de Serviço
		                    </Text>
					</TouchableOpacity>
				</View>
			</View>
		)
	}
}