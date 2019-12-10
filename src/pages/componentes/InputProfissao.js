import React from "react";
import { StyleSheet, View, Text, Picker, Platform } from "react-native";
// import { Input, Icon } from "react-native-elements";
// import * as CONSTANTES from "../../data/Constantes";
import PROFISSOES from "../../data/ConstantesProfissao";

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
          label={"Selecione a sua Profissão"}
          value={0}
        />

        {/* {console.log(Object.entries(PROFISSOES))} */}
        {Object.entries(PROFISSOES).map(([key,value]) => (
          <Picker.Item label={value} value={value} key={key} />
        ))}

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
