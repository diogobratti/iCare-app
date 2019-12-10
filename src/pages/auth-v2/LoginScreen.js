import React, { Component } from "react";
import { StyleSheet, Text, View, ScrollView, ActivityIndicator, Alert } from "react-native";
import { SocialIcon, Overlay } from "react-native-elements";
import firebase from "react-native-firebase";
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

export default class Login extends Component {

  state = {
    isProcessing: false
  };

  static navigationOptions = {
    ...navigationOptions,
  };

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
        this._alertErro("Autorização Cancelada");
        // this.props.navigation.push("Loading");
        throw new Error("User cancelled request");
      }

      // console.log(
      // `Login success with permissions: ${result.grantedPermissions.toString()}`
      // );

      // get the access token
      const data = await AccessToken.getCurrentAccessToken();

      if (!data) {
        // handle this however suites the flow of your app
        this.setState({ isProcessing: false });
        this._alertErro("Erro acessando os dados do token do usuário");
        // this.props.navigation.push("Loading");
        throw new Error(
          "Something went wrong obtaining the users access token"
        );
      }

      // create a new firebase credential with the token
      const credential = firebase.auth.FacebookAuthProvider.credential(
        data.accessToken
      );

      // login with credential
      const firebaseUserCredential = await firebase
        .auth()
        .signInWithCredential(credential);

      // console.warn(JSON.stringify(firebaseUserCredential.user.toJSON()));
      // console.log(JSON.stringify(firebaseUserCredential.user.toJSON()));

      const nome = firebaseUserCredential.additionalUserInfo.profile.name;
      const email = firebaseUserCredential.additionalUserInfo.profile.email;
      const foto = firebaseUserCredential.additionalUserInfo.profile.picture.data.url;

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
      this._alertErro("Erro Interno:" + e);
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
    let collection = firebase.firestore().collection(CONSTANTES.FIRESTORE_COLLECTION_ANUNCIOS);
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
          perfil: perfil
        })
        .then(newData => {
          //atualiza referencia
          // console.log("cadastro criado ");
          // console.log(newData);
          // data = newData;
          return newData;
        });
    } else {
      docReference = querySnapshot.docs[0].ref;
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
      [CONSTANTES.ASYNC_ITEM_TERMO_SERVICO, termoservico]
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
              {/* <SocialIcon
                type="instagram"
                onPress={this.handleSocialLoginInstagram}
              /> */}
              <SocialIcon
                type="google-plus-official"
                onPress={this.handleSocialLoginGoogle}
              />
            </View>
          </View>

          {/* <View style={styles.containerActionsStyle}> */}
          <View style={StyleTermo.corpoContainer}>
            <View style={StyleTermo.descricaoContainer}>
              <Text style={StyleTermo.descricaoTexto}>Ao entrar você confirma estar de acordo com os {"\u00a0"}
                <Text style={StyleTermo.descricaoTexto, StyleTermo.linkTexto}
                      onPress={() => this.props.navigation.navigate(CONSTANTES.ROUTES_AUTENTICACAO_TERMO_SERVICO)}>
                  Termos e Condições
                </Text>
              </Text>
              {/* <Button onPress={() => this.props.navigation.navigate(CONSTANTES.ROUTES_AUTENTICACAO_TERMO_SERVICO)}>
                Termos e Condições
              </Button> */}
            </View>
          </View>
          {/* </View> */}

          {/* <View style={styles.containerLoginStyle}>
            <Text>Ou com seu e-mail</Text>
            <Input
              style={styles.textInput}
              autoCapitalize="none"
              placeholder="Email"
              leftIcon={{ type: 'font-awesome', name: 'envelope' }}
              onChangeText={(email) => this.setState({ email })}
              value={this.state.email}
            />
            <Input
              secureTextEntry
              style={styles.textInput}
              autoCapitalize="none"
              placeholder="Senha"
              leftIcon={{ type: 'font-awesome', name: 'lock' }}
              onChangeText={(password) => this.setState({ password })}
              value={this.state.password}
            />

            {this.state.errorMessage && (
              <Text style={{ color: 'red' }}>{this.state.errorMessage}</Text>
            )}

            <Button onPress={this.handleLogin}>Login</Button>
            <Text>Esqueci minha senha</Text>
          </View> */}

          {/* <View style={styles.containerActionsStyle}>
            <Button onPress={() => this.props.navigation.navigate('Cadastro')}>
              Não tem uma conta? Cadastre-se
            </Button>
          </View> */}
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

// <View style={styles.container}>
//   <TextInput
//     style={styles.textInput}
//     autoCapitalize="none"
//     placeholder="Email"
//     onChangeText={(email) => this.setState({ email })}
//     value={this.state.email}
//   />
//   <TextInput
//     secureTextEntry
//     style={styles.textInput}
//     autoCapitalize="none"
//     placeholder="Senha"
//     onChangeText={(password) => this.setState({ password })}
//     value={this.state.password}
//   />

//   {this.state.errorMessage && (
//     <Text style={{ color: 'red' }}>{this.state.errorMessage}</Text>
//   )}

//   <Button
//     title="Login"
//     onPress={this.handleLogin}
//     buttonStyle={{ height: 40, width: 150, borderRadius: 20 }}
//   />

//   <SocialIcon
//     title="Entrar com Facebook"
//     button
//     type="facebook"
//     style={styles.socialButton}
//   />

//   <SocialIcon
//     title="Entrar com Google"
//     button
//     type="google-plus-official"
//     style={styles.socialButton}
//   />

//   {/* <GoogleSigninButton
//     style={{ width: 192, height: 48 }}
//     // style={styles.socialButton}
//     size={GoogleSigninButton.Size.Wide}
//     color={GoogleSigninButton.Color.Light}
//     // onPress={this._signIn}
//     onPress={() => {}}
//     // disabled={this.state.isSigninInProgress}
//   /> */}

//   <SocialIcon
//     title="Entrar com Instagram"
//     button
//     type="instagram"
//     style={styles.socialButton}
//   />

//   <Button
//     title="Não tem uma conta? Cadastre-se"
//     onPress={() => this.props.navigation.navigate('SignUp')}
//   />

//   <Button title="Esqueci minha senha" />
// </View>

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     // justifyContent: 'center',
//     // alignItems: 'center',

//   },
//   textInput: {
//     height: 40,
//     width: '90%',
//     borderColor: 'gray',
//     borderWidth: 1,
//     marginTop: 8,
//   },
//   socialButton: {
//     width: '70%',
//   },
// });
