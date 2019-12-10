import React, { Component } from "react";
import { ScrollView, Linking, Text, TouchableOpacity, View, BackHandler } from "react-native";
import { Input, Icon } from "react-native-elements";
import StyleFaleConosco from "../../styles/StyleFaleConosco";
import { navigationOptions } from "../../styles/StyleBase";

export default class FaleConosco extends Component {
  static navigationOptions = {
    ...navigationOptions,
  };
  constructor(props) {
    super(props);
    this.handleBackButtonClick = (() => {
    //   if (this.navigator && this.navigator.getCurrentRoutes().length > 1){
    //     this.navigator.pop();
        return true; //avoid closing the app
    //   }
    //   return false; //close the app
    }).bind(this) //don't forget bind this, you will remember anyway.
  }

  state = {
    titulo: "",
    descricao: ""
  };
  async componentDidMount() {
      BackHandler.addEventListener('hardwareBackPress', this.handleBackButtonClick);
  }

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
          <Text style={StyleFaleConosco.corpoText}>Ou entre em contato diretamente conosco pelo email icare.contato@gmail.com e pelas nossas redes sociais.</Text>
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
