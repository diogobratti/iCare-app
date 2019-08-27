import React, { Component } from "react";
import { ScrollView } from "react-native";
import { Input } from "react-native-elements";
import InputAnuncio from "../componentes/InputAnuncio";
import InputProfissao from "../componentes/InputProfissao";
import InputPreco from "../componentes/InputPreco";
import Button from "./components/Button";
import { navigationOptions } from "../../styles/StyleBase";

export default class NewUserEmail extends Component {
  state = this.props.navigation.state.params.state;

  static navigationOptions = {
    ...navigationOptions,
  };

  componentDidMount() {
    // this.setState({ anuncio: "bla bla bla" });
    // this.setState({ preco: "R$0.000,00" });
    // this.setState({ profissao: "alguma profissao" });
    this.setState({ versaoTermosServico: "v0.1" });
    console.log(this.state);
  }

  render() {
    return (
      <ScrollView>
        <InputProfissao
          onChangeText={profissao => this.setState({ profissao })}
        />
        <InputPreco onChangeText={preco => this.setState({ preco })} />
        <InputAnuncio onChangeText={anuncio => this.setState({ anuncio })} />
        <Button
          onPress={() =>
            this.props.navigation.navigate("NewUserCadastrar", {
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
