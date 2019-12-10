import React from "react";

import { View, Text, TouchableOpacity, Image, ScrollView } from "react-native";
import { Icon, SocialIcon } from "react-native-elements";
import MensagemTelefone from "../componentes/MensagemTelefone";
import MensagemEmail from "../componentes/MensagemEmail";
import MensagemInstagram from "../componentes/MensagemInstagram";

import StyleAnuncio, { anuncioIconeTelefone } from "../../styles/StyleAnuncio";

import { definicoesBase } from "../../styles/StyleBase";

const Anuncio = props => {
  const { anuncio, editavel } = props;

  // console.log(anuncio);

  return (
    <ScrollView>
      <View style={StyleAnuncio.visualizarAnuncioFotoContainer}>
        <Image
          style={StyleAnuncio.visualizarAnuncioImagemUsuario}
          source={{ uri: anuncio.foto }}
        />
      </View>
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
          {/* <Icon
            //raised //circulo em volta
            name="whatsapp"
            type="font-awesome"
            //color={anuncioIconeTelefone.color}
            size={anuncioIconeTelefone.size}
            containerStyle={StyleAnuncio.iconeFiltro}
          //onPress={() => console.log('hello')}
          /> */}
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
            {anuncio.preco}*
            </Text>
        </View>
        <View style={StyleAnuncio.visualizarAnuncioLinha}>
          <Text style={StyleAnuncio.visualizarAnuncioDescricaoText}>
            * Estimado para o turno de 12 horas
            </Text>
        </View>
        <View style={StyleAnuncio.visualizarAnuncioLinhaIcones}>
          {(anuncio.email == null || anuncio.email == undefined || anuncio.email == '') ? (
            <Icon
              raised //circulo em volta
              name="envelope"
              type="font-awesome"
              size={28}
              color="#e0e0eb"
            />
          ) : (
              <TouchableOpacity
                //style={styles.productButton}
                onPress={() => {
                  MensagemEmail(anuncio);
                }}
              >
                {/* <SocialIcon
            type='envelope'
            iconSize={18}
          /> */}
                <Icon
                  raised //circulo em volta
                  name="envelope"
                  type="font-awesome"
                  size={28}
                  color={definicoesBase.backgroundCabecalho}
                />
              </TouchableOpacity>
            )}
          {(anuncio.telefone == null || anuncio.telefone == undefined || anuncio.telefone == '') ? (
            <Icon
              raised //circulo em volta
              name="whatsapp"
              type="font-awesome"
              size={28}
              color="#e0e0eb"
            />
          ) : (
              <TouchableOpacity
                //style={styles.productButton}
                onPress={() => {
                  MensagemTelefone(anuncio);
                }}
              >
                <Icon
                  raised //circulo em volta
                  name="whatsapp"
                  type="font-awesome"
                  size={28}
                  color="#4AC959"
                />
              </TouchableOpacity>
            )}
          {(anuncio.instagram == null || anuncio.instagram == undefined || anuncio.instagram == '') ? (
            <Icon
              raised //circulo em volta
              name="instagram"
              type="font-awesome"
              size={28}
              color="#e0e0eb"
            />
          ) : (
              <TouchableOpacity
                //style={styles.productButton}
                onPress={() => {
                  MensagemInstagram(anuncio);
                }}
              >
                <Icon
                  raised //circulo em volta
                  name="instagram"
                  type="font-awesome"
                  size={28}
                  color="#cc66ff"
                />
              </TouchableOpacity>
            )}
        </View>
      </View>
    </ScrollView>
  );
};

export default Anuncio;
