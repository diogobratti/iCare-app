import React, { Component } from "react";
import { ScrollView, BackHandler, View, Text } from "react-native";
import Button from "./components/Button";
import { navigationOptions } from "../../styles/StyleBase";
import { TextInputMask } from "react-native-masked-text";
import styles from "../../styles/StyleCadastro";
import * as CONSTANTES from '../../data/Constantes';
import LocalStorage from '../../services/LocalStorage';

export default class NewUserTelefone extends Component {

  state = {
    erroTelefone: "",
  }

  static navigationOptions = {
    ...navigationOptions
  }

  componentDidMount() {
    this._bootstrapAsync();
  }

  _bootstrapAsync = async () => {
    this.setState({
      telefone: await LocalStorage.getItem(CONSTANTES.ASYNC_ITEM_USUARIO_TELEFONE),
    })

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
        <Text style={textStyle}>Qual é o seu telefone de contato?</Text>

        <View style={inputContainer}>
          <TextInputMask
            style={inputStyle}
            type={"cel-phone"}
            value={this.state.telefone}
            ref={ref => (this.telefoneField = ref)}
            onChangeText={telefone =>
              this.setState({
                telefone: telefone
              })
            }
            placeholder="ex: (00) 00000-0000"
          // leftIcon={
          //   <Icon name="phone" type="antdesign" size={24} color="#007aff" />
          // }
          />
        </View>
        <View>
          {this.state.erroTelefone !== "" ? (
            <Text style={erroText}>{this.state.erroTelefone}</Text>
          ) : null}
        </View>

        <Button
          onPress={() => {
            if (this.telefoneField.isValid() && this.state.telefone !== "") {
              //Atualiza AsynStorage
              LocalStorage.setItem(CONSTANTES.ASYNC_ITEM_USUARIO_TELEFONE, this.state.telefone)

              LocalStorage.getItem(CONSTANTES.ASYNC_ITEM_PERFIL).then( (perfil) => {
                if (perfil == CONSTANTES.ASYNC_USER_PERFIL_CLIENTE) {
                  this.props.navigation.navigate(CONSTANTES.ROUTES_NEW_USER_LOCALIDADE)
                } else {
                  //Cadastro ou alteracao?
                  this.isCadastro ?
                    this.props.navigation.navigate(CONSTANTES.ROUTES_NEW_USER_REDES_SOCIAIS) :
                    this.props.navigation.navigate(CONSTANTES.ROUTES_NEW_USER_CADASTRAR)
                }
              });

            } else {
              this.setState({ erroTelefone: "Telefone inválido" });
            }
          }}
        >
          Continuar
        </Button>
      </ScrollView>
    );
  }
}
