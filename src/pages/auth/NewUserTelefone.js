import React, { Component } from "react";
import { ScrollView } from "react-native";
import InputTelefone from "../componentes/InputTelefone";
import Button from "./components/Button";

export default class NewUserTelefone extends Component {
  state = this.props.navigation.state.params.state;

  componentDidMount() {
    console.log(this.state);
  }

  render() {
    return (
      <ScrollView>
        <InputTelefone
          onChangeText={telefone => this.setState({ telefone: telefone })}
        />
        <Button
          onPress={() =>
            this.props.navigation.navigate("NewUserEstadoCidade", {
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
