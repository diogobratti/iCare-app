import React, { Component } from "react";
import { ScrollView } from "react-native";
import { Input } from "react-native-elements";
import InputAnuncio from "../componentes/InputAnuncio";
import InputProfissao from "../componentes/InputProfissao";
import InputPreco from "../componentes/InputPreco";
import Button from "./components/Button";
import { navigationOptions } from "../../styles/StyleBase";

export default class NewUserProfissao extends Component {
  state = {
    profissao: 0,
    ...this.props.navigation.state.params.state
  };

  static navigationOptions = {
    ...navigationOptions
  };

  componentDidMount() {
    console.log(this.state);
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
