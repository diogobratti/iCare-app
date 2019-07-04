// SignUp.js
import React from 'react'
import { StyleSheet, Text, TextInput, View } from 'react-native'
import { CheckBox, Button } from 'react-native-elements'


import firebase from 'react-native-firebase'

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
        serviceTermsCheckbox: false,
    }

    handleSignUp = () => {
        console.log('handleSignUp')

        // firebase.auth()
        // .createUserWithEmailAndPassword(this.state.email, this.state.password)
        // .then(() => this.props.navigation.navigate('Main'))
        // .catch(error => this.setState({ errorMessage: error.message }))

        firebase.auth().
            createUserWithEmailAndPassword(this.state.email, this.state.password)
            .then(() => {
                //adiciona atributos "adicionais"

            })
            .catch(error => this.setState({
                errorMessage: this.translateSignUpErrors(error)
            }));

    }

    translateSignUpErrors(error) {

        message = error.message;

        switch (error.code) {
            case 'auth/email-already-in-use':
                message = "Endereço de email já cadastrado";
                break;
            case 'auth/invalid-email':
                message = "Endereço de email inválido";
                break;
            case 'auth/operation-not-allowed':
                message = "Erro Interno";
                break;
            case 'auth/weak-password':
                message = "A senha digitada é muito fraca";
                break;
            default:
                message: "Erro desconhecido: " + error.code + error.message;
                break;
        }

        return message;
    }

    render() {
        return (
            <View style={styles.container}>

                <TextInput
                    placeholder="CPF"
                    keyboardType='numeric'
                    style={styles.textInput}
                    onChangeText={(cpf) => this.setState({ cpf })}
                    value={this.state.cpf}
                    maxLength={11}
                />

                <TextInput
                    placeholder="Email"
                    autoCapitalize="none"
                    style={styles.textInput}
                    onChangeText={email => this.setState({ email })}
                    value={this.state.email}
                />

                <TextInput
                    placeholder="Nome"
                    autoCapitalize="none"
                    style={styles.textInput}
                    onChangeText={name => this.setState({ name })}
                    value={this.state.name}
                />

                <TextInput
                    placeholder="Data de Nascimento"
                    autoCapitalize="none"
                    style={styles.textInput}
                    onChangeText={birthdate => this.setState({ birthdate })}
                    value={this.state.birthdate}
                />

                <TextInput
                    placeholder="Telefone"
                    autoCapitalize="none"
                    style={styles.textInput}
                    onChangeText={phoneNumber => this.setState({ phoneNumber })}
                    value={this.state.phoneNumber}
                />

                <TextInput
                    placeholder="Endereço"
                    autoCapitalize="none"
                    style={styles.textInput}
                    onChangeText={address => this.setState({ address })}
                    value={this.state.address}
                />


                <TextInput
                    secureTextEntry
                    placeholder="Senha"
                    autoCapitalize="none"
                    style={styles.textInput}
                    onChangeText={password => this.setState({ password })}
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
                    onValueChange={serviceTermsCheckbox => this.setState( {serviceTermsCheckbox})}
                    // itemCheckedKey="RNchecked"
                    // iconSize={16}
                    value={this.state.serviceTermsCheckbox}
                    checked={this.state.serviceTermsCheckbox}

                />

                <Button title="Cadastre-se" onPress={this.handleSignUp} />
                {this.state.errorMessage &&
                    <Text style={{ color: 'red' }}>
                        {this.state.errorMessage}
                    </Text>}

                <Button
                    title="Já tem uma conta? Login"
                    onPress={() => this.props.navigation.navigate('Login')}
                />

            </View>
        )
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    textInput: {
        height: 40,
        width: '90%',
        borderColor: 'gray',
        borderWidth: 1,
        marginTop: 8
    },
    Button: {
        marginTop: 10
    }
})