import React from 'react';

import { Linking } from "react-native";
//import firebase from 'react-native-firebase';
import firestore from '@react-native-firebase/firestore';
import auth from "@react-native-firebase/auth";
import reactotron from 'reactotron-react-native';

const mensagemPadrao =  encodeURIComponent('Olá, tudo bem? Vi seu anúncio no aplicativo iCare. Você está disponível?');

const MensagemTelefone = (data) => {
  const currentUser = auth().currentUser;
  reactotron.log(currentUser);
  reactotron.log(data);
  reactotron.log(data.mensagem == undefined);
  reactotron.log(data.telefone);
  reactotron.log(mensagemPadrao);

  firestore().collection('transacoes').add({
    destino_user_uid: data.user_uid,
    destino_uid: data.uid,
    origem_uid: currentUser.uid,
    telefone: data.telefone,
    timestamp: JSON.stringify(Date.now()),
    horario: `${new Date()}`,
  });
  const mensagem = (data.mensagem == undefined ? mensagemPadrao : data.mensagem);
  Linking.openURL('whatsapp://send?text=' + mensagem + '&phone=+55' + data.telefone);
};
export default MensagemTelefone;
