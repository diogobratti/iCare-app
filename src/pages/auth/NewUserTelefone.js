import React, { Component } from "react";
import { ScrollView, BackHandler, View, Text } from "react-native";
import InputTelefone from "../componentes/InputTelefone";
import Button from "./components/Button";
import { navigationOptions } from "../../styles/StyleBase";
import { TextInputMask } from 'react-native-masked-text'


export default class NewUserTelefone extends Component {

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

  // state = this.props.navigation.state.params.state;

  state = {
    telefone: "",
    erroTelefone: "",
    ...this.props.navigation.state.params.state
  };

  static navigationOptions = {
    ...navigationOptions,
  };

  async componentDidMount() {
    BackHandler.addEventListener('hardwareBackPress', this.handleBackButtonClick);
    console.log(this.state);
  }
  componentWillUnmount() {
      BackHandler.removeEventListener('hardwareBackPress', this.handleBackButtonClick);
  }

  render() {
    return (
      <ScrollView>

        <Text>Qual é o seu telefone de contato?</Text>

        <TextInputMask
          type={"cel-phone"}
          value={this.state.telefone}
          ref={(ref) => this.telefoneField = ref}
          onChangeText={
            telefone => this.setState({
              telefone: telefone
            })
          }
          // label="Qual é o seu telefone de contato?"
          placeholder="ex: (00) 00000-0000"
          // leftIcon={
          //   <Icon name="phone" type="antdesign" size={24} color="#007aff" />
          // }
          // errorMessage="Digite um número de telefone válido"
          // onChangeText={onChangeText}
        />
        <View>
						<Text>{this.state.erroTelefone}</Text>
        </View>

        <Button
          onPress={() =>{
            
            if(this.telefoneField.isValid() && this.state.telefone !== "") {
              this.props.navigation.navigate("NewUserProfissao", {
                state: this.state
                })
            } else {
              this.setState({ erroTelefone: "Telefone inválido" });
            }
          }}
        >
          Continuar
        </Button>
      </ScrollView>
    );
  }
}
