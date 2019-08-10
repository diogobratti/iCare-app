import React, { Component } from "react";
//import api from "../../services/api";
import firebase from 'react-native-firebase';

import { View, Text, FlatList, TouchableOpacity, ActivityIndicator, Platform, Image } from "react-native";
import ExemploAnuncios from '../../data/ExemploAnuncios.json';

import { navigationOptions } from "../../styles/StyleBase";

export default class IncluirExemplos extends Component {
    static navigationOptions = navigationOptions;
    
    constructor() {
      super();
      this.dados = ExemploAnuncios;
      this.unsubscribe = null;
      this.collection = firebase.firestore().collection('anuncios');
    }

    componentDidMount(){
        // Valid options for source are 'server', 'cache', or
        // 'default'. See https://firebase.google.com/docs/reference/js/firebase.firestore.GetOptions
        // for more information.
        var getOptions = {
            source: 'default',//'cache',
        };
        //this.unsubscribe = this.collection.get(getOptions).then(this.onCollectionUpdate);
    }
  
    

    render() {
        return (
                    <View>
                    </View>
        )
    }
}