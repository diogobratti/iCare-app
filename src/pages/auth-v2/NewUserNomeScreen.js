import React, { Component } from "react";
import { ScrollView } from "react-native";
import InputNome from "../componentes/InputNome";
import Button from "./components/Button";
// import firebase from "react-native-firebase";
import { navigationOptions } from "../../styles/StyleBase";
// import { withNavigation } from "react-navigation";
// import AsyncStorage from "@react-native-community/async-storage";

export default class NewUserNome extends Component {
  static navigationOptions = {
    ...navigationOptions,
  };

  state = {
    nome: ""
  };

  // constructor(props) {
  // super(props);
  // this.handleBackButtonClick = (() => {
  //   //   if (this.navigator && this.navigator.getCurrentRoutes().length > 1){
  //   //     this.navigator.pop();
  //   return true; //avoid closing the app
  //   //   }
  //   //   return false; //close the app
  // }).bind(this) //don't forget bind this, you will remember anyway.

  // this.state = {
  //   nome: ""
  // };
  // }


  // _bootstrapAsync = async () => {
  //   // console.log("NewUSerNome");
  //   // console.log(this.props.navigation.state.params);
  //   // console.log(this.props.navigation.state.params.anuncio);
  //   const currentUser = firebase.auth().currentUser;

  //   await this.props.navigation.state.params.anuncio.get().then(anuncio => {
  //     // this.anuncio = anuncio;
  //     // console.log(anuncio.data());
  //     this.anuncio = anuncio.data();
  //     // console.log(this.anuncio);
  //   });

  //   this.setState({
  //     anuncioOriginal: this.props.navigation.state.params.anuncio,
  //     nome: this.anuncio.nome,
  //     email: this.anuncio.email,
  //     foto: this.anuncio.foto,
  //     user: currentUser,
  //     estado: await AsyncStorage.getItem("estado"),
  //     municipio: await AsyncStorage.getItem("municipio"),
  //     regiao: await AsyncStorage.getItem("microrregiao")
  //   });
  // };
  // async componentDidMount() {
  //   this._bootstrapAsync();
  //   BackHandler.addEventListener('hardwareBackPress', this.handleBackButtonClick);
  // }
  // componentWillUnmount() {
  //   BackHandler.removeEventListener('hardwareBackPress', this.handleBackButtonClick);
  // }

  render() {
    return (
      <ScrollView>
        <InputNome
          onChangeText={nome => this.setState({ nome: nome })}
          value={this.state.nome}
        />
        <Button
          onPress={() =>
            this.props.navigation.navigate("NewUserEmail")
          }
        >
          Continuar
        </Button>
      </ScrollView>
    );
  }
}
