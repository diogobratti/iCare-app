import React, { Component } from "react";

import { View, Text } from "react-native";

import { navigationOptions } from "../../styles/StyleBase";
import StyleAnuncio from "../../styles/StyleAnuncio";

export default class VisualizarAnuncio extends Component {
    static navigationOptions = navigationOptions;

    render() {
        const anuncio = this.props.navigation.getParam('anuncio');
        return (
            <View style={StyleAnuncio.container}>
                <Text>{anuncio.nome}</Text>
            </View>
        )
    }
}