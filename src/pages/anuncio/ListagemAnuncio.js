import React, { Component } from "react";
import firebase from 'react-native-firebase';

import { View, Text, FlatList, TouchableOpacity, ActivityIndicator, Platform, Image, } from "react-native";
import { SearchBar } from 'react-native-elements';

import Anuncio from "./Anuncio";
import Propaganda from "./../propaganda/Propaganda";
import CollectionAnuncio from "../../collections/CollectionAnuncio";
import { Provider } from 'react-redux';

import store from '../../reducers/index';

import * as CONSTANTES from '../../data/Constantes';

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

    constructor(props) {
        super(props);
        this.getOptions = {
            source: 'default',//'cache',
        }
        this.unsubscribe = null;
        this.collection = firebase.firestore().collection('anuncios');
        this.qtdAnuncios = 0;
        this.arrayholder = [];
        this.state = {
            textInput: '',
            isLoading: true,
            anuncios: [],
            lastVisible: 0,
            refreshing: false,
            search: '',
            limit: CONSTANTES.LISTAGEM_ANUNCIO_QTD_ANUNCIOS_CARREGADOS_POR_VEZ_PADRAO,
            /*
            orderByValor: CONSTANTES.LISTAGEM_ANUNCIO_ORDERBY_PADRAO,
            filtroPreco: CONSTANTES.LISTAGEM_ANUNCIO_PRECO_MAXIMO,
            filtroProfissaoCuidador: CONSTANTES.LISTAGEM_ANUNCIO_FILTRO_PROFISSAO_CUIDADOR,
            filtroProfissaoTecnicoEnfermagem: CONSTANTES.LISTAGEM_ANUNCIO_FILTRO_PROFISSAO_TECNICO_ENFERMAGEM,
            filtroProfissaoEnfermeiro: CONSTANTES.LISTAGEM_ANUNCIO_FILTRO_PROFISSAO_ENFERMEIRO,
            filtroProfissaoTerapeutaOcupacional: CONSTANTES.LISTAGEM_ANUNCIO_FILTRO_PROFISSAO_TERAPEUTA_OCUPACIONAL,
            filtroProfissaoFisioterapeuta: CONSTANTES.LISTAGEM_ANUNCIO_FILTRO_PROFISSAO_FISIOTERAPEUTA,
            filtroProfissaoNutricionista: CONSTANTES.LISTAGEM_ANUNCIO_FILTRO_PROFISSAO_NUTRICIONISTA,
            */
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
            /*
            orderByValor: this.props.navigation.getParam('orderByValor', CONSTANTES.LISTAGEM_ANUNCIO_ORDERBY_PADRAO),
            filtroPreco: this.props.navigation.getParam('filtroPreco', CONSTANTES.LISTAGEM_ANUNCIO_PRECO_MAXIMO),
            filtroProfissaoCuidador: this.props.navigation.getParam('filtroProfissaoCuidador', CONSTANTES.LISTAGEM_ANUNCIO_FILTRO_PROFISSAO_CUIDADOR),
            filtroProfissaoTecnicoEnfermagem: this.props.navigation.getParam('filtroProfissaoTecnicoEnfermagem', CONSTANTES.LISTAGEM_ANUNCIO_FILTRO_PROFISSAO_TECNICO_ENFERMAGEM),
            filtroProfissaoEnfermeiro: this.props.navigation.getParam('filtroProfissaoEnfermeiro', CONSTANTES.LISTAGEM_ANUNCIO_FILTRO_PROFISSAO_ENFERMEIRO),
            filtroProfissaoTerapeutaOcupacional: this.props.navigation.getParam('filtroProfissaoTerapeutaOcupacional', CONSTANTES.LISTAGEM_ANUNCIO_FILTRO_PROFISSAO_TERAPEUTA_OCUPACIONAL),
            filtroProfissaoFisioterapeuta: this.props.navigation.getParam('filtroProfissaoFisioterapeuta', CONSTANTES.LISTAGEM_ANUNCIO_FILTRO_PROFISSAO_FISIOTERAPEUTA),
            filtroProfissaoNutricionista: this.props.navigation.getParam('filtroProfissaoNutricionista', CONSTANTES.LISTAGEM_ANUNCIO_FILTRO_PROFISSAO_NUTRICIONISTA),
            */
            estado: estado,
            municipio: municipio,
            microrregiao: microrregiao,
        });
        const collectionOrderBy = this.props.orderByValor == "localidade" ? "cidade" : this.props.orderByValor;
        // Valid options for source are 'server', 'cache', or
        // 'default'. See https://firebase.google.com/docs/reference/js/firebase.firestore.GetOptions
        // for more information.
        this.unsubscribe = this.collection;
        //this.unsubscribe = this.unsubscribe.where('microrregiao', '==', this.state.microrregiao);
        /*
        this.unsubscribe = this.unsubscribe.where('preco', '<=', this.state.filtroPreco);
        if(!filtroProfissaoCuidador) this.unsubscribe = this.unsubscribe.where('profissao', '!=', "Cuidador");
        if(!filtroProfissaoTecnicoEnfermagem) this.unsubscribe = this.unsubscribe.where('profissao', '!=', "Técnico em Enfermagem");
        if(!filtroProfissaoEnfermeiro) this.unsubscribe = this.unsubscribe.where('profissao', '!=', "Enfermeiro");
        if(!filtroProfissaoTerapeutaOcupacional) this.unsubscribe = this.unsubscribe.where('profissao', '!=', "Terapeuta Ocupacional");
        if(!filtroProfissaoFisioterapeuta) this.unsubscribe = this.unsubscribe.where('profissao', '!=', "Fisioterapeuta");
        if(!filtroProfissaoNutricionista) this.unsubscribe = this.unsubscribe.where('profissao', '!=', "Nutricionista");
        */
       console.warn(JSON.stringify(this.props));
        //this.unsubscribe = this.unsubscribe.orderBy(collectionOrderBy, 'ASC');
        this.unsubscribe = this.unsubscribe.limit(this.state.limit);
        this.unsubscribe = this.unsubscribe.get(this.getOptions).then(this.onCollectionUpdate);
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
        var ultima = this.state.lastVisible + this.state.limit;
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
        const { filtroPreco,
            filtroProfissaoCuidador,
            filtroProfissaoEnfermeiro,
            filtroProfissaoFisioterapeuta,
            filtroProfissaoNutricionista,
            filtroProfissaoTecnicoEnfermagem,
            filtroProfissaoTerapeutaOcupacional } = this.props;
        //passing the inserted text in textinput
        const newData = this.arrayholder.filter(function (item) {
            //applying filter for the inserted text in search bar
            const textData = text.toUpperCase();
            const itemDataNome = item.nome ? item.nome.toUpperCase() : ''.toUpperCase();
            const itemDataPreco = item.preco ? item.preco.toUpperCase() : '0'.toUpperCase();
            const itemDataProfissao = item.profissao ? item.profissao.toUpperCase() : ''.toUpperCase();
            const itemDataTelefone = item.telefone ? item.telefone.toUpperCase() : ''.toUpperCase();
            //const itemDataCidade = item.cidade ? item.cidade.toUpperCase() : ''.toUpperCase();
            //const itemDataMicroregiao = item.microrregiao ? item.microrregiao.toUpperCase() : ''.toUpperCase();
            if (itemDataPreco > filtroPreco) return false;
            if (!filtroProfissaoCuidador && (itemDataProfissao == "Cuidador".toUpperCase() || itemDataProfissao == "Cuidadora".toUpperCase())) return false;
            if (!filtroProfissaoTecnicoEnfermagem && (itemDataProfissao == "Técnico em Enfermagem".toUpperCase() || itemDataProfissao == "Técnica em Enfermagem".toUpperCase())) return false;
            if (!filtroProfissaoEnfermeiro && (itemDataProfissao == "Enfermeiro".toUpperCase() || itemDataProfissao == "Enfermeira".toUpperCase())) return false;
            if (!filtroProfissaoTerapeutaOcupacional && (itemDataProfissao == "Terapeuta Ocupacional".toUpperCase() || itemDataProfissao == "Terapeuta Ocupacional".toUpperCase())) return false;
            if (!filtroProfissaoFisioterapeuta && (itemDataProfissao == "Fisioterapeuta".toUpperCase() || itemDataProfissao == "Fisioterapeuta".toUpperCase())) return false;
            if (!filtroProfissaoNutricionista && (itemDataProfissao == "Nutricionista".toUpperCase() || itemDataProfissao == "Nutricionista".toUpperCase())) return false;
            const apareceNoFiltro = (
                itemDataNome.indexOf(textData) > -1
                || itemDataPreco.indexOf(textData) > -1
                || itemDataProfissao.indexOf(textData) > -1
                || itemDataTelefone.indexOf(textData) > -1
                //|| itemDataCidade.indexOf(textData) > -1 
                //|| itemDataMicroregiao.indexOf(textData) > -1
            );
            //console.warn(itemDataPreco);
            return apareceNoFiltro;
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
            orderBy(this.props.orderByValor, 'ASC').
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
        if (this.qtdAnuncios % CONSTANTES.LISTAGEM_ANUNCIO_PROPAGANDA_APOS_ANUNCIO == CONSTANTES.LISTAGEM_ANUNCIO_PROPAGANDA_APOS_ANUNCIO - 1
            && CONSTANTES.LISTAGEM_ANUNCIO_TEM_PROPAGANDA_APOS_ANUNCIO) {
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
            <Provider store={store}>
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
                                    this.props.navigation.navigate("ListagemAnuncioFiltro");
                                }}
                            >
                                <Text style={StyleAnuncio.pesquisaFiltroTexto}>Filtrar</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <FlatList
                        contentContainerStyle={StyleAnuncio.list}
                        data={this.state.anuncios}
                        renderItem={({ item }) => this.renderItem(item)}
                        //onEndReached={this.loadMore}
                        onEndReachedThreshold={0.25}
                        //ItemSeparatorComponent={this.ListViewItemSeparator}
                        enableEmptySections={true}
                        keyExtractor={(item, index) => index.toString()}
                        // Footer (Activity Indicator)
                        ListFooterComponent={this.renderFooter}
                    />
                </View>
            </Provider>
        )
    }
}