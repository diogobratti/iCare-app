import React, { Component } from "react";

import { View, Text, TouchableOpacity, Image, ScrollView, BackHandler } from "react-native";
import { Icon, SocialIcon } from "react-native-elements";
import MensagemTelefone from "../componentes/MensagemTelefone";
import MensagemEmail from "../componentes/MensagemEmail";
import MensagemInstagram from "../componentes/MensagemInstagram";

import StyleAnuncio, { anuncioIconeTelefone } from "../../styles/StyleAnuncio";

import { definicoesBase, navigationOptions } from "../../styles/StyleBase";
import analytics from '@react-native-firebase/analytics';

export default class FaleConosco extends Component {
  static navigationOptions = {
    ...navigationOptions,
  };
  // constructor(props) {
  //   super(props);
  //   this.handleBackButtonClick = (() => {
  //     //   if (this.navigator && this.navigator.getCurrentRoutes().length > 1){
  //     //     this.navigator.pop();
  //     return true; //avoid closing the app
  //     //   }
  //     //   return false; //close the app
  //   }).bind(this) //don't forget bind this, you will remember anyway.
  // }

  state = {
    anuncio: {
      nome: 'ICare - Aplicativo para cuidadores',
      email: 'icare.contato@gmail.com',
      instagram: 'icarecuidadores',
      telefone: '48984595360',
      titulo: 'Fale Conosco :: iCare',
      mensagem: '',
      foto: 'data:image/png;base64,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',

    }
  };
  // async componentDidMount() {
  //   BackHandler.addEventListener('hardwareBackPress', this.handleBackButtonClick);
  // }

  render() {
    const { anuncio } = this.state;
    return (

      <View style={{ paddingTop: 20 }}>
        <ScrollView>
          <View style={StyleAnuncio.visualizarAnuncioFotoContainer}>
            <Image
              style={StyleAnuncio.visualizarAnuncioImagemUsuario}
              source={{ uri: anuncio.foto }}
            />
          </View>
          <View style={StyleAnuncio.visualizarAnuncioNomeContainer}>
            <View style={{...StyleAnuncio.visualizarAnuncioLinha, alignItems: 'center', justifyContent: 'center', alignContent: 'center'}}>
              <Text style={StyleAnuncio.visualizarAnuncioAtributoText}>
              {anuncio.nome}
              </Text>
            </View>
            <View style={StyleAnuncio.visualizarAnuncioLinha}>
              <Text style={StyleAnuncio.visualizarAnuncioDescricaoText}>
                {" "}
              </Text>
            </View>
            <View style={StyleAnuncio.visualizarAnuncioLinha}>
              <Text style={StyleAnuncio.visualizarAnuncioDescricaoText}>
                {" "}
              </Text>
            </View>
            <View style={{...StyleAnuncio.visualizarAnuncioLinha, alignItems: 'center', justifyContent: 'center', alignContent: 'center'}}>
              <Text style={StyleAnuncio.visualizarAnuncioDescricaoText}>
                Contamos com o apoio de vocês para entregar um aplicativo cada vez melhor.
              </Text>
            </View>
            <View style={StyleAnuncio.visualizarAnuncioLinha}>
              <Text style={StyleAnuncio.visualizarAnuncioDescricaoText}>
                {" "}
              </Text>
            </View>
            <View style={StyleAnuncio.visualizarAnuncioLinha}>
              <Text style={StyleAnuncio.visualizarAnuncioDescricaoText}>
                {" "}
              </Text>
            </View>
          </View>
          <View style={StyleAnuncio.visualizarAnuncioTextosContainer}>
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
                      analytics().logEvent('button_press', {
                        _SCREEN: 'FaleConosco',
                        _CLASS: 'FaleConosco',
                        _BUTTON: 'Mandar_Email',
                      });
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
                      analytics().logEvent('button_press', {
                        _SCREEN: 'FaleConosco',
                        _CLASS: 'FaleConosco',
                        _BUTTON: 'Mandar_WhatsApp',
                      });
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
                      analytics().logEvent('button_press', {
                        _SCREEN: 'FaleConosco',
                        _CLASS: 'FaleConosco',
                        _BUTTON: 'Mandar_Instagram',
                      });
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
      </View>
    );
  }
}