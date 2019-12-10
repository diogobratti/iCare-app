import React, { Component } from "react";
import { ScrollView } from "react-native";
import InputEmail from "../componentes/InputEmail";
import Button from "./components/Button";

export default class NewUserEmail extends Component {
  state = this.props.navigation.state.params.state;

  componentDidMount() {
    console.log(this.state);
  }

  render() {
    return (
      <ScrollView>
        <InputEmail onChangeText={email => this.setState({ email: email })} />
        <Button
          onPress={() =>
            this.props.navigation.navigate("NewUserTelefone", {
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
