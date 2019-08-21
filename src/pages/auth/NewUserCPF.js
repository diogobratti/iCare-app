import React, { Component } from "react";
import { ScrollView, View } from "react-native";
import InputCPF from "../componentes/InputCPF";
import Button from "./components/Button";
import { navigationOptions } from "../../styles/StyleBase";

export default class NewUserCPF extends Component {
  state = this.props.navigation.state.params.state;

  static navigationOptions = {
    ...navigationOptions,
  };

  componentDidMount() {
    console.log(this.state);
  }

  render() {
    return (
      <ScrollView>
        <InputCPF onChangeText={cpf => this.setState({ cpf: cpf })} />
        <Button
          onPress={() =>
            this.props.navigation.navigate("NewUserEmail", {
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
