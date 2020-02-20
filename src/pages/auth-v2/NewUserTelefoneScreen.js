import React, { Component } from "react";
import { ScrollView, BackHandler, View, Text } from "react-native";
import Button from "./components/Button";
import { navigationOptions } from "../../styles/StyleBase";
import { TextInputMask } from "react-native-masked-text";
import styles from "../../styles/StyleCadastro";
import * as CONSTANTES from '../../data/Constantes';
import LocalStorage from '../../services/LocalStorage';
import InputInstagram from "../componentes/InputInstagram";
import DeviceInfo from 'react-native-device-info';

export default class NewUserTelefone extends Component {

  state = {
    erroTelefone: "",
    instagram: "",
    erroInstagram: "",
  }

  static navigationOptions = {
    ...navigationOptions
  }

  async componentDidMount() {
    await this._bootstrapAsync();
    //https://github.com/react-native-community/react-native-device-info#getphonenumber
    DeviceInfo.getPhoneNumber().then(phoneNumber => {
      //if there is no phone number yet try to find out the device's number
      const patt = new RegExp(/\d{8}/g);
      if(patt.test(phoneNumber) && patt.test(this.state.telefone)){
        let phone = phoneNumber;
        phone = phone.replace("+55","");
        phone = "(" + phone.substr(0,2) + ") " + phone.substr(2,5) + "-" + phone.substr(7);
        this.setState({telefone: phone});
      }
      // Android: null return: no permission, empty string: unprogrammed or empty SIM1, e.g. "+15555215558": normal return value
    });
  }

  _bootstrapAsync = async () => {
    this.setState({
      telefone: await LocalStorage.getItem(CONSTANTES.ASYNC_ITEM_USUARIO_TELEFONE),
      instagram: await LocalStorage.getItem(CONSTANTES.ASYNC_ITEM_USUARIO_INSTAGRAM),
    })

    this.isCadastro = await LocalStorage.getItem(CONSTANTES.ASYNC_ITEM_CADASTRO_COMPLETO) === null
  };

  validateInstagram = (instagram) => {
    const expression = /(?:@)([A-Za-z0-9_](?:(?:[A-Za-z0-9_]|(?:\.(?!\.))){0,28}(?:[A-Za-z0-9_]))?)/g;
    return expression.test(String(instagram).toLowerCase())
  }

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

        <View>
        <InputInstagram
          onChangeText={instagram => this.setState({ instagram: instagram })}
          value={this.state.instagram}
          erro={this.state.erroInstagram}
        />
        </View>

        <Button
          onPress={async () => {
            //telefone obrigatório, instagram opcional
            const telefoneValido = this.telefoneField.isValid() && this.state.telefone !== ""
            const instagramValido = this.state.instagram == "" || this.state.instagram == null || this.validateInstagram(this.state.instagram)

            if (telefoneValido && instagramValido) {
              //Atualiza AsynStorage
              LocalStorage.setItem(CONSTANTES.ASYNC_ITEM_USUARIO_TELEFONE, this.state.telefone)
              LocalStorage.setItem(CONSTANTES.ASYNC_ITEM_USUARIO_INSTAGRAM, this.state.instagram)

              if (this.isCadastro) {
                //cadastro
                LocalStorage.getItem(CONSTANTES.ASYNC_ITEM_PERFIL).then( (perfil) => {
                  (perfil == CONSTANTES.ASYNC_USER_PERFIL_CLIENTE) ?
                    this.props.navigation.navigate(CONSTANTES.ROUTES_NEW_USER_ANUNCIO) :
                    this.props.navigation.navigate(CONSTANTES.ROUTES_NEW_USER_PROFISSAO)
                })
              } else {
                //alteracao
                this.props.navigation.navigate(CONSTANTES.ROUTES_NEW_USER_CADASTRAR)
              }



              // if (perfil == CONSTANTES.ASYNC_USER_PERFIL_CLIENTE) {
              //   this.props.navigation.navigate(CONSTANTES.ROUTES_NEW_USER_LOCALIDADE)
              // } else {
              //   //Cadastro ou alteracao?
              //   this.isCadastro ?
              //     this.props.navigation.navigate(CONSTANTES.ROUTES_NEW_USER_REDES_SOCIAIS) :
              //     this.props.navigation.navigate(CONSTANTES.ROUTES_NEW_USER_CADASTRAR)
              // }


            } else {
              telefoneValido ?
                this.setState({ erroTelefone: "" }) :
                this.setState({ erroTelefone: "Telefone inválido" })

              instagramValido ?
                this.setState({ erroInstagram: "" }) :
                this.setState({ erroInstagram: "Instagram inválido. ex: @icarecuidadores" })

            }

            // if (this.telefoneField.isValid() && this.state.telefone !== "") {
            //   //Atualiza AsynStorage
            //   LocalStorage.setItem(CONSTANTES.ASYNC_ITEM_USUARIO_TELEFONE, this.state.telefone)

            //   LocalStorage.getItem(CONSTANTES.ASYNC_ITEM_PERFIL).then( (perfil) => {
            //     if (perfil == CONSTANTES.ASYNC_USER_PERFIL_CLIENTE) {
            //       this.props.navigation.navigate(CONSTANTES.ROUTES_NEW_USER_LOCALIDADE)
            //     } else {
            //       //Cadastro ou alteracao?
            //       this.isCadastro ?
            //         this.props.navigation.navigate(CONSTANTES.ROUTES_NEW_USER_REDES_SOCIAIS) :
            //         this.props.navigation.navigate(CONSTANTES.ROUTES_NEW_USER_CADASTRAR)
            //     }
            //   });

            // } else {
            //   this.setState({ erroTelefone: "Telefone inválido" });
            // }
          }}
        >
          Continuar
        </Button>
      </ScrollView>
    );
  }
}
