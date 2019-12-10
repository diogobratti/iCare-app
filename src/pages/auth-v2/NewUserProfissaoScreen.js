import React, { Component } from "react";
import { ScrollView, BackHandler, View, Text } from "react-native";
import InputProfissao from "../componentes/InputProfissao";
import Button from "./components/Button";
import { navigationOptions } from "../../styles/StyleBase";
import { TextInputMask } from "react-native-masked-text";
import styles from "../../styles/StyleCadastro";
import PROFISSOES from "../../data/ConstantesProfissao";
import * as CONSTANTES from '../../data/Constantes';
import LocalStorage from '../../services/LocalStorage';

export default class NewUserProfissaoScreen extends Component {

  state = {
    profissao: 0,
    preco: "",
    erroPreco: "",
    erroProfissao: "",
  };

  static navigationOptions = {
    ...navigationOptions
  };

  componentDidMount() {
    this._bootstrapAsync();
  }

  _bootstrapAsync = async () => {
    this.setState({
      preco: await LocalStorage.getItem(CONSTANTES.ASYNC_ITEM_USUARIO_PRECO),
      profissao: await LocalStorage.getItem(CONSTANTES.ASYNC_ITEM_USUARIO_PROFISSAO),
    });
    this.isCadastro = await LocalStorage.getItem(CONSTANTES.ASYNC_ITEM_CADASTRO_COMPLETO) === null
  };

  render() {
    const {
      container,
      inputContainer,
      inputStyle,
      textStyle,
      erroText
    } = styles;

    return (
      <ScrollView style={container}>
        <InputProfissao
          selectedValue={this.state.profissao}
          onValueChange={(itemValue, itemIndex) =>
            this.setState({ profissao: itemValue })
          }
        />
        <View>
          {this.state.erroProfissao !== "" ? (
            <Text style={erroText}>{this.state.erroProfissao}</Text>
          ) : null}
        </View>

        <Text style={textStyle}>Quanto você cobra por turno (12 horas)?</Text>
        <View style={inputContainer}>
          <TextInputMask
            style={inputStyle}
            type={"money"}
            options={{
              precision: 2,
              separator: ",",
              delimiter: ".",
              unit: "R$",
              suffixUnit: ""
            }}
            value={this.state.preco}
            ref={ref => (this.precoField = ref)}
            onChangeText={preco => this.setState({ preco })}
            placeholder="ex: R$120,00"
          />
        </View>
        <View>
          {this.state.erroPreco !== "" ? (
            <Text style={erroText}>{this.state.erroPreco}</Text>
          ) : null}
        </View>

        <Button
          onPress={() => {
            let isErroPreco = false;
            let isErroProfissao = false;

            if (this.state.preco === "" || !this.precoField.isValid() || this.state.preco == null) {
              isErroPreco = true;
              this.setState({ erroPreco: "Digite um valor numérico válido" });
            } else {
              this.setState({ erroPreco: "" });
            }

            if (this.state.profissao === 0 || !(Object.values(PROFISSOES).includes(this.state.profissao))) {
              isErroProfissao = true;
              this.setState({ erroProfissao: "Selecione uma Profissão" })
            } else {
              this.setState({ erroProfissao: "" });
            }

            if (!isErroPreco && !isErroProfissao) {
              //Atualiza AsynStorage
              LocalStorage.setItem(CONSTANTES.ASYNC_ITEM_USUARIO_PROFISSAO, this.state.profissao)
              LocalStorage.setItem(CONSTANTES.ASYNC_ITEM_USUARIO_PRECO, this.state.preco)
              //Cadastro ou alteracao?
              this.isCadastro ?
                this.props.navigation.navigate(CONSTANTES.ROUTES_NEW_USER_ANUNCIO) :
                this.props.navigation.navigate(CONSTANTES.ROUTES_NEW_USER_CADASTRAR)
            }
          }}
        >
          Continuar
        </Button>
      </ScrollView>
    );
  }
}
