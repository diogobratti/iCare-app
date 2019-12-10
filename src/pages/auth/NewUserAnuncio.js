import React, { Component } from "react";
import { ScrollView } from "react-native";
import { Input } from "react-native-elements";
import InputAnuncio from "../componentes/InputAnuncio";
import Button from "./components/Button";

export default class NewUserEmail extends Component {
  state = this.props.navigation.state.params.state;

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
        {/* <InputAnuncio onChangeText={anuncio => this.setState({ anuncio })} /> */}
        <Input onChangeText={profissao => this.setState({ profissao })} />
        <Input onChangeText={preco => this.setState({ preco })} />
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
