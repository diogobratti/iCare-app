// Login.js
import React from 'react';
import { StyleSheet, Text, TextInput, View } from 'react-native';
import { SocialIcon, Button } from 'react-native-elements';
import { GoogleSigninButton } from 'react-native-google-signin';
import firebase from 'react-native-firebase';

import { navigationOptions } from '../../styles/StyleBase';

export default class Login extends React.Component {
  static navigationOptions = navigationOptions;

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
      <View style={styles.container}>
        <TextInput
          style={styles.textInput}
          autoCapitalize="none"
          placeholder="Email"
          onChangeText={(email) => this.setState({ email })}
          value={this.state.email}
        />
        <TextInput
          secureTextEntry
          style={styles.textInput}
          autoCapitalize="none"
          placeholder="Senha"
          onChangeText={(password) => this.setState({ password })}
          value={this.state.password}
        />

        {this.state.errorMessage && (
          <Text style={{ color: 'red' }}>{this.state.errorMessage}</Text>
        )}

        <Button
          title="Login"
          onPress={this.handleLogin}
          buttonStyle={{ height: 40, width: 150, borderRadius: 20 }}
        />

        <SocialIcon
          title="Entrar com Facebook"
          button
          type="facebook"
          style={styles.socialButton}
        />

        <SocialIcon
          title="Entrar com Google"
          button
          type="google-plus-official"
          style={styles.socialButton}
        />

        <GoogleSigninButton
          style={{ width: 192, height: 48 }}
          // style={styles.socialButton}
          size={GoogleSigninButton.Size.Wide}
          color={GoogleSigninButton.Color.Light}
          // onPress={this._signIn}
          onPress={() => {}}
          // disabled={this.state.isSigninInProgress}
        />

        <SocialIcon
          title="Entrar com Instagram"
          button
          type="instagram"
          style={styles.socialButton}
        />

        <Button
          title="Não tem uma conta? Cadastre-se"
          onPress={() => this.props.navigation.navigate('SignUp')}
        />

        <Button title="Esqueci minha senha" />
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textInput: {
    height: 40,
    width: '90%',
    borderColor: 'gray',
    borderWidth: 1,
    marginTop: 8,
  },
  socialButton: {
    width: '70%',
  },
});
