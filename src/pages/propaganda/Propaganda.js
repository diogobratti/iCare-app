import React from 'react';

import { View, Text, TouchableOpacity } from "react-native";
import StylePropaganda from "../../styles/StylePropaganda";

export default class Propaganda extends React.PureComponent {

  render() {
    return (
      <View style={StylePropaganda.propagandaContainer}>
            <TouchableOpacity 
                //style={styles.productButton} 
                onPress={() => {
                    this.props.navigation.navigate("VisualizarAnuncio");
                }}
            >
                <Text style={StylePropaganda.propagandaText}>Aqui vai uma propaganda!</Text>
            </TouchableOpacity>
      </View> 
    );
  }
}