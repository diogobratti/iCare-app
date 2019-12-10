//antes pedir estado e cidade, se nao estiver logado
const orderByPadrao = 'preco'; //'localidade';
const precoMaximo = 2000;

import React, { Component } from "react";
import firebase from 'react-native-firebase';

import { View, Text, FlatList, TouchableOpacity, ActivityIndicator, Platform, Image, } from "react-native";
import { SearchBar } from 'react-native-elements';

import Anuncio from "./Anuncio";
import Propaganda from "./../propaganda/Propaganda";
import CollectionAnuncio from "../../collections/CollectionAnuncio";

//import ExemploAnuncios from '../../data/ExemploAnuncios.json';
import AsyncStorage from '@react-native-community/async-storage';

import { navigationOptions } from "../../styles/StyleBase";
import StyleAnuncio, {
    //anuncioIconeAvaliacao,
    searchBarContainerStyle,
    searchBarSearchIcon,
    searchBarInputStyle,
    searchBarInputContainerStyle,
    searchBarleftIconContainerStyle,
    searchBarPlaceholderTextColor,
    //iconeFiltro,
} from "../../styles/StyleAnuncio";

export default class ListagemAnuncio extends Component {
    static navigationOptions = navigationOptions;

    constructor() {
        super();
        this.getOptions = {
            source: 'default',//'cache',
        }
        this.unsubscribe = null;
        this.collection = firebase.firestore().collection('anuncios');
        this.qtdAnuncios = 0;
        this.propagandaAposAnuncios = 5;
        this.temPropagandaAposAnuncios = false;
        this.arrayholder = [];
        this.state = {
            textInput: '',
            isLoading: true,
            anuncios: [],
            limit: 9,
            lastVisible: 0,
            refreshing: false,
            search: '',
            orderByValor: orderByPadrao,
            filtroPreco: precoMaximo,
            filtroProfissaoCuidador: true,
            filtroProfissaoTecnicoEnfermagem: true,
            filtroProfissaoEnfermeiro: true,
            filtroProfissaoTerapeutaOcupacional: true,
            filtroProfissaoFisioterapeuta: true,
            filtroProfissaoNutricionista: true,
            estado: null,
            municipio: null,
            microrregiao: null,
        };
    }

    async componentDidMount() {
        const estado = await AsyncStorage.getItem('estado');
        const municipio = await AsyncStorage.getItem('municipio');
        const microrregiao = await AsyncStorage.getItem('microrregiao');
        //this.municipio = await AsyncStorage.getItem('municipio');
        this.setState({
            orderByValor: this.props.navigation.getParam('orderByValor', orderByPadrao),
            filtroPreco: this.props.navigation.getParam('filtroPreco', precoMaximo),
            filtroProfissaoCuidador: this.props.navigation.getParam('filtroProfissaoCuidador', true),
            filtroProfissaoTecnicoEnfermagem: this.props.navigation.getParam('filtroProfissaoTecnicoEnfermagem', true),
            filtroProfissaoEnfermeiro: this.props.navigation.getParam('filtroProfissaoEnfermeiro', true),
            filtroProfissaoTerapeutaOcupacional: this.props.navigation.getParam('filtroProfissaoTerapeutaOcupacional', true),
            filtroProfissaoFisioterapeuta: this.props.navigation.getParam('filtroProfissaoFisioterapeuta', true),
            filtroProfissaoNutricionista: this.props.navigation.getParam('filtroProfissaoNutricionista', true),
            estado: estado,
            municipio: municipio,
            microrregiao: microrregiao,
        });
        // Valid options for source are 'server', 'cache', or
        // 'default'. See https://firebase.google.com/docs/reference/js/firebase.firestore.GetOptions
        // for more information.
        this.unsubscribe = this.collection.
            orderBy(this.state.orderByValor, 'ASC').
            limit(this.state.limit).
            //orderBy('nome','DESC').
            //where('nome', '==', 'dbratti').
            //https://firebase.google.com/docs/firestore/query-data/query-cursors
            //startAfter(last.data().population).
            //onSnapshot(this.onCollectionUpdate);
            get(this.getOptions).then(this.onCollectionUpdate);
        //this.loadAnuncios();
        /*
        ExemploAnuncios.forEach(function(obj) {
            firebase.firestore().collection('anuncios').add({
                nome: obj.nome,
                foto: obj.foto,
                preco: obj.preco,
                profissao: obj.profissao,
                uf: obj.uf,
                telefone: obj.telefone,
                cidade: obj.cidade,
                anuncio: obj.anuncio
            }).then(function(docRef) {
                console.log("Document written with ID: ", docRef.id);
            })
            .catch(function(error) {
                console.error("Error adding document: ", error);
            });
        });
        */
    }

    componentWillUnmount() {
        this.unsubscribe();
    }
    onCollectionUpdate = (querySnapshot) => {
        querySnapshot.forEach((doc) => {
            const {
                ...CollectionAnuncio
            } = doc.data();

            this.arrayholder.push({
                key: doc.id,
                doc, // DocumentSnapshot
                //dados do firestore
                ...CollectionAnuncio
            });
        });
        var ultima = this.state.lastVisible+this.state.limit;
        this.setState({
            anuncios: this.arrayholder,
            lastVisible: ultima,
            isLoading: false,
        });
        this.SearchFilterFunction(this.state.search);
    }
    clear = () => {
        this.search.clear();
    };
    SearchFilterFunction(text) {
        //passing the inserted text in textinput
        const newData = this.arrayholder.filter(function (item) {
            //applying filter for the inserted text in search bar
            const itemData = item.nome ? item.nome.toUpperCase() : ''.toUpperCase();
            const textData = text.toUpperCase();
            return itemData.indexOf(textData) > -1;
        });
        this.setState({
            //setting the filtered newData on datasource
            //After setting the data it will automatically re-render the view
            anuncios: newData,
            search: text,
        });
    }

    
    updateSearch = search => {
      this.setState({ search });
    };

    loadMore = () => {
        console.warn(this.state.lastVisible);
        this.unsubscribe = this.collection.
        orderBy(this.state.orderByValor, 'ASC').
        startAfter(this.state.lastVisible).
        limit(this.state.limit).
        //orderBy('nome','DESC').
        //where('nome', '==', 'dbratti').
        //https://firebase.google.com/docs/firestore/query-data/query-cursors
        //startAfter(last.data().population).
        //onSnapshot(this.onCollectionUpdate);
        get(this.getOptions).then(this.onCollectionUpdate);
    }
    renderItem = (item) => {
        if (this.qtdAnuncios % this.propagandaAposAnuncios == 4 && this.temPropagandaAposAnuncios) {
            this.qtdAnuncios++;
            return (
                <View>
                    <Anuncio {...item} navigation={this.props.navigation} />
                    <Propaganda navigation={this.props.navigation} />
                </View>
            );
        } else {
            this.qtdAnuncios++;
            return (
                <Anuncio {...item} navigation={this.props.navigation} />
            );

        }
    }
    // Render Footer
    renderFooter = () => {
        try {
            // Check If Loading
            if (this.state.isLoading) {
                return (
                    <ActivityIndicator />
                )
            }
            else {
                return null;
            }
        }
        catch (error) {
            console.log(error);
        }
    };

    render() {
        return (
            <View style={StyleAnuncio.container}>
                <View style={StyleAnuncio.pesquisaContainer}>
                    <View style={StyleAnuncio.pesquisaBarraContainer}>
                        <SearchBar
                            placeholder="Busque por nome, preço..."
                            //onChangeText={this.updateSearch}
                            value={this.state.search}
                            searchIcon={searchBarSearchIcon}
                            containerStyle={searchBarContainerStyle}
                            inputStyle={searchBarInputStyle}
                            onChangeText={text => this.SearchFilterFunction(text)}
                            onClear={text => this.SearchFilterFunction('')}
                            inputContainerStyle={searchBarInputContainerStyle}
                            leftIconContainerStyle={searchBarleftIconContainerStyle}
                            placeholderTextColor={searchBarPlaceholderTextColor}
                        />
                    </View>
                    <View style={StyleAnuncio.pesquisaFiltroContainer}>
                        <TouchableOpacity
                            //style={styles.productButton} 
                            onPress={() => {
                                this.props.navigation.navigate("ListagemAnuncioFiltro", { precoMaximo: precoMaximo, orderByPadrao: orderByPadrao });
                            }}
                        >
                            <Text style={StyleAnuncio.pesquisaFiltroTexto}>Filtrar{this.state.estado}{this.state.municipio}{this.state.microrregiao}</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <FlatList
                    contentContainerStyle={StyleAnuncio.list}
                    data={this.state.anuncios}
                    renderItem={({ item }) => this.renderItem(item)}
                    onEndReached={this.loadMore}
                    onEndReachedThreshold={0.25}
                    //ItemSeparatorComponent={this.ListViewItemSeparator}
                    enableEmptySections={true}
                    keyExtractor={(item, index) => index.toString()}
                    // Footer (Activity Indicator)
                    ListFooterComponent={this.renderFooter}
                />
            </View>
        )
    }
}