import React, { Component } from "react";
import { View, Text, TouchableOpacity, Image, ScrollView } from "react-native";
import { Icon } from "react-native-elements";
import MensagemTelefone from "../componentes/MensagemTelefone";
import PropTypes from 'prop-types'
import StyleAnuncio, { anuncioIconeTelefone } from "../../styles/StyleAnuncio";
import reactotron from "reactotron-react-native";
import { ROUTES_NEW_USER_NOME, ROUTES_NEW_USER_PROFISSAO, ROUTES_NEW_USER_ANUNCIO, ROUTES_NEW_USER_TELEFONE, ROUTES_NEW_USER_REDES_SOCIAIS } from "../../data/Constantes";
import { withNavigation } from 'react-navigation';

// const Anuncio = props => {
class Anuncio extends Component {

  constructor(props) {
    super(props);
    this.props = props
  }
  // reactotron.log(anuncio);

  // return (
    render() {

    const { anuncio, editavel } = this.props;

    return (
      <ScrollView>
        <View style={StyleAnuncio.visualizarAnuncioFotoContainer}>
          <Image
            style={StyleAnuncio.visualizarAnuncioImagemUsuario}
            source={{ uri: anuncio.foto }}
          />
        </View>
        {/* <TouchableOpacity
          //style={styles.productButton}
          onPress={() => {
            MensagemTelefone(anuncio);
          }}
        > */}
          <View style={StyleAnuncio.visualizarAnuncioNomeContainer}>
            <View style={StyleAnuncio.visualizarAnuncioLinha}>
              <Text style={StyleAnuncio.visualizarAnuncioDescricaoText}>
                Nome:{" "}
              </Text>
              <Text style={StyleAnuncio.visualizarAnuncioAtributoText}
                    onPress={ () => {
                      if (editavel)
                      // this.props.navigation.navigate(ROUTES_NEW_USER_NOME)
                      this.props.navigation.navigate(ROUTES_NEW_USER_REDES_SOCIAIS)
                    }}>
                {anuncio.nome}
              </Text>
            </View>
          </View>
          <View style={StyleAnuncio.visualizarAnuncioTextosContainer}>
            <View style={StyleAnuncio.visualizarAnuncioLinha}>
              <Text style={StyleAnuncio.visualizarAnuncioDescricaoText}>
                Telefone:{" "}
              </Text>
              <Icon
                //raised //circulo em volta
                name="whatsapp"
                type="font-awesome"
                //color={anuncioIconeTelefone.color}
                size={anuncioIconeTelefone.size}
                containerStyle={StyleAnuncio.iconeFiltro}
                //onPress={() => console.log('hello')}
              />
              <Text style={StyleAnuncio.visualizarAnuncioAtributoText}
                    onPress={ () => {
                      if (editavel)
                      this.props.navigation.navigate(ROUTES_NEW_USER_TELEFONE)
                    }}>
                {anuncio.telefone}
              </Text>
            </View>
            <View style={StyleAnuncio.visualizarAnuncioLinha}>
              <Text style={StyleAnuncio.visualizarAnuncioDescricaoText}>
                Profissão:{" "}
              </Text>
              <Text style={StyleAnuncio.visualizarAnuncioAtributoText}
                    onPress={ () => {
                      if (editavel)
                      this.props.navigation.navigate(ROUTES_NEW_USER_PROFISSAO)
                    }}>
                {anuncio.profissao}
              </Text>
            </View>

            <View style={StyleAnuncio.visualizarAnuncioLinha}>
              <Text style={StyleAnuncio.visualizarAnuncioDescricaoText}>
                Anúncio:{" "}
              </Text>
              <Text style={StyleAnuncio.visualizarAnuncioAtributoText}
                    onPress={ () => {
                      if (editavel)
                      this.props.navigation.navigate(ROUTES_NEW_USER_ANUNCIO)
                    }}>
                {anuncio.anuncio}
              </Text>
            </View>
            <View style={StyleAnuncio.visualizarAnuncioLinha}>
              <Text style={StyleAnuncio.visualizarAnuncioDescricaoText}>
                Preço:{" "}
              </Text>
              <Text style={StyleAnuncio.visualizarAnuncioAtributoText}
                    onPress={ () => {
                      if (editavel)
                      this.props.navigation.navigate(ROUTES_NEW_USER_PROFISSAO)
                    }}>
                {anuncio.preco}*
              </Text>
            </View>
            <View style={StyleAnuncio.visualizarAnuncioLinha}>
              <Text style={StyleAnuncio.visualizarAnuncioDescricaoText}>
                * Estimado para o turno de 12 horas
              </Text>
            </View>
          </View>
        {/* </TouchableOpacity> */}
      </ScrollView>
    )
    }
};

export default withNavigation(Anuncio);


// Anuncio.propTypes = {
//   anuncio: PropTypes.object.isRequired,
//   editavel: PropTypes.bool
// }

// Anuncio.defaultProps = {
//   editavel: false,
// }

// export default Anuncio;
