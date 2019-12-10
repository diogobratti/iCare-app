import React from 'react';

import { Linking } from "react-native";
import firebase from 'react-native-firebase';

const mensagem =  encodeURIComponent('Olá, tudo bem? Vi seu anúncio no aplicativo iCare. Você está disponível?');

const MensagemTelefone = (data) => {
  firebase.firestore().collection('transacoes').add({
    UID: data.UID,
    telefone: data.telefone,
    timestamp: Date.now(),
  });
  Linking.openURL('whatsapp://send?text=' + mensagem + '&phone=+55' + data.telefone);
};
export default MensagemTelefone;