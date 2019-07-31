	//ordernar menor distancia, melhor avaliacao e preco. 
	//filtrar por profissao preco e avaliacao
	import React, { Component } from "react";

	import { View, Text, ScrollView, TouchableOpacity } from "react-native";
	import Ionicons from 'react-native-vector-icons/Ionicons';
	import { Slider, CheckBox } from 'react-native-elements';

	import { navigationOptions, definicoesBase } from "../../styles/StyleBase";
	import StyleAnuncio, { 
		    anuncioIconeAvaliacao,
		} from "../../styles/StyleAnuncio";


	export default class ListagemAnuncioFiltro extends Component {
			static navigationOptions = navigationOptions;

		constructor(props){
			super(props);

			this.precoMaximo = this.props.navigation.getParam('precoMaximo');
			this.orderByPadrao = this.props.navigation.getParam('orderByPadrao');

			this.state = {
				orderByValor: this.orderByPadrao,    
				filtroPreco: this.precoMaximo,
				filtroAvaliacao: 5,
				filtroProfissaoCuidador: true,
				filtroProfissaoTecnicoEnfermagem: true,
				filtroProfissaoEnfermeiro: true,
				filtroProfissaoTerapeutaOcupacional: true,
				filtroProfissaoFisioterapeuta: true,
				filtroProfissaoNutricionista: true,
			};
		}

	    render() {
		return (
		    <View style={StyleAnuncio.FiltrarContainer}>
		        <View style={StyleAnuncio.scrollViewFiltrarContainer}>
		            <ScrollView>
		                <View style={StyleAnuncio.orderByContainer}>
		                    <View style={StyleAnuncio.orderByCabecalhoContainer}>
		                        <Text style={StyleAnuncio.orderByTexto}>
		                            Ordenar por:
		                        </Text>
		                    </View>
		                    <View style={StyleAnuncio.orderByItemContainer}>
		                        <CheckBox
		                            title='Localidade'
		                            checkedIcon='dot-circle-o'
		                            uncheckedIcon='circle-o'
									checked={this.state.orderByValor === 'localidade'}
									onPress={() => this.setState({orderByValor: 'localidade'})}
		                        />
		                    </View>
		                    <View style={StyleAnuncio.orderByItemContainer}>
		                        <CheckBox
		                            title='Preço'
		                            checkedIcon='dot-circle-o'
		                            uncheckedIcon='circle-o'
									checked={this.state.orderByValor === 'preco'}
									onPress={() => this.setState({orderByValor: 'preco'})}
		                        />
		                    </View>
												{/* 
		                    <View style={StyleAnuncio.orderByItemContainer}>
		                        <CheckBox
		                            title='Avaliação'
		                            checkedIcon='dot-circle-o'
		                            uncheckedIcon='circle-o'
									checked={this.state.orderByValor === 'avaliacao'}
									onPress={() => this.setState({orderByValor: 'avaliacao'})}
		                        />
												</View>
												*/}
		                </View>
		                <View style={StyleAnuncio.filtroContainer}>
		                    <View style={StyleAnuncio.filtroItemContainer}>
		                        <Text style={StyleAnuncio.filtroItemTexto}>
		                            Preço
		                        </Text>
		                        <Text style={StyleAnuncio.filtroItemSliderTexto}>
		                            Até R$ {this.state.filtroPreco},00
		                        </Text>
		                        <Slider
		                            maximumValue={this.precoMaximo}
		                            minimumValue={0}
		                            minimumTrackTintColor={definicoesBase.corBarraSlider}
		                            maximumTrackTintColor={definicoesBase.corBarraSlider}
		                            thumbTintColor={definicoesBase.corBotaoSlider}
		                            step={1} 
		                            value={this.state.filtroPreco}
		                            onValueChange={(filtroPreco) => this.setState({ filtroPreco })}
		                        />
		                    </View>
												{/*
		                    <View style={StyleAnuncio.filtroItemContainer}>
		                        <Text style={StyleAnuncio.filtroItemTexto}>
		                            Avaliação
		                        </Text>
		                        <Text style={StyleAnuncio.filtroItemSliderTexto}>
		                            A partir de <Ionicons name="ios-star" size={anuncioIconeAvaliacao.size} color={anuncioIconeAvaliacao.color} /> <Text style={StyleAnuncio.anuncioAvaliacao}>{this.state.filtroAvaliacao}</Text>
		                        </Text>
		                        <Slider
		                            maximumValue={5}
		                            minimumValue={0}
		                            minimumTrackTintColor={definicoesBase.corBarraSlider}
		                            maximumTrackTintColor={definicoesBase.corBarraSlider}
		                            thumbTintColor={definicoesBase.corBotaoSlider}
		                            step={0.5} 
		                            value={this.state.filtroAvaliacao}
		                            onValueChange={(filtroAvaliacao) => this.setState({ filtroAvaliacao })}
		                        />
												</View>
												*/}
		                    <View style={StyleAnuncio.filtroItemContainer}>
		                        <Text style={StyleAnuncio.filtroItemTexto}>
		                            Profissão
		                        </Text>
		                        <CheckBox
		                            title='Cuidador'
		                            checkedIcon='dot-circle-o'
		                            uncheckedIcon='circle-o'
																checked={this.state.filtroProfissaoCuidador}
																onPress={() => this.setState({filtroProfissaoCuidador: !this.state.filtroProfissaoCuidador})}
		                        />
		                        <CheckBox
		                            title='Técnico em enfermagem'
		                            checkedIcon='dot-circle-o'
		                            uncheckedIcon='circle-o'
																checked={this.state.filtroProfissaoTecnicoEnfermagem}
																onPress={() => this.setState({filtroProfissaoTecnicoEnfermagem: !this.state.filtroProfissaoTecnicoEnfermagem})}
		                        />
		                        <CheckBox
		                            title='Enfermeiro'
		                            checkedIcon='dot-circle-o'
		                            uncheckedIcon='circle-o'
																checked={this.state.filtroProfissaoEnfermeiro}
																onPress={() => this.setState({filtroProfissaoEnfermeiro: !this.state.filtroProfissaoEnfermeiro})}
		                        />
		                        <CheckBox
		                            title='Terapeuta Ocupacional'
		                            checkedIcon='dot-circle-o'
		                            uncheckedIcon='circle-o'
																checked={this.state.filtroProfissaoTerapeutaOcupacional}
																onPress={() => this.setState({filtroProfissaoTerapeutaOcupacional: !this.state.filtroProfissaoTerapeutaOcupacional})}
		                        />
		                        <CheckBox
		                            title='Fisioterapeuta'
		                            checkedIcon='dot-circle-o'
		                            uncheckedIcon='circle-o'
																checked={this.state.filtroProfissaoFisioterapeuta}
																onPress={() => this.setState({filtroProfissaoFisioterapeuta: !this.state.filtroProfissaoFisioterapeuta})}
		                        />
		                        <CheckBox
		                            title='Nutricionista'
		                            checkedIcon='dot-circle-o'
		                            uncheckedIcon='circle-o'
																checked={this.state.filtroProfissaoNutricionista}
																onPress={() => this.setState({filtroProfissaoNutricionista: !this.state.filtroProfissaoNutricionista})}
		                        />
		                    </View>
												{/* 
		                    <View style={StyleAnuncio.filtroItemContainer}>
		                        <Text style={StyleAnuncio.filtroItemTexto}>
		                            Localidade
		                        </Text>
		                        <CheckBox
		                            title='Procurar somente na minha região'
		                            checkedIcon='dot-circle-o'
		                            uncheckedIcon='circle-o'
																checked={this.state.orderByValor === 'avaliacao'}
																onPress={() => this.setState({orderByValor: 'avaliacao'})}
		                        />
		                        <Text style={StyleAnuncio.filtroItemTexto}>
		                            Ver mais cidades
		                        </Text>
												</View>
												*/}
		                </View>
		            </ScrollView>
		        </View>
		        <View style={StyleAnuncio.aplicarFiltroContainer}>
		            <TouchableOpacity 
		                    style={StyleAnuncio.aplicarFiltroButton} 
		                    onPress={() => {
		                        this.props.navigation.navigate("ListagemAnuncio",{ 
															orderByValor: this.state.orderByValor,
															filtroPreco: this.state.filtroPreco,
															filtroProfissaoCuidador: this.state.filtroProfissaoCuidador,
															filtroProfissaoTecnicoEnfermagem: this.state.filtroProfissaoTecnicoEnfermagem,
															filtroProfissaoEnfermeiro: this.state.filtroProfissaoEnfermeiro,
															filtroProfissaoTerapeutaOcupacional: this.state.filtroProfissaoTerapeutaOcupacional,
															filtroProfissaoFisioterapeuta: this.state.filtroProfissaoFisioterapeuta,
															filtroProfissaoNutricionista: this.state.filtroProfissaoNutricionista,
														});
		                    }}
		                >
		                    <Text style={StyleAnuncio.aplicarFiltroText}>
		                        Aplicar
		                    </Text>
		                </TouchableOpacity>
		        </View>
		    </View>
		)
	    }
	}