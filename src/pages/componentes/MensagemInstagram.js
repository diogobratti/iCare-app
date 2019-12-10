import React from 'react';

import { Linking } from "react-native";
//import firebase from 'react-native-firebase';
import firestore from '@react-native-firebase/firestore';


const MensagemInstagram = (data) => {
  firestore().collection('transacoes').add({
    UID: data.UID,
    instagram: data.telefone,
    timestamp: Date.now(),
  });
  Linking.openURL('instagram://user?username=' + data.instagram.replace("@",""));
};
export default MensagemInstagram;
