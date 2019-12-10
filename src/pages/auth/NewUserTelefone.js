import React, { Component } from "react";
import { ScrollView, BackHandler } from "react-native";
import InputTelefone from "../componentes/InputTelefone";
import Button from "./components/Button";
import { navigationOptions } from "../../styles/StyleBase";

export default class NewUserTelefone extends Component {



  constructor(props) {
    super(props);
    this.handleBackButtonClick = (() => {
    //   if (this.navigator && this.navigator.getCurrentRoutes().length > 1){
    //     this.navigator.pop();
        return true; //avoid closing the app
    //   }
    //   return false; //close the app
    }).bind(this) //don't forget bind this, you will remember anyway.
  }

  state = this.props.navigation.state.params.state;

  static navigationOptions = {
    ...navigationOptions,
  };

  async componentDidMount() {
    BackHandler.addEventListener('hardwareBackPress', this.handleBackButtonClick);
    console.log(this.state);
  }
  componentWillUnmount() {
      BackHandler.removeEventListener('hardwareBackPress', this.handleBackButtonClick);
  }

  render() {
    return (
      <ScrollView>
        <InputTelefone
          onChangeText={telefone => this.setState({ telefone: telefone })}
        />
        <Button
          onPress={() =>
            this.props.navigation.navigate("NewUserProfissao", {
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
