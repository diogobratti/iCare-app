import React, { Component } from 'react';
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import { SocialIcon, ThemeProvider, Input } from 'react-native-elements';
import firebase from 'react-native-firebase';
// import { ScrollView } from 'react-native-gesture-handler';
import Button from './components/Button';
import Icon from 'react-native-vector-icons/FontAwesome';

export default class Login extends React.Component {
  state = {
    email: '',
    password: '',
    errorMessage: null,
  };

  handleLogin = () => {
    console.log('handleLogin');

    const { email, password } = this.state;

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
                // button
                // style={styles.socialButton}
                type="facebook"
                onPress={this.handleSocialLoginFacebook}
              />
              <SocialIcon
                // button
                // style={styles.socialButton}
                type="instagram"
                onPress={this.handleSocialLoginInstagram}
              />
              <SocialIcon
                // button
                // style={styles.socialButton}
                type="google-plus-official"
                onPress={this.handleSocialLoginGoogle}
              />
            </View>
          </View>

          <View style={styles.containerLoginStyle}>
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
          </View>

          <View style={styles.containerActionsStyle}>
            <Button onPress={() => this.props.navigation.navigate('SignUp')}>
              Não tem uma conta? Cadastre-se
            </Button>
          </View>
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
