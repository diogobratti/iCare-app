import React from 'react';

import { Linking } from "react-native";

const mensagem =  encodeURIComponent('Olá, tudo bem? Vi seu anúncio no aplicativo iCare. Você está disponível?');

const MensagemTelefone = (telefone) => {
  Linking.openURL('whatsapp://send?text=' + mensagem + '&phone=+55' + telefone);

};
export default MensagemTelefone;