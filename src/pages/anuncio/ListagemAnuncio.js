import React, { Component } from "react";
import api from "../../services/api";
import firebase from 'react-native-firebase';

import { View, Text, FlatList, TouchableOpacity, Image } from "react-native";
import Ionicons from 'react-native-vector-icons/Ionicons';
import { SearchBar } from 'react-native-elements';

import Anuncio from "./Anuncio";
import CollectionAnuncio from "../../collections/CollectionAnuncio";

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
      this.collection = firebase.firestore().collection('anuncios');
      this.state = {
        textInput: '',
        loading: true,
        anuncios: [],

        productInfo: {},
        page: 1,
        search: '',
      };
    }

    componentDidMount(){
        // Valid options for source are 'server', 'cache', or
        // 'default'. See https://firebase.google.com/docs/reference/js/firebase.firestore.GetOptions
        // for more information.
        var getOptions = {
            source: 'cache'
        };
        this.unsubscribe = this.collection.
                                   //orderBy('nome','DESC').
                                   //where('nome', '==', 'dbratti').
                                   //https://firebase.google.com/docs/firestore/query-data/query-cursors
                                   //startAfter(last.data().population).
                                   //onSnapshot(this.onCollectionUpdate);
                                   get(getOptions).then(this.onCollectionUpdate);
        //this.loadAnuncios();
    }
  
    componentWillUnmount() {
        this.unsubscribe();
    }
    onCollectionUpdate = (querySnapshot) => {
      const anuncios = [];
      querySnapshot.forEach((doc) => {
        const { 
            ...CollectionAnuncio
        } = doc.data();
        
        anuncios.push({
          key: doc.id,
          doc, // DocumentSnapshot
          //dados do firestore
          ...CollectionAnuncio
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

    loadAnuncios = async (page = 1) => {
        /*
        const response = await api.get(`/products?page=${page}`);

        const { docs, ...productInfo } = response.data;

        this.setState({ 
            docs: [... this.state.docs, ...docs],
            productInfo,
            page 
        });
        */
    };

    loadMore = () => {
        /*
        const { page, productInfo } = this.state;

        if (page == productInfo.pages) return;

        const pageNumber = page + 1;

        this.loadAnuncios(pageNumber);
        */
    }

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
                    contentContainerStyle={StyleAnuncio.list}
                    data={this.state.anuncios}
                    renderItem={({ item }) => <Anuncio {...item} />}
                    onEndReached={this.loadMore}
                    onEndReachedThreshold={0.25}
                />
            </View>
        )
    }
}