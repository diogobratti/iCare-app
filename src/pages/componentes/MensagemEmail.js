import React from 'react';

import { Linking } from "react-native";
import firebase from 'react-native-firebase';

const titulo =  encodeURIComponent('Procuro Cuidador :: iCare');
const mensagem =  encodeURIComponent('Olá, tudo bem? Vi seu anúncio no aplicativo iCare. Você está disponível?');

const MensagemEmail = (data) => {
  firebase.firestore().collection('transacoes').add({
    UID: data.UID,
    email: data.email,
    timestamp: Date.now(),
  });
  Linking.openURL('mailto:'+ data.email + '?subject=' + titulo + '&body=' + mensagem);
};
export default MensagemEmail;