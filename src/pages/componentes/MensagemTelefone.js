import React from 'react';

import { Linking } from "react-native";
//import firebase from 'react-native-firebase';
import firestore from '@react-native-firebase/firestore';
import auth from "@react-native-firebase/auth";

const mensagemPadrao =  encodeURIComponent('Olá, tudo bem? Vi seu anúncio no aplicativo iCare. Você está disponível?');

const MensagemTelefone = (data) => {
  const currentUser = auth().currentUser;
  firestore().collection('transacoes').add({
    destino_user_uid: data.user_uid,
    origem_user_uid: currentUser.uid,
    telefone: data.telefone,
    timestamp: JSON.stringify(Date.now()),
    horario: `${new Date()}`,
  });
  const mensagem = (data.mensagem == undefined ? mensagemPadrao : data.mensagem);
  Linking.openURL('whatsapp://send?text=' + mensagem + '&phone=+55' + data.telefone);
};
export default MensagemTelefone;
