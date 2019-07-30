	//ordernar menor distancia, melhor avaliacao e preco. 
	//filtrar por profissao preco e avaliacao
	const precoMaximo = 2000;
	import React, { Component } from "react";

	import { View, Text, ScrollView, TouchableOpacity } from "react-native";
	import Ionicons from 'react-native-vector-icons/Ionicons';
	import { Slider, CheckBox } from 'react-native-elements';

	import { navigationOptions, definicoesBase } from "../../styles/StyleBase";
	import StyleAnuncio, { 
		    anuncioIconeAvaliacao,
		} from "../../styles/StyleAnuncio";


	export default class ListagemAnuncioFiltro extends Component {
	    static navigationOptions = navigationOptions;constructor(props){
			super(props);

			this.state = {
				orderByValor: "localidade",    
				precoFiltro: precoMaximo,
				avaliacaoFiltro: 5,
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
		                    <View style={StyleAnuncio.orderByItemContainer}>
		                        <CheckBox
		                            title='Avaliação'
		                            checkedIcon='dot-circle-o'
		                            uncheckedIcon='circle-o'
									checked={this.state.orderByValor === 'avaliacao'}
									onPress={() => this.setState({orderByValor: 'avaliacao'})}
		                        />
		                    </View>
		                </View>
		                <View style={StyleAnuncio.filtroContainer}>
		                    <View style={StyleAnuncio.filtroItemContainer}>
		                        <Text style={StyleAnuncio.filtroItemTexto}>
		                            Preço
		                        </Text>
		                        <Text style={StyleAnuncio.filtroItemSliderTexto}>
		                            Até R$ {this.state.precoFiltro},00
		                        </Text>
		                        <Slider
		                            maximumValue={precoMaximo}
		                            minimumValue={0}
		                            minimumTrackTintColor={definicoesBase.corBarraSlider}
		                            maximumTrackTintColor={definicoesBase.corBarraSlider}
		                            thumbTintColor={definicoesBase.corBotaoSlider}
		                            step={1} 
		                            value={this.state.precoFiltro}
		                            onValueChange={(precoFiltro) => this.setState({ precoFiltro })}
		                        />
		                    </View>
		                    <View style={StyleAnuncio.filtroItemContainer}>
		                        <Text style={StyleAnuncio.filtroItemTexto}>
		                            Avaliação
		                        </Text>
		                        <Text style={StyleAnuncio.filtroItemSliderTexto}>
		                            A partir de <Ionicons name="ios-star" size={anuncioIconeAvaliacao.size} color={anuncioIconeAvaliacao.color} /> <Text style={StyleAnuncio.anuncioAvaliacao}>{this.state.avaliacaoFiltro}</Text>
		                        </Text>
		                        <Slider
		                            maximumValue={5}
		                            minimumValue={0}
		                            minimumTrackTintColor={definicoesBase.corBarraSlider}
		                            maximumTrackTintColor={definicoesBase.corBarraSlider}
		                            thumbTintColor={definicoesBase.corBotaoSlider}
		                            step={0.5} 
		                            value={this.state.avaliacaoFiltro}
		                            onValueChange={(avaliacaoFiltro) => this.setState({ avaliacaoFiltro })}
		                        />
		                    </View>
		                    <View style={StyleAnuncio.filtroItemContainer}>
		                        <Text style={StyleAnuncio.filtroItemTexto}>
		                            Profissão
		                        </Text>
		                        <CheckBox
		                            title='Cuidador'
		                            checkedIcon='dot-circle-o'
		                            uncheckedIcon='circle-o'
																checked={this.state.orderByValor === 'avaliacao'}
																onPress={() => this.setState({orderByValor: 'avaliacao'})}
		                        />
		                        <CheckBox
		                            title='Técnico em enfermagem'
		                            checkedIcon='dot-circle-o'
		                            uncheckedIcon='circle-o'
																checked={this.state.orderByValor === 'avaliacao'}
																onPress={() => this.setState({orderByValor: 'avaliacao'})}
		                        />
		                        <CheckBox
		                            title='Enfermeiro'
		                            checkedIcon='dot-circle-o'
		                            uncheckedIcon='circle-o'
																checked={this.state.orderByValor === 'avaliacao'}
																onPress={() => this.setState({orderByValor: 'avaliacao'})}
		                        />
		                        <CheckBox
		                            title='Terapeuta Ocupacional'
		                            checkedIcon='dot-circle-o'
		                            uncheckedIcon='circle-o'
																checked={this.state.orderByValor === 'avaliacao'}
																onPress={() => this.setState({orderByValor: 'avaliacao'})}
		                        />
		                        <CheckBox
		                            title='Fisioterapeuta'
		                            checkedIcon='dot-circle-o'
		                            uncheckedIcon='circle-o'
																checked={this.state.orderByValor === 'avaliacao'}
																onPress={() => this.setState({orderByValor: 'avaliacao'})}
		                        />
		                        <CheckBox
		                            title='Nutricionista'
		                            checkedIcon='dot-circle-o'
		                            uncheckedIcon='circle-o'
																checked={this.state.orderByValor === 'avaliacao'}
																onPress={() => this.setState({orderByValor: 'avaliacao'})}
		                        />
		                    </View>
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
		                </View>
		            </ScrollView>
		        </View>
		        <View style={StyleAnuncio.aplicarFiltroContainer}>
		            <TouchableOpacity 
		                    style={StyleAnuncio.aplicarFiltroButton} 
		                    onPress={() => {
		                        this.props.navigation.navigate("Chat");
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