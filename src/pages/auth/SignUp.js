// SignUp.js
import React from 'react';
import { StyleSheet, Text, TextInput, View, ScrollView } from 'react-native';
import { CheckBox } from 'react-native-elements';
import firebase from 'react-native-firebase';
import apiDb from '../../services/apiDb';
import Button from './components/Button';

export default class SignUp extends React.Component {
  state = {
    email: '',
    password: '',
    errorMessage: null,
    cpf: '',
    name: '',
    birthdate: '',
    phoneNumber: '',
    address: '',
    serviceTermsVersion: '',
    serviceTermsCheckbox: true,
    uid: '',
  };

  handleSignUp = () => {
    console.log('handleSignUp');

    //TODO: tratar se os termos de servico estao selecionados

    // firebase.auth()
    // .createUserWithEmailAndPassword(this.state.email, this.state.password)
    // .then(() => this.props.navigation.navigate('Main'))
    // .catch(error => this.setState({ errorMessage: error.message }))

    firebase
      .auth()
      .createUserWithEmailAndPassword(this.state.email, this.state.password)
      .then((userCredentials) => {
        //adiciona atributos "adicionais"
        api = new apiDb('usuarios');
        api.add({
          id: userCredentials.user.uid,
          cpf: this.state.cpf,
          name: this.state.name,
          birthdate: this.state.birthdate,
          phoneNumaber: this.state.phoneNumber,
          address: this.state.address,
          serviceTermsVersion: this.state.serviceTermsVersion,
        });

        // this.props.navigation.navigate('Main');
      })
      .catch((error) =>
        this.setState({
          errorMessage: this.translateSignUpErrors(error),
        })
      );
  };

  translateSignUpErrors(error) {
    message = error.message;

    switch (error.code) {
      case 'auth/email-already-in-use':
        message = 'Endereço de email já cadastrado';
        break;
      case 'auth/invalid-email':
        message = 'Endereço de email inválido';
        break;
      case 'auth/operation-not-allowed':
        message = 'Erro Interno';
        break;
      case 'auth/weak-password':
        message = 'A senha digitada é muito fraca';
        break;
      default:
        message: 'Erro desconhecido: ' + error.code + error.message;
        break;
    }

    return message;
  }

  render() {
    return (
      <ScrollView>
        <View style={styles.container}>
          <TextInput
            placeholder="CPF"
            keyboardType="numeric"
            style={styles.textInput}
            onChangeText={(cpf) => this.setState({ cpf })}
            value={this.state.cpf}
            maxLength={11}
          />

          <TextInput
            placeholder="Email"
            autoCapitalize="none"
            style={styles.textInput}
            onChangeText={(email) => this.setState({ email })}
            value={this.state.email}
          />

          <TextInput
            placeholder="Nome"
            autoCapitalize="none"
            style={styles.textInput}
            onChangeText={(name) => this.setState({ name })}
            value={this.state.name}
          />

          <TextInput
            placeholder="Data de Nascimento"
            autoCapitalize="none"
            style={styles.textInput}
            onChangeText={(birthdate) => this.setState({ birthdate })}
            value={this.state.birthdate}
          />

          <TextInput
            placeholder="Telefone"
            autoCapitalize="none"
            style={styles.textInput}
            onChangeText={(phoneNumber) => this.setState({ phoneNumber })}
            value={this.state.phoneNumber}
          />

          <TextInput
            placeholder="Endereço"
            autoCapitalize="none"
            style={styles.textInput}
            onChangeText={(address) => this.setState({ address })}
            value={this.state.address}
          />

          <TextInput
            secureTextEntry
            placeholder="Senha"
            autoCapitalize="none"
            style={styles.textInput}
            onChangeText={(password) => this.setState({ password })}
            value={this.state.password}
          />

          <TextInput
            secureTextEntry
            placeholder="Confirme a Senha"
            autoCapitalize="none"
            style={styles.textInput}
            // onChangeText={password => this.setState({ password })}
            // value={this.state.password}
          />

          <CheckBox
            title="Concordo com os Termos de Serviço"
            // value={this.state.serviceTermsCheckbox}
            // onValueChange={() =>
            //   this.setState({
            //     serviceTermsCheckbox: !this.state.serviceTermsCheckbox,
            //   })
            // }
            onPress={() =>
              this.setState({
                serviceTermsCheckbox: !this.state.serviceTermsCheckbox,
              })
            }
            checked={this.state.serviceTermsCheckbox}
          />

          {/* <Button title="Cadastre-se" onPress={this.handleSignUp} /> */}

          <Button onPress={this.handleSignUp}>Cadastre-se</Button>

          {this.state.errorMessage && (
            <Text style={{ color: 'red' }}>{this.state.errorMessage}</Text>
          )}

          {/* <Button
            title="Já tem uma conta? Login"
            onPress={() => this.props.navigation.navigate('Login')} */}

          <Button onPress={() => this.props.navigation.navigate('Login')}>
            Já tem uma conta? Login
          </Button>
        </View>
      </ScrollView>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginLeft: 10,
    marginHorizontal: 10,
  },
  textInput: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginTop: 8,
  },
  Button: {
    marginTop: 10,
  },
});
