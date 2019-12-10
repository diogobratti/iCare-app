import React, { Component } from "react";
import { ScrollView, Linking, Text, TouchableHighlight } from "react-native";
import { Input, Icon } from "react-native-elements";
import Button from "./components/Button";
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
	  containerStyle={{ width: '90%',  }}
          inputContainerStyle={{
             borderWidth: 1,
             borderRadius: 5,
          }}
        />

        <TouchableHighlight onPress={() => Linking.openURL('mailto:icare.contato@gmail.com?subject=' + this.state.titulo + '&body=' + this.state.descricao)}>
	  <Text> Enviar </Text>
        </TouchableHighlight>
      </ScrollView>
    );
  }
}
