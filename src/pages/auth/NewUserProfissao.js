import React, { Component } from "react";
import { ScrollView, BackHandler } from "react-native";
import { Input } from "react-native-elements";
import InputAnuncio from "../componentes/InputAnuncio";
import InputProfissao from "../componentes/InputProfissao";
import InputPreco from "../componentes/InputPreco";
import Button from "./components/Button";
import { navigationOptions } from "../../styles/StyleBase";

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
        <InputPreco onChangeText={preco => this.setState({ preco })} />
        <Button
          onPress={() =>
            this.props.navigation.navigate("NewUserAnuncio", {
              state: this.state
            })
          }
        >
          Continuar
        </Button>
      </ScrollView>
    );
  }
}
