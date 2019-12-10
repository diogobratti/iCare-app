import React from 'react';

import { Linking } from "react-native";
import firebase from 'react-native-firebase';

const tituloPadrao =  encodeURIComponent('Procuro Cuidador :: iCare');
const mensagemPadrao =  encodeURIComponent('Olá, tudo bem? Vi seu anúncio no aplicativo iCare. Você está disponível?');

const MensagemEmail = (data) => {
  firebase.firestore().collection('transacoes').add({
    UID: data.UID,
    email: data.email,
    timestamp: Date.now(),
  });
  const titulo = (data.titulo == undefined ? tituloPadrao : data.titulo);
  const mensagem = (data.mensagem == undefined ? mensagemPadrao : data.mensagem);
  Linking.openURL('mailto:'+ data.email + '?subject=' + titulo + '&body=' + mensagem);
};
export default MensagemEmail;