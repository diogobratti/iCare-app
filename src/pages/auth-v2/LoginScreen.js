import React, { Component } from "react";
import { StyleSheet, Text, View, ScrollView, ActivityIndicator, Alert } from "react-native";
import { SocialIcon, Overlay } from "react-native-elements";
import firestore from "@react-native-firebase/firestore";
import auth, { firebase } from "@react-native-firebase/auth";
import { AccessToken, LoginManager } from "react-native-fbsdk";
import { GoogleSignin, statusCodes } from "react-native-google-signin";
import StyleBase, { navigationOptions } from "../../styles/StyleBase";
import StyleFaleConosco from "../../styles/StyleFaleConosco";
import Button from './components/Button';
import LocalStorage from '../../services/LocalStorage';
import * as CONSTANTES from '../../data/Constantes';
import AsyncStorage from "@react-native-community/async-storage";
import StyleTermo from "../../styles/StyleTermo";
import StyleCadastro from "../../styles/StyleCadastro";
import SincronizadorBanco from "./AsyncStorageDadosBanco"
import analytics from '@react-native-firebase/analytics';

export default class Login extends Component {

  state = {
    isProcessing: false
  };

  static navigationOptions = {
    ...navigationOptions,
  };

  async componentDidMount() {
    await analytics().setCurrentScreen('LoginScreen', 'LoginScreen')
  }

  handleSocialLoginFacebook = async () => {
    // console.log("handleSocialLoginFacebook");

    this.setState({ isProcessing: true });

    try {
      // console.log("entrou");
      const result = await LoginManager.logInWithPermissions([
        "public_profile",
        "email"
      ]);
      // console.log(result);
      // console.log("mostrou login");

      if (result.isCancelled) {
        // handle this however suites the flow of your app
        this.setState({ isProcessing: false });
        //this._alertErro("Autorização Cancelada");
        // this.props.navigation.push("Loading");
        throw new Error("Autorização Cancelada");
      }

      // console.log(
      // `Login success with permissions: ${result.grantedPermissions.toString()}`
      // );

      // get the access token
      const data = await AccessToken.getCurrentAccessToken();

      if (!data) {
        // handle this however suites the flow of your app
        this.setState({ isProcessing: false });
        //this._alertErro("Erro acessando os dados do token do usuário");
        // this.props.navigation.push("Loading");
        throw new Error(
         // "Something went wrong obtaining the users access token"
	"Erro acessando os dados do token do usuário"
        );
      }

      // create a new firebase credential with the token
      const credential = firebase.auth.FacebookAuthProvider.credential(
        data.accessToken
      );

      // login with credential
      const firebaseUserCredential = await firebase.auth().signInWithCredential(credential);

      // console.warn(JSON.stringify(firebaseUserCredential.user.toJSON()));
      // console.log(JSON.stringify(firebaseUserCredential.user.toJSON()));

      const nome = firebaseUserCredential.additionalUserInfo.profile.name;
      const email = firebaseUserCredential.additionalUserInfo.profile.email;
      const foto = firebaseUserCredential.additionalUserInfo.profile.picture.data.url;

      await analytics().logLogin({method: 'Facebook'})

      await this.posAutenticacao(
        firebaseUserCredential,
        data.userID,
        nome,
        email,
        foto,
        data,
        "Facebook"
      );
    } catch (e) {
      this.setState({ isProcessing: false });
      this._alertErro(e.toString());
      // this.props.navigation.push("Loading");
      console.error(e);
    }
    // this.setState({ isProcessing: false });

  };

  handleSocialLoginGoogle = async () => {
    // console.log("handleSocialLoginGoogle");

    this.setState({ isProcessing: true });

    try {
      // GoogleServices active
      await GoogleSignin.hasPlayServices({
        showPlayServicesUpdateDialog: true
      });

      // add any configuration settings here:
      GoogleSignin.configure({
        scopes: [
          "https://www.googleapis.com/auth/userinfo.profile",
          "https://www.googleapis.com/auth/userinfo.email"
        ]
      });

      //sign in
      const userData = await GoogleSignin.signIn();

      const tokenData = await GoogleSignin.getTokens();

      // console.log(tokenData);
      // console.log(userData);

      // create a new firebase credential with the token
      const credential = await firebase.auth.GoogleAuthProvider.credential(
        tokenData.idToken,
        tokenData.accessToken
      );

      // login with credential
      const firebaseUserCredential = await firebase
        .auth()
        .signInWithCredential(credential);

      // console.log("usuario autenticado ");

      // console.log("entrando pos autenticacao");

      const nome = firebaseUserCredential.additionalUserInfo.profile.name;
      const email = firebaseUserCredential.additionalUserInfo.profile.email;
      const foto = firebaseUserCredential.additionalUserInfo.profile.picture;

      await analytics().logLogin({method: 'Google'})

      await this.posAutenticacao(
        firebaseUserCredential,
        userData.user.id,
        nome,
        email,
        foto,
        tokenData,
        "Google"
      );
    } catch (error) {
      this.setState({ isProcessing: false });

      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        // user cancelled the login flow
        this._alertErro("Autorização Cancelada");
        // this.props.navigation.push("Loading");

      } else if (error.code === statusCodes.IN_PROGRESS) {
        // operation (f.e. sign in) is in progress already
        this._alertErro("Já existe uma solicitação de autenticação em andamento");
        // this.props.navigation.push("Loading");

      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        this._alertErro("Google Play Services não instalado ou desatualizado. Não é possível efetuar login com o Google sem o Play Services instalado.");
        // this.props.navigation.push("Loading");
        // play services not available or outdated

      } else {
        // some other error happened
        this._alertErro("Erro Interno: " + error)

        console.error(error);
      }
    }
    // this.setState({ isProcessing: false });

  };

  /**
   * Verifica se o cadastro do usuário está completo. Se estiver, redireciona
   * para página de anúnicio, se não estiver, redireciona para completar o
   * cadastro
   * @param {UserCredential} firebaseCredential Credencial do Firebase
   */
  posAutenticacao = async (firebaseCredential, idAuthProvider, nome, email, foto, token, providerName) => {
    let collection = firestore().collection(CONSTANTES.FIRESTORE_COLLECTION_ANUNCIOS);
    //SE o usuário não tiver cadastro ainda, cria cadastro
    let querySnapshot = await collection
      .where("user_uid", "==", firebaseCredential.user.uid)
      .get()
      .then(data => {
        return data;
      });

    let docReference = null;

    // const timestamp = new Date();
    let termoservico = `${new Date()}`;
    let timestamp = JSON.stringify(new Date());

    const perfil = await LocalStorage.getItem(CONSTANTES.ASYNC_ITEM_PERFIL);

    if (querySnapshot.empty) {
      // console.log("Dados vazios. criando novo cadastro");
      docReference = await collection
        .add({
          id: firebaseCredential.user.uid,
          user_uid: firebaseCredential.user.uid,
          provider_id: idAuthProvider,
          nome: nome,
          email: email,
          foto: foto,
          versaoTermosServico: termoservico,
          timestamp: timestamp,
          perfil: perfil
        })
        .then(newData => {
          //atualiza referencia
          // console.log("cadastro criado ");
          // console.log(newData);
          // data = newData;
          return newData;
        });

        analytics().logEvent('NovoCadastro', {
          perfil: perfil
        })

    } else {
      docReference = querySnapshot.docs[0].ref;

      await SincronizadorBanco.atualizaAsyncStorageDadosBanco()

    }
    // console.log(docReference);
    // console.log("redirecionando Loading");

    await AsyncStorage.multiSet([
      [CONSTANTES.ASYNC_ITEM_USUARIO_TOKEN, JSON.stringify(firebaseCredential)],
      [CONSTANTES.ASYNC_ITEM_USUARIO_UID, firebaseCredential.user.uid],
      [CONSTANTES.ASYNC_ITEM_USUARIO_PROVIDER_ID, idAuthProvider],
      [CONSTANTES.ASYNC_ITEM_USUARIO_NOME, nome],
      [CONSTANTES.ASYNC_ITEM_USUARIO_EMAIL, email],
      [CONSTANTES.ASYNC_ITEM_USUARIO_FOTO, foto],
      [CONSTANTES.ASYNC_ITEM_AUTH_PROVIDER_TOKEN, JSON.stringify(token)],
      [CONSTANTES.ASYNC_ITEM_AUTH_PROVIDER_NAME, JSON.stringify(providerName)],
      [CONSTANTES.ASYNC_ITEM_TERMO_SERVICO, termoservico],
      [CONSTANTES.ASYNC_ITEM_TIMESTAMP, timestamp]
    ])

    // this.setState({ isProcessing: false });

    this.props.navigation.navigate(CONSTANTES.ROUTES_LOADING);
  };

  translateLoginErrors(error) {
    message = error.message;

    switch (error.code) {
      case "auth/invalid-email":
        message = "Endereço de email inválido";
        break;
      case "auth/user-disabled":
        message = "Usuário desativado";
        break;
      case "auth/user-not-found":
      case "auth/wrong-password":
        message = "Usuário ou senha inválido";
        break;
      default:
        message: "Erro desconhecido: " + error.code + error.message;
        break;
    }

    return message;
  }

  _alertErro(errorMsg) {
    Alert.alert(
      'Erro',
      errorMsg,
      [
        { text: 'OK', onPress: () => { } },
      ],
      { cancelable: false },
    );
  }

  render() {
    return (
      <View style={styles.mainContainerStyle}>
        <ScrollView>
          <Overlay isVisible={this.state.isProcessing} width="70%" height="20%">
            <View style={styles.centralize}>
              <Text>Efetuando Autenticação... Aguarde...</Text>
              <ActivityIndicator size="large" />
            </View>
          </Overlay>
          <View style={styles.containerSocialLoginStyle}>
            <Text style={StyleTermo.descricaoTexto}>Acesse com</Text>
            <View style={styles.containerSocialLoginButtonsStyle}>
              <SocialIcon
                type="facebook"
                onPress={this.handleSocialLoginFacebook}
              />
              <SocialIcon
                type="google-plus-official"
                onPress={this.handleSocialLoginGoogle}
              />
            </View>
          </View>
          <View style={StyleTermo.corpoContainer}>
            <View style={StyleTermo.descricaoContainer}>
              <Text style={StyleTermo.descricaoTexto}>Ao entrar você confirma estar de acordo com os {"\u00a0"}
                <Text style={StyleTermo.descricaoTexto, StyleTermo.linkTexto}
                      onPress={() => this.props.navigation.navigate(CONSTANTES.ROUTES_AUTENTICACAO_TERMO_SERVICO)}>
                  Termos e Condições
                </Text>
              </Text>
            </View>
          </View>
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  mainContainerStyle: {
    flex: 5,
    flexDirection: "column"
  },

  centralize: {
    alignItems: "center",
    justifyContent: "center"
  },

  overlayStyle: {
    alignItems: "center",
    justifyContent: "center",
    height: "20%",
    width: "70%"
  },

  scrollContainerStyle: {
    justifyContent: "space-evenly"
  },

  containerLoginStyle: {
    flex: 2,
    marginLeft: 5,
    marginRight: 5,
    marginTop: 10,
    alignItems: "center",
    justifyContent: "space-evenly"
  },

  containerSocialLoginStyle: {
    flex: 2,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    paddingBottom: 20,
    paddingTop: 20
  },

  containerSocialLoginButtonsStyle: {
    flexDirection: "row",
    justifyContent: "space-around"
  },

  socialButton: {
    width: "10%"
  },

  containerActionsStyle: {
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    paddingBottom: 20,
    paddingTop: 20
  },

  textInput: {
    borderColor: "gray",
    borderWidth: 1,
    height: 40,
    width: "70%"
  }
});
