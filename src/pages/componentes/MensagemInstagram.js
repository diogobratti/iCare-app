import React from 'react';

import { Linking } from "react-native";
import firebase from 'react-native-firebase';


const MensagemInstagram = (data) => {
  firebase.firestore().collection('transacoes').add({
    UID: data.UID,
    instagram: data.telefone,
    timestamp: Date.now(),
  });
  Linking.openURL('instagram://user?username=' + data.instagram);
};
export default MensagemInstagram;