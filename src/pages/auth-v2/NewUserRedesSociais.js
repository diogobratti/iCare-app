import React, { Component } from "react";
import { ScrollView, BackHandler } from "react-native";
import InputInstagram from "../componentes/InputInstagram";
import Button from "./components/Button";
import { navigationOptions } from "../../styles/StyleBase";
import * as CONSTANTES from '../../data/Constantes';
import LocalStorage from '../../services/LocalStorage';


export default class NewUserRedesSociaisScreen extends Component {

  state = {
    instagram: "",
    erroInstagram: "",
  };

  static navigationOptions = {
    ...navigationOptions,
  };

  componentDidMount() {
    this._bootstrapAsync();
  }

  _bootstrapAsync = async () => {

    this.setState({
      instagram: await LocalStorage.getItem(CONSTANTES.ASYNC_ITEM_USUARIO_INSTAGRAM),
    });

    this.isCadastro = await LocalStorage.getItem(CONSTANTES.ASYNC_ITEM_CADASTRO_COMPLETO) === null
  };

  validate = (instagram) => {
    const expression = /(?:@)([A-Za-z0-9_](?:(?:[A-Za-z0-9_]|(?:\.(?!\.))){0,28}(?:[A-Za-z0-9_]))?)/g;
    return expression.test(String(instagram).toLowerCase())
  }

  render() {
    return (
      <ScrollView>
        <InputInstagram
          onChangeText={instagram => this.setState({ instagram: instagram })}
          value={this.state.instagram}
          erro={this.state.erroInstagram}
        />
        <Button
          onPress={() => {
            if (this.state.instagram !== "" && this.validate(this.state.instagram)) {
              //Atualiza AsynStorage
              LocalStorage.setItem(CONSTANTES.ASYNC_ITEM_USUARIO_INSTAGRAM, this.state.instagram)
              //Cadastro ou alteracao?
              this.isCadastro ?
                this.props.navigation.navigate(CONSTANTES.ROUTES_NEW_USER_PROFISSAO) :
                this.props.navigation.navigate(CONSTANTES.ROUTES_NEW_USER_CADASTRAR)

            } else {
              this.setState({ erroInstagram: "Instagram inválido" });
            }
          }}
        >
          Continuar
        </Button>
      </ScrollView >
    );
  }
}
