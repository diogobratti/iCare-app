import React, { Component } from "react";
import { ScrollView } from "react-native";
import InputNome from "../componentes/InputNome";
import Button from "./components/Button";
import { navigationOptions } from "../../styles/StyleBase";
import * as CONSTANTES from '../../data/Constantes';
import LocalStorage from "../../services/LocalStorage";
// import reactotron from "reactotron-react-native";

export default class NewUserNome extends Component {
  static navigationOptions = {
    ...navigationOptions,
  };

  state = {
    nome: ""
  };

  _bootstrapAsync = async () => {

    this.setState({
      nome: await LocalStorage.getItem(CONSTANTES.ASYNC_ITEM_USUARIO_NOME),
    });

    this.perfil = await LocalStorage.getItem(CONSTANTES.ASYNC_ITEM_PERFIL);
    this.isCadastro = await LocalStorage.getItem(CONSTANTES.ASYNC_ITEM_CADASTRO_COMPLETO) === null
    if (__DEV__) reactotron.log(this.isCadastro);
  };
  componentDidMount() {
    this._bootstrapAsync();
  }

  render() {
    return (
      <ScrollView>
        <InputNome
          onChangeText={nome => this.setState({ nome: nome })}
          value={this.state.nome}
        />
        <Button
          onPress={() => {
            LocalStorage.setItem(CONSTANTES.ASYNC_ITEM_USUARIO_NOME, this.state.nome);
            if (!this.isCadastro) {
              //Alterar
              this.props.navigation.navigate(CONSTANTES.ROUTES_NEW_USER_CADASTRAR)
            } else {
              if (__DEV__) reactotron.log(this.perfil)
              //Cadastro novo
              this.perfil == CONSTANTES.ASYNC_USER_PERFIL_CLIENTE ?
                this.props.navigation.navigate(CONSTANTES.ROUTES_NEW_USER_CADASTRAR) :
                this.props.navigation.navigate(CONSTANTES.ROUTES_NEW_USER_EMAIL)
            }
          }}
        >
          Continuar
        </Button>
      </ScrollView >
    );
  }
}
