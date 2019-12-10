import React, { Component } from "react";
import { ScrollView, View } from "react-native";
import InputNome from "../componentes/InputNome";
import Button from "./components/Button";
import firebase from "react-native-firebase";
import { navigationOptions } from "../../styles/StyleBase";

export default class NewUserNome extends Component {
  static navigationOptions = {
    ...navigationOptions,
    headerLeft: <View />
  };

  componentDidMount() {
    const currentUser = firebase.auth().currentUser;
    this.setState({ user: currentUser });

    firebase
      .firestore()
      .collection("anuncios")
      .where("uid", "==", currentUser.uid)
      .get()
      .then(data => {
        this.setState({ anuncio: data.docs[0].data() });
      });
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
