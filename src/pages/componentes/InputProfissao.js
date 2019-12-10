import React from "react";
import { StyleSheet, View, Text, Picker, Platform } from "react-native";
// import { Input, Icon } from "react-native-elements";
import * as CONSTANTES from "../../data/Constantes";

const InputProfissao = props => {
  const { onValueChange, selectedValue, children } = props;

  return (
    // <Input
    //   label="Qual é a sua profissão ?"
    //   placeholder="ex: Enfermeiro"
    //   // leftIcon={<Icon name="user" type="antdesign" size={24} color="#007aff" />}
    //   errorMessage="Digite um nome válido"
    //   onChangeText={onChangeText}
    //   value={value}
    // />

    <View style={styles.container}>
      <Text style={styles.textStyle}>Selecione a sua profissão</Text>
      <Picker
        // selectedValue={this.state.language}
        selectedValue={selectedValue}
        style={styles.pickerStyle}
        // onValueChange={(itemValue, itemIndex) =>
        //   this.setState({ language: itemValue })
        // }
        onValueChange={onValueChange}
        prompt="Selecione a sua Profissão"
      >
        <Picker.Item
          label={CONSTANTES.PROFISSAO_CUIDADOR}
          value={CONSTANTES.PROFISSAO_CUIDADOR}
        />
        <Picker.Item
          label={CONSTANTES.PROFISSAO_ENFERMEIRO}
          value={CONSTANTES.PROFISSAO_ENFERMEIRO}
        />
        <Picker.Item
          label={CONSTANTES.PROFISSAO_FISIOTERAPEUTA}
          value={CONSTANTES.PROFISSAO_FISIOTERAPEUTA}
        />
        <Picker.Item
          label={CONSTANTES.PROFISSAO_NUTRICIONISTA}
          value={CONSTANTES.PROFISSAO_NUTRICIONISTA}
        />
        <Picker.Item
          label={CONSTANTES.PROFISSAO_TECNICO_ENFERMAGEM}
          value={CONSTANTES.PROFISSAO_TECNICO_ENFERMAGEM}
        />
        <Picker.Item
          label={CONSTANTES.PROFISSAO_TERAPEUTA_OCUPACIONAL}
          value={CONSTANTES.PROFISSAO_TERAPEUTA_OCUPACIONAL}
        />
      </Picker>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "flex-start",
    justifyContent: "flex-start"
  },

  textStyle: {
    fontSize: 16,
    color: "#86939e",
    ...Platform.select({
      android: {
        fontFamily: "sans-serif",
        fontWeight: "bold"
      },
      default: {
        fontWeight: "bold"
      }
    })
  },

  pickerStyle: {
    height: 150,
    width: "80%",
    color: "#344953",
    justifyContent: "center"
  }
});

export default InputProfissao;
