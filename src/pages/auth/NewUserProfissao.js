import React, { Component } from "react";
import { ScrollView, BackHandler, View, Text } from "react-native";
import InputProfissao from "../componentes/InputProfissao";
import Button from "./components/Button";
import { navigationOptions } from "../../styles/StyleBase";
import { TextInputMask } from "react-native-masked-text";
import styles from "../../styles/StyleCadastro";
import PROFISSOES from "../../data/ConstantesProfissao";

export default class NewUserProfissao extends Component {
  constructor(props) {
    super(props);
    this.handleBackButtonClick = (() => {
      //   if (this.navigator && this.navigator.getCurrentRoutes().length > 1){
      //     this.navigator.pop();
      return true; //avoid closing the app
      //   }
      //   return false; //close the app
    }).bind(this); //don't forget bind this, you will remember anyway.
  }

  state = {
    profissao: 0,
    preco: "",
    erroPreco: "",
    erroProfissao: "",
    ...this.props.navigation.state.params.state
  };

  static navigationOptions = {
    ...navigationOptions
  };

  async componentDidMount() {
    BackHandler.addEventListener(
      "hardwareBackPress",
      this.handleBackButtonClick
    );
    console.log(this.state);
  }
  componentWillUnmount() {
    BackHandler.removeEventListener(
      "hardwareBackPress",
      this.handleBackButtonClick
    );
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

            if (this.state.preco === "" || !this.precoField.isValid()) {
              isErroPreco = true;
              this.setState({ erroPreco: "Digite um valor numérico válido" });
            } else {
              this.setState({ erroPreco: "" });
            }

            if (this.state.profissao === 0 || !(Object.values(PROFISSOES).includes(this.state.profissao))) {
              isErroProfissao = true;
              this.setState({ erroProfissao: "Selecione uma Profissão"})
            } else {
              this.setState({ erroProfissao: "" });
            }

            if (!isErroPreco && !isErroProfissao) {
              this.props.navigation.navigate("NewUserAnuncio", {
                state: this.state
              });
            }



            // if (this.precoField.isValid() && this.state.preco !== "") {
            //   if (this.state.erroProfissao !== 0 && this.state.erroProfissao (in "constantes profssao") ) {
            //     this.props.navigation.navigate("NewUserAnuncio", {
            //       state: this.state
            //     });
            //   } else {

            //   }
            // } else {
            //   this.setState({ erroPreco: "Digite um valor numérico válido" });
            // }
          }}
        >
          Continuar
        </Button>
      </ScrollView>
    );
  }
}
