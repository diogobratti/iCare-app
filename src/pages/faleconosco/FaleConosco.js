import React, { Component } from "react";
import { ScrollView, Linking, Text, TouchableOpacity, View } from "react-native";
import { Input, Icon } from "react-native-elements";
import StyleFaleConosco from "../../styles/StyleFaleConosco";
import { navigationOptions } from "../../styles/StyleBase";

export default class FaleConosco extends Component {
  static navigationOptions = {
    ...navigationOptions,
  };

  state = {
    titulo: "",
    descricao: ""
  };

  render() {
    return (
      <View style={StyleFaleConosco.container}>
        <View style={StyleFaleConosco.corpoContainer}>
          <ScrollView>
            <Input
              label="Título"
              onChangeText={titulo => this.setState({ titulo })}
            />

            <Input
              label="Descreva o seu problema/sugestão"
              onChangeText={descricao => this.setState({ descricao })}
              multiline={true}
              numberOfLines={4}
              containerStyle={{ width: '90%', }}
              inputContainerStyle={{
                borderWidth: 1,
                borderRadius: 5,
              }}
            />
          </ScrollView>
        </View>
        <View style={StyleFaleConosco.botaoContainer}>
          <TouchableOpacity
            style={StyleFaleConosco.botaoButton}
            onPress={() => {
              Linking.openURL('mailto:icare.contato@gmail.com?subject=' + this.state.titulo + '&body=' + this.state.descricao)
            }}
          >
            <Text style={StyleFaleConosco.botaoText}>
              Enviar
		        </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}
