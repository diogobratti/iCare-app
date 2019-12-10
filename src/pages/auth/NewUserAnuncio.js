import React, { Component } from "react";
import { ScrollView, BackHandler } from "react-native";
import { Input } from "react-native-elements";
import InputAnuncio from "../componentes/InputAnuncio";
import InputProfissao from "../componentes/InputProfissao";
import InputPreco from "../componentes/InputPreco";
import Button from "./components/Button";
import { navigationOptions } from "../../styles/StyleBase";

export default class NewUserAnuncio extends Component {
  state = this.props.navigation.state.params.state;

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

  componentDidMount() {
    BackHandler.addEventListener('hardwareBackPress', this.handleBackButtonClick);
    // this.setState({ anuncio: "bla bla bla" });
    // this.setState({ preco: "R$0.000,00" });
    // this.setState({ profissao: "alguma profissao" });
    this.setState({ versaoTermosServico: "v0.1" });
    console.log(this.state);
  }
  componentWillUnmount() {
      BackHandler.removeEventListener('hardwareBackPress', this.handleBackButtonClick);
  }

  render() {
    return (
      <ScrollView>
       
        <InputAnuncio onChangeText={anuncio => this.setState({ anuncio })} />
        <Button
          onPress={() =>
            this.props.navigation.navigate("NewUserCadastrar", {
              state: this.state
            })
          }
        >
          Cadastrar Anúncio
        </Button>
      </ScrollView>
    );
  }
}
