import React, { Component } from "react";
import { ScrollView, View } from "react-native";
import InputNome from "../componentes/InputNome";
import Button from "./components/Button";
import firebase from "react-native-firebase";
import { navigationOptions } from "../../styles/StyleBase";
import { withNavigation } from "react-navigation";

export default class NewUserNome extends Component {
  static navigationOptions = {
    ...navigationOptions,
    headerLeft: <View />
  };

  constructor(props) {
    // console.log(this.props);
    super(props);
    this.state = {
      nome: ""
    };
  }

  componentDidMount() {
    this._bootstrapAsync();
  }

  _bootstrapAsync = async () => {
    console.log("NewUSerNome");
    console.log(this.props.navigation.state.params);
    console.log(this.props.navigation.state.params.anuncio);
    const currentUser = firebase.auth().currentUser;

    await this.props.navigation.state.params.anuncio.get().then(anuncio => {
      // this.anuncio = anuncio;
      console.log(anuncio.data());
      this.anuncio = anuncio.data();
      console.log(this.anuncio);
    });

    this.setState({
      anuncioOriginal: this.props.navigation.state.params.anuncio,
      nome: this.anuncio.nome,
      email: this.anuncio.email,
      foto: this.anuncio.foto,
      user: currentUser
    });
  };

  render() {
    return (
      <ScrollView>
        <InputNome
          onChangeText={nome => this.setState({ nome: nome })}
          value={this.state.nome}
        />
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
