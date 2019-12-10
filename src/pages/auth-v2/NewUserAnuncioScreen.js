import React, { Component } from "react";
import { ScrollView, BackHandler } from "react-native";
import { Input } from "react-native-elements";
import InputAnuncio from "../componentes/InputAnuncio";
import InputProfissao from "../componentes/InputProfissao";
import InputPreco from "../componentes/InputPreco";
import Button from "./components/Button";
import { navigationOptions } from "../../styles/StyleBase";
import * as CONSTANTES from '../../data/Constantes';
import LocalStorage from '../../services/LocalStorage';

export default class NewUserAnuncioScreen extends Component {
  state = {
    anuncio: "",
    erroAnuncio: "",
  };

  static navigationOptions = {
    ...navigationOptions,
  };

  componentDidMount() {
    this._bootstrapAsync();
  }

  _bootstrapAsync = async () => {
    this.setState({
      anuncio: await LocalStorage.getItem(CONSTANTES.ASYNC_ITEM_USUARIO_ANUNCIO),
    });
    this.isCadastro = await LocalStorage.getItem(CONSTANTES.ASYNC_ITEM_CADASTRO_COMPLETO) === null
  };

  render() {
    return (
      <ScrollView>

        <InputAnuncio
          onChangeText={anuncio => this.setState({ anuncio })}
          value={this.state.anuncio}
          erro={this.state.erroAnuncio}
        />
        <Button
          onPress={() => {
            //Atualiza AsynStorage
            LocalStorage.setItem(CONSTANTES.ASYNC_ITEM_USUARIO_ANUNCIO, this.state.anuncio)
            //Cadastro ou alteracao?
            this.isCadastro ?
              this.props.navigation.navigate(CONSTANTES.ROUTES_NEW_USER_LOCALIDADE) :
              this.props.navigation.navigate(CONSTANTES.ROUTES_NEW_USER_CADASTRAR)
          }}
        >
          Continuar
        </Button>
      </ScrollView >
    );
  }
}