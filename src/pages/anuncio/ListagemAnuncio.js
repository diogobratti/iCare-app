import React, { Component } from "react";
import firebase from 'react-native-firebase';

import { View, Text, FlatList, TouchableOpacity, ActivityIndicator, Platform, Image, ScrollView, BackHandler } from "react-native";
import { SearchBar, Slider, CheckBox } from 'react-native-elements';

import Anuncio from "./Anuncio";
import Propaganda from "./../propaganda/Propaganda";
import CollectionAnuncio from "../../collections/CollectionAnuncio";
import { Provider } from 'react-redux';

import store from '../../reducers/index';

import * as CONSTANTES from '../../data/Constantes';

//import ExemploAnuncios from '../../data/ExemploAnuncios.json';
import AsyncStorage from '@react-native-community/async-storage';

import { navigationOptions, definicoesBase } from "../../styles/StyleBase";
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
import reactotron from "reactotron-react-native";

export default class ListagemAnuncio extends Component {
    static navigationOptions = navigationOptions;

    constructor(props) {
        super(props);
        this.handleBackButtonClick = (() => {
        //   if (this.navigator && this.navigator.getCurrentRoutes().length > 1){
        //     this.navigator.pop();
            return true; //avoid closing the app
        //   }
        //   return false; //close the app
        }).bind(this) //don't forget bind this, you will remember anyway.


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
            lastVisible: {
                orderBy: 0,
                user_uid: 0,
                id: 0,
                doc: null,
            },
            primeiroAnuncio: {
                id: 0,
                doc: null,
                deuAVolta: false,
            },
            refreshing: false,
            search: '',
            mostraMenuFiltro: false,
            limit: CONSTANTES.LISTAGEM_ANUNCIO_QTD_ANUNCIOS_CARREGADOS_POR_VEZ_PADRAO,
            filtroAvaliacao: CONSTANTES.LISTAGEM_ANUNCIO_FILTRO_AVALIACAO,
            orderByValor: CONSTANTES.LISTAGEM_ANUNCIO_ORDERBY_PADRAO,
            filtroPreco: CONSTANTES.LISTAGEM_ANUNCIO_PRECO_MAXIMO,
            filtroProfissaoCuidador: CONSTANTES.LISTAGEM_ANUNCIO_FILTRO_PROFISSAO_CUIDADOR,
            filtroProfissaoTecnicoEnfermagem: CONSTANTES.LISTAGEM_ANUNCIO_FILTRO_PROFISSAO_TECNICO_ENFERMAGEM,
            filtroProfissaoEnfermeiro: CONSTANTES.LISTAGEM_ANUNCIO_FILTRO_PROFISSAO_ENFERMEIRO,
            filtroProfissaoTerapeutaOcupacional: CONSTANTES.LISTAGEM_ANUNCIO_FILTRO_PROFISSAO_TERAPEUTA_OCUPACIONAL,
            filtroProfissaoFisioterapeuta: CONSTANTES.LISTAGEM_ANUNCIO_FILTRO_PROFISSAO_FISIOTERAPEUTA,
            filtroProfissaoNutricionista: CONSTANTES.LISTAGEM_ANUNCIO_FILTRO_PROFISSAO_NUTRICIONISTA,
            estado: null,
            municipio: null,
            microrregiao: null,
        };
    }

    async componentDidMount() {
        BackHandler.addEventListener('hardwareBackPress', this.handleBackButtonClick);
        const estado = await AsyncStorage.getItem(CONSTANTES.ASYNC_ITEM_USUARIO_ESTADO);
        const municipio = await AsyncStorage.getItem(CONSTANTES.ASYNC_ITEM_USUARIO_MUNICIPIO);
        const microrregiao = await AsyncStorage.getItem(CONSTANTES.ASYNC_ITEM_USUARIO_REGIAO);
        const perfil = await AsyncStorage.getItem(CONSTANTES.ASYNC_ITEM_PERFIL);
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
            perfil: perfil,
            primeiroAnuncio: {
                id: 0,
                doc: null,
                deuAVolta: false,
            },
        });
        const collectionOrderBy = this.state.orderByValor == "localidade" ? "cidade" : this.state.orderByValor;
        // Valid options for source are 'server', 'cache', or
        // 'default'. See https://firebase.google.com/docs/reference/js/firebase.firestore.GetOptions
        // for more information.
        this.unsubscribe = this.collection;
        this.unsubscribe = this.unsubscribe.where('microrregiao', '==', this.state.microrregiao);
        this.unsubscribe = this.unsubscribe.where('perfil', '==', CONSTANTES.ASYNC_USER_PERFIL_FORNECEDOR);
        /*
        this.unsubscribe = this.unsubscribe.where('preco', '<=', this.state.filtroPreco);
        if(!filtroProfissaoCuidador) this.unsubscribe = this.unsubscribe.where('profissao', '!=', "Cuidador");
        if(!filtroProfissaoTecnicoEnfermagem) this.unsubscribe = this.unsubscribe.where('profissao', '!=', "Técnico em Enfermagem");
        if(!filtroProfissaoEnfermeiro) this.unsubscribe = this.unsubscribe.where('profissao', '!=', "Enfermeiro");
        if(!filtroProfissaoTerapeutaOcupacional) this.unsubscribe = this.unsubscribe.where('profissao', '!=', "Terapeuta Ocupacional");
        if(!filtroProfissaoFisioterapeuta) this.unsubscribe = this.unsubscribe.where('profissao', '!=', "Fisioterapeuta");
        if(!filtroProfissaoNutricionista) this.unsubscribe = this.unsubscribe.where('profissao', '!=', "Nutricionista");
        */
        //console.warn(JSON.stringify(this.props));
        this.unsubscribe = this.unsubscribe.orderBy(collectionOrderBy, 'ASC');
        this.unsubscribe = this.unsubscribe.orderBy('id', 'ASC');
        this.unsubscribe = this.unsubscribe.limit(this.state.limit);
        this.unsubscribe = this.unsubscribe.get(this.getOptions).then(this.onCollectionUpdate);
    }

    componentWillUnmount() {
        if (typeof this.unsubscribe === "function"){
          this.unsubscribe();
        }
        BackHandler.removeEventListener('hardwareBackPress', this.handleBackButtonClick);
    }

    onCollectionUpdate = (querySnapshot) => {
        var ultimo_item_pelo_orderBy = this.state.lastVisible.orderBy;
        var ultimo_item_pelo_user_uid = this.state.lastVisible.user_uid;
        var ultimo_item_pelo_id = this.state.lastVisible.id;
        var ultimo_item = this.state.lastVisible.doc;
        var primeiro_anuncio_id = this.state.primeiroAnuncio.id;
        var primeiro_anuncio_doc = this.state.primeiroAnuncio.doc;
        var primeiro_anuncio_deuAVolta = this.state.primeiroAnuncio.deuAVolta;
        const campo_orderBy = this.state.orderByValor == "localidade" ? "cidade" : this.state.orderByValor;
        querySnapshot.forEach((doc) => {
            if (doc.id == primeiro_anuncio_id || primeiro_anuncio_deuAVolta){
                primeiro_anuncio_deuAVolta = true;
            } else {
                const {
                    ...CollectionAnuncio
                } = doc.data();

                this.arrayholder.push({
                    key: doc.id,
                    doc, // DocumentSnapshot
                    //dados do firestore
                    ...CollectionAnuncio
                });
                if (campo_orderBy == "cidade") {
                    ultimo_item_pelo_orderBy = doc.cidade;
                } else {
                    ultimo_item_pelo_orderBy = doc.preco;
                }
                ultimo_item_pelo_user_uid = doc.user_uid;
                ultimo_item_pelo_id = doc.id;
                ultimo_item = doc;
                if(primeiro_anuncio_id == 0){
                    primeiro_anuncio_doc = doc;
                    primeiro_anuncio_id = doc.id;
                }
            }
        });
        if(primeiro_anuncio_id != 0){
            this.setState({
                primeiroAnuncio: {
                    id : primeiro_anuncio_id,
                    doc : primeiro_anuncio_doc,
                    deuAVolta : primeiro_anuncio_deuAVolta,
                },
            });
        }
        this.setState({
            anuncios: this.arrayholder,
            lastVisible: {
                doc: ultimo_item,
                orderBy: ultimo_item_pelo_orderBy,
                user_uid: ultimo_item_pelo_user_uid,
                id: ultimo_item_pelo_id,
            },
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
            filtroProfissaoTerapeutaOcupacional } = this.state;
        //passing the inserted text in textinput
        const newData = this.arrayholder.filter(function (item) {
            //applying filter for the inserted text in search bar
            const textData = text.toUpperCase();
            const itemDataNome = item.nome ? item.nome.toUpperCase() : ''.toUpperCase();
            const itemDataPreco = item.preco ? item.preco.replace('R$','').replace(',','.') : '0';
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
        if(this.state.primeiroAnuncio.deuAVolta){
            return null;
        }
        const collectionOrderBy = this.state.orderByValor == "localidade" ? "cidade" : this.state.orderByValor;
        this.unsubscribe = this.collection.
            where('microrregiao', '==', this.state.microrregiao).
            where('perfil', '==', CONSTANTES.ASYNC_USER_PERFIL_FORNECEDOR).
            orderBy(collectionOrderBy, 'ASC').
            orderBy('id', 'ASC').
            startAfter(this.state.lastVisible.id).
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
            } else {
                if(this.state.anuncios.length == 0 && this.arrayholder.length == 0) {
                    return (
                        <View style={StyleAnuncio.FiltrarContainer}>
                            <TouchableOpacity
                                //style={styles.productButton}
                                // onPress={() => {
                                //     this.props.navigation.navigate('Loading');
                                // }}
                            >
                                <Text style={StyleAnuncio.pesquisaFiltroTexto}>Sem anúncios nesta região.
                                  {/* {
                                    (this.state.perfil == CONSTANTES.ASYNC_USER_PERFIL_FORNECEDOR) ?
                                    "Seja o primeiro a se cadastrar! Anuncie aqui." :
                                    ""

                                  } */}
                                </Text>
                            </TouchableOpacity>
                        </View>
                        )
                } else {
                    return null;
                }
            }
        }
        catch (error) {
            console.log(error);
        }
    };

    render() {
        if (this.state.mostraMenuFiltro) {
            return (
                <View style={StyleAnuncio.FiltrarContainer}>
                    <View style={StyleAnuncio.scrollViewFiltrarContainer}>
                        <ScrollView>
                            {/*
                            <View style={StyleAnuncio.orderByContainer}>
                                <View style={StyleAnuncio.orderByCabecalhoContainer}>
                                    <Text style={StyleAnuncio.orderByTexto}>
                                        Ordenar por:
                            </Text>
                                </View>
                                <View style={StyleAnuncio.orderByItemContainer}>
                                    <CheckBox
                                        title='Preço'
                                        checkedIcon='dot-circle-o'
                                        uncheckedIcon='circle-o'
                                        checked={this.state.orderByValor === 'preco'}
                                        onPress={() => {
                                            this.setState({ orderByValor: 'preco', anuncios : null })
                                            this.arrayholder = [];
                                            this.loadMore();
                                        }
                                    }
                                    />
                                </View>
                                <View style={StyleAnuncio.orderByItemContainer}>
                                    <CheckBox
                                        title='Localidade'
                                        checkedIcon='dot-circle-o'
                                        uncheckedIcon='circle-o'
                                        checked={this.state.orderByValor === 'localidade'}
                                        onPress={() => {
                                                this.setState({ orderByValor: 'localidade', anuncios : null })
                                                this.arrayholder = [];
                                                this.loadMore();
                                            }
                                        }
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
                                            */}
                            <View style={StyleAnuncio.filtroContainer}>
                                <View style={StyleAnuncio.filtroItemContainer}>
                                    <Text style={StyleAnuncio.filtroItemTexto}>
                                        Preço
                            </Text>
                                    <Text style={StyleAnuncio.filtroItemSliderTexto}>
                                        Até R$ {this.state.filtroPreco},00
                            </Text>
                                    <Slider
                                        maximumValue={CONSTANTES.LISTAGEM_ANUNCIO_PRECO_MAXIMO}
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
                                        checkedIcon='check-square-o'
                                        uncheckedIcon='square-o'
                                        checked={this.state.filtroProfissaoCuidador}
                                        onPress={() => this.setState({ filtroProfissaoCuidador: !this.state.filtroProfissaoCuidador })}
                                    />
                                    <CheckBox
                                        title='Técnico em enfermagem'
                                        checkedIcon='check-square-o'
                                        uncheckedIcon='square-o'
                                        checked={this.state.filtroProfissaoTecnicoEnfermagem}
                                        onPress={() => this.setState({ filtroProfissaoTecnicoEnfermagem: !this.state.filtroProfissaoTecnicoEnfermagem })}
                                    />
                                    <CheckBox
                                        title='Enfermeiro'
                                        checkedIcon='check-square-o'
                                        uncheckedIcon='square-o'
                                        checked={this.state.filtroProfissaoEnfermeiro}
                                        onPress={() => this.setState({ filtroProfissaoEnfermeiro: !this.state.filtroProfissaoEnfermeiro })}
                                    />
                                    <CheckBox
                                        title='Terapeuta Ocupacional'
                                        checkedIcon='check-square-o'
                                        uncheckedIcon='square-o'
                                        checked={this.state.filtroProfissaoTerapeutaOcupacional}
                                        onPress={() => this.setState({ filtroProfissaoTerapeutaOcupacional: !this.state.filtroProfissaoTerapeutaOcupacional })}
                                    />
                                    <CheckBox
                                        title='Fisioterapeuta'
                                        checkedIcon='check-square-o'
                                        uncheckedIcon='square-o'
                                        checked={this.state.filtroProfissaoFisioterapeuta}
                                        onPress={() => this.setState({ filtroProfissaoFisioterapeuta: !this.state.filtroProfissaoFisioterapeuta })}
                                    />
                                    <CheckBox
                                        title='Nutricionista'
                                        checkedIcon='check-square-o'
                                        uncheckedIcon='square-o'
                                        checked={this.state.filtroProfissaoNutricionista}
                                        onPress={() => this.setState({ filtroProfissaoNutricionista: !this.state.filtroProfissaoNutricionista })}
                                    />
                                </View>
                                {/*
                        <View style={StyleAnuncio.filtroItemContainer}>
                            <Text style={StyleAnuncio.filtroItemTexto}>
                                Localidade
                            </Text>
                            <CheckBox
                                title='Procurar somente na minha região'
                                checkedIcon='check-square-o'
                                uncheckedIcon='square-o'
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
                                this.setState({ mostraMenuFiltro: false });
                                this.SearchFilterFunction(this.state.search)
                            }}
                        >
                            <Text style={StyleAnuncio.aplicarFiltroText}>
                                Aplicar
                        </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            );
        }
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
                                this.setState({ mostraMenuFiltro: true });
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
