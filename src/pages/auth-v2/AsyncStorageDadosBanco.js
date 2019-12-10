import React from 'react';
import firebase from "react-native-firebase";
import LocalStorage from '../../services/LocalStorage';
import * as CONSTANTES from '../../data/Constantes';
import reactotron from 'reactotron-react-native';
import AsyncStorage from '@react-native-community/async-storage';

export default {

  async atualizaAsyncStorageDadosBanco() {
    //somente atualiza após usuário autenticado
    //E se não tem AsyncStorage com nome
    const telefone = await LocalStorage.getItem(CONSTANTES.ASYNC_ITEM_USUARIO_TELEFONE)

    // reactotron.log("telefone:" + telefone);
    // reactotron.log(firebase.auth().currentUser);
    const a = ((firebase.auth().currentUser !== null) && (telefone == null))
    // reactotron.log("resultado:" + a);

    if ((firebase.auth().currentUser !== null) && (telefone == null)) {

      // reactotron.log("entrou1")


      try {

        // reactotron.log("entrou2")
        const uid = await LocalStorage.getItem(CONSTANTES.ASYNC_ITEM_USUARIO_UID)

        // reactotron.log(uid);

        const getResult = await firebase.firestore()
        .collection(CONSTANTES.FIRESTORE_COLLECTION_ANUNCIOS)
        .where("user_uid", "==", uid)
        .get();

        // reactotron.log("entrou")
        // reactotron.log(getResult);

        //existe cadastro no banco
        if (!getResult.empty) {
          const docs = getResult.docs;

          // reactotron.log("nao vazio")


          // reactotron.log(docs);

          if (docs.length === 1) {

            // reactotron.log("tamanho 1")


            dadosBanco = docs[0].data();
            const dados = [];

            // reactotron.log(dadosBanco);

            if (this.objetoTemPropriedade(dadosBanco, CONSTANTES.FIRESTORE_FIELD_ANUNCIO_USUARIO_ANUNCIO)) {
              dados.push([CONSTANTES.ASYNC_ITEM_USUARIO_ANUNCIO, dadosBanco[CONSTANTES.FIRESTORE_FIELD_ANUNCIO_USUARIO_ANUNCIO]])
            }

            if (this.objetoTemPropriedade(dadosBanco, CONSTANTES.FIRESTORE_FIELD_ANUNCIO_CADASTRO_COMPLETO)) {
              dados.push([CONSTANTES.ASYNC_ITEM_CADASTRO_COMPLETO, dadosBanco[CONSTANTES.FIRESTORE_FIELD_ANUNCIO_CADASTRO_COMPLETO]])
            }

            if (this.objetoTemPropriedade(dadosBanco, CONSTANTES.FIRESTORE_FIELD_ANUNCIO_USUARIO_MUNICIPIO)) {
              dados.push([CONSTANTES.ASYNC_ITEM_USUARIO_MUNICIPIO, dadosBanco[CONSTANTES.FIRESTORE_FIELD_ANUNCIO_USUARIO_MUNICIPIO]])
            }

            if (this.objetoTemPropriedade(dadosBanco, CONSTANTES.FIRESTORE_FIELD_ANUNCIO_USUARIO_EMAIL)) {
              dados.push([CONSTANTES.ASYNC_ITEM_USUARIO_EMAIL, dadosBanco[CONSTANTES.FIRESTORE_FIELD_ANUNCIO_USUARIO_EMAIL]])
            }

            if (this.objetoTemPropriedade(dadosBanco, CONSTANTES.FIRESTORE_FIELD_ANUNCIO_USUARIO_FOTO)) {
              dados.push([CONSTANTES.ASYNC_ITEM_USUARIO_FOTO, dadosBanco[CONSTANTES.FIRESTORE_FIELD_ANUNCIO_USUARIO_FOTO]])
            }

            if (this.objetoTemPropriedade(dadosBanco, CONSTANTES.FIRESTORE_FIELD_ANUNCIO_USUARIO_UID)) {
              dados.push([CONSTANTES.ASYNC_ITEM_USUARIO_UID, dadosBanco[CONSTANTES.FIRESTORE_FIELD_ANUNCIO_USUARIO_UID]])
            }

            if (this.objetoTemPropriedade(dadosBanco, CONSTANTES.FIRESTORE_FIELD_ANUNCIO_USUARIO_INSTAGRAM)) {
              dados.push([CONSTANTES.ASYNC_ITEM_USUARIO_INSTAGRAM, dadosBanco[CONSTANTES.FIRESTORE_FIELD_ANUNCIO_USUARIO_INSTAGRAM]])
            }

            if (this.objetoTemPropriedade(dadosBanco, CONSTANTES.FIRESTORE_FIELD_ANUNCIO_USUARIO_REGIAO)) {
              dados.push([CONSTANTES.ASYNC_ITEM_USUARIO_REGIAO, dadosBanco[CONSTANTES.FIRESTORE_FIELD_ANUNCIO_USUARIO_REGIAO]])
            }

            if (this.objetoTemPropriedade(dadosBanco, CONSTANTES.FIRESTORE_FIELD_ANUNCIO_USUARIO_NOME)) {
              dados.push([CONSTANTES.ASYNC_ITEM_USUARIO_NOME, dadosBanco[CONSTANTES.FIRESTORE_FIELD_ANUNCIO_USUARIO_NOME]])
            }

            if (this.objetoTemPropriedade(dadosBanco, CONSTANTES.FIRESTORE_FIELD_ANUNCIO_USUARIO_PRECO)) {
              dados.push([CONSTANTES.ASYNC_ITEM_USUARIO_PRECO, dadosBanco[CONSTANTES.FIRESTORE_FIELD_ANUNCIO_USUARIO_PRECO]])
            }

            if (this.objetoTemPropriedade(dadosBanco, CONSTANTES.FIRESTORE_FIELD_ANUNCIO_USUARIO_PROFISSAO)) {
              dados.push([CONSTANTES.ASYNC_ITEM_USUARIO_PROFISSAO, dadosBanco[CONSTANTES.FIRESTORE_FIELD_ANUNCIO_USUARIO_PROFISSAO]])
            }

            if (this.objetoTemPropriedade(dadosBanco, CONSTANTES.FIRESTORE_FIELD_ANUNCIO_USUARIO_PROVIDER_ID)) {
              dados.push([CONSTANTES.ASYNC_ITEM_USUARIO_PROVIDER_ID, dadosBanco[CONSTANTES.FIRESTORE_FIELD_ANUNCIO_USUARIO_PROVIDER_ID]])
            }

            if (this.objetoTemPropriedade(dadosBanco, CONSTANTES.FIRESTORE_FIELD_ANUNCIO_USUARIO_TELEFONE)) {
              dados.push([CONSTANTES.ASYNC_ITEM_USUARIO_TELEFONE, dadosBanco[CONSTANTES.FIRESTORE_FIELD_ANUNCIO_USUARIO_TELEFONE]])
            }

            if (this.objetoTemPropriedade(dadosBanco, CONSTANTES.FIRESTORE_FIELD_ANUNCIO_USUARIO_ESTADO)) {
              dados.push([CONSTANTES.ASYNC_ITEM_USUARIO_ESTADO, dadosBanco[CONSTANTES.FIRESTORE_FIELD_ANUNCIO_USUARIO_ESTADO]])
            }

            if (this.objetoTemPropriedade(dadosBanco, CONSTANTES.FIRESTORE_FIELD_ANUNCIO_TERMO_SERVICO)) {
              dados.push([CONSTANTES.ASYNC_ITEM_TERMO_SERVICO, dadosBanco[CONSTANTES.FIRESTORE_FIELD_ANUNCIO_TERMO_SERVICO]])
            }

            if (this.objetoTemPropriedade(dadosBanco, CONSTANTES.FIRESTORE_FIELD_ANUNCIO_CADASTRO_COMPLETO)) {
              dados.push([CONSTANTES.ASYNC_ITEM_CADASTRO_COMPLETO, dadosBanco[CONSTANTES.FIRESTORE_FIELD_ANUNCIO_CADASTRO_COMPLETO ]])
            }

            // reactotron.log(dados);

            await AsyncStorage.multiSet(dados)

            // reactotron.log("xx")

            return true;

          } else {
            //TODO: tratar adequadamente
            reactotron.log("Erro interno: mais de um dado encontrado no banco")
          }
        }
      }
      catch (error) {
        //TODO: tratar erros adequadamente
        // console.log(error);
        reactotron.log(error);
      }

    }
  },

  objetoTemPropriedade(obj, prop) {
    // return Object.prototype.hasOwnProperty.call(obj, prop)
    return (prop in obj && obj[prop] != null)
  }

}


