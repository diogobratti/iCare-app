import React, { Component } from "react";
import { ScrollView } from "react-native";
import InputCPF from "../componentes/InputCPF";
import Button from "./components/Button";

export default class NewUserCPF extends Component {
  state = this.props.navigation.state.params.state;

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
