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
