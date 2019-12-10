import React, { Component } from 'react';
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import { SocialIcon, ThemeProvider, Input } from 'react-native-elements';
import firebase from 'react-native-firebase';
import { AccessToken, LoginManager } from 'react-native-fbsdk';
import { GoogleSignin, statusCodes } from 'react-native-google-signin';
import { navigationOptions } from "../../styles/StyleBase";

export default class Login extends Component {
  state = {
    email: '',
    password: '',
    errorMessage: null,
    cadastroCompleto: false
  };

  static navigationOptions = {
    ...navigationOptions,
    headerLeft: <View />,
  };
  // static navigationOptions = {
  //   title: 'Autentique-se',
  // };

  handleLogin = () => {
    console.log('handleLogin');

    const { email, password} = this.state;

    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(() => this.props.navigation.navigate('Main'))
      .catch((error) =>
        this.setState({
          errorMessage: this.translateLoginErrors(error),
        })
      );
  };

  handleSocialLoginInstagram() {
    console.log('handleSocialLoginInstagram');
  }

  handleSocialLoginFacebook = async () => {
    console.log('handleSocialLoginFacebook');

    try {
      console.log('entrou');
      const result = await LoginManager.logInWithPermissions(['public_profile', 'email']);
      console.log(result);
      console.log('mostrou login');
      
  
      if (result.isCancelled) {
        // handle this however suites the flow of your app
        throw new Error('User cancelled request'); 
      }
  
      console.log(`Login success with permissions: ${result.grantedPermissions.toString()}`);
  
      // get the access token
      const data = await AccessToken.getCurrentAccessToken();
  
      if (!data) {
        // handle this however suites the flow of your app
        throw new Error('Something went wrong obtaining the users access token');
      }
  
      // create a new firebase credential with the token
      const credential = firebase.auth.FacebookAuthProvider.credential(data.accessToken);
  
      // login with credential
      const firebaseUserCredential = await firebase
        .auth()
        .signInWithCredential(credential);
  
      console.warn(JSON.stringify(firebaseUserCredential.user.toJSON()))

      await this.posAutenticacao(firebaseUserCredential);

    } catch (e) {
      console.error(e);
    }


  }

  handleSocialLoginGoogle = async () => {
    console.log('handleSocialLoginGoogle');

    try {
      // GoogleServices active
      await GoogleSignin.hasPlayServices();
  
      // add any configuration settings here:
      await GoogleSignin.configure();
  
      //sign in
      const data = await GoogleSignin.signIn();
  
      // console.warn(JSON.stringify(data));
      console.log(data);
  
      // create a new firebase credential with the token
      const credential = await firebase.auth.GoogleAuthProvider.credential(data.idToken, data.accessToken)
      // login with credential
      const firebaseUserCredential = await firebase.auth().signInWithCredential(credential);
  
      console.log(firebaseUserCredential);
      // console.warn(JSON.stringify(firebaseUserCredential.user.toJSON()));
      // await AsyncStorage.setItem('userToken', 'data');

      await this.posAutenticacao(firebaseUserCredential);
      
    } catch (error) {
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        // user cancelled the login flow
      } else if (error.code === statusCodes.IN_PROGRESS) {
        // operation (f.e. sign in) is in progress already
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        // play services not available or outdated
      } else {
        // some other error happened
        console.error(error);
      }
    }
  };

  /**
   * Verifica se o cadastro do usuário está completo. Se estiver, redireciona
   * para página de anúnicio, se não estiver, redireciona para completar o
   * cadastro
   * @param {UserCredential} firebaseCredential Credencial do Firebase
   */
  posAutenticacao = async(firebaseCredential) => {

    // //verifica se é um novo usuário
    // if (firebaseCredential.additionalUserInfo.isNewUser) {
    //   this.setState({cadastroCompleto : false});
    // } else {
    //   //verifica no firestore se o cadastro está completo
    //   const collectionAnuncios = await firebase.firestore().collection('anuncios');

    //   await collectionAnuncios
    //     .where("uid", "==", firebaseCredential.user.uid)
    //     .get()
    //     .then(data => {
    //       this.setState({ cadastroCompleto: !data.empty });
    //       // console.log(!data.empty);
    //     });
    // }

    // this.props.navigation.navigate(this.state.cadastroCompleto ? 'App' : 'NewUser');
    this.props.navigation.navigate("AuthLoading");
  };

  translateLoginErrors(error) {
    message = error.message;

    switch (error.code) {
      case 'auth/invalid-email':
        message = 'Endereço de email inválido';
        break;
      case 'auth/user-disabled':
        message = 'Usuário desativado';
        break;
      case 'auth/user-not-found':
      case 'auth/wrong-password':
        message = 'Usuário ou senha inválido';
        break;
      default:
        message: 'Erro desconhecido: ' + error.code + error.message;
        break;
    }

    return message;
  }

  render() {
    return (
      <View style={styles.mainContainerStyle}>
        <ScrollView>
          <View style={styles.containerSocialLoginStyle}>
            <Text>Acesse com</Text>
            <View style={styles.containerSocialLoginButtonsStyle}>
              <SocialIcon
                type="facebook"
                onPress={this.handleSocialLoginFacebook}
                // onPress={facebookLogin}
              />
              <SocialIcon
                type="instagram"
                onPress={this.handleSocialLoginInstagram}
              />
              <SocialIcon
                type="google-plus-official"
                onPress={this.handleSocialLoginGoogle}
              />
            </View>
          </View>

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
  },

  scrollContainerStyle: {
    justifyContent: 'space-evenly',
  },

  containerLoginStyle: {
    flex: 2,
    marginLeft: 5,
    marginRight: 5,
    marginTop: 10,
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },

  containerSocialLoginStyle: {
    flex: 2,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: 20,
    paddingTop: 20,
  },

  containerSocialLoginButtonsStyle: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },

  socialButton: {
    width: '10%',
  },

  containerActionsStyle: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: 20,
    paddingTop: 20,
  },

  textInput: {
    borderColor: 'gray',
    borderWidth: 1,
    height: 40,
    width: '70%',
  },
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
