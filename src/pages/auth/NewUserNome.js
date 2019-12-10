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
    console.log("NewUSer");
    console.log(this.props.navigation.state.params);
    console.log(this.props.navigation.state.params.anuncio);
    const currentUser = firebase.auth().currentUser;

    let anuncio = this.props.navigation.state.params.anuncio.data();

    this.setState({
      anuncioOriginal: this.props.navigation.state.params.anuncio,
      nome: anuncio.nome,
      email: anuncio.email,
      user: currentUser
    });

    // firebase
    //   .firestore()
    //   .collection("anuncios")
    //   .where("uid", "==", currentUser.uid)
    //   .get()
    //   .then(data => {
    //     console.log(data.docs[0].data());
    //     let anuncio = data.docs[0].data();
    //     this.setState({
    //       anuncioOriginal: anuncio,
    //       nome: anuncio.nome,
    //       email: anuncio.email,
    //       user: currentUser
    //     });
    //   });
    // console.log(this.state);
  }

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
