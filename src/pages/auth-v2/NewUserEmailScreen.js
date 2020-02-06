import React, { Component } from "react";
import { ScrollView, BackHandler } from "react-native";
import InputEmail from "../componentes/InputEmail";
import Button from "./components/Button";
import { navigationOptions } from "../../styles/StyleBase";
import * as CONSTANTES from '../../data/Constantes';
import LocalStorage from '../../services/LocalStorage';

export default class NewUserEmailScreen extends Component {

  state = {
    email: "",
    erroEmail: "",
  };

  static navigationOptions = {
    ...navigationOptions,
  };

  componentDidMount() {
    this._bootstrapAsync();
  }

  _bootstrapAsync = async () => {

    this.setState({
      email: await LocalStorage.getItem(CONSTANTES.ASYNC_ITEM_USUARIO_EMAIL),
    });

    this.isCadastro = await LocalStorage.getItem(CONSTANTES.ASYNC_ITEM_CADASTRO_COMPLETO) === null
  };

  validate = (email) => {
    const expression = /(?!.*\.{2})^([a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+(\.[a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+)*|"((([ \t]*\r\n)?[ \t]+)?([\x01-\x08\x0b\x0c\x0e-\x1f\x7f\x21\x23-\x5b\x5d-\x7e\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|\\[\x01-\x09\x0b\x0c\x0d-\x7f\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))*(([ \t]*\r\n)?[ \t]+)?")@(([a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.)+([a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.?$/i;
    return expression.test(String(email).toLowerCase())
  }

  render() {
    return (
      <ScrollView>
        <InputEmail
          onChangeText={email => this.setState({ email: email })}
          value={this.state.email}
          erro={this.state.erroEmail}
        />
        <Button
          onPress={async () => {
            if (this.state.telefone !== "" && this.validate(this.state.email)) {
              //Atualiza AsynStorage
              LocalStorage.setItem(CONSTANTES.ASYNC_ITEM_USUARIO_EMAIL, this.state.email)
              //Cadastro ou alteracao?
              this.isCadastro ?
                this.props.navigation.navigate(CONSTANTES.ROUTES_NEW_USER_TELEFONE) :
                this.props.navigation.navigate(CONSTANTES.ROUTES_NEW_USER_CADASTRAR)

            } else {
              this.setState({ erroEmail: "Email inválido" });
            }
          }}
        >
          Continuar
        </Button>
      </ScrollView >
    );
  }
}
