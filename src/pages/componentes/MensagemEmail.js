import React from 'react';

import { Linking } from "react-native";
//import firebase from 'react-native-firebase';
import firestore from '@react-native-firebase/firestore';
import auth from "@react-native-firebase/auth";

const tituloPadrao =  encodeURIComponent('Procuro Cuidador :: iCare');
const mensagemPadrao =  encodeURIComponent('Olá, tudo bem? Vi seu anúncio no aplicativo iCare. Você está disponível?');

const MensagemEmail = (data) => {
  const currentUser = auth().currentUser;
  firestore().collection('transacoes').add({
    destino_user_uid: data.user_uid,
    destino_uid: data.uid,
    origem_uid: currentUser.uid,
    email: data.email,
    timestamp: JSON.stringify(Date.now()),
    horario: `${new Date()}`,
  });
  const titulo = (data.titulo == undefined ? tituloPadrao : data.titulo);
  const mensagem = (data.mensagem == undefined ? mensagemPadrao : data.mensagem);
  Linking.openURL('mailto:'+ data.email + '?subject=' + titulo + '&body=' + mensagem);
};
export default MensagemEmail;
