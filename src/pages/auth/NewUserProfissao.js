import React, { Component } from "react";
import { ScrollView, BackHandler, View, Text } from "react-native";
import { Input } from "react-native-elements";
import InputAnuncio from "../componentes/InputAnuncio";
import InputProfissao from "../componentes/InputProfissao";
import InputPreco from "../componentes/InputPreco";
import Button from "./components/Button";
import { navigationOptions } from "../../styles/StyleBase";
import { TextInputMask } from 'react-native-masked-text'

export default class NewUserProfissao extends Component {

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
    profissao: 0,
    preco: "",
    erroPreco: "",
    ...this.props.navigation.state.params.state
  };

  static navigationOptions = {
    ...navigationOptions
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

        <InputProfissao
          selectedValue={this.state.profissao}
          onValueChange={(itemValue, itemIndex) =>
            this.setState({ profissao: itemValue })
          }
        />

        <Text>Quanto você cobra por turno (12 horas)?</Text>
        <TextInputMask
          type={"money"}
          options={{
            precision: 2,
            separator: ',',
            delimiter: '.',
            unit: 'R$',
            suffixUnit: ''
          }}
          value={this.state.preco}
          ref={(ref) => this.precoField = ref}
          onChangeText={preco => this.setState({ preco })} 
          placeholder="ex: R$120,00"
        />
        <View>
            <Text>{this.state.erroPreco}</Text>
        </View>

        <Button
          onPress={() =>{
            if(this.precoField.isValid() && this.state.preco !== "") {
              this.props.navigation.navigate("NewUserAnuncio", {
                state: this.state
                })
            } else {
              this.setState({ erroPreco: "Digite um valor numérico válido" });
            }
          }}
        >
          Continuar
        </Button>
      </ScrollView>
    );
  }
}
