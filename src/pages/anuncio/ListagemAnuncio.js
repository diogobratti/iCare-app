import React, { Component } from "react";
import api from "../../services/api";
import apiDb from "../../services/apiDb";

import { View, Text, FlatList, TouchableOpacity, Image } from "react-native";
import Ionicons from 'react-native-vector-icons/Ionicons';
import { SearchBar } from 'react-native-elements';

import Anuncio from "./Anuncio";

import { navigationOptions } from "../../styles/StyleBase";
import StyleAnuncio, { 
            anuncioIconeAvaliacao,
            searchBarContainerStyle, 
            searchBarSearchIcon,
            searchBarInputStyle, 
            searchBarInputContainerStyle,
            searchBarleftIconContainerStyle,
            searchBarPlaceholderTextColor,
            iconeFiltro
        } from "../../styles/StyleAnuncio";

export default class ListagemAnuncio extends Component {
    static navigationOptions = navigationOptions;
    
    constructor() {
      super();
      this.unsubscribe = null;
      this.db = new apiDb('anuncios');;
      this.state = {
        textInput: '',
        loading: true,
        todos: [],
        anuncios: [],

        productInfo: {},
        docs: [],
        page: 1,
        search: '',
      };
    }

    componentDidMount(){
        this.unsubscribe = this.db.onSnapshot(this.onCollectionUpdate);
        this.loadProducts();
    }
  
    componentWillUnmount() {
        this.unsubscribe();
    }
    onCollectionUpdate = (querySnapshot) => {
      const anuncios = [];
      querySnapshot.forEach((doc) => {
        const { 
            nome,
            profissao,
            avaliacao,
            valor_turno,
            localidade 
        } = doc.data();
        
        anuncios.push({
          key: doc.id,
          doc, // DocumentSnapshot
          //dados do firestore
          nome,
          profissao,
          avaliacao,
          valor_turno,
          localidade,
        });
      });
    
      this.setState({ 
        anuncios,
        loading: false,
     });
    }
  
    updateSearch = search => {
      this.setState({ search });
    };

    loadProducts = async (page = 1) => {
        const response = await api.get(`/products?page=${page}`);

        const { docs, ...productInfo } = response.data;

        this.setState({ 
            docs: [... this.state.docs, ...docs],
            productInfo,
            page 
        });
    };

    loadMore = () => {
        const { page, productInfo } = this.state;

        if (page == productInfo.pages) return;

        const pageNumber = page + 1;

        this.loadProducts(pageNumber);
    }

    renderItem = ({ item }) => (
        <Anuncio />
    )

    render() {
        const { search } = this.state;
        return (
            <View style={StyleAnuncio.container}>
                <View style={StyleAnuncio.pesquisaContainer}>
                    <View style={StyleAnuncio.pesquisaBarraContainer}>
                        <SearchBar
                        placeholder="Busque por nome, preço..."
                        onChangeText={this.updateSearch}
                        value={search}
                        searchIcon={searchBarSearchIcon}
                        containerStyle={searchBarContainerStyle}
                        inputStyle={searchBarInputStyle}
                        inputContainerStyle={searchBarInputContainerStyle}
                        leftIconContainerStyle={searchBarleftIconContainerStyle}
                        placeholderTextColor = {searchBarPlaceholderTextColor}
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
                    data={this.state.anuncios}
                    renderItem={({ item }) => <Anuncio {...item} />}
                />
            </View>
        )
    }
}