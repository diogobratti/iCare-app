import React from 'react';

import { Linking } from "react-native";
//import firebase from 'react-native-firebase';
import firestore from '@react-native-firebase/firestore';
import auth from "@react-native-firebase/auth";
import reactotron from 'reactotron-react-native';
import * as CONSTANTES from '../../data/Constantes';
import LocalStorage from '../../services/LocalStorage';

const mensagemPadrao =  encodeURIComponent('Olá, tudo bem? Vi seu anúncio no aplicativo iCare. Você está disponível?');

const MensagemTelefone = async (data) => {
  const currentUser = auth().currentUser;
  reactotron.log(currentUser);
  reactotron.log(data);
  reactotron.log(data.mensagem == undefined);
  reactotron.log(data.telefone);
  reactotron.log(mensagemPadrao);


  const pais = await LocalStorage.getItem(CONSTANTES.ASYNC_ITEM_USUARIO_PAIS);
  const phoneCode = (pais === CONSTANTES.PAIS_PORTUGAL ? "+351" : "+55");
  const telefone = (data.telefone == "48984595360" ? "+5548984595360" : phoneCode + data.telefone)

  firestore().collection('transacoes').add({
    destino_user_uid: data.user_uid,
    origem_user_uid: currentUser.uid,
    telefone: telefone,
    timestamp: JSON.stringify(Date.now()),
    horario: `${new Date()}`,
  });
  const mensagem = (data.mensagem == undefined ? mensagemPadrao : data.mensagem);
  Linking.openURL('whatsapp://send?text=' + mensagem + '&phone=' + telefone);
};
export default MensagemTelefone;
