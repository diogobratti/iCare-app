import React, { Component } from "react";
import { View, Text, ScrollView, TouchableOpacity, ActivityIndicator, Picker, BackHandler } from "react-native";
// import Ionicons from 'react-native-vector-icons/Ionicons';
// import { Slider, CheckBox } from 'react-native-elements';
import { navigationOptions, definicoesBase, Cabecalho } from "../../styles/StyleBase";
import StyleLocalidade from "../../styles/StyleLocalidade";
import LocalStorage from '../../services/LocalStorage';
import * as CONSTANTES from '../../data/Constantes';
import DataLocalidade from '../../data/DataLocalidade.json';
import SelectEstados from '../componentes/SelectEstados';
import SelectCidades from '../componentes/SelectCidades';
// import reactotron from "reactotron-react-native";

export default class NewUserLocalidadeScreen extends Component {

  static navigationOptions = {
    ...navigationOptions,
  };

  state = { uf: null, selectedValueEstado: null, selectedValueCidade: null, erro: null, isLoading: true }

  async componentDidMount() {
    this.isCadastro = await LocalStorage.getItem(CONSTANTES.ASYNC_ITEM_CADASTRO_COMPLETO) === null

		const estado = await LocalStorage.getItem(CONSTANTES.ASYNC_ITEM_USUARIO_ESTADO)
		const municipio = await LocalStorage.getItem(CONSTANTES.ASYNC_ITEM_USUARIO_MUNICIPIO)
		const regiao = await LocalStorage.getItem(CONSTANTES.ASYNC_ITEM_USUARIO_REGIAO)

		this.setState({
			uf: DataLocalidade,
			selectedValueEstado: '',
			selectedValueCidade: '',
			estado: estado,
			municipio: municipio,
			regiao: regiao,
			isLoading: false,
		});
	}

  renderValueChangeEstado = (value) => {
//    reactotron.log(value);
    this.setState({
      selectedValueEstado: value,
      estado: value.nome,
    })
  }

  renderValueChangeCidade = (value) => {
//    reactotron.log(value);

    this.setState({
      selectedValueCidade: value,
      municipio: value.Município,
      regiao: value.Microrregião,
    })
  }

  guardarLocalidade = async () => {

    let { estado, municipio, regiao } = this.state;

  //  reactotron.log({estado, municipio, regiao})

    if (__DEV__) {
      estado = "Acre"
      municipio = "Assis Brasil"
      regiao = "Brasiléia"
    }

    await LocalStorage.setItem(CONSTANTES.ASYNC_ITEM_USUARIO_ESTADO, `${estado}`);
    await LocalStorage.setItem(CONSTANTES.ASYNC_ITEM_USUARIO_MUNICIPIO, `${municipio}`);
    await LocalStorage.setItem(CONSTANTES.ASYNC_ITEM_USUARIO_REGIAO, `${regiao}`);
  };
  render() {
    if (this.state.isLoading) {
      return (
        <ActivityIndicator />
      )
    }
    const { selectedValueCidade, selectedValueEstado, uf } = this.state;
    return (
      <View style={StyleLocalidade.container}>
        {/* <View style={StyleLocalidade.cabecalhoContainer}> */}
        {/* <Cabecalho /> */}
        {/* </View> */}
        <View style={StyleLocalidade.corpoContainer}>
          <View style={StyleLocalidade.camposContainer}>
            <View style={StyleLocalidade.itemCamposContainer}>
              <Text style={StyleLocalidade.itemCamposTexto}>
                Escolha o estado
							</Text>
              <SelectEstados
                selectedValue={selectedValueEstado}
                data={uf}
                style={StyleLocalidade.itemCamposPicker}
                itemStyle={StyleLocalidade.itemCamposPickerItem}
                onValueChange={this.renderValueChangeEstado} />
            </View>
            <View style={StyleLocalidade.itemCamposEspacoContainer}>
              <Text></Text>
            </View>
            <View style={StyleLocalidade.itemCamposContainer}>
              <Text style={StyleLocalidade.itemCamposTexto}>
                Escolha o município
							</Text>
              <SelectCidades selectedValue={selectedValueCidade}
                data={selectedValueEstado}
                style={StyleLocalidade.itemCamposPicker}
                itemStyle={StyleLocalidade.itemCamposPickerItem}
                onValueChange={this.renderValueChangeCidade} />
            </View>
          </View>
          <View style={StyleLocalidade.erroContainer}>
            <Text style={StyleLocalidade.erroTexto}>{this.state.erro}</Text>
          </View>
        </View>
        <View style={StyleLocalidade.botaoContainer}>
          <TouchableOpacity
            style={StyleLocalidade.botaoButton}
            onPress={async () => {
              var mensagem = "";
              if (selectedValueEstado != "" && selectedValueCidade != "") {
                //Atualiza AsynStorage
                await this.guardarLocalidade()
                this.props.navigation.navigate(CONSTANTES.ROUTES_NEW_USER_CADASTRAR)
              } else {
                mensagem = "Por favor, escolha o estado e o município"
                this.setState({ erro: mensagem })
              }
            }}
          >
            <Text style={StyleLocalidade.botaoText}>
              Avançar
		                    </Text>
          </TouchableOpacity>
        </View>
      </View>
    )
  }
}
