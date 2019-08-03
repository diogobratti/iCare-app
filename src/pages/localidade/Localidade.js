

//ordernar menor distancia, melhor avaliacao e preco. 
//filtrar por profissao preco e avaliacao
import React, { Component } from "react";

import { View, Text, ScrollView, TouchableOpacity, Picker } from "react-native";
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Slider, CheckBox } from 'react-native-elements';

import { navigationOptions, definicoesBase, Cabecalho } from "../../styles/StyleBase";
import StyleLocalidade from "../../styles/StyleLocalidade";

//import { AsyncStorage} from '@react-native-community/async-storage';

import DataLocalidade from '../../data/DataLocalidade';


export default class Localidade extends Component {
	static navigationOptions = navigationOptions;

	constructor() {
		super();
		this.lista_uf = DataLocalidade.UF;
		this.lista_municipio = DataLocalidade.Municípios;
		this.lista_municipio_reduzida = [];
		this.state = {
			lista_municipio_filtrado: [],
			uf: '',
			municipio: '',
			uf_id: null,
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
	filtraMunicipio(uf){

		municipios = [];
		this.setState({lista_municipio_filtrado : municipios});

		this.lista_municipio.map((s, i) => {
			if (s.Estado == uf
				|| (s.Estado == "Brasília" && uf == "Distrito Federal"))
				{
					municipios= [...municipios, s];
			}
		});
		this.setState({lista_municipio_filtrado : municipios});
		this.lista_municipio_reduzida = municipios;
		console.log(JSON.stringify(this.lista_municipio_reduzida));
		console.log(JSON.stringify(municipios));
	}
	render() {
		let ufItens = this.lista_uf.map((s, i) => {
			return <Picker.Item key={i} value={s} label={s} />
		});
		let municipioItens = this.lista_municipio_reduzida.map((s, i) => {
			<Picker.Item key={s.Microrregião} value={s.Município} label={s.Município} />
		});

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
							<Picker
								selectedValue={this.state.uf}
								mode="dialog"
								style={StyleLocalidade.itemCamposPicker}
								itemStyle={StyleLocalidade.itemCamposPickerItem}
								onValueChange={(itemValue, itemIndex) => {
									this.setState({ uf: itemValue });
									this.setState({ uf_id: itemIndex });
									this.filtraMunicipio(itemValue);
								}
								}>
								<Picker.Item key={-1} value={''} label={'--- Selecione ---'} />
								{ufItens}
							</Picker>
						</View>
						<View style={StyleLocalidade.itemCamposEspacoContainer}>
							<Text></Text>
						</View>
						<View style={StyleLocalidade.itemCamposContainer}>
							<Text style={StyleLocalidade.itemCamposTexto}>
								Escolha o município 
							</Text>
							<Picker
								selectedValue={this.state.municipio}
								mode="dialog"
								style={StyleLocalidade.itemCamposPicker}
								onValueChange={(itemValue, itemIndex) => {
									this.setState({ municipio: itemValue });
									this.setState({ municipio_id: itemIndex });
								}
								}>
								<Picker.Item key={-1} value={''} label={'--- Selecione ---'} />
								{municipioItens}
							</Picker>
						</View>
					</View>
				</View>
				<View style={StyleLocalidade.botaoContainer}>
					<TouchableOpacity
						style={StyleLocalidade.botaoButton}
						onPress={() => {
							this.props.navigation.navigate("ListagemAnuncio", {
							});
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