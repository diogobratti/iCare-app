import React from 'react';

import { View, Text, TouchableOpacity, Image, Linking, StyleSheet } from "react-native";
import { Icon, SocialIcon } from "react-native-elements";
import * as CONSTANTES from "../../data/Constantes";
import { definicoesBase } from "../../styles/StyleBase";
import analytics from '@react-native-firebase/analytics';

const tamanhoIcone = 12;
export default class AvaliacaoTextual extends React.PureComponent {

    constructor() {
        super();
    }

  render() {
    return (
      <View style={style.anuncioContainer}>
      </View>
    );
  }
}


const style = StyleSheet.create({
});
