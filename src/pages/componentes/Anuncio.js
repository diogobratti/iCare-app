import React, { Component } from "react";
import { View, Text, TouchableOpacity, Image, ScrollView } from "react-native";
import { Icon, SocialIcon } from "react-native-elements";
import MensagemTelefone from "../componentes/MensagemTelefone";
import PropTypes from 'prop-types'
import MensagemEmail from "../componentes/MensagemEmail";
import MensagemInstagram from "../componentes/MensagemInstagram";
import StyleAnuncio, { anuncioIconeTelefone } from "../../styles/StyleAnuncio";
// import reactotron from "reactotron-react-native";
import { ROUTES_NEW_USER_NOME, ROUTES_NEW_USER_PROFISSAO, ROUTES_NEW_USER_ANUNCIO, ROUTES_NEW_USER_TELEFONE, ROUTES_NEW_USER_REDES_SOCIAIS } from "../../data/Constantes";
import { withNavigation } from 'react-navigation';
import { definicoesBase } from "../../styles/StyleBase";

class Anuncio extends Component {

  constructor(props) {
    super(props);
    this.props = props
  }

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
        <View style={StyleAnuncio.visualizarAnuncioNomeContainer}>
          <View style={StyleAnuncio.visualizarAnuncioLinhaEditavel}>
            <View style={StyleAnuncio.visualizarAnuncioLinha}>
              <Text style={StyleAnuncio.visualizarAnuncioDescricaoText}>
                Nome:{" "}
              </Text>
              <Text style={StyleAnuncio.visualizarAnuncioAtributoText}
                onPress={() => {
                  if (editavel)
                    this.props.navigation.navigate(ROUTES_NEW_USER_NOME)
                }}>
                {anuncio.nome}
              </Text>
            </View>
            {editavel &&
              <View style={StyleAnuncio.visualizarAnuncioLinha}>
                <Text style={StyleAnuncio.visualizarAnuncioAtributoEditarText}
                  onPress={() => {
                    this.props.navigation.navigate(ROUTES_NEW_USER_NOME)
                  }}>
                  {">"}
                </Text>
              </View>
            }
          </View>
        </View>
        <View style={StyleAnuncio.visualizarAnuncioTextosContainer}>
          <View style={StyleAnuncio.visualizarAnuncioLinhaEditavel}>
            <View style={StyleAnuncio.visualizarAnuncioLinha}>
              <Text style={StyleAnuncio.visualizarAnuncioDescricaoText}>
                Telefone:{" "}
              </Text>
              {/* <Icon
                //raised //circulo em volta
                name="whatsapp"
                type="font-awesome"
                //color={anuncioIconeTelefone.color}
                size={anuncioIconeTelefone.size}
                containerStyle={StyleAnuncio.iconeFiltro}
                //onPress={() => console.log('hello')}
              /> */}
              <Text style={StyleAnuncio.visualizarAnuncioAtributoText}
                onPress={() => {
                  if (editavel)
                    this.props.navigation.navigate(ROUTES_NEW_USER_TELEFONE)
                }}>
                {anuncio.telefone}
              </Text>
            </View>
            {editavel &&
              <View style={StyleAnuncio.visualizarAnuncioLinha}>
                <Text style={StyleAnuncio.visualizarAnuncioAtributoEditarText}
                  onPress={() => {
                    this.props.navigation.navigate(ROUTES_NEW_USER_TELEFONE)
                  }}>
                    {">"}
                </Text>
              </View>
            }
          </View>
          {(anuncio.profissao != '' && anuncio.profissao != undefined && anuncio.profissao != null) ? (
            <View style={StyleAnuncio.visualizarAnuncioLinhaEditavel}>
              <View style={StyleAnuncio.visualizarAnuncioLinha}>
                <Text style={StyleAnuncio.visualizarAnuncioDescricaoText}>
                  Profissão:{" "}
                </Text>
                <Text style={StyleAnuncio.visualizarAnuncioAtributoText}
                  onPress={() => {
                    if (editavel)
                      this.props.navigation.navigate(ROUTES_NEW_USER_PROFISSAO)
                  }}>
                  {anuncio.profissao}
                </Text>
              </View>
              {editavel &&
                <View style={StyleAnuncio.visualizarAnuncioLinha}>
                  <Text style={StyleAnuncio.visualizarAnuncioAtributoEditarText}
                    onPress={() => {
                      this.props.navigation.navigate(ROUTES_NEW_USER_PROFISSAO)
                    }}>
                    {">"}
                  </Text>
                </View>
              }
            </View>
          ) : null}

          {(anuncio.anuncio != '' && anuncio.anuncio != undefined && anuncio.anuncio != null) ? (
            <View style={StyleAnuncio.visualizarAnuncioLinhaEditavel}>
              <View style={StyleAnuncio.visualizarAnuncioLinha}>
                <Text style={StyleAnuncio.visualizarAnuncioDescricaoText}>
                  Anúncio:{" "}
                </Text>
                <Text style={StyleAnuncio.visualizarAnuncioAtributoText}
                  onPress={() => {
                    if (editavel)
                      this.props.navigation.navigate(ROUTES_NEW_USER_ANUNCIO)
                  }}>
                  {anuncio.anuncio}
                </Text>
              </View>
              {editavel &&
                <View style={StyleAnuncio.visualizarAnuncioLinha}>
                  <Text style={StyleAnuncio.visualizarAnuncioAtributoEditarText}
                    onPress={() => {
                      this.props.navigation.navigate(ROUTES_NEW_USER_ANUNCIO)
                    }}>
                    {">"}
                  </Text>
                </View>
              }
            </View>
          ) : null}
          {(anuncio.preco != '' && anuncio.preco != undefined && anuncio.preco != null) ? (
            <View style={StyleAnuncio.visualizarAnuncioLinhaEditavel}>
              <View style={StyleAnuncio.visualizarAnuncioLinha}>
                <Text style={StyleAnuncio.visualizarAnuncioDescricaoText}>
                  Preço:{" "}
                </Text>
                <Text style={StyleAnuncio.visualizarAnuncioAtributoText}
                  onPress={() => {
                    if (editavel)
                      this.props.navigation.navigate(ROUTES_NEW_USER_PROFISSAO)
                  }}>
                  {anuncio.preco}*
              </Text>
              </View>
              {editavel &&
                <View style={StyleAnuncio.visualizarAnuncioLinha}>
                  <Text style={StyleAnuncio.visualizarAnuncioAtributoEditarText}
                    onPress={() => {
                      this.props.navigation.navigate(ROUTES_NEW_USER_PROFISSAO)
                    }}>
                    {">"}
                  </Text>
                </View>
              }
            </View>
          ) : null}
          {(anuncio.preco != '' && anuncio.preco != undefined && anuncio.preco != null) ? (
            <View style={StyleAnuncio.visualizarAnuncioLinha}>
              <Text style={StyleAnuncio.visualizarAnuncioDescricaoText}>
                * Estimado para o turno de 12 horas
              </Text>
            </View>
          ) : null}

          <View style={StyleAnuncio.visualizarAnuncioLinhaIcones}>
            {(anuncio.email == null || anuncio.email == undefined || anuncio.email == '') ? (
              <Icon
                raised //circulo em volta
                name="envelope"
                type="font-awesome"
                size={28}
                color="#e0e0eb"
              />
            ) : (
                <TouchableOpacity
                  //style={styles.productButton}
                  onPress={() => {
                    MensagemEmail(anuncio);
                  }}
                >
                  {/* <SocialIcon
                type='envelope'
                iconSize={18}
              /> */}
                  <Icon
                    raised //circulo em volta
                    name="envelope"
                    type="font-awesome"
                    size={28}
                    color={definicoesBase.backgroundCabecalho}
                  />
                </TouchableOpacity>
              )}
            {(anuncio.telefone == null || anuncio.telefone == undefined || anuncio.telefone == '') ? (
              <Icon
                raised //circulo em volta
                name="whatsapp"
                type="font-awesome"
                size={28}
                color="#e0e0eb"
              />
            ) : (
                <TouchableOpacity
                  //style={styles.productButton}
                  onPress={() => {
                    MensagemTelefone(anuncio);
                  }}
                >
                  <Icon
                    raised //circulo em volta
                    name="whatsapp"
                    type="font-awesome"
                    size={28}
                    color="#4AC959"
                  />
                </TouchableOpacity>
              )}
            {(anuncio.instagram == null || anuncio.instagram == undefined || anuncio.instagram == '') ? (
              <Icon
                raised //circulo em volta
                name="instagram"
                type="font-awesome"
                size={28}
                color="#e0e0eb"
              />
            ) : (
                <TouchableOpacity
                  //style={styles.productButton}
                  onPress={() => {
                    MensagemInstagram(anuncio);
                  }}
                >
                  <Icon
                    raised //circulo em volta
                    name="instagram"
                    type="font-awesome"
                    size={28}
                    color="#cc66ff"
                  />
                </TouchableOpacity>
              )}
          </View>
        </View>
      </ScrollView>
    )
  }
}

export default withNavigation(Anuncio);


// Anuncio.propTypes = {
//   anuncio: PropTypes.object.isRequired,
//   editavel: PropTypes.bool
// }

// Anuncio.defaultProps = {
//   editavel: false,
// }

// export default Anuncio;
