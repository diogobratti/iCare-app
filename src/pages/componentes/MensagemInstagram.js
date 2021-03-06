import React from 'react';

import { Linking } from "react-native";
//import firebase from 'react-native-firebase';
import firestore from '@react-native-firebase/firestore';
import auth from "@react-native-firebase/auth";


const MensagemInstagram = (data) => {
  const currentUser = auth().currentUser;
  firestore().collection('transacoes').add({
    destino_user_uid: data.user_uid,
    origem_user_uid: currentUser.uid,
    instagram: data.instagram,
    timestamp: JSON.stringify(Date.now()),
    horario: `${new Date()}`,
  });
  Linking.openURL('instagram://user?username=' + data.instagram.replace("@",""));
};
export default MensagemInstagram;
