import React from "react";

import {
  View,
  Text,
  TouchableOpacity,
  Image,
  Linking,
  ScrollView
} from "react-native";
//import Ionicons from 'react-native-vector-icons/Ionicons';
import { Icon } from "react-native-elements";
import MensagemTelefone from "../componentes/MensagemTelefone";
import { navigationOptions } from "../../styles/StyleBase";

import StyleAnuncio, { anuncioIconeTelefone } from "../../styles/StyleAnuncio";

const Anuncio = props => {
  const { anuncio } = props;

  console.log(anuncio);

  return (
    <ScrollView>
      <View style={StyleAnuncio.visualizarAnuncioFotoContainer}>
        <Image
          style={StyleAnuncio.visualizarAnuncioImagemUsuario}
          source={{ uri: anuncio.foto }}
        />
      </View>
      <TouchableOpacity
        //style={styles.productButton}
        onPress={() => {
          MensagemTelefone(anuncio);
        }}
      >
        <View style={StyleAnuncio.visualizarAnuncioNomeContainer}>
          <View style={StyleAnuncio.visualizarAnuncioLinha}>
            <Text style={StyleAnuncio.visualizarAnuncioDescricaoText}>
              Nome:{" "}
            </Text>
            <Text style={StyleAnuncio.visualizarAnuncioAtributoText}>
              {anuncio.nome}
            </Text>
          </View>
        </View>
        <View style={StyleAnuncio.visualizarAnuncioTextosContainer}>
          <View style={StyleAnuncio.visualizarAnuncioLinha}>
            <Text style={StyleAnuncio.visualizarAnuncioDescricaoText}>
              Telefone:{" "}
            </Text>
            <Icon
              //raised //circulo em volta
              name="whatsapp"
              type="font-awesome"
              //color={anuncioIconeTelefone.color}
              size={anuncioIconeTelefone.size}
              containerStyle={StyleAnuncio.iconeFiltro}
              //onPress={() => console.log('hello')}
            />
            <Text style={StyleAnuncio.visualizarAnuncioAtributoText}>
              {anuncio.telefone}
            </Text>
          </View>
          <View style={StyleAnuncio.visualizarAnuncioLinha}>
            <Text style={StyleAnuncio.visualizarAnuncioDescricaoText}>
              Profissão:{" "}
            </Text>
            <Text style={StyleAnuncio.visualizarAnuncioAtributoText}>
              {anuncio.profissao}
            </Text>
          </View>

          <View style={StyleAnuncio.visualizarAnuncioLinha}>
            <Text style={StyleAnuncio.visualizarAnuncioDescricaoText}>
              Anúncio:{" "}
            </Text>
            <Text style={StyleAnuncio.visualizarAnuncioAtributoText}>
              {anuncio.anuncio}
            </Text>
          </View>
          <View style={StyleAnuncio.visualizarAnuncioLinha}>
            <Text style={StyleAnuncio.visualizarAnuncioDescricaoText}>
              Preço:{" "}
            </Text>
            <Text style={StyleAnuncio.visualizarAnuncioAtributoText}>
              R$ {anuncio.preco}*
            </Text>
          </View>
          <View style={StyleAnuncio.visualizarAnuncioLinha}>
            <Text style={StyleAnuncio.visualizarAnuncioDescricaoText}>
              * Estimado para o turno de 12 horas
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default Anuncio;
