import React, { Component } from "react";
import { ScrollView, BackHandler, View, Text } from "react-native";
import Button from "./components/Button";
import { navigationOptions } from "../../styles/StyleBase";
import { TextInputMask } from "react-native-masked-text";
import styles from "../../styles/StyleCadastro";

export default class NewUserTelefoneScreen extends Component {
  // state = this.props.navigation.state.params.state;

  state = {
    telefone: "",
    erroTelefone: "",
    // ...this.props.navigation.state.params.state
  };

  static navigationOptions = {
    ...navigationOptions
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
            // label="Qual é o seu telefone de contato?"
            placeholder="ex: (00) 00000-0000"
          // leftIcon={
          //   <Icon name="phone" type="antdesign" size={24} color="#007aff" />
          // }
          // errorMessage="Digite um número de telefone válido"
          // onChangeText={onChangeText}
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
              this.props.navigation.navigate("NewUserProfissao", {
                state: this.state
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
