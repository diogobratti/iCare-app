import React, { Component } from "react";
import { ScrollView } from "react-native";
import InputNome from "../componentes/InputNome";
import Button from "./components/Button";
import firebase from "react-native-firebase";

export default class NewUserNome extends Component {
  componentDidMount() {
    this.setState({ user: firebase.auth().currentUser });
    console.log(this.state);
  }

  render() {
    return (
      <ScrollView>
        <InputNome onChangeText={nome => this.setState({ nome: nome })} />
        <Button
          onPress={() =>
            this.props.navigation.navigate("NewUserCPF", { state: this.state })
          }
        >
          Continuar
        </Button>
      </ScrollView>
    );
  }
}
